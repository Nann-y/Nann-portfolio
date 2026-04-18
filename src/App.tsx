/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, X } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { MoreWorks } from "./components/MoreWorks";
import { BackgroundVideo } from "./components/BackgroundVideo";

function WechatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8.2 3C4.23 3 1 5.62 1 8.84c0 1.9 1.12 3.62 2.99 4.75l-.77 2.33 2.74-1.36c.4.06.81.09 1.24.09 3.97 0 7.2-2.62 7.2-5.84S12.17 3 8.2 3Zm-2.4 4.85a.95.95 0 1 1 0-1.9.95.95 0 0 1 0 1.9Zm4.8 0a.95.95 0 1 1 0-1.9.95.95 0 0 1 0 1.9Z" />
      <path d="M16.45 9.35c-3.61 0-6.55 2.35-6.55 5.23 0 2.88 2.94 5.23 6.55 5.23.38 0 .75-.03 1.11-.09l2.4 1.21-.64-1.92c1.64-1 2.68-2.58 2.68-4.43 0-2.88-2.94-5.23-6.55-5.23Zm-2.15 4.55a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Zm4.4 0a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Z" />
    </svg>
  );
}

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="h-screen overflow-y-auto bg-transparent text-zinc-50 font-sans selection:bg-blue-500/30 scroll-smooth">
      {/* Global Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-[-1] transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37, 99, 235, 0.12), transparent 80%)`
        }}
      />
      {/* Background Elements */}
      <BackgroundVideo
        src="https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8"
        imageSrc="/assets/backgrounds/home-hero-bg.png"
        imageOpacity={0.5}
        videoOpacity={0.3}
      />
      <div className="bg-overlay-left" />
      <div className="bg-overlay-bottom" />
      <div className="noise-overlay" />
      

      {/* Center Glow */}
      <div className="center-glow" />
      
      <Navbar />
      
      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <MoreWorks />
      </main>

      <footer id="contact" className="min-h-screen flex flex-col justify-between py-16 px-6 md:px-16 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-between">
          {/* 顶部小标签 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-start justify-between mb-20"
          >
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-400 mb-4 block">/ 04</span>
              <p className="text-zinc-500 text-xs md:text-sm font-mono max-w-[280px] leading-relaxed mt-4">
                准备好开始下一个数字项目了吗？<br/>
                给我发一封邮件，让我们一起创造令人惊艳的作品。
              </p>
            </div>
            <motion.button 
              onClick={() => setShowContact(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:inline-block px-10 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:bg-blue-600 hover:border-blue-500"
            >
              Get in touch
            </motion.button>
          </motion.div>

          {/* 中心巨型文字 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start mb-20"
          >
            <h2 className="text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-display font-extrabold tracking-tighter leading-[0.85] text-white drop-shadow-2xl">
              LET'S
            </h2>
            <h2 className="text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-display font-extrabold tracking-tighter leading-[0.85] bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 md:ml-[10%]">
              CONNECT
            </h2>
          </motion.div>

          {/* 移动端按钮 */}
          <motion.button 
            onClick={() => setShowContact(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden inline-block px-10 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-[0.3em] transition-all text-center mb-16"
          >
            Get in touch
          </motion.button>

          {/* 底部信息栏 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end w-full pt-8 border-t border-white/10"
          >
            <p className="font-mono uppercase tracking-[0.2em] text-[10px] text-zinc-600 mb-4 md:mb-0">
              © {new Date().getFullYear()} 汪宇 / NANN. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-10 md:gap-16 text-zinc-500 text-xs font-mono">
              <a href="mailto:1035705662@qq.com" className="hover:text-blue-400 transition-colors">Email</a>
              <span className="cursor-default hover:text-blue-400 transition-colors">WeChat</span>
              <span className="cursor-default hover:text-blue-400 transition-colors">Phone</span>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* 联系方式弹窗 */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-2xl px-6"
            onClick={() => setShowContact(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowContact(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-3xl bg-blue-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                  <Mail className="text-blue-400" size={32} />
                </div>
                
                <h3 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">Let's Connect</h3>
                <p className="text-zinc-500 text-sm mb-12 max-w-[280px]">如果您有任何想法或合作意向，欢迎通过以下方式联系我</p>

                <div className="w-full flex flex-col gap-4">
                  <a href="mailto:1035705662@qq.com" className="group flex items-center justify-between p-5 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 transition-colors">
                        <Mail size={18} />
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Email</span>
                        <span className="text-zinc-200 text-sm font-mono">1035705662@qq.com</span>
                      </div>
                    </div>
                  </a>

                  <div className="group flex items-center justify-between p-5 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-default">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 transition-colors">
                        <Phone size={18} />
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Phone</span>
                        <span className="text-zinc-200 text-sm font-mono">+86 156 2379 2098</span>
                      </div>
                    </div>
                  </div>

                  <div className="group flex items-center justify-between p-5 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-default">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 transition-colors">
                        <WechatIcon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">WeChat</span>
                        <span className="text-zinc-200 text-sm font-mono">Nanncy_nn</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-white font-display font-bold tracking-wider text-xl">NANN</span>
            <p className="text-zinc-500 text-xs tracking-widest uppercase">© 2025 ALL RIGHTS RESERVED.</p>
          </div>
          <div className="flex gap-8">
            <a href="mailto:1035705662@qq.com" className="text-zinc-400 hover:text-white transition-colors text-sm uppercase tracking-widest">Email</a>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400 text-sm uppercase tracking-widest cursor-default">WeChat: Nanncy_nn</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
