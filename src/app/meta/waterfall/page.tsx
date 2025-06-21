import Waterfall from './waterfall';


export default function WaterfallPage() {

  const list = Array.from({ length: 100 }, (_, index) => {
    const height = Math.floor(Math.random() * 100) + 200;
    return {
      id: index.toString(),
      src: `https://picsum.photos/200/${height}?random=${index}`,
      title: `图片${index}`,
      width: 200,
      height: height,
      content: `内容${index}`,
    }
  });

  return (
    <div>
      <Waterfall list={list} />
    </div>
  )
}
