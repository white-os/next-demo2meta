'use client';

import { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';

// 定义数据类型
interface Item {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
}

// 模拟数据生成函数
const generateMockData = (start: number, count: number): Item[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: start + index,
    title: `标题 ${start + index}`,
    content: `这是第 ${start + index} 条内容，包含一些随机文本描述。`,
    imageUrl: `https://picsum.photos/400/300?random=${start + index}`,
  }));
};

export default function Answer() {
  const [items, setItems] = useState<Item[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const itemsPerPage = 10;

  // 初始加载数据
  useEffect(() => {
    setItems(generateMockData(0, itemsPerPage));
  }, []);

  // 处理下拉刷新
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      setItems(generateMockData(0, itemsPerPage));
      setHasMore(true);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // 处理上拉加载更多
  const loadMoreData = useCallback(() => {
    if (items.length >= 50) { // 限制最多加载50条数据
      setHasMore(false);
      return;
    }
    
    setTimeout(() => {
      const newItems = generateMockData(items.length, itemsPerPage);
      setItems(prevItems => [...prevItems, ...newItems]);
    }, 1000); // 模拟网络延迟
  }, [items.length]);

  // 处理触摸事件
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;
    const threshold = 100; // 下拉刷新的阈值

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndY = e.touches[0].clientY;
      const scrollTop = window.scrollY;
      
      // 当页面在顶部且下拉距离超过阈值时触发刷新
      if (scrollTop === 0 && touchEndY - touchStartY > threshold && !isRefreshing) {
        handleRefresh();
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleRefresh, isRefreshing]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">瀑布流列表</h1>
      
      {isRefreshing && (
        <div className="text-center py-4 bg-blue-50">
          正在刷新...
        </div>
      )}

      <InfiniteScroll
        dataLength={items.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2">加载中...</p>
          </div>
        }
        endMessage={
          <div className="text-center py-4 text-gray-500">
            没有更多数据了
          </div>
        }
        scrollThreshold="90%"
      >
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
