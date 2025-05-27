'use client';
// 实现虚拟列表，js手写，虚拟列表本质就是用有限的dom，渲染无限的数据。

import { useEffect, useState, useMemo, useRef } from "react";

interface VirtualListProps {
    list: string[];
}

export default function VirtualList(props: VirtualListProps) {
    const { list } = props;
    const maxCount = 11; // 最大容纳量，Math.ceil(当前视图高度/每条数据高度)+1

    const [startIndex, setStartIndex] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const endIndex = useMemo(() => {
      return startIndex + maxCount > list.length ? list.length : startIndex + maxCount;
    }, [startIndex, list.length]);

    const renderList = useMemo(() => {
        return list.slice(startIndex, endIndex);
    }, [startIndex, endIndex, list]);

    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // 添加滚动事件修改startIndex和endIndex
    useEffect(() => {
      const container = containerRef.current;
      if (container) {
        container.addEventListener('scroll', () => {
          const scrollTop = container.scrollTop;
          setStartIndex(Math.floor(scrollTop / 40));
          setScrollTop(scrollTop);
        });
      }
    }, []);

    useEffect(() => {
      // 高度 = list.length * itemHeight - startIndex * itemHeight
      const height = (list.length - startIndex) * 40; 
      if (listRef.current) {
        listRef.current.style.height = `${height}px`;
        listRef.current.style.transform = `translateY(${startIndex * 40}px)`;
      }
    }, [listRef, startIndex, list.length]);


    return (
        <div className="w-96 h-96 my-10 mx-auto border border-red-500">
            <div className="w-full h-full overflow-y-auto" ref={containerRef}>
                <div className="w-full" ref={listRef}>
                    {
                        renderList.map(item => {
                            return (
                                <div key={item} className="w-full h-10 border">{item} ++ {scrollTop}</div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}
