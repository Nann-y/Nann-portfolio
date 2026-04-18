import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type WorkItem = {
  id: string;
  type: "video" | "poster" | "3d" | "ai";
  height: string;
  video?: string;
  image?: string;
};

const localVideos = import.meta.glob("/public/assets/others/videos/*.{mp4,webm,mov,m4v}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const localImages = import.meta.glob("/public/assets/others/images/*.{jpg,jpeg,png,gif,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const videoWorks: WorkItem[] = Object.entries(localVideos)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => ({
    id: `video-${index + 1}`,
    type: "video",
    height: "h-auto",
    video: src,
    image: path,
  }));

const imageWorks: WorkItem[] = Object.entries(localImages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => ({
    id: `image-${index + 1}`,
    type: "ai", // 默认设为 ai 类型，可以根据需要手动在代码里改
    height: "h-auto",
    image: src,
  }));

const works: WorkItem[] = [...videoWorks, ...imageWorks];

export function MoreWorks() {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  return (
    <section id="more-works" className="min-h-screen py-32 px-6 md:px-16 relative z-10">
      <div className="max-w-7xl mx-auto w-full">

        {/* 非对称标题区域 */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-400 mb-4">/ 03</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tighter leading-[0.9] mb-6">
              OTHER<br/>CREATIONS
            </h2>
            <div className="w-16 h-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-zinc-500 text-xs md:text-sm max-w-[280px] leading-relaxed font-mono md:mt-8 md:text-right"
          >
            AI视觉作品合集
          </motion.p>
        </div>

        {/* 瀑布流网格 */}
        <div className="masonry-grid">
          {works.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedWork(work)}
              className="masonry-item relative group rounded-2xl md:rounded-[2rem] overflow-hidden bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-500 cursor-zoom-in"
            >
              <div className="relative aspect-auto">
                {work.type === "video" ? (
                  <video 
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  >
                    <source src={work.video} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={work.image} 
                    alt={`Work ${work.id}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                )}
                
                {/* 渐变层与标签 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">
                    {work.type === "ai" ? "AI EXPERIMENT" : work.type === "3d" ? "3D EXPLORATION" : "ARTWORK"}
                  </span>
                  <h4 className="text-white font-bold text-sm tracking-tight">
                    {work.id.replace("-", " #").toUpperCase()}
                  </h4>
                </div>

                {/* 常驻标签 (可选，参考图中有些标签是常驻的) */}
                <div className="absolute top-4 left-4">
                   <div className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <span className="text-[8px] font-bold text-white uppercase tracking-tighter">{work.type}</span>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* 放大预览模态框 (Lightbox) */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedWork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWork(null)}
              className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10 cursor-zoom-out"
            >
              {/* 关闭按钮 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWork(null);
                }}
                className="fixed top-6 right-6 md:top-10 md:right-10 z-[3010] p-3 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
              >
                <X size={24} />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-full max-h-full flex items-center justify-center overflow-hidden rounded-2xl md:rounded-[2.5rem] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedWork.type === "video" ? (
                  <video 
                    autoPlay
                    controls
                    loop
                    className="max-w-full max-h-[85vh] md:max-h-[90vh] rounded-2xl"
                  >
                    <source src={selectedWork.video} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={selectedWork.image} 
                    alt="Expanded view" 
                    className="max-w-full max-h-[85vh] md:max-h-[90vh] object-contain rounded-2xl"
                  />
                )}
                
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
