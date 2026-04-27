# 🎸 Fretboard CAGED Lab

> Interactive CAGED System Visualizer for Guitar Learners  
> 一个面向吉他学习者的 CAGED 系统可视化教学网页。

![HTML](https://img.shields.io/badge/HTML5-Structure-orange)
![CSS](https://img.shields.io/badge/CSS3-Style-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-Interaction-yellow)
![Status](https://img.shields.io/badge/Status-Visual%20Demo-brightgreen)

---

## 🎸 Introduction / 项目简介

**Fretboard CAGED Lab** is an interactive visual teaching demo for guitar learners.

It is built with native **HTML / CSS / JavaScript** and helps users understand the CAGED system through an interactive guitar fretboard. Users can select different root notes and CAGED shapes to see how **Root, Major 3rd, and Perfect 5th** are distributed across the fretboard.

**Fretboard CAGED Lab** 是一个面向吉他学习者的交互式可视化教学项目。

它使用原生 **HTML / CSS / JavaScript** 构建，通过交互式吉他指板展示不同调性下 **Root、Major 3rd、Perfect 5th** 在指板上的分布，并结合 **C、A、G、E、D** 五种 CAGED Shape 的说明，帮助学习者更直观地理解和弦音、指板结构与形状连接。

---

## 🌐 Live Demo / 在线预览





```text
https://1379475267-svg.github.io/fretboard-caged-lab/
```

---

## ✨ Features / 功能特点

- **Root Selector**  
  Select root notes from the 12-tone equal temperament system.  
  支持 C 到 B 的 12 平均律音名选择。

- **CAGED Shape Selector**  
  Switch between C Shape, A Shape, G Shape, E Shape, and D Shape.  
  支持 C Shape、A Shape、G Shape、E Shape、D Shape 切换。

- **Interactive Fretboard**  
  Display 6 guitar strings and frets from 0 to 12.  
  展示标准吉他调弦下的 6 根弦与 0-12 品。

- **Major Triad Visualization**  
  Automatically calculate and highlight Root, Major 3rd, and Perfect 5th.  
  自动计算并高亮 Root、Major 3rd、Perfect 5th。

- **Interval Display**  
  Show interval labels such as R / 3 / 5.  
  支持显示 R / 3 / 5，帮助理解和弦音功能。

- **Shape Explanation**  
  Provide explanation, root-position tips, and practice suggestions for each CAGED shape.  
  每个 CAGED Shape 都配有说明、根音记忆提示和练习建议。

- **Responsive Design**  
  Works on both desktop and mobile devices. The fretboard supports horizontal scrolling on small screens.  
  适配桌面端和移动端，手机端支持横向滚动查看指板。

- **No Dependencies**  
  Built with pure HTML, CSS, and JavaScript. No build tools or external dependencies are required.  
  纯原生 HTML / CSS / JavaScript，无需安装依赖，无需构建步骤。

---

## 🛠️ Tech Stack / 技术栈

| Technology | Usage |
|---|---|
| HTML5 | Page structure / 页面结构 |
| CSS3 | Styling and responsive layout / 视觉设计与响应式布局 |
| Vanilla JavaScript | Fretboard rendering and interaction / 指板渲染与交互逻辑 |

---

## 📁 Project Structure / 项目结构

```text
Fretboard-CAGED-Lab/
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🚀 How to Use / 使用方式

### Run Locally / 本地运行

Option 1: Open `index.html` directly in your browser.

方式一：直接双击打开：

```text
index.html
```

Option 2: Use VS Code Live Server.

方式二：使用 VS Code Live Server：

```text
Open with Live Server
```

This project has no build step and requires no dependency installation.

本项目没有构建步骤，也不需要安装依赖。

---

### Deploy to GitHub Pages / 部署到 GitHub Pages

1. Upload the project to a GitHub repository.  
   将项目上传到 GitHub 仓库。

2. Open the repository **Settings**.  
   进入仓库的 **Settings**。

3. Go to **Pages**.  
   打开 **Pages**。

4. Set Source to:

```text
Deploy from a branch
```

5. Set Branch to:

```text
main / root
```

6. Save the settings and wait for GitHub Pages to finish deployment.  
   保存后等待 GitHub Pages 构建完成。

---

## 🎼 Music Theory Notes / 音乐理论说明

This project uses the standard 12-tone equal temperament note names:

本项目使用标准 12 平均律音名：

```text
C, C#, D, D#, E, F, F#, G, G#, A, A#, B
```

The standard guitar tuning is:

标准吉他调弦为：

```text
E A D G B E
```

The major triad structure is:

大三和弦结构为：

```text
Major Triad = Root + Major 3rd + Perfect 5th
```

For example:

例如：

```text
C Major = C + E + G
```

The current version is mainly designed for visual understanding of the CAGED system and major triad distribution. It is not a full real-world fingering training system.

当前版本主要用于**可视化理解 CAGED 系统和大三和弦音分布**，并不等同于完整的真实指法训练系统。

---

## 🧠 What is CAGED? / 什么是 CAGED？

The CAGED system comes from five common open chord shapes on the guitar:

CAGED 系统来自吉他上五种常见开放和弦形状：

```text
C Shape / A Shape / G Shape / E Shape / D Shape
```

These shapes can be moved across the fretboard, helping learners connect chord shapes, root positions, and chord tones.

这些形状可以移动到不同把位，帮助学习者把零散的音名、和弦音和指板区域连接起来。

---

## 👥 Who Is This For / 适合人群

This project is suitable for:

这个项目适合：

- Guitar beginners  
  吉他初学者

- Learners studying the CAGED system  
  正在学习 CAGED 系统的人

- Players who want to understand fretboard note distribution  
  想理解指板音名分布的人

- Learners practicing Root / 3rd / 5th recognition  
  想练习 Root / 3rd / 5th 识别的人

- People interested in music visualization and creative coding  
  喜欢音乐可视化与 creative coding 的学习者

---

## 🖼️ Preview / 项目展示

No screenshots or demo videos have been added yet.

目前暂未添加项目截图或演示视频。

Preview screenshots and demo video will be added after the first GitHub Pages deployment.

后续将在 GitHub Pages 部署完成后补充项目截图和演示视频。

Planned preview materials:

后续计划补充：

- Homepage screenshot  
  项目首页截图

- Fretboard interaction screenshot  
  指板交互截图

- Short demo GIF or video  
  简短演示 GIF 或视频

---

## 🧭 Roadmap / 后续计划

- [ ] 🎵 Minor CAGED
- [ ] 🎶 Pentatonic Scale
- [ ] 🎯 Practice Mode
- [ ] 🔊 Audio Playback
- [ ] 🧠 Fretboard Quiz
- [ ] 🗺️ Better shape position mapping
- [ ] 📸 Add preview screenshots
- [ ] 🌐 Publish GitHub Pages live demo

---

## ✍️ Author / 作者

**费浩然**

Built for guitar learners and creative coding practice.

---

## 📄 License / 开源许可

This project is planned to be released under the MIT License.

本项目计划采用 MIT License 开源。