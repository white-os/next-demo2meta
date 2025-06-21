'use client'

import '../styles/diagonal-grid.css'

export default function DiagonalGrid() {
  return (
    <div className="grid-container">
      {/* 创建9个网格单元格 */}
      {Array(9).fill(null).map((_, index) => (
        <div key={index} className="grid-cell" />
      ))}
      
      {/* 对角线 */}
      <div className="diagonal-line" />
      
      {/* 三个圆圈 */}
      <div className="circle" />
      <div className="circle" />
      <div className="circle" />
    </div>
  )
} 