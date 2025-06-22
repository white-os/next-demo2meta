'use client'

import { useCallback, useState } from 'react';

// 列表操作，在项目中，除了对react状态的更改，还有一份对内存中低代码平台组件状态的更改
// 需要修改redux里里的状态，并更新到组件中，再重新渲染。
export function useList(initialList) {
  const [list, setList] = useState(initialList);
  
  const addItem = useCallback((item) => {
    setList(pre => [...pre, item]);
  }, [])

  const removeItem = useCallback((index) => {
    setList(pre => pre.filter(((_, i) => index !== i)))
  }, [])

  return {list, addItem, removeItem};
}

// 分页操作
export function usePagination(initialPage, initialPageSize) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  
  const setPage1 = useCallback((page) => {
    setPage(page);
  }, [])

  const setPageSize1 = useCallback((pageSize) => {
    setPageSize(pageSize);
  }, [])
  
  return {page, pageSize, setPage1, setPageSize1};
}


export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeId);
  }, [value, delay]);

  return debouncedValue;
}