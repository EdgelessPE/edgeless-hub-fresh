import './index.scss'
import PluginCard from "@/pages/Category/PluginCard";
import React from "react";
import {FileNodePackageOnline} from "@/classes/online";

function renderPluginCards(plugins: FileNodePackageOnline[], category: string, showCategory: boolean) {
  let result: React.ReactElement[] = []
  for (let plugin of plugins) {
    result.push((
      <PluginCard key={plugin.name} data={plugin} category={category} showCategory={showCategory}/>
    ))
  }
  return result
}

export const Category = () => {
  const plugins: FileNodePackageOnline[] = [
    {
      "name": "ChromeDev_106.0.5249.21_Horatio Shaw（bot）.7z",
      "size": 98867749,
      "timestamp": 1662063303,
      "integrity": {
        "method": "blake3",
        "value": "f7f38ac2187e772b429b4bd48cb99c981cf3e537ea2f24c87e0d148ca6940a73"
      }
    },
    {
      "name": "Opera_90.0.4480.54_Cno（bot）.7z",
      "size": 93002245,
      "timestamp": 1661544694,
      "integrity": {
        "method": "blake3",
        "value": "41c97f93f40afbdce63bb6234ca3b58e99df0bca43ec499edaa8e28842ef29ba"
      }
    },
    {
      "name": "红芯浏览器_3.0.54_chenbx.7z",
      "size": 99449644,
      "timestamp": 1583050610,
      "integrity": {
        "method": "blake3",
        "value": "ded54a4a317efe8a351d73523ff2a1b3bf52187491362ed34f19d9714ee90781"
      }
    },
    {
      "name": "华为浏览器_12.1.0.301_Horatio Shaw.7z",
      "size": 139300039,
      "timestamp": 1657808560,
      "integrity": {
        "method": "blake3",
        "value": "8685252c9ff9c1c39d41918c4bee6c81d0686d7c95193609ab32f4c3df3a5233"
      }
    },
    {
      "name": "Edge(Runningcheese优化版)_94.0.992.31_Horatio Shaw.7z",
      "size": 115061656,
      "timestamp": 1639330331,
      "integrity": {
        "method": "blake3",
        "value": "cc76ea963b5bfa1d53ba0832f2e8aa49c40b3d1dac3ceee3f739aa78718b7e45"
      }
    },
    {
      "name": "waterfox_4.1.2.1_undefined（bot）.7z",
      "size": 70493071,
      "timestamp": 1660703939,
      "integrity": {
        "method": "blake3",
        "value": "1d4eb162ee95cda46dd214b7c580c265b8255a912782351ef25e654807c84db6"
      }
    },
    {
      "name": "Firefox_104.0.2.0_Cno（bot）.7z",
      "size": 116807968,
      "timestamp": 1662668423,
      "integrity": {
        "method": "blake3",
        "value": "a46b4d71828622ee6981f0b5f58d16157ff8612ead4d4d1dbf36570d1079bf2d"
      }
    },
    {
      "name": "联想浏览器_7.0.0.6241_Horatio Shaw.7z",
      "size": 150186875,
      "timestamp": 1626534184,
      "integrity": {
        "method": "blake3",
        "value": "e4803241fa9079d461be3a345d55c1f47119ed147485d7cd04c267bba75a0377"
      }
    },
    {
      "name": "世界之窗浏览器_7.0.0.108_柠檬味小可爱.7z",
      "size": 19567719,
      "timestamp": 1556721532,
      "integrity": {
        "method": "blake3",
        "value": "d4e4a76c7e13c60ff86e6ba230fb661c4c05006a8584133b62a11e4e03accbce"
      }
    },
    {
      "name": "360游戏浏览器_13.6.1047.0_xie.7z",
      "size": 87336635,
      "timestamp": 1655793358,
      "integrity": {
        "method": "blake3",
        "value": "eacb3976ddd948137bd3c00e8b92108d90ce38716ac051acabca9feba8eb4c4c"
      }
    },
    {
      "name": "Google Chrome(Runningcheese优化版)_101.0.4951.41_Horatio Shaw.7z",
      "size": 113457091,
      "timestamp": 1651509897,
      "integrity": {
        "method": "blake3",
        "value": "69b4fe04f1cb5f58061da0786204f31eb6b1713c1a1f5e4f353e7f61748b8a79"
      }
    },
    {
      "name": "Microsoft Edge_94.0.992.37_Beluga.7z",
      "size": 111752987,
      "timestamp": 1633321939,
      "integrity": {
        "method": "blake3",
        "value": "6a09f3e9f9d96b90a64ce16e85cd05b4fd3107d8fcc33a9c2febd3654a5f293a"
      }
    },
    {
      "name": "FirefoxNightly_106.0.0.0_undefined（bot）.7z",
      "size": 1301567,
      "timestamp": 1661544989,
      "integrity": {
        "method": "blake3",
        "value": "6e10fd765ff7fed5a1fad88a6eea876e191b71458e0ec502d82ae553c103e3fd"
      }
    },
    {
      "name": "Opera精简版_12.17.1863.0_Cno.7z",
      "size": 16887069,
      "timestamp": 1555498287,
      "integrity": {
        "method": "blake3",
        "value": "6f6c85fdc077b005b1f894c1f2746c067ea68a31f386688ed2268caa6b94591b"
      }
    },
    {
      "name": "360安全浏览器_13.1.5188.0_Horatio Shaw.7z",
      "size": 138348967,
      "timestamp": 1643440195,
      "integrity": {
        "method": "blake3",
        "value": "b6ef724acc12d521ad68a894dfa339f5eb53316fb1d7615bd35d89bc5670b347"
      }
    },
    {
      "name": "Firefox Lite_74.0.0.7373_Copur.7z",
      "size": 87390138,
      "timestamp": 1584522476,
      "integrity": {
        "method": "blake3",
        "value": "eb4372eb589f37675ba10e0f566f6d14de21796a40c833f45411dfabf0c6fd8b"
      }
    },
    {
      "name": "360极速浏览器_13.0.2290.0_Horatio Shaw.7z",
      "size": 149589176,
      "timestamp": 1643616858,
      "integrity": {
        "method": "blake3",
        "value": "a53a54cb6ddd0c0f2a0dcd83edd2595e428cc5f3f1fb3f63bde7da8da2168e8e"
      }
    },
    {
      "name": "Iron_103.0.5250.0_Horatio Shaw（bot）.7z",
      "size": 82129444,
      "timestamp": 1660594278,
      "integrity": {
        "method": "blake3",
        "value": "343cdd44b2df42c2501f187c27e0797e2fbd02d489a626fd4101150557d5b632"
      }
    },
    {
      "name": "百分浏览器_4.3.9.248_Horatio Shaw.7z",
      "size": 144605763,
      "timestamp": 1639327519,
      "integrity": {
        "method": "blake3",
        "value": "e602abca160c1dae59967fab6cafbe1a77dcbb8a5b59410afcadb797f77957eb"
      }
    },
    {
      "name": "傲游浏览器_4.9.5.1000_Cno（bot）.7z",
      "size": 42959420,
      "timestamp": 1620664788,
      "integrity": {
        "method": "blake3",
        "value": "82ed10cf9879cc1cbf7da7735546ca4b8ae511c07261ec55f144533e9a3dba8c"
      }
    },
    {
      "name": "想天浏览器_3.2.9.0_Horatio Shaw.7z",
      "size": 99716462,
      "timestamp": 1657808320,
      "integrity": {
        "method": "blake3",
        "value": "293910f4f4f8bb000bc7b74690fdaecca55a8ac4c7ff6ae22694c801ab2b7e32"
      }
    },
    {
      "name": "水狐浏览器_4.0.5.1_Horatio Shaw.7z",
      "size": 69277413,
      "timestamp": 1643440188,
      "integrity": {
        "method": "blake3",
        "value": "a5dbd6dbf7e4c77992e683717f8ec311d9df537667d849b6c2413914aa39abc6"
      }
    },
    {
      "name": "ChromeBeta_106.0.5249.30_Horatio Shaw（bot）.7z",
      "size": 98895350,
      "timestamp": 1662668051,
      "integrity": {
        "method": "blake3",
        "value": "17c8f258b7c26badf5ed6a2f1a35c51ad8613906eb100e254ec16431ad99f9e2"
      }
    },
    {
      "name": "Platinum Browser_1.0.0.13_Horatio Shaw.7z",
      "size": 186252717,
      "timestamp": 1658402955,
      "integrity": {
        "method": "blake3",
        "value": "296413ab432372c67803ebc4d49fd3cffedd31fa694e16185f0ed3ea4532b3f1"
      }
    },
    {
      "name": "palemoon_31.2.0.1_方块人steve.7z",
      "size": 33158618,
      "timestamp": 1660989807,
      "integrity": {
        "method": "blake3",
        "value": "418bb3fb87fa39bd6c74dbcb60684e2c84a162c69aa02f18817700d8cfa341bf"
      }
    },
    {
      "name": "星愿浏览器_8.4.2000.2209_Cno（bot）.7z",
      "size": 97121114,
      "timestamp": 1662840783,
      "integrity": {
        "method": "blake3",
        "value": "1567b62b059ef9100f05ae613b1f87363c5719ec5d0253dad7abca5cd83d27d1"
      }
    },
    {
      "name": "FirefoxDevloperEdition_105.0.0.0_undefined（bot）.7z",
      "size": 60825440,
      "timestamp": 1661544760,
      "integrity": {
        "method": "blake3",
        "value": "35cc7a364dc5022461b281cf226152df23706108682e72e428cb33d66dddfd43"
      }
    },
    {
      "name": "FirefoxBeta_105.0.0.0_undefined（bot）.7z",
      "size": 60733867,
      "timestamp": 1661544988,
      "integrity": {
        "method": "blake3",
        "value": "66d467f899a46ff4edf5cd814f1438880ae7fd7cb71c485ffe49dc3d6284374c"
      }
    },
    {
      "name": "Chrome_105.0.5195.102_Cno（bot）.7z",
      "size": 94903158,
      "timestamp": 1662408999,
      "integrity": {
        "method": "blake3",
        "value": "aacca8314b4cdfe6ec4c356ae3e4798399420ab1d9f6ed01ffb38fd53e7fdccb"
      }
    },
    {
      "name": "Vivaldi_5.2.2623.41_Horatio Shaw.7z",
      "size": 174476387,
      "timestamp": 1651509947,
      "integrity": {
        "method": "blake3",
        "value": "57297a702e30076f5c2ca97a8be977ff79650cc67e94d73ca445cc1ae8e67e42"
      }
    },
    {
      "name": "Firefox(RunningCheese优化版)_103.0.8234_undefined.7z",
      "size": 104035434,
      "timestamp": 1660574437,
      "integrity": {
        "method": "blake3",
        "value": "6893d3ee91d3d78ef1400ca85861493b7690b3575aef7be2d64b448ef3c1637a"
      }
    },
    {
      "name": "360极速浏览器X_21.0.1130.0_Cno（bot）.7z",
      "size": 111901555,
      "timestamp": 1660680827,
      "integrity": {
        "method": "blake3",
        "value": "e74a6c79e1c6f16122e9c5a52a627ea0bb2136255012679a52f85fbb6c94b73d"
      }
    }
  ]
  return (
    <div className="category__container">
      {renderPluginCards(plugins, "浏览器", true)}
    </div>
  );
};
