import React, { useEffect, useRef, useState } from 'react';
import { useMotionSettings } from './MotionSettings';
import assets from '../data/videoAssets.json';

interface SmartVideoProps {
  src: string;
  className?: string;
  priority?: boolean;
  paused?: boolean;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  segment?: [number, number];
}

type VideoAsset = { desktop: string; mobile: string; poster: string };

/**
 * Zero-Lag Hardware-Accelerated Video Engine.
 * - Sets `src` directly on `<video>` (avoiding non-reactive dynamic `<source>` children).
 * - Uses native DirectComposition GPU overlay (strips CSS shader filters on `<video>`).
 * - Pauses off-screen videos immediately so only visible videos decode frames.
 */
export const SmartVideo: React.FC<SmartVideoProps> = ({
  src,
  className = '',
  priority = false,
  paused = false,
  videoRef,
  segment,
}) => {
  const internalRef = useRef<HTMLVideoElement | null>(null);
  const targetRef = videoRef ?? internalRef;
  const settings = useMotionSettings();
  const stopped = paused || settings.paused;
  const [near, setNear] = useState(priority);
  const [loaded, setLoaded] = useState(priority);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  const asset = (assets as Record<string, VideoAsset>)[src];
  const isImage = /\.(png|jpe?g|webp|avif)$/i.test(src);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (priority) {
      setLoaded(true);
      setNear(true);
    }
    const el = targetRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setLoaded(true);
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const visible = entry.isIntersecting;
        setNear(visible);
        if (visible) setLoaded(true);
      },
      { rootMargin: '520px 0px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [src, priority, targetRef]);

  const resolvedSrc = asset
    ? isMobile
      ? asset.mobile
      : asset.desktop
    : src;

  useEffect(() => {
    const el = targetRef.current;
    if (!el || !loaded) return;

    el.defaultMuted = true;
    el.muted = true;

    const sync = () => {
      if (near && !stopped && !document.hidden) {
        if (el.paused) {
          el.muted = true;
          const p = el.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        }
      } else if (!el.paused) {
        el.pause();
      }
    };

    sync();
    document.addEventListener('visibilitychange', sync);
    el.addEventListener('loadedmetadata', sync);
    el.addEventListener('loadeddata', sync);
    el.addEventListener('canplay', sync);
    return () => {
      document.removeEventListener('visibilitychange', sync);
      el.removeEventListener('loadedmetadata', sync);
      el.removeEventListener('loadeddata', sync);
      el.removeEventListener('canplay', sync);
    };
  }, [resolvedSrc, loaded, near, stopped, targetRef]);

  const start = segment?.[0];
  const end = segment?.[1];
  useEffect(() => {
    const el = targetRef.current;
    if (!el || start === undefined || end === undefined) return;
    const keepInSegment = () => {
      if (
        Number.isFinite(el.duration) &&
        el.duration > 0 &&
        (el.currentTime < el.duration * start - 0.15 || el.currentTime >= el.duration * end)
      ) {
        el.currentTime = el.duration * start;
      }
    };
    if (el.readyState >= 1) keepInSegment();
    el.addEventListener('loadedmetadata', keepInSegment);
    el.addEventListener('timeupdate', keepInSegment);
    return () => {
      el.removeEventListener('loadedmetadata', keepInSegment);
      el.removeEventListener('timeupdate', keepInSegment);
    };
  }, [resolvedSrc, start, end, targetRef]);

  if (isImage) {
    return <img src={src} alt="" loading={priority ? 'eager' : 'lazy'} className={className} />;
  }

  // Strip CSS filter utilities so Chromium promotes `<video>` to zero-copy hardware overlay
  const cleanClassName = className
    .replace(/\b(saturate|contrast|brightness)-\d+\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <video
      ref={targetRef}
      src={loaded ? resolvedSrc : undefined}
      poster={asset?.poster}
      autoPlay={loaded && !stopped}
      loop
      muted
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      preload={priority ? 'auto' : 'metadata'}
      aria-hidden="true"
      className={cleanClassName}
    />
  );
};
