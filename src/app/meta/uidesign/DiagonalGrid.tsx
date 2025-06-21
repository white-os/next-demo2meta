'use client'

import './style.css'

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
      <div className="circle circle-1" style={{top: '15%', left: '15%', transform: 'translate(-50%, -50%)'}} />
      <div className="circle circle-2" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} />
      <div className="circle circle-3" style={{bottom: '15%', right: '15%', transform: 'translate(50%, 50%)'}} />
    </div>
  )
}