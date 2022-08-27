import './index.scss'
import PluginCard from "@/pages/Category/PluginCard";
import {PluginDataOnline} from "@/class";
import React from "react";

function renderPluginCards(plugins: PluginDataOnline[], category: string, showCategory: boolean) {
  let result: React.ReactElement[] = []
  for (let plugin of plugins) {
    result.push((
      <PluginCard key={plugin.name} data={plugin} category={category} showCategory={showCategory}/>
    ))
  }
  return result
}

export const Category = () => {
  const plugins: PluginDataOnline[] = [
    {
      "name": "Smap_0.1.11.0_undefined（bot）.7z",
      "size": 1782050,
      "timestamp": 1650658154,
      "hash": "1049c47cf533499749b26425befe9149d0f0b4e33dd36f8b420771b127101c94"
    },
    {
      "name": "360小工具_1.0.0.0_汪凯.7z",
      "size": 110759113,
      "timestamp": 1573377647,
      "hash": "39b06d735125a9312041d45450be637420847ce1e3a0d9d22b22aa709961af07"
    },
    {
      "name": "bottom_0.6.8.0_undefined（bot）.7z",
      "size": 943558,
      "timestamp": 1660172067,
      "hash": "0a90efd887e837619701c8b85f1aac3bc654e95795471993ed9623fac60f2295"
    },
    {
      "name": "360清理大师_1.0.0.1001_汪凯.7z",
      "size": 13797974,
      "timestamp": 1580211410,
      "hash": "bac7c6356160333ad740457b166e4e5f7f8f80d806555218353ecd1fa1a54911"
    },
    {
      "name": "网速管家_2.2.4_杨月冷.7z",
      "size": 87097808,
      "timestamp": 1654071107,
      "hash": "6ac54233fef9a4531ffe1aa4bfaa426750db572a895bc94190b6547e70b805e3"
    },
    {
      "name": "KeePass(需要dotnet)_2.50.0_Horatio Shaw.7z",
      "size": 2705634,
      "timestamp": 1651509801,
      "hash": "e79711f9338d7b03264f055436b0401aa34db215a433b2b76880865c790068b5"
    },
    {
      "name": "DuplicateFilesFinder_0.8.0.0_undefined（bot）.7z",
      "size": 1016385,
      "timestamp": 1644908838,
      "hash": "1c45af1ae01dc140ed15240518945b32d9af8d5a3fa533a323334ef821525956"
    },
    {
      "name": "TrafficMonitor_1.83.0.0_undefined（bot）.7z",
      "size": 940188,
      "timestamp": 1649481048,
      "hash": "87f9b885e3796d0c014baa6077ad9a69fc0e99ed9678ffe99961bbee957ed14f"
    },
    {
      "name": "Process Explorer_16.43_undefined.7z",
      "size": 510271,
      "timestamp": 1644557294,
      "hash": "19ffdc596988a1365591a0148a46b3d61a14a3c30295abb762f5a2ee11190aff"
    },
    {
      "name": "Windows超级管理器_9.42.0.0_Cno.7z",
      "size": 9886180,
      "timestamp": 1655914683,
      "hash": "329332376ca5f08e75924b13abfb3c42f2974e261efee0b326df9cdace16fadd"
    },
    {
      "name": "John_20210929.1.0_undefined.7z",
      "size": 28701235,
      "timestamp": 1633269606,
      "hash": "bb4f2354615b14794338f2c6b80c49db14be0e8aa3e9e487e6a3050d85d793e6"
    },
    {
      "name": "悠讯时间校对工具_1.0.0.0_黄式.7z",
      "size": 53268,
      "timestamp": 1581838604,
      "hash": "c18c1a8ebd1e22f4f22e0eb6becdcaf0ffa442cbdd83b69794de4e1bccd57218"
    },
    {
      "name": "WiseCare365_6.1.3.598_Horatio Shaw.7z",
      "size": 7514604,
      "timestamp": 1638634984,
      "hash": "d4826848c7b88d3ed9acdcb5c04770e6675a4b411b15b559856e826fe1e8e886"
    },
    {
      "name": "取色器_1.3.2.0_NewbieXvwu.7z",
      "size": 1545840,
      "timestamp": 1639327493,
      "hash": "5f9379cd209458e6b0ec0c5be7e50e4c2086b8c9f7e72cd9f01e74c3a7e64ba2"
    },
    {
      "name": "爱思助手_7.98.53.02_泉水叮咚.7z",
      "size": 351331566,
      "timestamp": 1649150122,
      "hash": "036e1a824fed20730b07b59de7d368183e11594d57bc62c8a0ea53c87781e95b"
    },
    {
      "name": "软媒魔方_6.2.5.0_NewbieXvwu.7z",
      "size": 30376491,
      "timestamp": 1639226532,
      "hash": "a97e9ce0d244772ed74af0f12cb1fb77475a15608cb5ff84331d452e823fa82e"
    },
    {
      "name": "微PE工具包_2.1.0.0_Cno.7z",
      "size": 34978651,
      "timestamp": 1592385317,
      "hash": "8007cfed1fe5355ceaf3f1ada59bd4c8a78f53fb76663eb56663310ceeaf081e"
    },
    {
      "name": "Ueli_8.22.1.0_Cno（bot）.7z",
      "size": 77608457,
      "timestamp": 1657656751,
      "hash": "b1b27579f0c77dbaaecad9d74d2a9423040b92854416faf4edf7d12d6ad04089"
    },
    {
      "name": "Windows 登录解锁工具_1.5.0.0_Cno.7z",
      "size": 242462,
      "timestamp": 1648646313,
      "hash": "a46f96ac0523e7ca53977c485a59cefee9c5893b905e659bb523e2906840288f"
    },
    {
      "name": "Edgeless密码管家_1.1.0.0_Cno.7z",
      "size": 54524,
      "timestamp": 1610208801,
      "hash": "7615498febabf4070262c730ea11ea52f917dce66e410e8a4b5bc2fe07754a9c"
    },
    {
      "name": "二维码识别PC版_1.0_System3206.7z",
      "size": 1835863,
      "timestamp": 1658923858,
      "hash": "04d0a3a7fe13bd22f675557c8df3bd950d02e4200f8f08a969738aff251ef064"
    },
    {
      "name": "DnsJumper_2.2.0.0_（zhuzi）.7z",
      "size": 557554,
      "timestamp": 1655793566,
      "hash": "c8b461cc70bb64e7a66a81903e1db94f1e2c2560c7b940a54b0a13c2f101b20a"
    },
    {
      "name": "BBDown_1.5.3.0_JohnsonRan（bot）.7z",
      "size": 6105219,
      "timestamp": 1660138680,
      "hash": "6edd069ccc4ca560434142c67637f6bc2a01aa3c55a70853c79616ac10ef1e0f"
    },
    {
      "name": "WiseDiskCleaner_10.9.1.0_undefined（bot）.7z",
      "size": 4764705,
      "timestamp": 1660075837,
      "hash": "33923fea26b971b68c80e283c9ad9cf3aaccf389eb4c62911e3610236b354638"
    },
    {
      "name": "WinMerge_2.16.22.0_undefined（bot）.7z",
      "size": 11635458,
      "timestamp": 1659125400,
      "hash": "899162ce99a47749bc7d5d782724246293de8b2215fe47767daa9a9067b17fc0"
    },
    {
      "name": "TinyTask鼠标键盘操作录制助手_1.77_Copur.7z",
      "size": 31269,
      "timestamp": 1573377612,
      "hash": "b295ea5450452b2c0013310af5e4163b808a7e321fa58744519ebbf7dc50ea0f"
    },
    {
      "name": "SmartDefrag_8.0.0.149_undefined（bot）.7z",
      "size": 11701807,
      "timestamp": 1658434513,
      "hash": "96fa619b273907af46a2eb045bdeda85184ae6dad8d89728ad22c38c8e768238"
    },
    {
      "name": "禁用小键盘_1.0.0.0_Cno.7z",
      "size": 140,
      "timestamp": 1574925791,
      "hash": "70d90b7c6ce4810344634dd98dcee247d3121e53be0bd269da0265306b42fda5"
    },
    {
      "name": "win-vind_4.3.3.0_undefined（bot）.7z",
      "size": 1596044,
      "timestamp": 1659266953,
      "hash": "5edab89c4f66c146ee26b7fdcc365965249ce06a922d1785fbc5eefcc5559f8e"
    },
    {
      "name": "HDHacker_1.6.5.0_undefined（bot）.7z",
      "size": 431215,
      "timestamp": 1644908847,
      "hash": "fd8cab84f9876a6984e0bbe1e328ff1ec825e50ce1ddd5a9ca1cac34aff244de"
    },
    {
      "name": "Windows错误代码查询工具_3.0.7.0_Horatio Shaw（bot）.7z",
      "size": 545291,
      "timestamp": 1628669007,
      "hash": "6ed8f088b39db23b6c9232534f5f619ea03db52df90711e3610bc015acdf1e25"
    },
    {
      "name": "Beyond Compare_4.3.7.25118_LittleTurtle.7z",
      "size": 13297179,
      "timestamp": 1626798903,
      "hash": "3e288d8801035f14ead90210517a29f491b2cd6552129944da76f631a5fdc289"
    },
    {
      "name": "音量快捷键_1.1.0.2_杨月冷.7z",
      "size": 305925,
      "timestamp": 1654071100,
      "hash": "a3206bc2ce5c1c15be0127302689b90bfd6d719b39fe8f66217ef729bfe7bbcb"
    },
    {
      "name": "蓝屏代码查询器_2.1.3.0_汪凯.7z",
      "size": 1119523,
      "timestamp": 1573309099,
      "hash": "9251f4509dc8cf83669d3e735433c756eb698dceb9d5e15bf5f7312cd6248ec6"
    },
    {
      "name": "Diffpdf_2.1.3.0_undefined（bot）.7z",
      "size": 5910935,
      "timestamp": 1644908829,
      "hash": "a223efdf13a575814e4b8617da35725cc1757e2b196b2a80d5d20b7d5140686f"
    },
    {
      "name": "Nali_0.5.3.0_undefined（bot）.7z",
      "size": 2806495,
      "timestamp": 1660552373,
      "hash": "f1d60f49a4f7d8f2f78722613b64b3ccf33ef04ce0a1cafc3abc390034932119"
    },
    {
      "name": "NeoVim_0.8.0.0_JohnsonRan（bot）.7z",
      "size": 25686498,
      "timestamp": 1660145639,
      "hash": "acca50a2df56a25d189c895caaf802162fec49228ec82ac3032d736ddbfb29b9"
    },
    {
      "name": "WhatChanged_1.07.0.0_undefined（bot）.7z",
      "size": 161957,
      "timestamp": 1644909196,
      "hash": "260580b8705bc57693f42a53628c92b7be6609b06dfc8774ea6b06e20e7100fd"
    },
    {
      "name": "UltraDefrag_7.1.4.0_undefined（bot）.7z",
      "size": 3279847,
      "timestamp": 1644909185,
      "hash": "8fea2cc6187811e89cb994786e1efe94caa32c64bf71ba2c967981404c4e53da"
    },
    {
      "name": "一键关闭显示器_1.0.0.0_杨月冷.7z",
      "size": 10395,
      "timestamp": 1654071097,
      "hash": "8347ece75a0a3c5363fff81397fe112491a77907e2eb9b84c1cd273fe91a92ab"
    },
    {
      "name": "校准时间_1.0.0.1_Cno.7z",
      "size": 104010,
      "timestamp": 1549441685,
      "hash": "abb673ecf2d5163b6bb9368eea4b0206629d7c3e7599e311f7440772b59965a0"
    },
    {
      "name": "scrcpy_1.24.0.0_undefined（bot）.7z",
      "size": 24996027,
      "timestamp": 1660554283,
      "hash": "6f0d76fc96c5df7e0b5807c03c89c5ac888c0a2a88c3b7b60fb14dbfc8adc666"
    },
    {
      "name": "鼠大侠鼠标连点器_1.2.0.0_北辰.7z",
      "size": 2419245,
      "timestamp": 1633335998,
      "hash": "5d78f4092a66ce8835e7c67050e4f5dc0f9a52773d8982c1aeee43464f05598c"
    },
    {
      "name": "uTools_3.0.2.0_Cno（bot）.7z",
      "size": 66995182,
      "timestamp": 1660680737,
      "hash": "f565ae9a781c913d231df250b1112e05758fc20bce2c9cc3cdd29c234ac47e0a"
    },
    {
      "name": "DOSBOX_0.74.3.0_undefined（bot）.7z",
      "size": 2004191,
      "timestamp": 1644916416,
      "hash": "e6ee8c2e47932179d488f01951b884a296bcd27c923b77a651c3a49a547a0944"
    }
  ]
  return (
    <div className="category__container">
      {renderPluginCards(plugins, "浏览器", true)}
    </div>
  );
};
