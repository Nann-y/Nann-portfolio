import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

/* NANN 单个字母组件 —— 交错入场 + 悬停波浪 */
function NannLetter({ char, index }: { char: string; index: number }) {
  return (
    <motion.span
      initial={{ y: 30, opacity: 0, rotateX: -90 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="nann-letter inline-block"
      style={{ perspective: "600px" }}
    >
      {char}
    </motion.span>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Me", href: "#about" },
    { name: "Project Show", href: "#projects" },
    { name: "Other Creations", href: "#more-works" },
    { name: "Contact", href: "#contact" },
  ];

  const letters = ["N", "A", "N", "N"];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 md:px-16 md:py-10 mix-blend-difference"
      >
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Logo / Name - 重新设计 */}
          <a href="#" className="nann-logo group flex items-center gap-6 cursor-pointer no-underline relative">
            {/* 旋转光圈装饰 */}
            <div className="nann-glow-ring" />

            {/* 字母主体 */}
            <div className="relative flex items-center">
              {/* 背景光晕 */}
              <div className="nann-bg-glow" />

              <div className="nann-letters relative z-10 flex items-baseline gap-[2px]">
                {letters.map((char, i) => (
                  <NannLetter key={i} char={char} index={i} />
                ))}
              </div>

              {/* 底部光效线条 */}
              <div className="nann-underline" />
            </div>

            {/* Portfolio 标签 */}
            <div className="flex flex-col gap-1">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-[10px] md:text-[11px] font-bold text-white/60 tracking-[0.4em] uppercase transition-all duration-500 group-hover:text-white group-hover:tracking-[0.55em]"
              >
                Portfolio
              </motion.span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="h-[1px] bg-gradient-to-r from-blue-500/80 via-cyan-400/50 to-transparent origin-left"
              />
            </div>
          </a>

          {/* Desktop Nav - 精致胶囊 */}
          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold text-white tracking-[0.2em] uppercase rounded-full border border-white/30 px-8 py-3 backdrop-blur-md bg-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:border-white/50 transition-all duration-500">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="relative group/link py-1 text-white hover:text-white transition-colors duration-300">
                <span className="relative z-10">{link.name}</span>
                <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-blue-500 -translate-x-1/2 transition-all duration-300 group-hover/link:w-full shadow-[0_0_8px_#3b82f6]" />
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center md:hidden overflow-hidden"
            style={{
              background: "linear-gradient(160deg, rgba(7,11,10,0.96) 0%, rgba(10,15,30,0.98) 50%, rgba(7,11,10,0.96) 100%)",
              backdropFilter: "blur(40px) saturate(1.2)",
              WebkitBackdropFilter: "blur(40px) saturate(1.2)",
            }}
          >
            {/* 装饰光效 */}
            <div className="absolute top-[-10%] right-[-20%] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-15%] w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[80px] pointer-events-none" />

            {/* 顶部小标签 */}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[10px] font-bold tracking-[0.4em] uppercase text-blue-400/60 mb-12"
            >
              Navigation
            </motion.span>

            {/* 导航链接 */}
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative text-3xl font-display font-bold text-white/80 transition-all duration-300 hover:text-white group"
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* 悬停光效下划线 */}
                  <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 transition-all duration-400 group-hover:w-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                </motion.a>
              ))}
            </nav>

            {/* 底部装饰线 */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-20 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
