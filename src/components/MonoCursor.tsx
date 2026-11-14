import React, { useEffect, useState } from 'react';

export const MonoCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    let animationId: number;
    const lerpRing = () => {
      setRingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animationId = requestAnimationFrame(lerpRing);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    animationId = requestAnimationFrame(lerpRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, [pos.x, pos.y]);

  return (
    <>
      <div
        className="cursor-dot hidden md:block"
        style={{
          transform: `translate3d(${pos.x - 5}px, ${pos.y - 5}px, 0) scale(${isHovered ? 2.5 : 1})`,
        }}
      />
      <div
        className="cursor-ring hidden md:block"
        style={{
          transform: `translate3d(${ringPos.x - 22}px, ${ringPos.y - 22}px, 0) scale(${isHovered ? 1.4 : 1})`,
          borderColor: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
        }}
      />
    </>
  );
};
