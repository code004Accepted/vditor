<p align="center">
<img alt="Vditor" src="https://user-images.githubusercontent.com/873584/52320007-9980bf00-2a07-11e9-8acc-0fb5a7fab8c9.png" />
<br>
下一代的 Markdown 编辑器，为未来而构建
<br><br>
<a title="MIT" target="_blank" href="https://opensource.org/licenses/MIT"><img src="http://img.shields.io/badge/license-MIT-orange.svg?style=flat-square"></a>
<a title="npm bundle size" target="_blank" href="https://www.npmjs.com/package/vditor"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/vditor?style=flat-square&color=blueviolet"></a>
<a title="Dependencies" target="_blank" href="https://github.com/b3log/vditor"><img src="https://img.shields.io/david/b3log/vditor.svg?style=flat-square&color=ff96b4"></a>  <br>
<a title="Version" target="_blank" href="https://www.npmjs.com/package/vditor"><img src="https://img.shields.io/npm/v/vditor.svg?style=flat-square"></a>
<a title="Downloads" target="_blank" href="https://www.npmjs.com/package/vditor"><img src="https://img.shields.io/npm/dt/vditor.svg?style=flat-square&color=97ca00"></a>
<a title="jsdelivr" target="_blank" href="https://www.jsdelivr.com/package/npm/vditor"><img src="https://data.jsdelivr.com/v1/package/npm/vditor/badge"/></a>
<a title="Hits" target="_blank" href="https://github.com/b3log/hits"><img src="https://hits.b3log.org/b3log/vditor.svg"></a> <br><br>
<a title="GitHub Watchers" target="_blank" href="https://github.com/b3log/vditor/watchers"><img src="https://img.shields.io/github/watchers/b3log/vditor.svg?label=Watchers&style=social"></a>&nbsp;&nbsp;
<a title="GitHub Stars" target="_blank" href="https://github.com/b3log/vditor/stargazers"><img src="https://img.shields.io/github/stars/b3log/vditor.svg?label=Stars&style=social"></a>&nbsp;&nbsp;
<a title="GitHub Forks" target="_blank" href="https://github.com/b3log/vditor/network/members"><img src="https://img.shields.io/github/forks/b3log/vditor.svg?label=Forks&style=social"></a>&nbsp;&nbsp;
<a title="Author GitHub Followers" target="_blank" href="https://github.com/vanessa219"><img src="https://img.shields.io/github/followers/vanessa219.svg?label=Followers&style=social"></a>
</p>

## 💡 简介

[Vditor](https://github.com/b3log/vditor) 是一款浏览器端的 Markdown 编辑器，使用 TypeScript 实现。支持原生 JavaScript、Vue、React、Angular。

## 📽️ 背景

我们在开发 [Sym](https://github.com/b3log/symphony) 的初期是直接使用 WYSIWYG 富文本编辑器的。那时候基于 HTML 的编辑器非常流行，项目中引用起来也很方便，也符合用户当时的使用习惯。

后来，Markdown 的崛起逐步改变了大家的排版方式。再加上我们其他几个项目都是面向程序员用户的，所以迁移到 md 上也是大势所趋。我们选择了 [CodeMirror](https://github.com/codemirror/CodeMirror)，这是一款优秀的编辑器，它对开发者提供了丰富的编程接口，对各种浏览器的兼容性也比较好。

再后来，随着我们项目业务需求方面的沉淀，使用 CodeMirror 有时候会感到比较“笨重”。比如要实现 @自动完成用户名列表、插入 Emoji、上传文件等就需要比较深入的二次开发，而这些业务需求恰恰是很多项目场景共有且必备的。

终于，我们决定开始在 Sym 中自己实现编辑器。随着几个版本的迭代，Sym 的编辑器也日趋成熟。在我们运营的社区[黑客派](https://hacpai.com)上陆续有人问我们是否能将编辑器单独抽离出来提供给大家使用。与此同时，我们的前端主程 [V](https://hacpai.com/member/Vanessa) 同学对于维护分散在各个项目中的编辑器也感到有点力不从心，外加对 TypeScript 的好感，所以就决定使用 ts 来实现一个全新的浏览器端 md 编辑器。

于是，Vditor 就这样诞生了。

## ✨  特性

* 所见即所得编辑模式（正在实现中）
* 支持任务列表、at、图表、流程图、甘特图、时序图、五线谱、[多媒体](https://github.com/b3log/vditor/issues/117?utm_source=hacpai.com#issuecomment-526986052)
* 表情自动补全，设置常用表情，支持表情自定义
* 自定义工具栏按钮、提示、插入字符、快捷键，支持工具栏添加按钮
* 可使用拖拽、剪切板粘贴上传，显示实时上传进度，支持 CORS 跨域上传
* 实时保存内容，防止意外丢失
* 录音支持，用户可直接发布语音
* 粘贴 HTML 自动转换为 Markdown，如粘贴中包含外链图片可通过指定接口上传到服务器
* 提供实时预览、滚动同步定位
* 支持主窗口大小拖拽、字符计数
* 支持自定义 duplicate、delete 快捷键操作
* 多主题支持、内置黑白两套
* 多语言支持、内置中英文
* 支持主流浏览器和移动端

![demo](https://user-images.githubusercontent.com/970828/64320104-624fac00-cff0-11e9-8727-0ad51a6f71c0.png)
![render](https://user-images.githubusercontent.com/970828/64341072-30ebd600-d01a-11e9-8e8a-b30c24364b58.png)

## 🗃 案例

* [Sym](https://github.com/b3log/symphony)：一款用 Java 实现的现代化社区（论坛/BBS/社交网络/博客）平台
* [Starfire](https://github.com/b3log/starfire)：一个分布式的内容分享讨论社区，通过点对点超媒体协议让社区更快、更安全也更开放
* [Solo](https://github.com/b3log/solo)：一款小而美的博客系统，使用 Java 实现
* [Pipe](https://github.com/b3log/pipe)：一款小而美的博客平台，使用 Go 实现

## 📜 文档

* [《提问的智慧》精读注解版](https://hacpai.com/article/1536377163156)
* [Vditor 使用指南](https://hacpai.com/article/1549638745630?r=Vanessa)

## 🏘️ 社区

* [讨论区](https://hacpai.com/tag/vditor)
* [报告问题](https://github.com/b3log/vditor/issues/new/choose)

## 📄 授权

Vditor 使用 [MIT](https://opensource.org/licenses/MIT) 开源协议。

## 🙏 鸣谢

* [Lute](https://github.com/b3log/lute)：🎼 一款结构化的 Markdown 引擎，支持 Go 和 JavaScript
* [highlight.js](https://github.com/highlightjs/highlight.js)：Javascript syntax highlighter
* [Turndown](https://github.com/domchristie/turndown)：🛏 An HTML to Markdown converter written in JavaScript
* [mermaid](https://github.com/knsv/mermaid)：Generation of diagram and flowchart from text in a similar manner as markdown
* [incubator-echarts](https://github.com/apache/incubator-echarts)：A powerful, interactive charting and visualization library for browser
* [abcjs](https://github.com/paulrosen/abcjs)：Javascript library for rendering standard music notation in a browser
