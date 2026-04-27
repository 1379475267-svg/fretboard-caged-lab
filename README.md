# Fretboard CAGED Lab

## 项目简介

Fretboard CAGED Lab 是一个面向吉他学习者的 CAGED 系统可视化教学网页。

它不是传统文字教程，而是通过交互式吉他指板，帮助学习者直观看到不同调性下 Root、Major 3rd、Perfect 5th 在指板上的分布，并结合 C、A、G、E、D 五种 CAGED Shape 的说明，建立对整条指板的基本理解。

第一版定位是 visual teaching demo：重点是看清楚和弦音、Shape 区域感和练习思路，不声称实现复杂真实指法训练。

## 项目预览

Preview image will be added later.

如果后续添加截图，可以放在：

```text
assets/preview.png
```

## 功能特点

- Root 选择：C 到 B 的 12 平均律音名
- Shape 选择：C Shape、A Shape、G Shape、E Shape、D Shape
- 自动计算 Major triad：Root、Major 3rd、Perfect 5th
- 标准调弦指板：6 弦到 1 弦，E A D G B E
- 0 到 12 品横向指板展示
- 可切换显示所有音、突出和弦音、显示 interval
- 当前 CAGED Shape 中文说明、根音记忆提示和练习建议
- 适配桌面和手机，手机端指板支持横向滚动
- 纯 HTML / CSS / JavaScript，无构建工具，无外部依赖

## 技术栈

- HTML5
- CSS3
- Vanilla JavaScript

## 项目结构

```text
Fretboard-CAGED-Lab/
├── index.html
├── style.css
├── script.js
└── README.md
```

## 本地运行方式

直接双击 `index.html` 即可在浏览器中运行。

也可以使用任意静态服务器打开项目目录，例如 VS Code Live Server。项目没有构建步骤，不需要安装依赖。

## GitHub Pages 部署方式

1. 创建一个新的 GitHub 仓库，例如 `Fretboard-CAGED-Lab`
2. 上传本项目中的 `index.html`、`style.css`、`script.js` 和 `README.md`
3. 进入仓库的 `Settings`
4. 打开 `Pages`
5. Source 选择 `Deploy from a branch`
6. Branch 选择 `main`，目录选择 `/root`
7. 保存后等待 GitHub Pages 构建完成

部署完成后，GitHub 会生成一个可访问的网址。

## Roadmap

- Minor CAGED
- Pentatonic Scale
- Practice Mode
- Audio Playback
- Fretboard Quiz

## 作者

费浩然

Built for guitar learners and creative coding practice.

## License

MIT License
