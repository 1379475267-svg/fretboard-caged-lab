const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const strings = ["E", "A", "D", "G", "B", "E"];

const shapeInfo = {
  C: {
    name: "C Shape",
    zone: [0, 4],
    description:
      "C Shape 偏向开放 C 和弦形状的移动理解。它很适合观察根音、三度音和五度音如何围绕一个熟悉的开放和弦轮廓展开。",
    rootTip: "先记住 5 弦和 2 弦附近的 Root，再把它们和周围的 3、5 连起来。",
    practiceTip: "从低音弦到高音弦慢慢弹出 1-3-5，不要急着扫完整个和弦。"
  },
  A: {
    name: "A Shape",
    zone: [2, 6],
    description:
      "A Shape 偏向 A 和弦横按形状，是学习封闭大三和弦时非常常见的区域。它能帮助你把 5 弦根音和中高音弦的和弦音连起来。",
    rootTip: "重点看 5 弦上的 Root，它通常是这个 Shape 的方向盘。",
    practiceTip: "用 5 弦 Root 起手，分别向高音弦和低音弦寻找 3、5，练成小片段。"
  },
  G: {
    name: "G Shape",
    zone: [4, 8],
    description:
      "G Shape 来自开放 G 的轮廓，跨度比较大。它不一定是最容易直接按住的形状，但很适合理解相邻 Shape 之间的连接。",
    rootTip: "把 6 弦和 1 弦上的 Root 当成边界，再观察中间弦的 3 和 5。",
    practiceTip: "不要一次按完整形状，先拆成两三根弦的小区域，再和 C Shape、E Shape 串起来。"
  },
  E: {
    name: "E Shape",
    zone: [6, 10],
    description:
      "E Shape 偏向 E 和弦横按形状，非常常用。很多大横按和布鲁斯、摇滚节奏型都会从这个区域开始建立手感。",
    rootTip: "6 弦 Root 是核心定位点，1 弦同品也会出现同名 Root。",
    practiceTip: "先用 6 弦 Root 定位，再在同一区域内弹 1-3-5 分解和弦。"
  },
  D: {
    name: "D Shape",
    zone: [8, 12],
    description:
      "D Shape 来自开放 D 和弦形状，常用于高把位的小区域。它声音明亮，适合做旋律化和弦或高音区连接。",
    rootTip: "多留意 4 弦和 2 弦附近的 Root，它们能帮你快速找到高把位小三角。",
    practiceTip: "在 1 到 4 弦之间练小范围 1-3-5，适合接到旋律或双音练习。"
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

function getIntervalName(note, chordTones) {
  if (note === chordTones.root) return "R";
  if (note === chordTones.third) return "3";
  if (note === chordTones.fifth) return "5";
  return "";
}

function getIntervalClass(intervalName) {
  if (intervalName === "R") return "interval-root";
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

function renderFretboard() {
  const root = dom.rootSelect.value;
  const selectedShape = dom.shapeSelect.value;
  const chordTones = getChordTones(root);
  const showAllNotes = dom.showAllNotes.checked;
  const highlightChordTones = dom.highlightChordTones.checked;
  const showIntervals = dom.showIntervals.checked;
  const [zoneStart, zoneEnd] = shapeInfo[selectedShape].zone;

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
      const intervalName = getIntervalName(note, chordTones);
      const isChordTone = Boolean(intervalName);
      const cell = document.createElement("button");
      const classes = ["note-cell"];

      if (fret >= zoneStart && fret <= zoneEnd) classes.push("shape-zone");
      if (isChordTone && highlightChordTones) classes.push("is-chord", getIntervalClass(intervalName));
      if (!showAllNotes && !isChordTone) classes.push("is-hidden");
      if (showAllNotes && !isChordTone) classes.push("is-muted");

      cell.type = "button";
      cell.className = classes.filter(Boolean).join(" ");
      cell.setAttribute("role", "gridcell");
      cell.setAttribute(
        "aria-label",
        `String ${stringNumber}, fret ${fret}, note ${note}${intervalName ? `, interval ${intervalName}` : ""}`
      );

      const content = document.createElement("span");
      content.className = "note-content";

      const noteName = document.createElement("span");
      noteName.className = "note-name";
      noteName.textContent = showAllNotes || isChordTone ? note : "";
      content.appendChild(noteName);

      if (showIntervals && isChordTone) {
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
  const info = shapeInfo[selectedShape];

  dom.shapeName.textContent = info.name;
  dom.shapeDescription.textContent = info.description;
  dom.shapeRootTip.textContent = info.rootTip;
  dom.shapePracticeTip.textContent = info.practiceTip;
  dom.shapeBadge.textContent = `${info.name} Zone`;
}

function updateCurrentChordTitle() {
  const root = dom.rootSelect.value;
  const chordTones = getChordTones(root);
  dom.currentChordTitle.textContent = `${root} Major`;
  dom.currentChordTitle.setAttribute(
    "title",
    `${root} Major chord tones: ${chordTones.root}, ${chordTones.third}, ${chordTones.fifth}`
  );
}

function updateView() {
  updateCurrentChordTitle();
  updateShapeExplanation();
  renderFretboard();
}

function bindEvents() {
  [
    dom.rootSelect,
    dom.shapeSelect,
    dom.showAllNotes,
    dom.highlightChordTones,
    dom.showIntervals
  ].forEach((control) => {
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
}

function cacheDom() {
  dom.rootSelect = document.querySelector("#root-select");
  dom.shapeSelect = document.querySelector("#shape-select");
  dom.showAllNotes = document.querySelector("#show-all-notes");
  dom.highlightChordTones = document.querySelector("#highlight-chord-tones");
  dom.showIntervals = document.querySelector("#show-intervals");
  dom.currentChordTitle = document.querySelector("#current-chord-title");
  dom.fretboard = document.querySelector("#fretboard");
  dom.shapeName = document.querySelector("#shape-name");
  dom.shapeDescription = document.querySelector("#shape-description");
  dom.shapeRootTip = document.querySelector("#shape-root-tip");
  dom.shapePracticeTip = document.querySelector("#shape-practice-tip");
  dom.shapeBadge = document.querySelector("#shape-badge");
}

function init() {
  cacheDom();
  bindEvents();
  updateView();
}

document.addEventListener("DOMContentLoaded", init);
