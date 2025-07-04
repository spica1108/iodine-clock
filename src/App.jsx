import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const stages = [
  "reactants",  // IO3- + H2O2 → I- + O2 (冒泡)
  "iodine-yellow", // I2 变黄
  "starch-blue",  // 淀粉变蓝
  "back-to-clear" // I2 + H2O2 → I-，颜色恢复透明
];

export default function App() {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % stages.length);
    }, 6000); // 每6秒切换阶段
    return () => clearInterval(interval);
  }, []);

  const stage = stages[stageIndex];

  return (
    <div className={`app ${stage}`}>
      <h1>碘钟反应动态演示</h1>

      <div className="reaction-zone">
        <AnimatePresence mode="wait">
          {stage === "reactants" && (
            <>
              <motion.div
                key="io3"
                className="particle io3"
                initial={{ x: -150, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4, ease: "easeOut" }}
              >
                IO₃⁻
              </motion.div>
              <motion.div
                key="h2o2"
                className="particle h2o2"
                initial={{ x: 150, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4, ease: "easeOut" }}
              >
                H₂O₂
              </motion.div>
              <motion.div
                key="bubble"
                className="bubble"
                initial={{ y: 20, opacity: 1 }}
                animate={{ y: -80, opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
              >
                O₂↑
              </motion.div>
            </>
          )}

          {stage === "iodine-yellow" && (
            <motion.div
              key="i2"
              className="particle i2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              I₂
            </motion.div>
          )}

          {stage === "starch-blue" && (
            <motion.div
              key="starch"
              className="starch-blue"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 2 }}
            >
              淀粉 + I₂ = 蓝色
            </motion.div>
          )}

          {stage === "back-to-clear" && (
            <motion.div
              key="clear"
              className="clear-state"
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
        {stage === "iodine-yellow" && "I⁻ + IO₃⁻ → I₂ (黄色溶液)"}
        {stage === "starch-blue" && "I₂ + 淀粉 → 蓝色复合物"}
        {stage === "back-to-clear" && "I₂ + H₂O₂ → I⁻，颜色还原"}
      </div>
    </div>
  );
}
