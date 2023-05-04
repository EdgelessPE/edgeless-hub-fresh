// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import BTween from "b-tween";

// 非通用的回到顶部能力，仅在分类和搜索页面可用
function scrollTop() {
  const domItem = document
    .getElementsByClassName("category__container")
    .item(0);
  if (domItem) {
    // const interval=setInterval(()=>{
    //   const curDist=domItem.scrollTop
    //   const speed=curDist/12
    //   domItem.scrollTop-=speed
    //   if(curDist<1){
    //     clearInterval(interval)
    //   }
    // },10)

    const tween = new BTween({
      from: { scrollTop: domItem.scrollTop },
      to: { scrollTop: 0 },
      easing: "quartOut",
      duration: 400,
      onUpdate: (keys: { scrollTop: number }) => {
        domItem.scrollTop = keys.scrollTop;
      },
    });
    tween.start();
  }
}

export { scrollTop };
