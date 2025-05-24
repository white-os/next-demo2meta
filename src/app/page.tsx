import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        src="/gpt.png"
        alt="file"
        width={100}
        height={100}
      ></Image>
      <div className="mt-10">
        <h1 className="text-2xl font-bold">题目要求如下</h1>
        <p>- 实现上拉加载和下拉刷新。</p>
        <p>- 瀑布流效果，注意俩列布局随内容自适应错开。</p>
        <p>- 数据中的标题和图片视频等素材可自行生成mock。</p>
        <p>- 可借助AI能力快速实现。</p>
        <p>- 注意移动端屏幕大小适配,</p>
        <p>- 除了中间的内容区域之外的顶栏和底栏还有发帖和帖子详情页都无需实现。</p>
        <p>- 内容区域内的视频可播放。</p>
        <p>- 候选人自行部署公网可访问的地址链接，并提供两个以上不同URL参数的数据，内容需要不一致，方便快速验证效果。</p>
        <p>- 无需提供源码。</p>
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-2xl font-bold">请点击如下路由</h1>
        <div className="flex flex-col justify-center items-center mt-5 gap-2">
          <Link className="text-blue-500" href={`/meta/answer`}>页面1</Link>
          <Link className="text-blue-500" href={`/meta/answer`}>页面2</Link>
        </div>
      </div>
    </div>
  )
}
