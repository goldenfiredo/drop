## 向discord投放钱包地址 自动化脚本

1. 安装node和git，要求nodejs版本不低于12.16.0 (git可以不安装, 直接下载zip文件)

2. 从github上复制代码

  ```
  git clone git@github.com:goldenfiredo/drop.git
  ```

3. 安装运行脚本需要的依赖包

  ```
  npm install
  ```

4. 配置好你使用代理的端口号（科学上网）

  ```
  proxy: "http://127.0.0.1:7890",
  ```

  端口号7890按实际修改

5. 如果你没有使用代理，跳过第4步，代码中做一下切换(两处)

  ```
  require("request").get(options, function (error, response, body) {
  // requestProxy.get(options, function (error, response, body) {
  ```

  ```
  require("request").post(options, function (error, response, body) {
  // requestProxy.post(options, function (error, response, body) {
  ```

6. 编辑drop.txt文件, 加入你的discord帐号名称、密码和钱包地址，编辑好后drop.txt文件如下：
  ```
  discord帐号1|密码1|钱包地址1
  discord帐号2|密码2|钱包地址2
  discord帐号3|密码3|钱包地址3
  discord帐号4|密码4|钱包地址4
  discord帐号5|密码5|钱包地址5
  discord帐号6|密码6|钱包地址6
  discord帐号7|密码7|钱包地址7
  discord帐号8|密码8|钱包地址8
  discord帐号9|密码9|钱包地址9
  discord帐号10|密码10|钱包地址10
  ......
  ```
  如果想在命令行指定帐号的密码, 密码一列替换成*

7. 以上discord帐号需要加入要投放钱包地址的项目方的discord

8. 用其中的一个账号登录discord，在 用户设置 > 高级设置 里打开'开发者'模式，然后右键click你要投放地址的频道，弹出菜单里会有'复制ID'一项，点击它获得频道id

9. 用如下命令运行脚本

  ```
  node drop.js 帐号密码或- 频道id 
  ```
  脚本依次登录drop.txt文件里帐号并向指定的频道发送相应的钱包地址.

  * 如果drop.txt文件密码那一列有 *，命令行的第3项需要输入相应的帐号密码；如果密码在drop.txt里都已指定(即密码一列无 *)，这里用 - 占位即可

10. 如果脚本在登录某账号时出现captcha required错误，目前没有好的解决方案，需要人工多次登录，直到discord不再要求captcha验证(?)

11. 阅读脚本源码你有所收获或者运行脚本为你节省了时间，欢迎喂投, 钱包地址：0xb0ba5ceca5a2fac643febc2f9f3ac4a53162f384, 各链通用. 谢谢！

![POAP bot](https://github.com/waxcloud2021/discord/blob/master/address.jpg)

  * 0xb0ba5ceca5a2fac643febc2f9f3ac4a53162f384