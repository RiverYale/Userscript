# 脚本说明

> [在Greasy Fork上安装](https://greasyfork.org/zh-CN/scripts/457501)

该脚本可用于同步视频播放，与朋友共同享受视频的快乐。在暂停、播放、拖动进度条时会自动进行同步操作，同时对本地视频提供简要的解决方案。
1. 点击右下角的小兔子可以打开关闭面板，拖动可改变位置
2. 点击获取Peer ID
3. 播放想要同步的视频，然后点击捕获
4. 点击“连接”输入对方Peer ID
5. 与好友测试视频是否同步播放、同步暂停、同步进度等
6. 以上操作也可以自己开两个视频自己连接测试一下

![主界面](https://riveryale.github.io/Userscripts/assets/pic/VideoSync/main.png)  

<br/> 

# 兼容性
- 部分特殊播放情况可能无法准确捕获视频
- 若无法连接[peer.js](https://status.peerjs.com/)服务器，则无法进行视频同步
- 若网络环境较为复杂可能容易中断或者同步失败
- 可能与广告屏蔽脚本或插件冲突，无法正常显示控制面板

<br/>

# 其他
- 若出现无法同步的情况请尝试刷新页面
- 当用户已作为“客户机”时无法“被连接”
- 遇到内嵌视频网页时，小兔子也会出现在内嵌视频网页的右下角
- 想要同步本地视频请前往GitHub下载“LocalVideoSync.html”并打开

[GitHub Pages](https://riveryale.github.io/Userscripts/)

_转载请注明出处_

<br/>

# 更新日志
- v1.3
  - iframe兼容
- v1.2
  - 优化图标拖动体验
  - 显式定义字体颜色
  - 修复部分iframe中无法弹窗输入的问题
- v1.1
  - 修改CDN地址
  - 允许重新捕获视频
- v1.0
  - 初版