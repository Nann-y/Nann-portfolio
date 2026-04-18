import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

const projects = [
  {
    id: "01",
    title: "Business Website Design",
    category: "B2B WEB",
    year: "2025-2026",
    desc: "End-to-end design of independent B2B websites, from strategy and wireframes to polished UI delivery.",
    image: "https://i.postimg.cc/HnpFJmh3/B-duan-du-li-zhan.png",
    detailImage: "/assets/details/01-b2b-web.png",
  },
  {
    id: "02",
    title: "AIGC Visual Design",
    category: "AIGC",
    year: "2024-2025",
    desc: "Leveraging AI-generated content to craft compelling visual campaigns and marketing assets.",
    image: "https://i.postimg.cc/vB1JFyND/Group-359442-1.png",
    detailImage: "/assets/details/02-aigc.png",
  },
  {
    id: "03",
    title: "Mobile APP Design",
    category: "APP UI/UX",
    year: "2024-2025",
    desc: "Full-cycle mobile application design — user research, interaction flows and pixel-perfect interfaces.",
    image: "https://i.postimg.cc/GpgW5tqD/feng-mian-1.png",
    detailImage: "/assets/details/03-app.png",
  },
  {
    id: "04",
    title: "3D & Visual Exploration",
    category: "3D RENDER",
    year: "2023-2024",
    desc: "Experimental 3D modeling, rendering and visual explorations pushing creative boundaries.",
    image: "https://i.postimg.cc/QMY2yC0h/feng-mian-1-(1).png",
    detailImage: "/assets/details/04-3d.png",
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="min-h-screen py-32 px-6 md:px-16 relative z-10 overflow-hidden">

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* 非对称标题 */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-400 mb-4">/ 02</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tighter leading-[0.9] mb-6">
              SELECTED<br/>WORKS
            </h2>
            <div className="w-16 h-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-zinc-500 text-xs md:text-sm max-w-[280px] leading-relaxed font-mono md:mt-8 md:text-right"
          >
            悬停以预览项目概览<br/>
            点击以查看完整案例与视觉呈现
          </motion.p>
        </div>

        {/* 列表 + 悬停下拉面板 */}
        <div className="w-full flex flex-col border-t border-white/10 mt-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative w-full border-b border-white/10 hover:border-white/30 transition-colors duration-500 cursor-pointer"
            >
              {/* 标题行 */}
              <div className="group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-14">
                {/* 左侧：编号 + 标题 */}
                <div className="flex items-center gap-6 md:gap-14 mb-4 md:mb-0 transform transition-transform duration-500 group-hover:translate-x-4">
                  <span className="text-zinc-600 font-mono text-sm group-hover:text-blue-500 transition-colors">
                    {project.id}
                  </span>
                  <h3 className="text-3xl md:text-5xl lg:text-[4rem] font-display font-bold text-zinc-300 group-hover:text-white transition-colors duration-500 drop-shadow-md">
                    {project.title}
                  </h3>
                </div>
                
                {/* 右侧：分类 + 年份 + 箭头 */}
                <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-8 md:gap-20">
                  <div className="flex items-center gap-8 md:gap-16 opacity-70 group-hover:opacity-100 transition-opacity">
                    <span className="text-zinc-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] w-24">
                      {project.category}
                    </span>
                    <span className="text-zinc-500 font-mono text-[10px] md:text-xs">
                      {project.year}
                    </span>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-black transition-all duration-500 transform group-hover:rotate-45 group-hover:scale-110">
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
              </div>

              {/* 悬停展开的预览面板 */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 md:pb-14">
                      {/* 预览图容器 */}
                      <div 
                        className="relative w-full md:w-[70%] mx-auto aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 cursor-zoom-in"
                        onClick={() => {
                          if (project.detailImage) setSelectedProject(project);
                        }}
                      >
                        <motion.img
                          initial={{ scale: 1.05, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* 底部信息栏 (叠加在图片底部) */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-6 md:px-10 py-6 md:py-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                          <p className="text-zinc-200 text-xs md:text-sm max-w-md leading-relaxed font-light">
                            «{project.desc}
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (project.detailImage) setSelectedProject(project);
                            }}
                            className="shrink-0 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                          >
                            View Details
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 全屏详情弹窗 (Portal 到 body 层级，避免被其他区块遮挡) */}
      {createPortal(
      <AnimatePresence>
        {selectedProject && selectedProject.detailImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] flex items-center justify-center p-4 md:p-10 bg-[#070b0a]/90 backdrop-blur-xl cursor-zoom-out"
            onClick={() => setSelectedProject(null)}
          >
            {/* 关闭按钮 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(null);
              }}
              className="fixed top-6 right-6 md:top-10 md:right-10 z-[3010] p-3 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full max-h-full overflow-y-auto rounded-3xl bg-zinc-900 shadow-2xl border border-white/10 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full">
                <img 
                  src={selectedProject.detailImage} 
                  alt={selectedProject.title}
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      , document.body)}
    </section>
  );
}
