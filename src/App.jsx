import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const stages = ["reactants", "iodine-yellow", "starch-blue", "back-to-clear"];

export default function App() {
  const [stageIndex, setStageIndex] = useState(0);
  const stage = stages[stageIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % stages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`app ${stage}`}>
      <h1 className="title">碘钟反应动态演示</h1>

      <div className="reaction-zone">
        {/* 冒泡效果 */}
        {stage === "reactants" && (
          <motion.div
            className="bubble"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: -100, opacity: 1 }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
              repeatDelay: 1,
            }}
          >
            O₂↑
          </motion.div>
        )}

        {/* 液体效果 */}
        <div className={`liquid ${stage}`} />

        {/* 烟雾效果 */}
        {stage === "starch-blue" && <div className="fog" />}

        <AnimatePresence mode="wait">
          {stage === "iodine-yellow" && (
            <motion.div
              key="i2"
              className="particle"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 2 }}
            >
              I₂
            </motion.div>
          )}

          {stage === "starch-blue" && (
            <motion.div
              key="blue"
              className="particle blue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              蓝色复合物
            </motion.div>
          )}

          {stage === "back-to-clear" && (
            <motion.div
              key="clear"
              className="particle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              无色透明
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="equation">
        {stage === "reactants" && "IO₃⁻ + H₂O₂ → I⁻ + O₂↑"}
        {stage === "iodine-yellow" && "I⁻ + IO₃⁻ → I₂（黄色）"}
        {stage === "starch-blue" && "I₂ + 淀粉 → 蓝色复合物"}
        {stage === "back-to-clear" && "I₂ + H₂O₂ → I⁻，恢复无色"}
      </div>
    </div>
  );
}
