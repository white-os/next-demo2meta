import DiagonalGrid from './DiagonalGrid';

export default function DiagonalPage() {

  const flat = (obj) => {
    const result = {};
    
    const dfs = (current, path = []) => {
      for(const key in current) {
        const value = current[key];
        const newPath = [...path, key];

        if (typeof value === 'object' && value !== null) {
          dfs(value, newPath);
        } else {
          result[newPath.join('.')] = value;
        }
      }
    }

    dfs(obj);
    return result;
  }




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <DiagonalGrid />
    </div>
  )
}