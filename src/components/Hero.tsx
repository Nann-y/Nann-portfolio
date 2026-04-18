import { motion } from "motion/react";
import { Mail, Phone, Zap } from "lucide-react";

function WechatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8.2 3C4.23 3 1 5.62 1 8.84c0 1.9 1.12 3.62 2.99 4.75l-.77 2.33 2.74-1.36c.4.06.81.09 1.24.09 3.97 0 7.2-2.62 7.2-5.84S12.17 3 8.2 3Zm-2.4 4.85a.95.95 0 1 1 0-1.9.95.95 0 0 1 0 1.9Zm4.8 0a.95.95 0 1 1 0-1.9.95.95 0 0 1 0 1.9Z" />
      <path d="M16.45 9.35c-3.61 0-6.55 2.35-6.55 5.23 0 2.88 2.94 5.23 6.55 5.23.38 0 .75-.03 1.11-.09l2.4 1.21-.64-1.92c1.64-1 2.68-2.58 2.68-4.43 0-2.88-2.94-5.23-6.55-5.23Zm-2.15 4.55a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Zm4.4 0a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Z" />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative h-screen w-full flex flex-col pt-32 pb-8 px-6 md:px-16 overflow-hidden">
      
      {/* 主体文字区 (Asymmetric Typography) */}
      <div className="flex-1 flex flex-col justify-center md:mt-[-5%] relative z-10 w-full max-w-7xl mx-auto">
        <div className="relative w-full">
          {/* 大标题第一行 */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] font-extrabold leading-[0.85] tracking-tight text-white drop-shadow-2xl">
              汪宇
            </h1>
          </motion.div>
          
          {/* 大标题第二行 (交错缩进) */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:ml-[15%] relative z-10 mt-2 md:mt-0"
          >
            <h1 className="font-display text-[3.5rem] sm:text-[5rem] md:text-[8rem] lg:text-[10rem] font-bold leading-[0.85] tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-purple-400 drop-shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              /&nbsp;NANN
            </h1>
          </motion.div>
          
          {/* 右侧悬浮描述区块 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 md:absolute md:right-0 md:bottom-[-20%] md:mt-0 max-w-[320px] md:max-w-[400px]"
          >
            <div className="w-12 h-[2px] bg-blue-500 mb-6 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <p className="text-zinc-300 font-serif italic text-base md:text-xl mb-6 leading-relaxed opacity-90 tracking-wide">
              "Seeking business logic in pixels, exploring the future of design in AI."
            </p>
            <p className="text-zinc-400 text-sm md:text-base font-medium tracking-[0.1em] mb-10 leading-loose">
              UI / UX 设计师 • AIGC 探索者
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59,130,246,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border border-white/30 bg-white/5 backdrop-blur-md text-white px-[32px] py-[16px] text-[11px] font-bold uppercase tracking-[0.3em] transition-all"
            >
              Explore Projects
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* 底部信息条 (均匀分布) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="w-full max-w-7xl mx-auto pb-6 border-b border-white/10 relative z-20 mt-12 md:mt-0"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start md:items-end w-full gap-8 md:gap-0">
          <div className="group flex flex-col gap-2">
            <span className="text-[10px] md:text-xs text-zinc-500 font-bold tracking-[0.2em] uppercase">Email</span>
            <a href="mailto:1035705662@qq.com" className="text-sm md:text-base text-zinc-200 font-mono group-hover:text-blue-400 transition-colors flex items-center gap-2">
              <Mail className="w-4 h-4"/> 1035705662@qq.com
            </a>
          </div>
          <div className="group flex flex-col gap-2">
            <span className="text-[10px] md:text-xs text-zinc-500 font-bold tracking-[0.2em] uppercase">Phone</span>
            <span className="text-sm md:text-base text-zinc-200 font-mono group-hover:text-blue-400 transition-colors flex items-center gap-2 cursor-default">
              <Phone className="w-4 h-4"/> +86 156 2379 2098
            </span>
          </div>
          <div className="group flex flex-col gap-2 md:text-right">
            <span className="text-[10px] md:text-xs text-zinc-500 font-bold tracking-[0.2em] uppercase">WeChat</span>
            <span className="text-sm md:text-base text-zinc-200 font-mono group-hover:text-blue-400 transition-colors flex items-center md:justify-end gap-2 cursor-default">
              <WechatIcon className="w-4 h-4"/> Nanncy_nn
            </span>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
