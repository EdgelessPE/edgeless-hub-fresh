function getGreeting(userName: string) {
  const hour = new Date().getHours();
  let text;
  if (0 <= hour && hour < 6) {
    text = `🛏️夜深了，${userName}记得早睡早起哦`;
  } else if (6 <= hour && hour < 11) {
    text = `🌞${userName}早上好，今天也是活力满满的一天！`;
  } else if (11 <= hour && hour < 14) {
    text = `⏰中午啦${userName}，稍事休息一下吧`;
  } else if (14 <= hour && hour < 18) {
    text = `☕嘿${userName}，又到了愉快的下午茶时光~`;
  } else if (18 <= hour && hour < 24) {
    text = `😃美妙的夜晚就应该好好放纵自己，是吧${userName}？`;
  } else {
    text = `哈喽，${userName}`;
  }

  return text;
}

export { getGreeting };
