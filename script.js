const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const strings = ["E", "A", "D", "G", "B", "E"];
const languageStorageKey = "fretboard-caged-lab-language";

let currentLanguage = "zh";

const shapeZones = {
  C: [0, 4],
  A: [2, 6],
  G: [4, 8],
  E: [6, 10],
  D: [8, 12]
};

const scaleDefinitions = {
  major: [
    { interval: "R", semitones: 0 },
    { interval: "2", semitones: 2 },
    { interval: "3", semitones: 4 },
    { interval: "4", semitones: 5 },
    { interval: "5", semitones: 7 },
    { interval: "6", semitones: 9 },
    { interval: "7", semitones: 11 }
  ],
  naturalMinor: [
    { interval: "R", semitones: 0 },
    { interval: "2", semitones: 2 },
    { interval: "b3", semitones: 3 },
    { interval: "4", semitones: 5 },
    { interval: "5", semitones: 7 },
    { interval: "b6", semitones: 8 },
    { interval: "b7", semitones: 10 }
  ],
  majorPentatonic: [
    { interval: "R", semitones: 0 },
    { interval: "2", semitones: 2 },
    { interval: "3", semitones: 4 },
    { interval: "5", semitones: 7 },
    { interval: "6", semitones: 9 }
  ],
  minorPentatonic: [
    { interval: "R", semitones: 0 },
    { interval: "b3", semitones: 3 },
    { interval: "4", semitones: 5 },
    { interval: "5", semitones: 7 },
    { interval: "b7", semitones: 10 }
  ],
  blues: [
    { interval: "R", semitones: 0 },
    { interval: "b3", semitones: 3 },
    { interval: "4", semitones: 5 },
    { interval: "b5", semitones: 6 },
    { interval: "5", semitones: 7 },
    { interval: "b7", semitones: 10 }
  ]
};

const translations = {
  zh: {
    documentTitle: "Fretboard CAGED Lab | 吉他指板乐理可视化",
    metaDescription: "Fretboard CAGED Lab 是一个面向吉他学习者的 CAGED 与音阶可视化教学网页。",
    nav: {
      concept: "概念",
      lab: "实验室",
      tips: "学习建议"
    },
    hero: {
      eyebrow: "吉他指板乐理实验室",
      subtitle: "面向吉他学习者的交互式 CAGED 与音阶可视化工具",
      copy:
        "这是一个帮助吉他学习者理解 CAGED 系统和常见音阶的可视化教学网页。你可以切换不同调性、CAGED Shape 和音阶类型，直观看到和弦音与音阶音程在指板上的分布。",
      button: "开始探索"
    },
    concept: {
      eyebrow: "概念",
      title: "什么是 CAGED 系统？",
      cards: [
        {
          title: "来自五种开放和弦形状",
          copy:
            "CAGED 来自 C、A、G、E、D 五种开放和弦形状。它不是一套神秘公式，而是把常见和弦形状移动到不同把位的观察方式。"
        },
        {
          title: "把和弦音放进整条指板",
          copy:
            "当你知道一个调的 Root、Major 3rd、Perfect 5th 在哪里，CAGED Shape 就能帮助你把零散音名连接成可演奏的区域。"
        },
        {
          title: "先理解，再练速度",
          copy:
            "第一版重点是教学演示：先看清楚大三和弦音和 Shape 的区域感，再把这些位置变成日常练习素材。"
        }
      ]
    },
    controls: {
      eyebrow: "交互实验室",
      currentChordLabel: "当前内容：",
      modeLabel: "模式",
      rootLabel: "Root",
      shapeLabel: "Shape",
      scaleLabel: "音阶",
      displayLegend: "显示选项",
      showAllNotes: "显示全部音名",
      highlightChordTones: "高亮和弦音",
      highlightScaleTones: "高亮音阶音",
      showIntervals: "显示音程"
    },
    modes: {
      chord: "和弦 / CAGED 模式",
      scale: "音阶模式"
    },
    scales: {
      major: "大调音阶",
      naturalMinor: "自然小调音阶",
      majorPentatonic: "大调五声音阶",
      minorPentatonic: "小调五声音阶",
      blues: "布鲁斯音阶"
    },
    legend: {
      root: "Root",
      third: "Major 3rd",
      fifth: "Perfect 5th",
      scaleTone: "音阶音",
      other: "其他音"
    },
    fretboard: {
      eyebrow: "吉他指板",
      title: "标准调弦 E A D G B E，0 到 12 品",
      scrollLabel: "可横向滚动的吉他指板",
      gridLabel: "吉他指板音名",
      cellLabel: "第 {stringNumber} 弦，{fret} 品，音名 {note}{interval}",
      intervalLabel: "，音程 {interval}"
    },
    shape: {
      eyebrow: "当前 Shape",
      rootTipLabel: "根音记忆提示：",
      practiceTipLabel: "练习建议：",
      badgeSuffix: "区域"
    },
    modeInfo: {
      chord: {
        title: "和弦 / CAGED 模式",
        copy:
          "这个模式保留原来的 CAGED 大三和弦视角，帮助你观察 Root、Major 3rd、Perfect 5th 如何落在不同 Shape 区域里。"
      }
    },
    scaleInfo: {
      major: {
        title: "大调音阶",
        copy: "大调音阶适合学习流行、民谣和常见旋律。先找 Root，再观察 2、3、4、5、6、7 的排列，可以把单个把位和整条指板连接起来。"
      },
      naturalMinor: {
        title: "自然小调音阶",
        copy: "自然小调音阶适合较暗的旋律、摇滚和抒情片段。它能帮助你理解 b3、b6、b7 的声音，并和大调音阶作对比。"
      },
      majorPentatonic: {
        title: "大调五声音阶",
        copy: "大调五声音阶声音明亮，常用于流行、乡村和轻快即兴。音少、冲突少，很适合建立旋律感和指板记忆。"
      },
      minorPentatonic: {
        title: "小调五声音阶",
        copy: "小调五声音阶是摇滚、布鲁斯和即兴入门的核心素材。先记住 Root 与 b3、4、5、b7 的关系，再横向连接不同把位。"
      },
      blues: {
        title: "布鲁斯音阶",
        copy: "布鲁斯音阶在小调五声音阶中加入 b5，适合布鲁斯、摇滚和带张力的短句。注意 b5 的经过音效果，不必每次都停留太久。"
      }
    },
    shapeInfo: {
      C: {
        name: "C Shape",
        description:
          "C Shape 偏向开放 C 和弦形状的移动理解。它适合用来观察 Root、Major 3rd、Perfect 5th 如何围绕一个熟悉的开放和弦轮廓展开。",
        rootTip: "先记住 5 弦和 2 弦附近的 Root，再把它们和周围的 3、5 连起来。",
        practiceTip: "从低音弦到高音弦慢慢弹出 1-3-5，不急着扫完整个和弦。"
      },
      A: {
        name: "A Shape",
        description:
          "A Shape 偏向 A 和弦横按形状，是学习封闭大三和弦时很常见的区域。它能帮助你把 5 弦 Root 和中高音弦的和弦音连起来。",
        rootTip: "重点看 5 弦上的 Root，它通常是这个 Shape 的方向点。",
        practiceTip: "用 5 弦 Root 起手，分别向高音弦和低音弦寻找 3、5，练成小片段。"
      },
      G: {
        name: "G Shape",
        description:
          "G Shape 来自开放 G 的轮廓，跨度比较大。它不一定最适合直接完整按住，但很适合理解相邻 Shape 之间的连接。",
        rootTip: "把 6 弦和 1 弦上的 Root 当成边界，再观察中间弦的 3 和 5。",
        practiceTip: "先拆成两三根弦的小区域练习，再和 C Shape、E Shape 串起来。"
      },
      E: {
        name: "E Shape",
        description:
          "E Shape 偏向 E 和弦横按形状，非常常用。很多大横按、布鲁斯和摇滚节奏型都会从这个区域建立手感。",
        rootTip: "6 弦 Root 是核心定位点，1 弦同品也会出现同名 Root。",
        practiceTip: "先用 6 弦 Root 定位，再在同一区域内弹 1-3-5 分解和弦。"
      },
      D: {
        name: "D Shape",
        description:
          "D Shape 来自开放 D 和弦形状，常用于高把位的小区域。它声音明亮，适合做旋律化和弦或高音区连接。",
        rootTip: "多留意 4 弦和 2 弦附近的 Root，它们能帮你快速找到高把位小三角。",
        practiceTip: "在 1 到 4 弦之间练小范围 1-3-5，适合接到旋律或双音练习。"
      }
    },
    tips: {
      eyebrow: "学习建议",
      title: "把可视化变成手上的记忆",
      tips: [
        {
          title: "先找 Root",
          copy: "每换一个调，先别急着弹形状。把所有 Root 找出来，再回到你最熟的 Shape，会更容易建立方向感。"
        },
        {
          title: "记住 1-3-5",
          copy: "大三和弦的骨架就是 1、3、5。练习时边弹边说出 interval，比只记手型更扎实。"
        },
        {
          title: "横向连接相邻 Shape",
          copy: "不要把每个 Shape 当成孤岛。找到两个相邻区域共享的 Root，再尝试用滑音或小乐句把它们连起来。"
        },
        {
          title: "一个调练熟再换调",
          copy: "先用 C Major 或 G Major 练到能闭眼找到 1-3-5，再换到不熟的调。这样迁移会更自然。"
        }
      ]
    },
    footer: {
      author: "作者：费浩然",
      copy: "为吉他学习者和 creative coding 练习而构建。"
    },
    languageToggle: "English"
  },
  en: {
    documentTitle: "Fretboard CAGED Lab | Guitar Fretboard Theory Visualizer",
    metaDescription:
      "Fretboard CAGED Lab is an interactive CAGED and scale visualizer for guitar learners.",
    nav: {
      concept: "Concept",
      lab: "Lab",
      tips: "Tips"
    },
    hero: {
      eyebrow: "Guitar Fretboard Theory Lab",
      subtitle: "Interactive CAGED and Scale Visualizer for Guitar Learners",
      copy:
        "Fretboard CAGED Lab helps guitar learners understand the CAGED system and common scales by showing chord tones and scale intervals across the fretboard in different keys, shapes, and modes.",
      button: "Start Exploring"
    },
    concept: {
      eyebrow: "Concept",
      title: "What is the CAGED system?",
      cards: [
        {
          title: "Built from five open chord shapes",
          copy:
            "CAGED comes from the open C, A, G, E, and D chord shapes. It is a practical way to move familiar chord forms into different fretboard positions."
        },
        {
          title: "Place chord tones across the fretboard",
          copy:
            "When you can see where the Root, Major 3rd, and Perfect 5th sit in a key, CAGED shapes become usable regions instead of isolated diagrams."
        },
        {
          title: "Understand first, then build speed",
          copy:
            "This first version is a visual teaching demo. The goal is to see chord tones and shape areas clearly before turning them into daily practice material."
        }
      ]
    },
    controls: {
      eyebrow: "Interactive Lab",
      currentChordLabel: "Current:",
      modeLabel: "Mode",
      rootLabel: "Root",
      shapeLabel: "Shape",
      scaleLabel: "Scale",
      displayLegend: "Display Options",
      showAllNotes: "Show all notes",
      highlightChordTones: "Highlight chord tones",
      highlightScaleTones: "Highlight scale tones",
      showIntervals: "Show intervals"
    },
    modes: {
      chord: "Chord / CAGED Mode",
      scale: "Scale Mode"
    },
    scales: {
      major: "Major Scale",
      naturalMinor: "Natural Minor Scale",
      majorPentatonic: "Major Pentatonic",
      minorPentatonic: "Minor Pentatonic",
      blues: "Blues Scale"
    },
    legend: {
      root: "Root",
      third: "Major 3rd",
      fifth: "Perfect 5th",
      scaleTone: "Scale tone",
      other: "Other notes"
    },
    fretboard: {
      eyebrow: "Guitar Fretboard",
      title: "Standard tuning E A D G B E, frets 0 to 12",
      scrollLabel: "Scrollable guitar fretboard",
      gridLabel: "Guitar fretboard notes",
      cellLabel: "String {stringNumber}, fret {fret}, note {note}{interval}",
      intervalLabel: ", interval {interval}"
    },
    shape: {
      eyebrow: "Current Shape",
      rootTipLabel: "Root memory tip: ",
      practiceTipLabel: "Practice tip: ",
      badgeSuffix: "Zone"
    },
    modeInfo: {
      chord: {
        title: "Chord / CAGED Mode",
        copy:
          "This mode keeps the original CAGED major triad view, showing how the Root, Major 3rd, and Perfect 5th sit inside each movable shape area."
      }
    },
    scaleInfo: {
      major: {
        title: "Major Scale",
        copy:
          "The major scale is useful for pop, folk, and clear melodic writing. Find the Roots first, then follow 2, 3, 4, 5, 6, and 7 to connect one position with the wider fretboard."
      },
      naturalMinor: {
        title: "Natural Minor Scale",
        copy:
          "The natural minor scale works well for darker melodies, rock ideas, and expressive lines. It teaches the sound of b3, b6, and b7 against the Root."
      },
      majorPentatonic: {
        title: "Major Pentatonic",
        copy:
          "Major pentatonic is bright and direct, common in pop, country, and melodic improvisation. With fewer notes, it is a friendly way to build fretboard memory."
      },
      minorPentatonic: {
        title: "Minor Pentatonic",
        copy:
          "Minor pentatonic is a core sound for rock, blues, and beginner improvisation. Use it to connect Roots with b3, 4, 5, and b7 across nearby positions."
      },
      blues: {
        title: "Blues Scale",
        copy:
          "The blues scale adds b5 to the minor pentatonic sound. It is useful for blues and rock phrases where you want extra tension and passing-note color."
      }
    },
    shapeInfo: {
      C: {
        name: "C Shape",
        description:
          "C Shape is based on the movable idea of the open C chord. It is useful for seeing how the Root, Major 3rd, and Perfect 5th gather around a familiar chord outline.",
        rootTip: "Start by locating the Roots around the 5th and 2nd strings, then connect them to nearby 3rds and 5ths.",
        practiceTip: "Play 1-3-5 slowly from low strings to high strings before trying to strum the whole shape."
      },
      A: {
        name: "A Shape",
        description:
          "A Shape is related to the movable A barre chord form. It is a common area for learning closed major triads from a 5th-string Root.",
        rootTip: "Focus on the Root on the 5th string. It usually acts as the anchor point for this shape.",
        practiceTip: "Start from the 5th-string Root, then find the 3rd and 5th toward both the higher and lower strings."
      },
      G: {
        name: "G Shape",
        description:
          "G Shape comes from the open G outline and covers a wider span. It is often better for understanding connections than for grabbing the whole shape at once.",
        rootTip: "Use the Roots on the 6th and 1st strings as boundaries, then study the 3rds and 5ths between them.",
        practiceTip: "Break it into small two- or three-string areas, then connect it with C Shape and E Shape."
      },
      E: {
        name: "E Shape",
        description:
          "E Shape is based on the movable E barre chord form. It is one of the most common regions for major chords, rhythm parts, and rock or blues vocabulary.",
        rootTip: "The 6th-string Root is the main anchor, and the 1st string has the same Root at the same fret.",
        practiceTip: "Use the 6th-string Root to locate the shape, then play 1-3-5 arpeggios inside the same area."
      },
      D: {
        name: "D Shape",
        description:
          "D Shape comes from the open D chord form and is often used in compact higher-position areas. It has a bright sound and works well for melodic chord ideas.",
        rootTip: "Watch the Roots around the 4th and 2nd strings. They help you find the small upper-register triangle quickly.",
        practiceTip: "Practice 1-3-5 on strings 1 through 4, then connect the shape to melody or double-stop ideas."
      }
    },
    tips: {
      eyebrow: "Learning Tips",
      title: "Turn the visual map into fretboard memory",
      tips: [
        {
          title: "Find the Root First",
          copy:
            "When you change keys, do not rush into the shape. Find the Roots first, then return to the shape you know best."
        },
        {
          title: "Remember 1-3-5",
          copy:
            "A major triad is built from 1, 3, and 5. Say the interval names as you play so the shape becomes more than a fingering."
        },
        {
          title: "Connect Neighboring Shapes",
          copy:
            "Do not treat each shape as an island. Find shared Roots between nearby regions and connect them with slides or short phrases."
        },
        {
          title: "Master One Key Before Moving On",
          copy:
            "Use C Major or G Major until you can find 1-3-5 without hesitation, then move the same idea into less familiar keys."
        }
      ]
    },
    footer: {
      author: "Author: 费浩然",
      copy: "Built for guitar learners and creative coding practice."
    },
    languageToggle: "中文"
  }
};

const dom = {};

function getNoteIndex(note) {
  return notes.indexOf(note);
}

function getChordTones(root) {
  const rootIndex = getNoteIndex(root);

  return {
    root,
    third: notes[(rootIndex + 4) % notes.length],
    fifth: notes[(rootIndex + 7) % notes.length]
  };
}

function getScaleTones(root, scaleType) {
  const rootIndex = getNoteIndex(root);
  return scaleDefinitions[scaleType].map(({ interval, semitones }) => ({
    interval,
    note: notes[(rootIndex + semitones) % notes.length]
  }));
}

function getScaleIntervalName(note, scaleTones) {
  const tone = scaleTones.find((scaleTone) => scaleTone.note === note);
  return tone ? tone.interval : "";
}

function getIntervalName(note, chordTones) {
  if (note === chordTones.root) return "R";
  if (note === chordTones.third) return "3";
  if (note === chordTones.fifth) return "5";
  return "";
}

function getSavedLanguage() {
  const savedLanguage = localStorage.getItem(languageStorageKey);
  return ["zh", "en"].includes(savedLanguage) ? savedLanguage : "";
}

function saveLanguage(lang) {
  localStorage.setItem(languageStorageKey, lang);
}

function showLanguageGate() {
  dom.languageGate.classList.remove("is-hidden");
  dom.app.classList.add("is-hidden");
  dom.app.setAttribute("aria-hidden", "true");
}

function hideLanguageGate() {
  dom.languageGate.classList.add("is-hidden");
  dom.app.classList.remove("is-hidden");
  dom.app.removeAttribute("aria-hidden");
}

function setLanguage(lang) {
  currentLanguage = ["zh", "en"].includes(lang) ? lang : "zh";
  saveLanguage(currentLanguage);
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  hideLanguageGate();
  updateTexts();
  updateView();
}

function getTranslation(path) {
  return path.split(".").reduce((source, key) => source?.[key], translations[currentLanguage]) || "";
}

function updateTexts() {
  const t = translations[currentLanguage];
  document.title = t.documentTitle;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", t.metaDescription);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = getTranslation(element.dataset.i18n);
  });

  renderConceptCards();
  renderLearningTips();
  dom.currentChordLabel.textContent = t.controls.currentChordLabel;
  dom.shapeRootLabel.textContent = t.shape.rootTipLabel;
  dom.shapePracticeLabel.textContent = t.shape.practiceTipLabel;
  dom.footerAuthor.textContent = t.footer.author;
  dom.fretboardScroll.setAttribute("aria-label", t.fretboard.scrollLabel);
  dom.fretboard.setAttribute("aria-label", t.fretboard.gridLabel);
  updateSelectOptions();
  updateLanguageToggle();
}

function updateSelectOptions() {
  [...dom.modeSelect.options].forEach((option) => {
    option.textContent = translations[currentLanguage].modes[option.value];
  });

  [...dom.scaleSelect.options].forEach((option) => {
    option.textContent = translations[currentLanguage].scales[option.value];
  });

}

function updateLanguageToggle() {
  dom.languageToggle.textContent = translations[currentLanguage].languageToggle;
  dom.languageToggle.setAttribute("aria-label", translations[currentLanguage].languageToggle);
}

function getIntervalClass(intervalName, mode = "chord") {
  if (intervalName === "R") return "interval-root";
  if (mode === "scale" && intervalName) return "interval-scale";
  if (intervalName === "3") return "interval-third";
  if (intervalName === "5") return "interval-fifth";
  return "";
}

function getNoteAtFret(openString, fret) {
  const startIndex = getNoteIndex(openString);
  return notes[(startIndex + fret) % notes.length];
}

function createCell(tagName, className, textContent) {
  const cell = document.createElement(tagName);
  cell.className = className;
  cell.textContent = textContent;
  return cell;
}

function renderCards(container, cards, className) {
  container.innerHTML = "";
  cards.forEach((card) => {
    const article = document.createElement("article");
    article.className = className;

    const title = document.createElement("h3");
    title.textContent = card.title;

    const copy = document.createElement("p");
    copy.textContent = card.copy;

    article.append(title, copy);
    container.appendChild(article);
  });
}

function renderConceptCards() {
  renderCards(dom.conceptGrid, translations[currentLanguage].concept.cards, "info-card");
}

function renderLearningTips() {
  renderCards(dom.tipsGrid, translations[currentLanguage].tips.tips, "tip-card");
}

function formatText(template, values) {
  return template.replace(/\{(\w+)}/g, (_, key) => values[key] ?? "");
}

function renderFretboard() {
  const root = dom.rootSelect.value;
  const currentMode = dom.modeSelect.value;
  const selectedShape = dom.shapeSelect.value;
  const selectedScale = dom.scaleSelect.value;
  const chordTones = getChordTones(root);
  const scaleTones = getScaleTones(root, selectedScale);
  const showAllNotes = dom.showAllNotes.checked;
  const highlightChordTones = dom.highlightChordTones.checked;
  const showIntervals = dom.showIntervals.checked;
  const [zoneStart, zoneEnd] = shapeZones[selectedShape];
  const t = translations[currentLanguage].fretboard;

  dom.fretboard.innerHTML = "";
  dom.fretboard.appendChild(createCell("div", "corner-cell", ""));

  for (let fret = 0; fret <= 12; fret += 1) {
    dom.fretboard.appendChild(createCell("div", "fret-number", fret));
  }

  strings.forEach((openString, stringIndex) => {
    const stringNumber = 6 - stringIndex;
    dom.fretboard.appendChild(createCell("div", "string-label", `${stringNumber} ${openString}`));

    for (let fret = 0; fret <= 12; fret += 1) {
      const note = getNoteAtFret(openString, fret);
      const intervalName =
        currentMode === "scale" ? getScaleIntervalName(note, scaleTones) : getIntervalName(note, chordTones);
      const isActiveTone = Boolean(intervalName);
      const cell = document.createElement("button");
      const classes = ["note-cell"];

      if (currentMode === "chord" && fret >= zoneStart && fret <= zoneEnd) classes.push("shape-zone");
      if (isActiveTone) {
        classes.push(currentMode === "scale" ? "is-scale" : "is-chord", getIntervalClass(intervalName, currentMode));
      }
      if (isActiveTone && !highlightChordTones) {
        classes.push("is-soft-highlight");
      }
      if (!showAllNotes && !isActiveTone) classes.push("is-hidden");
      if (showAllNotes && !isActiveTone) classes.push("is-muted");

      cell.type = "button";
      cell.className = classes.filter(Boolean).join(" ");
      cell.dataset.note = note;
      cell.dataset.fret = fret;
      cell.dataset.string = stringNumber;
      cell.setAttribute("role", "gridcell");
      cell.setAttribute(
        "aria-label",
        formatText(t.cellLabel, {
          stringNumber,
          fret,
          note,
          interval: intervalName ? formatText(t.intervalLabel, { interval: intervalName }) : ""
        })
      );

      const content = document.createElement("span");
      content.className = "note-content";

      const noteName = document.createElement("span");
      noteName.className = "note-name";
      noteName.textContent = showAllNotes || isActiveTone ? note : "";
      content.appendChild(noteName);

      if (showIntervals && isActiveTone) {
        const interval = document.createElement("span");
        interval.className = "interval";
        interval.textContent = intervalName;
        content.appendChild(interval);
      }

      cell.appendChild(content);
      dom.fretboard.appendChild(cell);
    }
  });
}

function updateShapeExplanation() {
  const selectedShape = dom.shapeSelect.value;
  const info = translations[currentLanguage].shapeInfo[selectedShape];
  const isChordMode = dom.modeSelect.value === "chord";

  dom.shapeExplanation.classList.toggle("is-hidden", !isChordMode);
  if (!isChordMode) return;
  dom.shapeName.textContent = info.name;
  dom.shapeDescription.textContent = info.description;
  dom.shapeRootTip.textContent = info.rootTip;
  dom.shapePracticeTip.textContent = info.practiceTip;
  dom.shapeBadge.textContent = `${info.name} ${translations[currentLanguage].shape.badgeSuffix}`;
}

function updateModeControls() {
  const currentMode = dom.modeSelect.value;
  const t = translations[currentLanguage];
  const isScaleMode = currentMode === "scale";

  dom.shapeField.classList.toggle("is-hidden", currentMode !== "chord");
  dom.scaleField.classList.toggle("is-hidden", !isScaleMode);
  dom.showAllNotes.disabled = false;
  dom.highlightChordTones.disabled = false;
  dom.showIntervals.disabled = false;
  dom.highlightToneLabel.textContent = isScaleMode ? t.controls.highlightScaleTones : t.controls.highlightChordTones;

  dom.legendRootLabel.textContent = t.legend.root;
  dom.legendThirdLabel.textContent = isScaleMode ? t.legend.scaleTone : t.legend.third;
  dom.legendFifthLabel.textContent = t.legend.fifth;
  dom.legendOtherLabel.textContent = t.legend.other;
  dom.legendFifthItem.classList.toggle("is-hidden", currentMode !== "chord");

  if (isScaleMode) {
    const scaleInfo = t.scaleInfo[dom.scaleSelect.value];
    dom.modeExplanationTitle.textContent = `${dom.rootSelect.value} ${scaleInfo.title}`;
    dom.modeExplanationCopy.textContent = scaleInfo.copy;
    dom.shapeBadge.textContent = t.modes.scale;
    return;
  }

  dom.modeExplanationTitle.textContent = t.modeInfo.chord.title;
  dom.modeExplanationCopy.textContent = t.modeInfo.chord.copy;
}

function updateCurrentTitle() {
  const currentMode = dom.modeSelect.value;
  const root = dom.rootSelect.value;
  const chordTones = getChordTones(root);
  const scaleInfo = translations[currentLanguage].scaleInfo[dom.scaleSelect.value];

  if (currentMode === "scale") {
    dom.currentChordTitle.textContent = `${root} ${scaleInfo.title}`;
    dom.currentChordTitle.setAttribute("title", `${root} ${scaleInfo.title}`);
    return;
  }

  dom.currentChordTitle.textContent = `${root} Major`;
  dom.currentChordTitle.setAttribute(
    "title",
    `${root} Major chord tones: ${chordTones.root}, ${chordTones.third}, ${chordTones.fifth}`
  );
}

function updateView() {
  updateModeControls();
  updateCurrentTitle();
  updateShapeExplanation();
  renderFretboard();
}

function bindEvents() {
  [dom.modeSelect, dom.rootSelect, dom.shapeSelect, dom.scaleSelect, dom.showAllNotes, dom.highlightChordTones, dom.showIntervals].forEach((control) => {
    control.addEventListener("change", updateView);
  });

  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scrollTarget);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  document.querySelectorAll("[data-language-choice]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.languageChoice));
  });

  dom.languageToggle.addEventListener("click", () => {
    setLanguage(currentLanguage === "zh" ? "en" : "zh");
  });
}

function cacheDom() {
  dom.languageGate = document.querySelector("#language-gate");
  dom.app = document.querySelector("#app");
  dom.languageToggle = document.querySelector("#language-toggle");
  dom.modeSelect = document.querySelector("#mode-select");
  dom.rootSelect = document.querySelector("#root-select");
  dom.shapeField = document.querySelector("#shape-field");
  dom.shapeSelect = document.querySelector("#shape-select");
  dom.scaleField = document.querySelector("#scale-field");
  dom.scaleSelect = document.querySelector("#scale-select");
  dom.showAllNotes = document.querySelector("#show-all-notes");
  dom.highlightChordTones = document.querySelector("#highlight-chord-tones");
  dom.highlightToneLabel = document.querySelector("#highlight-tone-label");
  dom.showIntervals = document.querySelector("#show-intervals");
  dom.currentChordLabel = document.querySelector("#current-chord-label");
  dom.currentChordTitle = document.querySelector("#current-chord-title");
  dom.conceptGrid = document.querySelector("#concept-grid");
  dom.tipsGrid = document.querySelector("#tips-grid");
  dom.fretboardScroll = document.querySelector("#fretboard-scroll");
  dom.fretboard = document.querySelector("#fretboard");
  dom.shapeName = document.querySelector("#shape-name");
  dom.shapeDescription = document.querySelector("#shape-description");
  dom.shapeRootLabel = document.querySelector("#shape-root-label");
  dom.shapeRootTip = document.querySelector("#shape-root-tip");
  dom.shapePracticeLabel = document.querySelector("#shape-practice-label");
  dom.shapePracticeTip = document.querySelector("#shape-practice-tip");
  dom.shapeExplanation = document.querySelector(".shape-explanation");
  dom.shapeBadge = document.querySelector("#shape-badge");
  dom.modeExplanationTitle = document.querySelector("#mode-explanation-title");
  dom.modeExplanationCopy = document.querySelector("#mode-explanation-copy");
  dom.legendRootLabel = document.querySelector("#legend-root-label");
  dom.legendThirdLabel = document.querySelector("#legend-third-label");
  dom.legendFifthLabel = document.querySelector("#legend-fifth-label");
  dom.legendOtherLabel = document.querySelector("#legend-other-label");
  dom.legendFifthItem = document.querySelector("#legend-fifth-item");
  dom.footerAuthor = document.querySelector("#footer-author");
}

function init() {
  cacheDom();
  bindEvents();

  const savedLanguage = getSavedLanguage();
  if (!savedLanguage) {
    showLanguageGate();
    return;
  }

  setLanguage(savedLanguage);
}

document.addEventListener("DOMContentLoaded", init);
