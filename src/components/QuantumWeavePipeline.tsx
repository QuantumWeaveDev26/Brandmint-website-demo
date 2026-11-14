import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Network, Cpu, Factory, Truck, ArrowRight } from 'lucide-react';

const PIPELINE_NODES = [
  {
    id: 'ingestion',
    label: '01. Community Demand',
    title: 'Demand Ingestion Layer',
    icon: Network,
    status: 'ACTIVE',
    badge: '14,000+ Ingested Units',
    description: 'Autonomous capture of custom merchandise, campus gear, and creator community orders via conversational AI.',
    specs: [
      { label: 'Protocols', val: 'WhatsApp, Webhooks, API' },
      { label: 'Input Parser', val: 'Multimodal (Specs & Vector Art)' },
      { label: 'Validation Time', val: '0.42 seconds' },
    ],
  },
  {
    id: 'validation',
    label: '02. AI Validation',
    title: 'Spec & Vector AI Engine',
    icon: Cpu,
    status: 'PROCESSING',
    badge: 'Zero Defect Guarantee',
    description: 'Automated print-readiness audit, GSM fabric matching, color profile checks, and digital 3D garment proofing.',
    specs: [
      { label: 'Resolution Audit', val: 'Vector 300+ DPI Auto-Upscale' },
      { label: 'Fabric Match', val: 'Bio-Washed 280-360 GSM' },
      { label: 'Margin Engine', val: 'Dynamic Guardrails' },
    ],
  },
  {
    id: 'routing',
    label: '03. Dynamic Factory Routing',
    title: 'Smart Capacity Allocation',
    icon: Factory,
    status: 'ROUTED',
    badge: 'Tirupur & BLR Hubs',
    description: 'Instant algorithmic dispatch to specialized manufacturing lines based on real-time loom capacity and proximity.',
    specs: [
      { label: 'Active Facilities', val: '14 Vetted Mills' },
      { label: 'Turnaround Target', val: '4 - 7 Business Days' },
      { label: 'Telemetry', val: 'IoT Loom Uptime' },
    ],
  },
  {
    id: 'fulfillment',
    label: '04. Campus & Bulk Fulfillment',
    title: 'Automated Logistics Layer',
    icon: Truck,
    status: 'DISPATCHED',
    badge: '100% On-Time SLA',
    description: 'Direct door-to-door delivery with live tracking notifications pushed via WhatsApp to organizers and students.',
    specs: [
      { label: 'Carriers', val: 'Bluedart, Delhivery API' },
      { label: 'Tracking SLA', val: 'Live GPS Webhooks' },
      { label: 'Delivery Uptime', val: '99.4%' },
    ],
  },
];

export const QuantumWeavePipeline: React.FC = () => {
  const [activeNodeIndex, setActiveNodeIndex] = useState(1);
  const activeNode = PIPELINE_NODES[activeNodeIndex];

  return (
    <section id="quantum-weave" className="relative py-28 px-4 max-w-7xl mx-auto z-10">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#4328c7]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#67efd0]/30 text-xs font-mono text-[#67efd0] mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>FLAGSHIP VENTURE INFRASTRUCTURE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] tracking-tight text-white uppercase mb-3">
          Quantum <span className="gradient-text-mint">Weave™</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          An AI-powered community-commerce & merchandise manufacturing pipeline connecting buyers, institutions, creators, and tier-1 textile mills.
        </p>
      </div>

      {/* Interactive Visual Pipeline Tracker */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {/* Node Stepper Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 relative z-10">
          {PIPELINE_NODES.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = activeNodeIndex === idx;

            return (
              <button
                key={node.id}
                onClick={() => setActiveNodeIndex(idx)}
                className={`relative text-left p-4 rounded-2xl transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#123d35]/70 border-[#67efd0] shadow-[0_0_25px_rgba(103,239,208,0.25)] scale-[1.02]'
                    : 'bg-[#07121a]/60 border-white/5 hover:border-white/20 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#67efd0] text-[#07121a]'
                        : 'bg-white/5 text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-[#67efd0]/20 text-[#67efd0] border border-[#67efd0]/40'
                        : 'bg-white/5 text-slate-500'
                    }`}
                  >
                    {node.status}
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 mb-1">{node.label}</div>
                  <div className="text-sm font-bold text-white tracking-tight">{node.title}</div>
                </div>

                {/* Animated active bottom line */}
                {isSelected && (
                  <motion.div
                    layoutId="nodeGlowLine"
                    className="absolute -bottom-[1px] left-4 right-4 h-[2px] bg-[#67efd0] shadow-[0_0_10px_#67efd0]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Visual Stage Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#071015]/90 rounded-2xl p-6 sm:p-8 border border-white/5">
          {/* Left: Interactive Diagram & Pulse */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#67efd0] animate-ping" />
              <span className="text-xs font-mono text-[#67efd0] uppercase tracking-wider">
                Stage {activeNodeIndex + 1} of 4 Telemetry
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              {activeNode.title}
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {activeNode.description}
            </p>

            {/* Spec Matrix Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              {activeNode.specs.map((spec, sidx) => (
                <div
                  key={sidx}
                  className="bg-[#0b1c22] p-3 rounded-xl border border-white/5 hover:border-[#67efd0]/30 transition-colors"
                >
                  <span className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">
                    {spec.label}
                  </span>
                  <span className="text-xs font-bold text-[#a2ffe7] font-mono">
                    {spec.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual Holographic Node Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#123d35]/40 via-[#07121a] to-[#4328c7]/20 rounded-2xl p-6 border border-[#67efd0]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#67efd0]/10 rounded-full blur-2xl" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-slate-400">STATUS MONITOR</span>
              <span className="px-2.5 py-1 rounded-full bg-[#67efd0]/15 text-[#67efd0] text-[10px] font-mono border border-[#67efd0]/30">
                {activeNode.badge}
              </span>
            </div>

            {/* Visual Simulated Graph */}
            <div className="h-28 flex items-end gap-1.5 pt-4 pb-2">
              {[40, 65, 80, 50, 95, 70, 85, 90, 60, 100].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 10 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.6, delay: i * 0.04 }}
                  className={`flex-1 rounded-t-sm ${
                    i === 9 ? 'bg-[#67efd0] shadow-[0_0_15px_#67efd0]' : 'bg-[#164b44]/70 hover:bg-[#67efd0]/50'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/5 pt-3">
              <span>Throughput: Optimal</span>
              <span className="text-[#67efd0] font-bold">100% Automated</span>
            </div>

            <div className="mt-5">
              <a
                href="https://quantumweaveai.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-[#67efd0] hover:text-[#07121a] text-white text-xs font-bold transition-all border border-white/10 hover:border-[#67efd0]"
              >
                <span>Visit Quantum Weave Platform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
