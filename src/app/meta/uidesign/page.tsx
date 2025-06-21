'use client'
import { useCallback } from 'react';
import UIList from './LRU'

interface ListItem {
  id: number;
  name: string;
  description: string;
}

export default function VirtualWaterfall() {

  const list = [
    {
      id: 1,
      name: 'UIList',
      description: 'UIList',
    },
  ];

  const handleItemClick = useCallback((item: ListItem) => {
    console.log(item);
  }, []);

  return (
    <div>
      <h1>纳拓科技面试ui设计题目</h1>
      <UIList list={list} onItemClick={handleItemClick}/>
    </div>
  )
}
