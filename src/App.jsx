// src/App.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const reactionStages = [
  {
    name: "reactants",
    title: "反应物混合阶段",
    equation: "IO₃⁻ + H₂O₂ → I⁻ + O₂↑",
    duration: 4,
    bgColor: "#f8f9fa"
  },
  {
    name: "iodine-yellow",
    title: "碘生成阶段",
    equation: "I⁻ + IO₃⁻ → I₂ (黄色溶液)",
    duration: 3,
    bgColor: "#fff8e1"
  },
  {
    name: "starch-blue",
    title: "淀粉显色阶段",
    equation: "I₂ + 淀粉 → 蓝色复合物",
    duration: 3,
    bgColor: "#e3f2fd"
  },
  {
    name: "back-to-clear",
    title: "褪色阶段",
    equation: "I₂ + H₂O₂ → I⁻，颜色还原",
    duration: 2,
    bgColor: "#fefefe"
  }
];

export default function App() {
  const [stageIndex, setStageIndex] = useState(0);
  const [bubbles, setBubbles] = useState([]);
  const currentStage = reactionStages[stageIndex];

  // 气泡生成器
  useEffect(() => {
    let bubbleInterval;

    if (currentStage.name === "reactants") {
      bubbleInterval = setInterval(() => {
        setBubbles(prev => [...prev, { id: Date.now() }]);
      }, 800);
    }

    return () => clearInterval(bubbleInterval);
  }, [currentStage.name]);

  // 阶段自动切换
  useEffect(() => {
    const stageTimer = setTimeout(() => {
      setStageIndex((prev) => (prev + 1) % reactionStages.length);
      setBubbles([]);
    }, currentStage.duration * 1000);

    return () => clearTimeout(stageTimer);
  }, [currentStage]);

  return (
    <div
      className="app"
      style={{ backgroundColor: currentStage.bgColor }}
    >
      <h1>碘钟反应动态演示</h1>
      <h3>{currentStage.title}</h3>

      <div className="reaction-container">
        <AnimatePresence mode="wait">
          {/* 反应物阶段 */}
          {currentStage.name === "reactants" && (
            <>
              <motion.div
                key="io3-ion"
                className="chemical-particle io3"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                IO₃⁻
              </motion.div>

              <motion.div
                key="h2o2-molecule"
                className="chemical-particle h2o2"
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                H₂O₂
              </motion.div>

              {bubbles.map((bubble) => (
                <motion.div
                  key={`bubble-${bubble.id}`}
                  className="bubble"
                  initial={{ y: 0, opacity: 1, scale: 0.8 }}
                  animate={{ y: -250, opacity: 0, scale: 1.2 }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                >
                  O₂↑
                </motion.div>
              ))}
            </>
          )}

          {/* 碘黄阶段 */}
          {currentStage.name === "iodine-yellow" && (
            <motion.div
              key="iodine-molecule"
              className="chemical-particle i2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              I₂
            </motion.div>
          )}

          {/* 淀粉蓝阶段 */}
          {currentStage.name === "starch-blue" && (
            <motion.div
              key="starch-complex"
              className="starch-complex"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              蓝色复合物
            </motion.div>
          )}

          {/* 褪色阶段 */}
          {currentStage.name === "back-to-clear" && (
            <motion.div
              key="clear-solution"
              className="clear-solution"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              溶液恢复无色
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        key={`equation-${currentStage.name}`}
        className="chemical-equation"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentStage.equation}
      </motion.div>
    </div>
  );
}