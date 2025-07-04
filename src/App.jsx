import React, { useEffect, useState } from "react";
import "./App.css";

const stages = [
  {
    key: "reactants",
    color: "#b2ebf2",
    equation: "IO₃⁻ + H₂O₂ → I⁻ + O₂↑",
  },
  {
    key: "iodine-yellow",
    color: "#fff176",
    equation: "I⁻ + IO₃⁻ → I₂（黄色）",
  },
  {
    key: "starch-blue",
    color: "#42a5f5",
    equation: "I₂ + 淀粉 → 蓝色复合物",
  },
  {
    key: "back-to-clear",
    color: "#f5f5f5",
    equation: "I₂ + H₂O₂ → I⁻，恢复无色",
  },
];

export default function App() {
  const [stageIndex, setStageIndex] = useState(0);
  const stage = stages[stageIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setStageIndex((i) => (i + 1) % stages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app">
      <div className="background" />

      <div className="beaker-container">
        <svg
          viewBox="0 0 200 280"
          xmlns="http://www.w3.org/2000/svg"
          className="beaker-svg"
        >
          {/* 烧杯轮廓 */}
          <path
            className="beaker-glass"
            d="M50 10 L50 240 Q50 260 70 260 L130 260 Q150 260 150 240 L150 10 Z"
            fill="none"
            stroke="#555"
            strokeWidth="4"
          />
          {/* 倒水口 */}
          <path
            className="beaker-spout"
            d="M50 10 Q40 15 50 20"
            fill="none"
            stroke="#555"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* 内部颜色层 */}
          <rect
            x="54"
            y="15"
            width="92"
            height="220"
            rx="10"
            ry="10"
            fill={stage.color}
            opacity="0.6"
          />
          {/* 冒泡 */}
          <circle
            className="bubble"
            cx="100"
            cy="240"
            r="8"
            fill="#a3e0ff"
            opacity="0.8"
          />
          <circle
            className="bubble bubble-delay"
            cx="120"
            cy="250"
            r="6"
            fill="#81d4fa"
            opacity="0.8"
          />
        </svg>
        {/* 蓝色烟雾 */}
        {stage.key === "starch-blue" && <div className="fog" />}
      </div>

      <div className="equation">{stage.equation}</div>
    </div>
  );
}
