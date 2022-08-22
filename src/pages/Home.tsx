import "styles/home.scss"
import {SmileOutlined} from "@ant-design/icons";

export const Home = () => {
  return (
    <div className="home__bg-container">
      <h2 className="home__welcome">🛏夜深了，卡诺记得早睡早起哦！</h2>
      <div className="home__status">
        <SmileOutlined/>
        <p>您已拥有最新版本的 Edgeless Beta</p>
      </div>
      <div className="home__plugins-management">已安装1个插件</div>
      <div className="home__plugins-recommendation">随便看看</div>
    </div>
  );
};
