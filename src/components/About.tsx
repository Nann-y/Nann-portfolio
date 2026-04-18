import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";

export function About() {
  const [layoutState, setLayoutState] = useState<"stacked" | "spread" | "expanded">("stacked");
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  // 移动端：点击卡片展开详情
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (layoutState === "expanded" && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setLayoutState("spread");
        setExpandedCardId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [layoutState]);

  const cards = [
    {
      id: "profile",
      type: "profile",
      title: "汪宇",
      subtitle: "Nann",
      role: "UI / AIGC Designer",
      badge: "EMPLOYED",
      mainImage: "/profile.jpg",
      description: ["武汉理工大学产品设计专业。深度掌握 AI 视频、图片等多模态大模型，能独立完成品牌 IP 视频化构建与高质量视觉素材生成。具备构建大型组件库能力与响应式架构设计经验，擅长将三维视觉美学与 AI 技术应用于互联网运营全链路。"]
    },
    {
      id: "zero",
      type: "company",
      title: "珠海零度",
      subtitle: "ZERO",
      role: "UI Designer",
      badge: "2024.11 - NOW",
      mainImage: "/zero-logo.png",
      description: [
        "• 核心工作品牌独立站构建与全球化（US）部署：负责品牌从 0 到 1 的官方独立站建设及美国本土化站点重构。",
        "• 多渠道品牌 IP 构建与 AI 视觉营销：利用 Veo、Seedance 等前沿技术完成 IP 动态化建设。",
        "• 设计工程化与 AI 提效实践：作为团队内部 AI 工具推动者，主导落地工作流数字化转型。"
      ]
    },
    {
      id: "baidu",
      type: "company",
      title: "百度",
      subtitle: "Baidu",
      role: "Visual Designer",
      internship: "实习",
      badge: "2024.09 - 2024.11",
      mainImage: "https://www.baidu.com/img/flexible/logo/pc/result.png",
      description: [
        "• 针对内部产品的视觉效果，联合产品开展走查，同步完成视觉问题的复盘/汇总工作。",
        "• 推动效果还原，提升 AI 原生产品的视觉体验。",
        "• 参与组件化设计、Icon 设计及部分界面的视觉验收。"
      ]
    },
    {
      id: "icourt",
      type: "company",
      title: "新橙科技",
      subtitle: "iCourt",
      role: "Visual Designer",
      internship: "实习",
      badge: "2024.06 - 2024.09",
      mainImage: "/icourt-logo.png",
      description: [
        "• 负责 iCourt 线上产品及 AlphaGPT 后台界面设计工作。",
        "• 参与制订产品界面风格及标准、编写、更新设计规范。",
        "• 负责公司签约律师线上直播课程的宣发运营设计和线下活动的物料设计。"
      ]
    }
  ];

  const CARD_WIDTH = 280;
  const CARD_HEIGHT = 380;
  const EXPANDED_HEIGHT = 500;
  const GAP = 24;

  const handleMouseEnter = () => {
    if (layoutState === "stacked") setLayoutState("spread");
  };
  const handleMouseLeave = () => {
    if (layoutState === "spread") setLayoutState("stacked");
  };
  const handleCardClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (layoutState === "stacked" || layoutState === "spread") {
      setLayoutState("expanded");
      setExpandedCardId(id);
    } else if (layoutState === "expanded") {
      if (expandedCardId === id) {
        setLayoutState("spread");
        setExpandedCardId(null);
      } else {
        setExpandedCardId(id);
      }
    }
  };

  const accentColors = ['bg-[#00ff88]', 'bg-[#3b82f6]', 'bg-[#eab308]', 'bg-[#ef4444]'];

  /* ============ 移动端卡片 ============ */
  const renderMobileCard = (card: typeof cards[0], index: number) => {
    const isProfile = card.type === "profile";
    const isExpanded = mobileExpandedId === card.id;
    const accent = accentColors[index % accentColors.length];

    return (
      <motion.div
        key={card.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        onClick={() => setMobileExpandedId(isExpanded ? null : card.id)}
        className="w-[280px] mx-auto rounded-[1.5rem] overflow-hidden bg-[#111111]/80 backdrop-blur-[20px] border border-white/10 cursor-pointer flex flex-col p-2"
      >
        <div className="flex flex-col w-full h-full relative">
          {/* 图片区 */}
          <div className={`relative w-full h-[240px] rounded-[1.5rem] overflow-hidden shrink-0 flex items-center justify-center ${isProfile ? '' : 'bg-white'}`}>
            {isProfile ? (
              <img src={card.mainImage} alt={card.title} className="w-full h-full object-cover" />
            ) : (
              <img src={card.mainImage} alt={card.title} className="max-w-[120px] max-h-[80px] object-contain" />
            )}
          </div>

          {/* 信息区 */}
          <div className="flex flex-col flex-1 px-4 pt-5 pb-4 justify-start">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-white font-bold text-xl leading-none">{card.title}</h4>
              <span className="text-[9px] text-zinc-500 tracking-widest uppercase">Period</span>
            </div>
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-zinc-400">{card.role}</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#8b5cf6] flex items-center justify-center text-[8px] text-white font-bold">✓</span>
                </div>
                {(card as any).internship && (
                  <span className="text-[10px] font-medium text-zinc-500 mt-0.5">({(card as any).internship})</span>
                )}
              </div>
              <span className="text-xs font-mono text-zinc-400 font-medium pt-0.5">{card.badge}</span>
            </div>

            {/* 展开详情 */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden flex flex-col"
                >
                  <div className="h-[1px] w-full bg-white/10 mb-4 shrink-0" />
                  <div className="flex flex-col gap-2">
                    {card.description.map((p, i) => (
                      <p key={i} className="text-xs text-zinc-400 leading-relaxed font-medium">{p}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 底部彩条 */}
          <div className="px-4 pb-2 w-full mt-auto">
            <div className={`h-[2px] w-full rounded-full ${accent} opacity-80`} />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center pt-10 pb-32 px-6 md:px-16 relative z-10 max-w-[1400px] mx-auto"
      onClick={() => {
        if (layoutState === "expanded") {
          setLayoutState("spread");
          setExpandedCardId(null);
        }
      }}
    >
      {/* ====== 移动端：纵向卡片列表 ====== */}
      <div className="md:hidden w-full flex flex-col gap-5">
        {cards.map((card, index) => renderMobileCard(card, index))}
      </div>

      {/* ====== 桌面端：原有交互卡片 ====== */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full min-h-[550px] hidden md:flex justify-center items-start pt-10 overflow-x-hidden overflow-y-visible"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center"
          style={{
            width: layoutState !== "stacked" ? `${cards.length * (CARD_WIDTH + GAP)}px` : `${CARD_WIDTH}px`,
            height: EXPANDED_HEIGHT + 20
          }}
        >
          {cards.map((card, index) => {
            const isProfile = card.type === "profile";
            const isExpanded = layoutState === "expanded" && expandedCardId === card.id;
            const isDimmed = layoutState === "expanded" && !isExpanded;

            const stackedX = index * 8;
            const stackedY = index * 8;
            const stackedRotate = isProfile ? 0 : index % 2 === 0 ? index * 2 : -index * 2;
            const stackedZ = 10 - index;

            const spreadX = index * (CARD_WIDTH + GAP);
            const spreadY = 0;

            const currentX = layoutState === "stacked" ? stackedX : spreadX;
            const currentY = layoutState === "stacked" ? stackedY : spreadY;
            const currentRotate = layoutState === "stacked" ? stackedRotate : 0;
            const currentHeight = isExpanded ? EXPANDED_HEIGHT : CARD_HEIGHT;

            const accentColor = accentColors[index % accentColors.length];

            return (
              <motion.div
                key={card.id}
                layout
                initial={false}
                animate={{
                  x: currentX,
                  y: currentY,
                  rotate: currentRotate,
                  zIndex: isExpanded ? 50 : stackedZ,
                  height: currentHeight,
                  filter: isDimmed ? "blur(4px) brightness(0.4)" : "blur(0px) brightness(1)",
                  scale: layoutState === "stacked" && index > 0 ? 1 - index * 0.05 : 1
                }}
                transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                onClick={(e) => handleCardClick(e, card.id)}
                className="absolute top-4 left-4 md:left-10 rounded-[2rem] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.37)] bg-[#111111]/80 backdrop-blur-[20px] border border-white/10 cursor-pointer flex flex-col p-2"
                style={{ width: CARD_WIDTH, transformOrigin: "bottom left" }}
              >
                <div className="flex flex-col w-full h-full relative">
                  <div className={`relative w-full h-[240px] rounded-[1.5rem] overflow-hidden shrink-0 flex items-center justify-center ${isProfile ? '' : 'bg-white'}`}>
                    {isProfile ? (
                      <img src={card.mainImage} alt={card.title} className="w-full h-full object-cover" />
                    ) : (
                      <img src={card.mainImage} alt={card.title} className="max-w-[120px] max-h-[80px] object-contain" />
                    )}
                  </div>

                  <div className="flex flex-col flex-1 px-4 pt-5 pb-4 justify-start">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-bold text-xl leading-none">{card.title}</h4>
                      <span className="text-[9px] text-zinc-500 tracking-widest uppercase">Period</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-medium text-zinc-400">{card.role}</span>
                          <span className="w-3.5 h-3.5 rounded-full bg-[#8b5cf6] flex items-center justify-center text-[8px] text-white font-bold">✓</span>
                        </div>
                        {(card as any).internship && (
                          <span className="text-[10px] font-medium text-zinc-500 mt-0.5">({(card as any).internship})</span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-zinc-400 font-medium pt-0.5">{card.badge}</span>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden flex flex-col"
                        >
                          <div className="h-[1px] w-full bg-white/10 mb-4 shrink-0" />
                          <div className="flex flex-col gap-2 overflow-y-auto max-h-[140px] pr-2 custom-scrollbar">
                            {card.description.map((paragraph, i) => (
                              <p key={i} className="text-xs text-zinc-400 leading-relaxed font-medium">{paragraph}</p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="px-4 pb-2 w-full mt-auto">
                    <div className={`h-[2px] w-full rounded-full ${accentColor} opacity-80`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
