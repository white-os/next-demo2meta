'use client'

import { useRef, useMemo, useState, useEffect } from 'react';
import Image from 'next/image';

interface IProps {
  list: Array<{
    src: string;
    id: string;
    title: string;
    content: string;
    width: number;
    height: number;
  }>;
}

interface ICardPos {
  width: number;
  height: number;
  x: number;
  y: number;
}

// 假设宽度200 gap 20 共有两列

export default function Waterfall({ list }: IProps) {
    const cardWidth = 200;
    const gap = 60;
    const columnCount = 3;
    const pageNumber = 10;
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [endIndex, setEndIndex] = useState(pageNumber);
    const hasMore = endIndex < list.length;
    const [isLoading, setIsLoading] = useState(false);

    const cardPos = useMemo(() => {
      const newCardPos: Record<string, ICardPos> = {};
      const columnHeight = Array.from({length: columnCount}, () => ({index: 0, height: 0}));
      list.slice(0, endIndex).forEach((item, index) => {
        const cardHeight =  item.height / item.width * cardWidth;
        if (index < columnCount) {
          newCardPos[item.id] = {
            x: index ? index * (cardWidth + gap) : 0,
            y: 0,
            width: cardWidth,
            height: cardHeight
          }
          columnHeight[index].height += cardHeight + gap;
        } else {
          const minColumnIndex = columnHeight.findIndex(column => column.height === Math.min(...columnHeight.map(column => column.height)));
          newCardPos[item.id] = {
            x: minColumnIndex ? minColumnIndex * (cardWidth + gap) : 0,
            y: columnHeight[minColumnIndex].height,
            width: cardWidth,
            height: cardHeight
          }
          columnHeight[minColumnIndex].height += cardHeight + gap;
        }
      })
      return newCardPos;
    }, [list, endIndex]);


    const curList = useMemo(() => {
      return list.slice(0, endIndex);
    }, [list, endIndex]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) {
        return;
      }
      const scrollHandler = () => {
        if (isLoading || !hasMore) return;
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        if (scrollHeight - scrollTop - clientHeight < 100) {
          setIsLoading(true);
          setTimeout(() => {
            setEndIndex((i) => i + pageNumber);
            setIsLoading(false);
          }, 500);
        }
      };
      
      container?.addEventListener('scroll', scrollHandler);
      return () => {
        container?.removeEventListener('scroll', scrollHandler);
      }
    }, [isLoading, hasMore]);

    return (
        <div ref={containerRef} className='w-full min-h-screen overflow-y-auto overflow-x-hidden'>
          <div ref={listRef} className='w-6/12 h-full mx-auto relative'>
            {
              curList.map(item => {
                const pos = cardPos?.[item.id] || { x: 0, y: 0 };
                return (
                  <div 
                    key={item.id} 
                    className="absolute left-0 top-0 flex flex-col items-center justify-center"
                    style={{transform: `translate(${pos.x}px, ${pos.y}px)`}}
                  >
                    <Image 
                      src={item.src} 
                      alt={item.title} 
                      width={pos.width} 
                      height={pos.height} 
                    />
                    <div className="text-center">{item.title}</div>
                  </div>
                )
              })
            }
            {isLoading && (
              <div className="absolute left-1/2 -translate-x-1/2" style={{top: Math.max(...Object.values(cardPos).map(pos => pos.y + pos.height)) + 20}}>
                正在加载更多...
              </div>
            )}
            {!hasMore && (
              <div className="absolute left-1/2 -translate-x-1/2" style={{top: Math.max(...Object.values(cardPos).map(pos => pos.y + pos.height)) + 20}}>
                没有更多数据了
              </div>
            )}
          </div>
        </div>
    )
}
