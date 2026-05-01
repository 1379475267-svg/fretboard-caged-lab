const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const strings = ["E", "A", "D", "G", "B", "E"];
const languageStorageKey = "fretboard-caged-lab-language";
const instrumentStorageKey = "fretboard-caged-lab-instrument";

let currentLanguage = "zh";

const pianoNotes = [
  "C3",
  "C#3",
  "D3",
  "D#3",
  "E3",
  "F3",
  "F#3",
  "G3",
  "G#3",
  "A3",
  "A#3",
  "B3",
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4"
];

const blackKeyOffsets = {
  "C#3": 1,
  "D#3": 2,
  "F#3": 4,
  "G#3": 5,
  "A#3": 6,
  "C#4": 8,
  "D#4": 9,
  "F#4": 11,
  "G#4": 12,
  "A#4": 13
};

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
    documentTitle: "指板与键盘乐理实验室 | 吉他与钢琴乐理可视化",
    metaDescription: "指板与键盘乐理实验室是一个面向学习者的吉他指板与钢琴键盘乐理可视化教学网页。",
    nav: {
      concept: "概念",
      basics: "入门",
      lab: "实验室",
      guide: "指南",
      tips: "学习建议"
    },
    gates: {
      languageTitle: "指板与键盘乐理实验室",
      languageEyebrow: "选择界面语言",
      languageIntro: "请选择语言，然后选择要学习的乐器。",
      instrumentEyebrow: "选择乐器",
      instrumentTitle: "你想先学习哪种乐器？",
      instrumentIntro: "选择吉他或钢琴后，页面会显示对应的乐理视图。",
      guitarNote: "进入 CAGED 与音阶指板视图",
      guitarTags: "CAGED · 指板 · Shape",
      pianoNote: "进入键盘和弦与音阶视图",
      pianoTags: "键盘 · 三和弦 · 音程"
    },
    hero: {
      button: "开始探索",
      learnConcept: "了解概念",
      neutral: {
        eyebrow: "吉他 + 钢琴乐理实验室",
        subtitle: "交互式指板与键盘乐理可视化工具",
        copy: "通过吉他指板和钢琴键盘两种视角，观察和弦、音阶、音程与乐理结构。",
        chips: ["吉他", "钢琴", "和弦", "音阶"]
      },
      guitar: {
        eyebrow: "吉他指板乐理",
        subtitle: "面向吉他学习者的 CAGED 与音阶可视化工具",
        copy:
          "选择调性、CAGED Shape 和音阶类型，观察和弦音与音阶音程如何分布在吉他指板上。",
        chips: ["CAGED", "指板", "音阶探索", "音程"]
      },
      piano: {
        eyebrow: "钢琴键盘乐理",
        subtitle: "面向钢琴学习者的三和弦与音阶可视化工具",
        copy: "选择调性和音阶类型，观察大三和弦与常见音阶如何分布在钢琴键盘上。",
        chips: ["三和弦", "键盘", "音阶探索", "音程"]
      }
    },
    concept: {
      eyebrow: "概念",
      guitar: {
        title: "什么是 CAGED 系统？",
        cards: [
          {
            title: "来自五种开放和弦形状",
            label: "CAGED",
            copy:
              "CAGED 来自 C、A、G、E、D 五种开放和弦形状。它不是一套神秘公式，而是把常见和弦形状移动到不同把位的观察方式。"
          },
          {
            title: "把和弦音放进整条指板",
            label: "和弦音",
            copy:
              "当你知道一个调的 Root、Major 3rd、Perfect 5th 在哪里，CAGED Shape 就能帮助你把零散音名连接成可演奏的区域。"
          },
          {
            title: "先理解，再练速度",
            label: "Shape 连接",
            copy:
              "第一版重点是教学演示：先看清楚大三和弦音和 Shape 的区域感，再把这些位置变成日常练习素材。"
          }
        ]
      },
      piano: {
        title: "为什么用钢琴键盘理解乐理？",
        cards: [
          {
            title: "线性的音高排列",
            label: "线性排列",
            copy: "钢琴键盘把音从低到高线性排列，音程关系更容易观察。"
          },
          {
            title: "白键与黑键",
            label: "黑白键",
            copy: "白键与黑键把 12 平均律直接呈现出来，方便理解升降音和半音移动。"
          },
          {
            title: "连接钢琴和吉他",
            label: "吉他钢琴对照",
            copy: "把钢琴键盘和吉他指板放在一起比较，可以从两种乐器视角理解同一套乐理。"
          }
        ]
      }
    },
    beginnerBasics: {
      eyebrow: "0 基础入门",
      title: "刚开始学乐理？可以先看这里。",
      intro: "如果你还不熟悉 CAGED、音程、级数这些概念，可以先展开这个小入门。已经懂基础的话，也可以直接跳过。",
      optionalBadge: "可选阅读",
      showButton: "展开 0 基础入门",
      hideButton: "收起 0 基础入门",
      piano: {
        eyebrow: "钢琴基础",
        title: "先用键盘看清音的位置",
        cards: [
          { type: "piano-white-black", title: "什么是白键和黑键？", copy: "钢琴键盘由白键和黑键组成。白键对应 C D E F G A B，黑键在白键之间，用来表示升音或降音。" },
          { type: "piano-c", title: "怎么找到 C？", copy: "每一组两个黑键左边紧挨着的白键就是 C。找到这个规律后，你就能在键盘上快速定位所有 C。", note: "C / 中央 C" },
          { type: "middle-c", title: "什么是中央 C？", copy: "中央 C 是钢琴中间附近的 C，也是连接键盘和五线谱的重要参考点。很多入门教材都会从它开始。" },
          { type: "piano-solfege", title: "音名和唱名", copy: "音名是 C D E F G A B；唱名可以对应 Do Re Mi Fa Sol La Si。先把这两排对应关系看熟就够了。", label: "Mapping", rows: ["C D E F G A B", "Do Re Mi Fa Sol La Si"] },
          { type: "piano-octaves", title: "什么是八度？", copy: "从一个 C 到下一个 C，就是一个八度。同名音会重复出现，但听起来更高或更低。" },
          { type: "piano-range", title: "88 键钢琴的大概范围", copy: "标准钢琴通常从 A0 到 C8。你不需要一开始记住所有键，先理解中央 C 附近的区域最重要。" }
        ]
      },
      cMajor: {
        eyebrow: "C 大调基础",
        title: "用 C Major 理解音阶、Root 和三和弦",
        cards: [
          { type: "piano-c-major", title: "什么是 C Major？", copy: "C Major 就是从 C 开始的大调音阶。它的音是 C D E F G A B。", note: "C Major = C D E F G A B" },
          { type: "piano-c-major", title: "为什么 C Major 适合入门？", copy: "C Major 只使用自然音。在钢琴上，它们就是一组连续白键，视觉上最容易观察。", note: "Do Re Mi Fa Sol La Si" },
          { type: "piano-c", title: "Root 是什么？", copy: "Root 可以理解成一个调、音阶或和弦的“家”。在 C Major 里，C 就是 Root。", note: "C = Root" },
          { type: "piano-scale-degrees", title: "级数和音程是什么？", copy: "级数表示每个音相对 Root 的位置。在 C Major 里，C D E F G A B 对应 R 2 3 4 5 6 7。", label: "Degrees", rows: ["C D E F G A B", "R 2 3 4 5 6 7"] },
          { type: "piano-triad", title: "为什么 C 大三和弦是 C + E + G？", copy: "大三和弦由 Root、Major 3rd 和 Perfect 5th 组成。在 C Major 里，这三个音就是 C、E、G。", note: "C + E + G" },
          { type: "piano-c-major", title: "为什么在钢琴上更容易观察？", copy: "钢琴把音从低到高排成直线，所以 C Major、三和弦和音程距离都可以直接看出来。", note: "白键形成清晰路径" }
        ]
      },
      staff: {
        eyebrow: "五线谱入门",
        title: "从高音谱号、低音谱号到基础符号",
        cards: [
          { type: "staff-basic", title: "什么是五线谱？", copy: "五线谱由五条线和四个间组成。音符写在线上或间里，用来表示音高。" },
          { type: "treble-clef", title: "高音谱号", copy: "高音谱号常用于旋律、钢琴右手和很多高音区内容。入门时可以先把它理解成“偏高音区域”。" },
          { type: "bass-clef", title: "低音谱号", copy: "低音谱号常用于钢琴左手和低音区域。它和高音谱号一起组成钢琴常见的大谱表。" },
          { type: "treble-lines", title: "高音谱号线上的音", copy: "高音谱号五条线从下到上通常是 E G B D F。先看顺序，不需要一次背完。" },
          { type: "treble-spaces", title: "高音谱号间里的音", copy: "高音谱号四个间从下到上是 F A C E。它们刚好拼成 FACE，比较容易记。" },
          { type: "bass-lines", title: "低音谱号线上的音", copy: "低音谱号五条线从下到上通常是 G B D F A。它适合观察更低的音区。" },
          { type: "bass-spaces", title: "低音谱号间里的音", copy: "低音谱号四个间从下到上是 A C E G。先记住线和间是两组不同的规律。" },
          { type: "middle-c", title: "中央 C：键盘和谱面的桥梁", copy: "中央 C 在键盘中间附近，在五线谱上常写在高音谱号下方或低音谱号上方的加线上。" },
          { type: "c-major-staff", title: "C Major 在五线谱上长什么样？", copy: "C 大调可以逐级写成 C D E F G A B C。它能把键盘、音名和谱面连接起来。" },
          { type: "accidentals", title: "谱面位置和升降号", copy: "音符的位置主要表示字母音名，升号或降号会改变音高，但不会把音符移动到另一条线或另一个间。" },
          { type: "note-values", title: "基础音符时值", copy: "全音符、二分音符和四分音符表示声音持续多久。先知道它们是节奏长度就够了。" },
          { type: "rests", title: "休止符", copy: "休止符表示暂时不发声。音乐不只有声音，也有停顿。" },
          { type: "accidentals", title: "升号、降号和还原号", copy: "升号让音升高半音，降号让音降低半音，还原号把音恢复成自然音。" },
          { type: "key-signature", title: "调号", copy: "调号写在谱号后面，告诉你这首曲子里哪些音通常要升高或降低。" },
          { type: "time-signature", title: "拍号", copy: "拍号告诉你每小节大概如何计拍。例如 4/4 常见于很多流行音乐。" },
          { type: "music-symbols", title: "常见入门音乐符号", copy: "连音线、圆滑线、重音、断奏、延长记号，以及 p / f 力度标记，都会影响演奏方式。" }
        ]
      },
      explorer: {
        eyebrow: "键盘到五线谱映射器",
        title: "点击琴键，看它在五线谱上的位置",
        rangeLabel: "范围",
        keyLabel: "调号语境",
        clefLabel: "谱表显示",
        beginnerRange: "中央 C 附近",
        fullRange: "完整键盘",
        fullRangeNote: "极高或极低的音可能需要很多加线；此视图主要用于入门识别。",
        treble: "高音谱号",
        bass: "低音谱号",
        grand: "大谱表",
        infoTitle: "当前音",
        noteName: "音名",
        octave: "八度",
        solfege: "唱名",
        staffPosition: "谱面位置",
        commonClef: "常用谱号",
        middleC: "中央 C 关系",
        farNote: "这个音距离入门谱表范围较远。",
        middleCYes: "这就是中央 C",
        middleCNear: "靠近中央 C",
        middleCNo: "远离中央 C"
      }
    },
    controls: {
      eyebrow: "交互实验室",
      currentChordLabel: "当前内容：",
      instrumentLabel: "乐器",
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
    status: {
      instrument: "当前乐器",
      mode: "当前模式",
      root: "当前 Root",
      shape: "当前 Shape",
      scale: "当前音阶"
    },
    modes: {
      chord: "和弦 / CAGED 模式",
      triad: "三和弦模式",
      scale: "音阶模式"
    },
    instruments: {
      guitar: "吉他",
      piano: "钢琴"
    },
    scales: {
      major: "大调音阶",
      naturalMinor: "自然小调音阶",
      majorPentatonic: "大调五声音阶",
      minorPentatonic: "小调五声音阶",
      blues: "布鲁斯音阶"
    },
    legend: {
      title: "音符图例",
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
    piano: {
      eyebrow: "钢琴键盘",
      title: "两组八度 C3 到 B4",
      badge: "钢琴键盘",
      scrollLabel: "可横向滚动的钢琴键盘",
      keyboardLabel: "钢琴键盘音名",
      keyLabel: "{note}，音名 {baseNote}{interval}",
      triadCopy: "在钢琴视图中，此模式展示基础大三和弦：Root、Major 3rd 和 Perfect 5th。"
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
        guitarCopy: "大调音阶适合学习流行、民谣和常见旋律。先找 Root，再观察 2、3、4、5、6、7 的排列，可以把单个把位和整条指板连接起来。",
        pianoCopy: "大调音阶适合学习流行、民谣和常见旋律。先找 Root，再沿着键盘观察 2、3、4、5、6、7 的半音距离。"
      },
      naturalMinor: {
        title: "自然小调音阶",
        guitarCopy: "自然小调音阶适合较暗的旋律、摇滚和抒情片段。它能帮助你理解 b3、b6、b7 的声音，并和大调音阶作对比。",
        pianoCopy: "自然小调音阶适合较暗的旋律、摇滚和抒情片段。钢琴键盘能清楚显示 b3、b6、b7 与 Root 的距离。"
      },
      majorPentatonic: {
        title: "大调五声音阶",
        guitarCopy: "大调五声音阶声音明亮，常用于流行、乡村和轻快即兴。音少、冲突少，很适合建立旋律感和指板记忆。",
        pianoCopy: "大调五声音阶声音明亮，常用于流行、乡村和轻快即兴。键盘视图能帮助你快速看出五个核心音的间隔。"
      },
      minorPentatonic: {
        title: "小调五声音阶",
        guitarCopy: "小调五声音阶是摇滚、布鲁斯和即兴入门的核心素材。先记住 Root 与 b3、4、5、b7 的关系，再横向连接不同把位。",
        pianoCopy: "小调五声音阶是摇滚、布鲁斯和即兴入门的核心素材。键盘上的 b3、4、5、b7 可以帮助你理解它的声音结构。"
      },
      blues: {
        title: "布鲁斯音阶",
        guitarCopy: "布鲁斯音阶在小调五声音阶中加入 b5，适合布鲁斯、摇滚和带张力的短句。注意 b5 的经过音效果，不必每次都停留太久。",
        pianoCopy: "布鲁斯音阶在小调五声音阶中加入 b5。钢琴键盘能清楚显示 b5 如何夹在 4 和 5 之间，形成布鲁斯张力。"
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
    learningPath: {
      eyebrow: "学习路径",
      title: "更清晰地使用这个实验室",
      intro: "不要一开始就乱切所有选项，可以按照一个小路径慢慢观察。",
      cards: [
        {
          title: "先选择乐器",
          copy: "从吉他或钢琴开始。两个视图展示的是同一套乐理，只是视觉结构不同。"
        },
        {
          title: "固定一个 Root",
          copy: "先固定一个 Root，比如 C 或 G。这样更容易比较不同音程之间的关系。"
        },
        {
          title: "先看和弦音",
          copy: "在 CAGED / 三和弦模式中，先观察 Root、Major 3rd 和 Perfect 5th，再进入完整音阶。"
        },
        {
          title: "再打开音阶模式",
          copy: "当三和弦结构看清楚后，再切换到音阶模式，观察更多音程如何填满乐器。"
        },
        {
          title: "对比两种乐器",
          copy: "用同一个 Root 和音阶分别看吉他与钢琴，能帮助你建立更完整的乐理记忆。"
        }
      ]
    },
    scaleGuide: {
      eyebrow: "音阶声音指南",
      title: "每种音阶大概是什么感觉",
      intro: "不同音阶会带来不同的音乐色彩。你可以用可视化工具把声音感觉和位置结构连接起来。",
      cards: [
        {
          title: "大调音阶",
          label: "明亮 / 完整",
          copy: "大调音阶稳定、明亮、完整，常用于流行、民谣、影视配乐和清晰旋律写作。"
        },
        {
          title: "自然小调",
          label: "暗色 / 情绪",
          copy: "自然小调听起来更暗、更有情绪感。它能帮助你理解 b3、b6、b7 如何改变一个调的色彩。"
        },
        {
          title: "大调五声音阶",
          label: "开阔 / 旋律",
          copy: "大调五声音阶减少了容易产生冲突的音，声音更开阔、干净、容易写出旋律。"
        },
        {
          title: "小调五声音阶",
          label: "摇滚 / 布鲁斯",
          copy: "小调五声音阶是摇滚、布鲁斯和即兴里非常核心的声音，结构紧凑，也很适合做短句。"
        },
        {
          title: "布鲁斯音阶",
          label: "张力 / 色彩",
          copy: "布鲁斯音阶在小调五声音阶中加入 b5，这个音会制造经过张力，形成经典布鲁斯色彩。"
        }
      ]
    },
    comparison: {
      eyebrow: "吉他与钢琴对照",
      title: "用两种视角理解同一套乐理",
      intro: "吉他和钢琴组织音符的方式不同。把它们放在一起比较，可以减少死记手型，真正理解乐理关系。",
      labels: {
        guitar: "吉他",
        piano: "钢琴",
        takeaway: "结论"
      },
      rows: [
        {
          guitar: "音符分布在不同琴弦和品格上。",
          piano: "音符从低到高线性排列。",
          takeaway: "吉他偏空间分布，钢琴偏线性排列。"
        },
        {
          guitar: "同一个音可以出现在多个位置。",
          piano: "同名音会按照八度规律重复出现。",
          takeaway: "吉他训练位置选择，钢琴帮助观察音程距离。"
        },
        {
          guitar: "CAGED 可以把指板分成可移动区域。",
          piano: "键盘布局能清楚显示半音和音程。",
          takeaway: "两种视角本质上都在解释 Root、3、5 和音阶级数。"
        }
      ]
    },
    routine: {
      eyebrow: "练习流程",
      title: "10 分钟可视化练习",
      intro: "一个短流程就能把可视化地图慢慢变成真正的音乐记忆。",
      steps: [
        {
          title: "2 分钟：寻找 Root",
          copy: "选择一个 Root，在吉他指板或钢琴键盘上找到它的位置。"
        },
        {
          title: "3 分钟：观察三和弦",
          copy: "保持在 CAGED / 三和弦模式，重点观察 Root、Major 3rd 和 Perfect 5th。"
        },
        {
          title: "3 分钟：打开音阶",
          copy: "切换到音阶模式，观察所选音阶如何围绕三和弦结构展开。"
        },
        {
          title: "2 分钟：对比视图",
          copy: "用同一个 Root 和音阶在吉他与钢琴之间切换，观察哪些东西变了，哪些东西没有变。"
        }
      ]
    },
    tips: {
      eyebrow: "学习建议",
      title: "把可视化变成真正的乐理记忆",
      tips: [
        {
          title: "先找 Root",
          copy: "每换一个调，先找到 Root。吉他上先看 6 弦和 5 弦，钢琴上先看键盘上的同名音。"
        },
        {
          title: "记住 1-3-5",
          copy: "大三和弦的骨架是 Root、Major 3rd、Perfect 5th。先把这三个音看熟，再去理解更复杂的和弦。"
        },
        {
          title: "吉他上连接 Shape",
          copy: "不要把 C、A、G、E、D Shape 当成孤岛。找到相邻 Shape 共享的 Root，再尝试用短句连接起来。"
        },
        {
          title: "钢琴上观察半音距离",
          copy: "钢琴键盘适合观察半音关系。比如 3 和 b3、5 和 b5 的差别，放在键盘上会非常直观。"
        },
        {
          title: "一个调练熟再换调",
          copy: "先用 C Major 或 G Major 观察和弦音与音阶音，再迁移到 F#、A# 这类不熟悉的调。"
        },
        {
          title: "对比吉他和钢琴",
          copy: "同一个 C Major，在吉他上是位置分布，在钢琴上是线性排列。两种视角一起看，乐理会更容易建立整体感。"
        },
        {
          title: "先看音程，再看手型",
          copy: "不要只记按法。看到一个音时，试着判断它是 Root、3、5、b7 还是其他音程。"
        },
        {
          title: "少量多次练习",
          copy: "每次只选一个 Root 和一个音阶，观察 3 到 5 分钟，比一次性乱看很多音阶更有效。"
        }
      ]
    },
    footer: {
      author: "作者：费浩然",
      copy: "为音乐学习者和 creative coding 练习而构建。"
    },
    languageToggle: "English"
  },
  en: {
    documentTitle: "Fret & Key Theory Lab | Guitar and Piano Theory Visualizer",
    metaDescription:
      "Fret & Key Theory Lab is an interactive guitar fretboard and piano keyboard music theory visualizer.",
    nav: {
      concept: "Concept",
      basics: "Basics",
      lab: "Lab",
      guide: "Guide",
      tips: "Tips"
    },
    gates: {
      languageTitle: "Fret & Key Theory Lab",
      languageEyebrow: "Choose Your Interface",
      languageIntro: "Choose a language, then choose the instrument you want to study.",
      instrumentEyebrow: "Choose Instrument",
      instrumentTitle: "Which instrument do you want to study first?",
      instrumentIntro: "Choose Guitar or Piano and the app will open the matching theory view.",
      guitarNote: "Open the CAGED and scale fretboard view",
      guitarTags: "CAGED · Fretboard · Shapes",
      pianoNote: "Open the keyboard triad and scale view",
      pianoTags: "Keyboard · Triads · Intervals"
    },
    hero: {
      button: "Start Exploring",
      learnConcept: "Learn Concept",
      neutral: {
        eyebrow: "Guitar + Piano Theory Lab",
        subtitle: "Interactive Fretboard and Keyboard Theory Visualizer",
        copy: "Explore chords, scales, intervals, and theory patterns through both guitar fretboard and piano keyboard views.",
        chips: ["Guitar", "Piano", "Chords", "Scales"]
      },
      guitar: {
        eyebrow: "Guitar Fretboard Theory",
        subtitle: "CAGED and Scale Visualizer for Guitar Learners",
        copy:
          "Choose a key, CAGED shape, and scale type to see how chord tones and scale intervals sit across the guitar fretboard.",
        chips: ["CAGED", "Fretboard", "Scale Explorer", "Intervals"]
      },
      piano: {
        eyebrow: "Piano Keyboard Theory",
        subtitle: "Triad and Scale Visualizer for Piano Learners",
        copy: "Choose a key and scale type to see how major triads and common scale intervals sit across the piano keyboard.",
        chips: ["Triads", "Keyboard", "Scale Explorer", "Intervals"]
      }
    },
    concept: {
      eyebrow: "Concept",
      guitar: {
        title: "What is the CAGED system?",
        cards: [
          {
            title: "Built from five open chord shapes",
            label: "CAGED",
            copy:
              "CAGED comes from the open C, A, G, E, and D chord shapes. It is a practical way to move familiar chord forms into different fretboard positions."
          },
          {
            title: "Place chord tones across the fretboard",
            label: "Chord Tones",
            copy:
              "When you can see where the Root, Major 3rd, and Perfect 5th sit in a key, CAGED shapes become usable regions instead of isolated diagrams."
          },
          {
            title: "Understand first, then build speed",
            label: "Shape Connection",
            copy:
              "This first version is a visual teaching demo. The goal is to see chord tones and shape areas clearly before turning them into daily practice material."
          }
        ]
      },
      piano: {
        title: "Why use a piano keyboard for theory?",
        cards: [
          {
            title: "Linear note layout",
            label: "Linear Layout",
            copy: "The piano keyboard lays notes out from low to high in a straight line, making intervals easier to see."
          },
          {
            title: "White keys and black keys",
            label: "White / Black Keys",
            copy: "White and black keys make the 12-tone system visible, helping learners understand sharps, flats, and semitone movement."
          },
          {
            title: "Connect piano and guitar",
            label: "Guitar-Piano Mapping",
            copy: "Comparing piano keys with guitar fretboard positions helps learners understand the same theory from two instrument perspectives."
          }
        ]
      }
    },
    beginnerBasics: {
      eyebrow: "Beginner Basics",
      title: "New to music theory? Start here.",
      intro: "If CAGED, intervals, and scale degrees feel unfamiliar, open this short guide first. You can skip it if you already know the basics.",
      optionalBadge: "Optional",
      showButton: "Show beginner guide",
      hideButton: "Hide beginner guide",
      piano: {
        eyebrow: "Piano Basics",
        title: "Start by seeing notes on the keyboard",
        cards: [
          { type: "piano-white-black", title: "What are white and black keys?", copy: "The piano keyboard has white keys and black keys. White keys use C D E F G A B. Black keys sit between them and can be named as sharps or flats." },
          { type: "piano-c", title: "How do you find C?", copy: "Every group of two black keys has a white key immediately to the left. That white key is C. This pattern repeats across the keyboard.", note: "C / Middle C" },
          { type: "middle-c", title: "What is Middle C?", copy: "Middle C is the C near the center of the piano. It is also an important bridge between keyboard notes and staff notation." },
          { type: "piano-solfege", title: "Note names and solfege", copy: "Note names are C D E F G A B. Solfege can match them as Do Re Mi Fa Sol La Ti or Si. Start by seeing these two rows together.", label: "Mapping", rows: ["C D E F G A B", "Do Re Mi Fa Sol La Ti / Si"] },
          { type: "piano-octaves", title: "What is an octave?", copy: "From one C to the next C is an octave. The note name repeats, but the sound is higher or lower." },
          { type: "piano-range", title: "The rough range of an 88-key piano", copy: "A standard piano usually runs from A0 to C8. Beginners do not need to memorize every key. Start around Middle C first." }
        ]
      },
      cMajor: {
        eyebrow: "C Major Basics",
        title: "Use C Major to understand scales, Root, and triads",
        cards: [
          { type: "piano-c-major", title: "What is C Major?", copy: "C Major is a major scale starting from C. Its notes are C D E F G A B.", note: "C Major = C D E F G A B" },
          { type: "piano-c-major", title: "Why is C Major beginner-friendly?", copy: "C Major uses only natural notes. On piano, those notes are the white keys from C to B, so the layout is easy to observe.", note: "Do Re Mi Fa Sol La Ti / Si" },
          { type: "piano-c", title: "What is Root?", copy: "Root is the home note of a key, scale, or chord. In C Major, C is the Root.", note: "C = Root" },
          { type: "piano-scale-degrees", title: "What are scale degrees and intervals?", copy: "Scale degrees describe each note compared with the Root. In C Major, C D E F G A B becomes R 2 3 4 5 6 7.", label: "Degrees", rows: ["C D E F G A B", "R 2 3 4 5 6 7"] },
          { type: "piano-triad", title: "Why is C major chord C + E + G?", copy: "A major triad uses Root, Major 3rd, and Perfect 5th. In C Major, those notes are C, E, and G.", note: "C + E + G" },
          { type: "piano-c-major", title: "Why is C Major easy to see on piano?", copy: "Piano places notes in a straight line, so C Major, triads, and interval distances are visible at a glance.", note: "White keys form a clear path" }
        ]
      },
      staff: {
        eyebrow: "Staff Notation Basics",
        title: "From treble and bass clef to beginner symbols",
        cards: [
          { type: "staff-basic", title: "What is a staff?", copy: "A staff has five horizontal lines and four spaces. Notes are placed on the lines or in the spaces to show pitch." },
          { type: "treble-clef", title: "Treble clef", copy: "Treble clef is often used for melodies, piano right hand, and higher notes. For beginners, think of it as the higher note area." },
          { type: "bass-clef", title: "Bass clef", copy: "Bass clef is often used for piano left hand and lower notes. Together with treble clef, it forms the grand staff." },
          { type: "treble-lines", title: "Treble-clef line notes", copy: "Treble-clef lines from bottom to top are usually E G B D F. Notice the pattern first; memorization can come later." },
          { type: "treble-spaces", title: "Treble-clef space notes", copy: "Treble-clef spaces from bottom to top are F A C E. This spells FACE, which makes it beginner-friendly." },
          { type: "bass-lines", title: "Bass-clef line notes", copy: "Bass-clef lines from bottom to top are usually G B D F A. They describe a lower pitch range." },
          { type: "bass-spaces", title: "Bass-clef space notes", copy: "Bass-clef spaces from bottom to top are A C E G. Lines and spaces each have their own pattern." },
          { type: "middle-c", title: "Middle C as a bridge", copy: "Middle C sits near the center of the keyboard. On the staff, it often appears on a ledger line below treble clef or above bass clef." },
          { type: "c-major-staff", title: "How does C Major look on the staff?", copy: "The C major scale can be written step by step as C D E F G A B C. This connects keys, note names, and written notation." },
          { type: "accidentals", title: "Staff position vs accidentals", copy: "The notehead position shows the letter name. Accidentals such as # or b change the pitch without changing the basic line or space." },
          { type: "note-values", title: "Basic note values", copy: "Whole notes, half notes, and quarter notes describe how long sounds last. For now, just notice that notes have duration." },
          { type: "rests", title: "Basic rests", copy: "Rests show silence. Music is made from both sound and space." },
          { type: "accidentals", title: "Sharps, flats, and naturals", copy: "A sharp raises a note by one semitone. A flat lowers it by one semitone. A natural returns it to the normal note." },
          { type: "key-signature", title: "Key signatures", copy: "A key signature appears after the clef and tells you which notes are usually sharp or flat in the piece." },
          { type: "time-signature", title: "Time signatures", copy: "A time signature tells you how beats are grouped in each measure. 4/4 is common in pop and beginner music." },
          { type: "music-symbols", title: "Common beginner symbols", copy: "Ties, slurs, accents, staccato dots, fermatas, and p / f dynamic marks all shape how notes are played." }
        ]
      },
      explorer: {
        eyebrow: "Keyboard-to-Staff Explorer",
        title: "Click a piano key to see its staff position",
        rangeLabel: "Range",
        keyLabel: "Key context",
        clefLabel: "Staff view",
        beginnerRange: "Around Middle C",
        fullRange: "Full Keyboard",
        fullRangeNote: "Extreme notes may need many ledger lines; this view focuses on beginner recognition.",
        treble: "Treble",
        bass: "Bass",
        grand: "Grand Staff",
        infoTitle: "Selected note",
        noteName: "Note name",
        octave: "Octave",
        solfege: "Solfege",
        staffPosition: "Staff position",
        commonClef: "Common clef",
        middleC: "Middle C relation",
        farNote: "This note is far outside the beginner staff range.",
        middleCYes: "This is Middle C",
        middleCNear: "Near Middle C",
        middleCNo: "Away from Middle C"
      }
    },
    controls: {
      eyebrow: "Interactive Lab",
      currentChordLabel: "Current:",
      instrumentLabel: "Instrument",
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
    status: {
      instrument: "Instrument",
      mode: "Mode",
      root: "Root",
      shape: "Shape",
      scale: "Scale"
    },
    modes: {
      chord: "Chord / CAGED Mode",
      triad: "Triad Mode",
      scale: "Scale Mode"
    },
    instruments: {
      guitar: "Guitar",
      piano: "Piano"
    },
    scales: {
      major: "Major Scale",
      naturalMinor: "Natural Minor Scale",
      majorPentatonic: "Major Pentatonic",
      minorPentatonic: "Minor Pentatonic",
      blues: "Blues Scale"
    },
    legend: {
      title: "Tone Legend",
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
    piano: {
      eyebrow: "Piano Keyboard",
      title: "Two octaves from C3 to B4",
      badge: "Piano Keyboard",
      scrollLabel: "Scrollable piano keyboard",
      keyboardLabel: "Piano keyboard notes",
      keyLabel: "{note}, note {baseNote}{interval}",
      triadCopy: "On piano, this mode shows the basic major triad: Root, Major 3rd, and Perfect 5th."
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
        guitarCopy:
          "The major scale is useful for pop, folk, and clear melodic writing. Find the Roots first, then follow 2, 3, 4, 5, 6, and 7 to connect one position with the wider fretboard.",
        pianoCopy:
          "The major scale is useful for pop, folk, and clear melodic writing. On the keyboard, follow 2, 3, 4, 5, 6, and 7 to see the interval distances from the Root."
      },
      naturalMinor: {
        title: "Natural Minor Scale",
        guitarCopy:
          "The natural minor scale works well for darker melodies, rock ideas, and expressive lines. It teaches the sound of b3, b6, and b7 against the Root.",
        pianoCopy:
          "The natural minor scale works well for darker melodies, rock ideas, and expressive lines. The keyboard makes b3, b6, and b7 easy to compare against the Root."
      },
      majorPentatonic: {
        title: "Major Pentatonic",
        guitarCopy:
          "Major pentatonic is bright and direct, common in pop, country, and melodic improvisation. With fewer notes, it is a friendly way to build fretboard memory.",
        pianoCopy:
          "Major pentatonic is bright and direct, common in pop, country, and melodic improvisation. The keyboard view makes the five-note spacing easy to see."
      },
      minorPentatonic: {
        title: "Minor Pentatonic",
        guitarCopy:
          "Minor pentatonic is a core sound for rock, blues, and beginner improvisation. Use it to connect Roots with b3, 4, 5, and b7 across nearby positions.",
        pianoCopy:
          "Minor pentatonic is a core sound for rock, blues, and beginner improvisation. The keyboard view shows how b3, 4, 5, and b7 relate to the Root."
      },
      blues: {
        title: "Blues Scale",
        guitarCopy:
          "The blues scale adds b5 to the minor pentatonic sound. It is useful for blues and rock phrases where you want extra tension and passing-note color.",
        pianoCopy:
          "The blues scale adds b5 to the minor pentatonic sound. On the keyboard, b5 is easy to see between 4 and 5 as a tension note."
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
    learningPath: {
      eyebrow: "Learning Path",
      title: "A simple way to use this lab",
      intro: "Follow a small learning path instead of switching everything randomly.",
      cards: [
        {
          title: "Choose an instrument",
          copy: "Start with Guitar or Piano. Each view shows the same theory through a different visual layout."
        },
        {
          title: "Choose one Root",
          copy: "Stay with one Root first, such as C or G. This makes intervals easier to compare."
        },
        {
          title: "Study chord tones",
          copy: "In CAGED / Triad Mode, focus on Root, Major 3rd, and Perfect 5th before moving to full scales."
        },
        {
          title: "Open Scale Mode",
          copy: "After the triad feels clear, switch to Scale Mode and observe how more intervals fill the instrument."
        },
        {
          title: "Compare both instruments",
          copy: "Look at the same Root and scale on Guitar and Piano. The contrast helps build stronger music theory memory."
        }
      ]
    },
    scaleGuide: {
      eyebrow: "Scale Sound Guide",
      title: "What each scale feels like",
      intro: "Different scales create different musical colors. Use the visualizer to connect the sound with the layout.",
      cards: [
        {
          title: "Major Scale",
          label: "Bright / Complete",
          copy: "The major scale is stable, bright, and complete. It is useful for pop, folk, worship, film music, and clear melodic writing."
        },
        {
          title: "Natural Minor",
          label: "Dark / Emotional",
          copy: "Natural minor feels darker and more emotional. It helps learners hear how b3, b6, and b7 change the color of a key."
        },
        {
          title: "Major Pentatonic",
          label: "Open / Melodic",
          copy: "Major pentatonic removes tension-heavy notes and sounds open, clean, and singable. It is friendly for melody building."
        },
        {
          title: "Minor Pentatonic",
          label: "Rock / Blues",
          copy: "Minor pentatonic is one of the most useful sounds for rock, blues, and improvisation. It is compact and easy to phrase with."
        },
        {
          title: "Blues Scale",
          label: "Tension / Color",
          copy: "The blues scale adds b5 to minor pentatonic. That extra note creates a strong passing tension and a classic blues color."
        }
      ]
    },
    comparison: {
      eyebrow: "Guitar vs Piano",
      title: "Two views of the same theory",
      intro: "Guitar and piano organize notes differently. Comparing them helps learners understand theory instead of memorizing only shapes.",
      labels: {
        guitar: "Guitar",
        piano: "Piano",
        takeaway: "Takeaway"
      },
      rows: [
        {
          guitar: "Notes are distributed across strings and frets.",
          piano: "Notes are arranged linearly from low to high.",
          takeaway: "Guitar is spatial; piano is linear."
        },
        {
          guitar: "The same note appears in multiple places.",
          piano: "The same note name repeats predictably by octave.",
          takeaway: "Guitar teaches position choices; piano teaches interval distance."
        },
        {
          guitar: "CAGED helps divide the fretboard into movable regions.",
          piano: "Keyboard layout makes semitones and intervals easy to see.",
          takeaway: "Both views explain the same Root, 3rd, 5th, and scale degrees."
        }
      ]
    },
    routine: {
      eyebrow: "Practice Routine",
      title: "10-minute visual practice",
      intro: "A short routine can turn the visual map into real musical memory.",
      steps: [
        {
          title: "2 minutes: Root search",
          copy: "Pick one Root and find it across the guitar fretboard or piano keyboard."
        },
        {
          title: "3 minutes: Triad focus",
          copy: "Stay in CAGED / Triad Mode and identify Root, Major 3rd, and Perfect 5th."
        },
        {
          title: "3 minutes: Scale view",
          copy: "Switch to Scale Mode and observe how the selected scale expands around the triad."
        },
        {
          title: "2 minutes: Compare views",
          copy: "Switch between Guitar and Piano using the same Root and scale, then notice what changes and what stays the same."
        }
      ]
    },
    tips: {
      eyebrow: "Learning Tips",
      title: "Turn the visual map into musical memory",
      tips: [
        {
          title: "Find the Root First",
          copy:
            "When changing keys, find the Root first. On guitar, start with the 6th and 5th strings. On piano, locate the same note names on the keyboard."
        },
        {
          title: "Remember 1-3-5",
          copy:
            "A major triad is built from Root, Major 3rd, and Perfect 5th. Learn these three notes before moving into more complex chords."
        },
        {
          title: "Connect Guitar Shapes",
          copy:
            "Do not treat C, A, G, E, and D shapes as isolated islands. Find shared Roots between nearby shapes and connect them with short phrases."
        },
        {
          title: "Observe Semitone Distance on Piano",
          copy:
            "The piano keyboard is great for seeing semitone movement. Differences like 3 vs b3 or 5 vs b5 become much clearer on the keyboard."
        },
        {
          title: "Master One Key Before Moving On",
          copy:
            "Start with C Major or G Major. Understand the chord tones and scale tones first, then move the same idea into harder keys."
        },
        {
          title: "Compare Guitar and Piano",
          copy:
            "The same C Major idea appears as positions on guitar and as a linear layout on piano. Comparing both views builds stronger theory awareness."
        },
        {
          title: "Think in Intervals, Not Only Shapes",
          copy:
            "Do not only memorize fingerings. When you see a note, ask whether it is Root, 3, 5, b7, or another interval."
        },
        {
          title: "Practice in Small Loops",
          copy:
            "Choose one Root and one scale for a few minutes. Focused repetition is more useful than switching through every scale too quickly."
        }
      ]
    },
    footer: {
      author: "Author: 费浩然",
      copy: "Built for music learners and creative coding practice."
    },
    languageToggle: "中文"
  }
};

const dom = {};
let revealObserver;
let beginnerBasicsExpanded = false;
const explorerState = {
  range: "beginner",
  key: "C",
  clef: "grand",
  selectedMidi: 60
};

const explorerKeys = {
  C: { label: "C Major", labelZh: "C 大调", spellings: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] },
  G: { label: "G Major", labelZh: "G 大调", spellings: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] },
  D: { label: "D Major", labelZh: "D 大调", spellings: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] },
  A: { label: "A Major", labelZh: "A 大调", spellings: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] },
  F: { label: "F Major", labelZh: "F 大调", spellings: ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"] },
  Bb: { label: "Bb Major", labelZh: "Bb 大调", spellings: ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"] },
  Am: { label: "A Minor", labelZh: "A 小调", spellings: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] },
  Em: { label: "E Minor", labelZh: "E 小调", spellings: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] },
  Dm: { label: "D Minor", labelZh: "D 小调", spellings: ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"] }
};

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

function getBaseNote(noteWithOctave) {
  return noteWithOctave.replace(/\d/g, "");
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

function getSavedInstrument() {
  const savedInstrument = localStorage.getItem(instrumentStorageKey);
  return ["guitar", "piano"].includes(savedInstrument) ? savedInstrument : "";
}

function saveLanguage(lang) {
  localStorage.setItem(languageStorageKey, lang);
}

function saveInstrument(instrument) {
  localStorage.setItem(instrumentStorageKey, instrument);
}

function updateGateTexts() {
  const t = translations[currentLanguage];

  dom.languageGateTitle.textContent = t.gates.languageTitle;
  dom.languageGateEyebrow.textContent = "Choose Your Interface / 选择界面语言";
  dom.languageGateIntro.textContent = "Choose a language first. / 请先选择语言。";
  dom.instrumentGateEyebrow.textContent = t.gates.instrumentEyebrow;
  dom.instrumentGateTitle.textContent = t.gates.instrumentTitle;
  dom.instrumentGateIntro.textContent = t.gates.instrumentIntro;
  dom.instrumentGateGuitarName.textContent = t.instruments.guitar;
  dom.instrumentGateGuitarTags.textContent = t.gates.guitarTags;
  dom.instrumentGateGuitarNote.textContent = t.gates.guitarNote;
  dom.instrumentGatePianoName.textContent = t.instruments.piano;
  dom.instrumentGatePianoTags.textContent = t.gates.pianoTags;
  dom.instrumentGatePianoNote.textContent = t.gates.pianoNote;
}

function showLanguageGate() {
  updateGateTexts();
  dom.languageGate.classList.remove("is-hidden");
  dom.instrumentGate.classList.add("is-hidden");
  dom.app.classList.add("is-hidden");
  dom.app.setAttribute("aria-hidden", "true");
}

function showInstrumentGate() {
  updateGateTexts();
  dom.languageGate.classList.add("is-hidden");
  dom.instrumentGate.classList.remove("is-hidden");
  dom.app.classList.add("is-hidden");
  dom.app.setAttribute("aria-hidden", "true");
}

function showApp() {
  dom.languageGate.classList.add("is-hidden");
  dom.instrumentGate.classList.add("is-hidden");
  updateTexts();
  updateView();
  dom.app.classList.remove("is-hidden");
  dom.app.removeAttribute("aria-hidden");
}

function applyLanguage(lang) {
  currentLanguage = ["zh", "en"].includes(lang) ? lang : "zh";
  saveLanguage(currentLanguage);
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  updateGateTexts();
}

function chooseLanguage(lang) {
  applyLanguage(lang);
  const savedInstrument = getSavedInstrument();

  if (!savedInstrument) {
    showInstrumentGate();
    return;
  }

  dom.instrumentSelect.value = savedInstrument;
  showApp();
}

function chooseInstrument(instrument) {
  const selectedInstrument = ["guitar", "piano"].includes(instrument) ? instrument : "guitar";
  saveInstrument(selectedInstrument);
  dom.instrumentSelect.value = selectedInstrument;
  showApp();
}

function flashGateSelection(button, callback) {
  button.classList.add("is-selected");
  window.setTimeout(callback, 180);
}

function changeLanguage(lang) {
  applyLanguage(lang);
  updateTexts();
  updateView();
}

function getTranslation(path) {
  return path.split(".").reduce((source, key) => source?.[key], translations[currentLanguage]) || "";
}

function updateTexts() {
  const t = translations[currentLanguage];
  document.title = t.documentTitle;
  dom.heroTitle.textContent = t.gates.languageTitle;
  dom.brand.setAttribute("aria-label", `${t.gates.languageTitle} home`);

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", t.metaDescription);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = getTranslation(element.dataset.i18n);
  });

  updateHeroText();
  renderConceptCards();
  renderBeginnerBasics();
  renderLearningPath();
  renderScaleGuide();
  renderComparison();
  renderRoutine();
  renderLearningTips();
  dom.currentChordLabel.textContent = t.controls.currentChordLabel;
  dom.shapeRootLabel.textContent = t.shape.rootTipLabel;
  dom.shapePracticeLabel.textContent = t.shape.practiceTipLabel;
  dom.footerAuthor.textContent = t.footer.author;
  dom.fretboardScroll.setAttribute("aria-label", t.fretboard.scrollLabel);
  dom.fretboard.setAttribute("aria-label", t.fretboard.gridLabel);
  dom.pianoScroll.setAttribute("aria-label", t.piano.scrollLabel);
  dom.pianoKeyboard.setAttribute("aria-label", t.piano.keyboardLabel);
  updateSelectOptions();
  updateLanguageToggle();
}

function updateSelectOptions() {
  [...dom.instrumentSelect.options].forEach((option) => {
    option.textContent = translations[currentLanguage].instruments[option.value];
  });

  [...dom.modeSelect.options].forEach((option) => {
    const isPianoTriad = dom.instrumentSelect.value === "piano" && option.value === "chord";
    option.textContent = isPianoTriad
      ? translations[currentLanguage].modes.triad
      : translations[currentLanguage].modes[option.value];
  });

  [...dom.scaleSelect.options].forEach((option) => {
    option.textContent = translations[currentLanguage].scales[option.value];
  });

}

function getCurrentInstrument() {
  return dom.instrumentSelect.value || getSavedInstrument() || "guitar";
}

function updateHeroText() {
  const instrument = getCurrentInstrument();
  const hero = translations[currentLanguage].hero[instrument] || translations[currentLanguage].hero.neutral;

  dom.heroEyebrow.textContent = hero.eyebrow;
  dom.heroSubtitle.textContent = hero.subtitle;
  dom.heroCopy.textContent = hero.copy;
  dom.heroChips.innerHTML = "";
  hero.chips.forEach((chip) => {
    const item = document.createElement("span");
    item.className = "hero-chip";
    item.textContent = chip;
    dom.heroChips.appendChild(item);
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
  cards.forEach((card, index) => {
    const article = document.createElement("article");
    article.className = className;

    const meta = document.createElement("div");
    meta.className = "card-meta";

    const number = document.createElement("span");
    number.className = "card-number";
    number.textContent = String(index + 1).padStart(2, "0");
    meta.appendChild(number);

    if (card.label) {
      const label = document.createElement("span");
      label.className = "card-label";
      label.textContent = card.label;
      meta.appendChild(label);
    }

    const title = document.createElement("h3");
    title.textContent = card.title;

    const copy = document.createElement("p");
    copy.textContent = card.copy;

    article.append(meta, title, copy);
    container.appendChild(article);
  });
  observeRevealElements(container.querySelectorAll(`.${className}`));
}

function renderConceptCards() {
  const concept = translations[currentLanguage].concept[getCurrentInstrument()];
  dom.conceptTitle.textContent = concept.title;
  renderCards(dom.conceptGrid, concept.cards, "info-card");
}

function renderBeginnerBasics() {
  const beginner = translations[currentLanguage].beginnerBasics;
  dom.beginnerOptionalBadge.textContent = beginner.optionalBadge;
  updateBeginnerToggleText();

  if (beginnerBasicsExpanded) {
    dom.beginnerContent.hidden = false;
    window.requestAnimationFrame(() => dom.beginnerContent.classList.add("is-expanded"));
  } else {
    dom.beginnerContent.classList.remove("is-expanded");
    dom.beginnerContent.hidden = true;
  }

  dom.beginnerPiano.innerHTML = "";
  dom.beginnerCMajor.innerHTML = "";
  dom.beginnerStaff.innerHTML = "";
  dom.keyboardStaffExplorer.innerHTML = "";

  beginner.piano.cards.forEach((card, index) => {
    dom.beginnerPiano.appendChild(createBeginnerCard(card, index, card.type));
  });

  beginner.cMajor.cards.forEach((card, index) => {
    dom.beginnerCMajor.appendChild(createBeginnerCard(card, index, card.type));
  });

  beginner.staff.cards.forEach((card, index) => {
    dom.beginnerStaff.appendChild(createBeginnerCard(card, index, card.type));
  });

  renderKeyboardStaffExplorer();

  observeRevealElements(dom.beginnerPiano.querySelectorAll(".beginner-card"));
  observeRevealElements(dom.beginnerCMajor.querySelectorAll(".beginner-card"));
  observeRevealElements(dom.beginnerStaff.querySelectorAll(".beginner-card"));
}

function createBeginnerCard(card, index, diagramType = "") {
  const article = document.createElement("article");
  article.className = "beginner-card";

  const meta = document.createElement("div");
  meta.className = "card-meta";

  const number = document.createElement("span");
  number.className = "card-number";
  number.textContent = String(index + 1).padStart(2, "0");
  meta.appendChild(number);

  const title = document.createElement("h3");
  title.textContent = card.title;

  const copy = document.createElement("p");
  copy.textContent = card.copy;

  article.append(meta, title, copy);

  if (diagramType) {
    article.appendChild(createBeginnerDiagram(diagramType, card.note));
  }

  if (card.rows?.length) {
    article.appendChild(createBeginnerExample(card));
  }

  return article;
}

function createBeginnerExample(card) {
  const example = document.createElement("div");
  example.className = "beginner-example";

  if (card.label) {
    const label = document.createElement("span");
    label.className = "beginner-example-label";
    label.textContent = card.label;
    example.appendChild(label);
  }

  card.rows.forEach((row) => {
    const item = document.createElement("code");
    item.textContent = row;
    example.appendChild(item);
  });

  return example;
}

function createBeginnerDiagram(type, note = "") {
  if (type === "piano-white-black") return createMiniKeyboard(["C", "D", "E", "F", "G", "A", "B"], "");
  if (type === "piano-c") return createMiniKeyboard(["C"], note);
  if (type === "piano-c-major") return createMiniKeyboard(["C", "D", "E", "F", "G", "A", "B"], note);
  if (type === "piano-solfege") return createMiniKeyboard(["C", "D", "E", "F", "G", "A", "B"], "");
  if (type === "piano-octaves") return createMiniKeyboard(["C"], "C -> C");
  if (type === "piano-range") return createPianoRangeDiagram();
  if (type === "piano-scale-degrees") return createMiniKeyboard(["C", "D", "E", "F", "G", "A", "B"], "R 2 3 4 5 6 7");
  if (type === "piano-triad") return createMiniKeyboard(["C", "E", "G"], note);
  if (type === "guitar-piano-c") return createGuitarPianoDemo(note);
  if (type === "staff-basic") return createStaffDiagram([{ note: "", x: 32, y: 44 }, { note: "", x: 62, y: 30 }]);
  if (type === "treble-clef") return createTrebleClefDiagram();
  if (type === "bass-clef") return createBassClefDiagram();
  if (type === "staff-lines-spaces") return createStaffNamesDiagram();
  if (type === "treble-lines") return createStaffNamesDiagram("treble-lines");
  if (type === "treble-spaces") return createStaffNamesDiagram("treble-spaces");
  if (type === "bass-lines") return createStaffNamesDiagram("bass-lines");
  if (type === "bass-spaces") return createStaffNamesDiagram("bass-spaces");
  if (type === "middle-c") return createMiddleCDiagram();
  if (type === "c-major-staff") return createCMajorStaffDiagram();
  if (type === "note-values") return createNoteValuesDiagram();
  if (type === "rests") return createRestsDiagram();
  if (type === "accidentals") return createAccidentalsDiagram();
  if (type === "key-signature") return createKeySignatureDiagram();
  if (type === "time-signature") return createTimeSignatureDiagram();
  if (type === "music-symbols") return createMusicSymbolsDiagram();
  return document.createElement("div");
}

function createMiniKeyboard(highlightNotes, note = "") {
  const diagram = document.createElement("div");
  diagram.className = "mini-keyboard";

  const whiteNotes = ["C", "D", "E", "F", "G", "A", "B"];
  const blackNotes = [
    { note: "C#", position: 1 },
    { note: "D#", position: 2 },
    { note: "F#", position: 4 },
    { note: "G#", position: 5 },
    { note: "A#", position: 6 }
  ];

  const whiteRow = document.createElement("div");
  whiteRow.className = "mini-white-keys";
  whiteNotes.forEach((key) => {
    const item = document.createElement("span");
    item.className = highlightNotes.includes(key) ? "mini-white-key is-highlighted" : "mini-white-key";
    item.textContent = key;
    whiteRow.appendChild(item);
  });

  const blackRow = document.createElement("div");
  blackRow.className = "mini-black-keys";
  blackNotes.forEach(({ note: blackNote, position }) => {
    const item = document.createElement("span");
    item.className = "mini-black-key";
    item.style.left = `${position * 14.285 - 5}%`;
    item.textContent = blackNote;
    blackRow.appendChild(item);
  });

  diagram.append(whiteRow, blackRow);
  if (note) {
    const label = document.createElement("strong");
    label.textContent = note;
    diagram.appendChild(label);
  }
  return diagram;
}

function createPianoRangeDiagram() {
  const wrapper = document.createElement("div");
  wrapper.className = "piano-range-demo";
  ["A0", "C4", "C8"].forEach((label, index) => {
    const key = document.createElement("span");
    key.className = index === 1 ? "range-key is-highlighted" : "range-key";
    key.textContent = label;
    wrapper.appendChild(key);
  });
  return wrapper;
}

function createGuitarPianoDemo(note) {
  const wrapper = document.createElement("div");
  wrapper.className = "instrument-mini-demo";
  wrapper.appendChild(createMiniKeyboard(["C"], ""));

  const fretboard = document.createElement("div");
  fretboard.className = "mini-fretboard";
  for (let stringIndex = 0; stringIndex < 4; stringIndex++) {
    for (let fretIndex = 0; fretIndex < 6; fretIndex++) {
      const cell = document.createElement("span");
      const isC = (stringIndex === 0 && fretIndex === 3) || (stringIndex === 2 && fretIndex === 1) || (stringIndex === 3 && fretIndex === 5);
      cell.className = isC ? "mini-fret is-highlighted" : "mini-fret";
      cell.textContent = isC ? "C" : "";
      fretboard.appendChild(cell);
    }
  }
  wrapper.appendChild(fretboard);

  if (note) {
    const label = document.createElement("strong");
    label.textContent = note;
    wrapper.appendChild(label);
  }
  return wrapper;
}

function createStaffDiagram(notesToDraw = []) {
  const staff = document.createElement("div");
  staff.className = "staff-diagram";

  for (let i = 0; i < 5; i++) {
    const line = document.createElement("span");
    line.className = "staff-line";
    staff.appendChild(line);
  }

  notesToDraw.forEach(({ note, x, y }) => {
    const marker = document.createElement("span");
    marker.className = "staff-note";
    marker.style.left = `${x}%`;
    marker.style.top = `${y}%`;
    marker.textContent = note;
    staff.appendChild(marker);
  });

  return staff;
}

function createTrebleClefDiagram() {
  const wrapper = createStaffDiagram([]);
  const clef = document.createElement("span");
  clef.className = "treble-clef";
  clef.textContent = "𝄞";
  wrapper.appendChild(clef);
  return wrapper;
}

function createBassClefDiagram() {
  const wrapper = createStaffDiagram([]);
  const clef = document.createElement("span");
  clef.className = "bass-clef";
  clef.textContent = "𝄢";
  wrapper.appendChild(clef);
  return wrapper;
}

function createStaffNamesDiagram(kind = "treble") {
  const wrapper = document.createElement("div");
  wrapper.className = "staff-names";
  wrapper.appendChild(createStaffDiagram([]));

  const labelMap = {
    "treble-lines": currentLanguage === "zh" ? ["线：E G B D F"] : ["Lines: E G B D F"],
    "treble-spaces": currentLanguage === "zh" ? ["间：F A C E"] : ["Spaces: F A C E"],
    "bass-lines": currentLanguage === "zh" ? ["线：G B D F A"] : ["Lines: G B D F A"],
    "bass-spaces": currentLanguage === "zh" ? ["间：A C E G"] : ["Spaces: A C E G"],
    treble: currentLanguage === "zh" ? ["线：E G B D F", "间：F A C E"] : ["Lines: E G B D F", "Spaces: F A C E"]
  };

  (labelMap[kind] || labelMap.treble).forEach((text) => {
    const item = document.createElement("code");
    item.textContent = text;
    wrapper.appendChild(item);
  });
  return wrapper;
}

function createMiddleCDiagram() {
  const wrapper = document.createElement("div");
  wrapper.className = "middle-c-demo";
  wrapper.appendChild(createMiniKeyboard(["C"], currentLanguage === "zh" ? "中央 C" : "Middle C"));
  const staff = createStaffDiagram([{ note: "C", x: 34, y: 82 }]);
  staff.classList.add("middle-c-staff");
  wrapper.appendChild(staff);
  return wrapper;
}

function createCMajorStaffDiagram() {
  const notesToDraw = ["C", "D", "E", "F", "G", "A", "B", "C"].map((note, index) => ({
    note,
    x: 13 + index * 10,
    y: 82 - index * 8
  }));
  return createStaffDiagram(notesToDraw);
}

function createNoteValuesDiagram() {
  const wrapper = document.createElement("div");
  wrapper.className = "note-values-demo";

  const labels = currentLanguage === "zh" ? ["全音符", "二分音符", "四分音符"] : ["Whole", "Half", "Quarter"];
  labels.forEach((label, index) => {
    const item = document.createElement("span");
    item.className = `note-value note-value-${index + 1}`;
    item.innerHTML = `<i></i><b>${label}</b>`;
    wrapper.appendChild(item);
  });

  return wrapper;
}

function createRestsDiagram() {
  const wrapper = document.createElement("div");
  wrapper.className = "symbol-strip";
  const labels = currentLanguage === "zh" ? [["𝄻", "全休止"], ["𝄼", "二分休止"], ["𝄽", "四分休止"]] : [["𝄻", "Whole rest"], ["𝄼", "Half rest"], ["𝄽", "Quarter rest"]];
  labels.forEach(([symbol, label]) => wrapper.appendChild(createSymbolPill(symbol, label)));
  return wrapper;
}

function createAccidentalsDiagram() {
  const wrapper = document.createElement("div");
  wrapper.className = "symbol-strip";
  const labels = currentLanguage === "zh" ? [["♯", "升高半音"], ["♭", "降低半音"], ["♮", "还原"]] : [["♯", "Sharp"], ["♭", "Flat"], ["♮", "Natural"]];
  labels.forEach(([symbol, label]) => wrapper.appendChild(createSymbolPill(symbol, label)));
  return wrapper;
}

function createKeySignatureDiagram() {
  const wrapper = createStaffDiagram([]);
  ["♯", "♯"].forEach((symbol, index) => {
    const mark = document.createElement("span");
    mark.className = "signature-mark";
    mark.style.left = `${25 + index * 6}%`;
    mark.style.top = `${30 + index * 18}%`;
    mark.textContent = symbol;
    wrapper.appendChild(mark);
  });
  return wrapper;
}

function createTimeSignatureDiagram() {
  const wrapper = createStaffDiagram([]);
  const time = document.createElement("span");
  time.className = "time-signature";
  time.innerHTML = "4<br />4";
  wrapper.appendChild(time);
  return wrapper;
}

function createMusicSymbolsDiagram() {
  const wrapper = document.createElement("div");
  wrapper.className = "symbol-strip";
  const labels = currentLanguage === "zh"
    ? [["︵", "连 / 圆滑"], [">", "重音"], ["•", "断奏"], ["𝄐", "延长"], ["p", "弱"], ["f", "强"]]
    : [["︵", "Tie / slur"], [">", "Accent"], ["•", "Staccato"], ["𝄐", "Fermata"], ["p", "Soft"], ["f", "Loud"]];
  labels.forEach(([symbol, label]) => wrapper.appendChild(createSymbolPill(symbol, label)));
  return wrapper;
}

function createSymbolPill(symbol, label) {
  const item = document.createElement("span");
  item.className = "symbol-pill";
  item.innerHTML = `<b>${symbol}</b><small>${label}</small>`;
  return item;
}

function renderKeyboardStaffExplorer() {
  const labels = translations[currentLanguage].beginnerBasics.explorer;
  const controls = document.createElement("div");
  controls.className = "explorer-controls";

  controls.append(
    createExplorerSelect("range", labels.rangeLabel, [
      ["beginner", labels.beginnerRange],
      ["full", labels.fullRange]
    ]),
    createExplorerSelect("key", labels.keyLabel, Object.entries(explorerKeys).map(([value, info]) => [value, currentLanguage === "zh" ? info.labelZh : info.label])),
    createExplorerSelect("clef", labels.clefLabel, [
      ["treble", labels.treble],
      ["bass", labels.bass],
      ["grand", labels.grand]
    ])
  );

  const rangeNote = document.createElement("p");
  rangeNote.className = "explorer-range-note";
  rangeNote.textContent = labels.fullRangeNote;

  const body = document.createElement("div");
  body.className = "explorer-body";
  body.append(createExplorerKeyboard(), createExplorerStaff(), createExplorerInfoPanel());

  dom.keyboardStaffExplorer.append(controls, rangeNote, body);
}

function createExplorerSelect(name, labelText, options) {
  const group = document.createElement("label");
  group.className = "explorer-field";
  group.textContent = labelText;

  const select = document.createElement("select");
  select.value = explorerState[name];
  options.forEach(([value, text]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    explorerState[name] = select.value;
    renderBeginnerBasics();
  });

  group.appendChild(select);
  return group;
}

function createExplorerKeyboard() {
  const wrapper = document.createElement("div");
  wrapper.className = `explorer-keyboard ${explorerState.range === "full" ? "is-full" : ""}`;
  const range = explorerState.range === "full" ? [21, 108] : [48, 72];

  for (let midi = range[0]; midi <= range[1]; midi++) {
    const noteInfo = getMidiNoteInfo(midi);
    const key = document.createElement("button");
    key.type = "button";
    key.className = noteInfo.isBlack ? "explorer-key explorer-black-key" : "explorer-key explorer-white-key";
    key.classList.toggle("is-selected", midi === explorerState.selectedMidi);
    key.textContent = noteInfo.label;
    key.addEventListener("click", () => {
      explorerState.selectedMidi = midi;
      renderBeginnerBasics();
    });
    wrapper.appendChild(key);
  }

  return wrapper;
}

function createExplorerStaff() {
  const selected = getMidiNoteInfo(explorerState.selectedMidi);
  const wrapper = document.createElement("div");
  wrapper.className = `grand-staff-view show-${explorerState.clef}`;

  if (explorerState.clef !== "bass") {
    wrapper.appendChild(createExplorerStaffBlock("treble", selected));
  }
  if (explorerState.clef !== "treble") {
    wrapper.appendChild(createExplorerStaffBlock("bass", selected));
  }
  return wrapper;
}

function createExplorerStaffBlock(clef, selected) {
  const block = document.createElement("div");
  block.className = `explorer-staff-block ${clef}`;

  const clefMark = document.createElement("span");
  clefMark.className = clef === "treble" ? "treble-clef explorer-clef" : "bass-clef explorer-clef";
  clefMark.textContent = clef === "treble" ? "𝄞" : "𝄢";
  block.appendChild(clefMark);

  for (let i = 0; i < 5; i++) {
    const line = document.createElement("span");
    line.className = "staff-line";
    block.appendChild(line);
  }

  const position = getStaffPosition(selected, clef);
  const note = document.createElement("span");
  note.className = "staff-note explorer-note";
  note.style.left = "58%";
  note.style.top = `${position.top}%`;
  note.textContent = selected.letter;
  block.appendChild(note);

  if (selected.accidental) {
    const accidental = document.createElement("span");
    accidental.className = "note-accidental";
    accidental.style.top = `${position.top}%`;
    accidental.textContent = selected.accidental;
    block.appendChild(accidental);
  }

  position.ledgerLines.forEach((top) => {
    const ledger = document.createElement("span");
    ledger.className = "ledger-line";
    ledger.style.top = `${top}%`;
    block.appendChild(ledger);
  });

  if (position.isFarOutside) {
    const warning = document.createElement("span");
    warning.className = "staff-range-warning";
    warning.textContent = translations[currentLanguage].beginnerBasics.explorer.farNote;
    block.appendChild(warning);
  }

  return block;
}

function createExplorerInfoPanel() {
  const labels = translations[currentLanguage].beginnerBasics.explorer;
  const selected = getMidiNoteInfo(explorerState.selectedMidi);
  const panel = document.createElement("div");
  panel.className = "explorer-info";

  const title = document.createElement("h4");
  title.textContent = labels.infoTitle;
  panel.appendChild(title);

  const rows = [
    [labels.noteName, selected.displayName],
    [labels.octave, selected.octave],
    [labels.solfege, getSolfege(selected.letter)],
    [labels.staffPosition, getStaffDescription(selected.midi)],
    [labels.commonClef, selected.midi >= 60 ? labels.treble : labels.bass],
    [labels.middleC, getMiddleCRelation(selected.midi, labels)]
  ];

  rows.forEach(([key, value]) => {
    const row = document.createElement("p");
    row.innerHTML = `<span>${key}</span><strong>${value}</strong>`;
    panel.appendChild(row);
  });

  return panel;
}

function getMidiNoteInfo(midi) {
  const sharpNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const pitchClass = midi % 12;
  const keyInfo = explorerKeys[explorerState.key] || explorerKeys.C;
  const label = keyInfo.spellings[pitchClass] || sharpNames[pitchClass];
  const match = label.match(/^([A-G])([#b]?)/);
  const octave = Math.floor(midi / 12) - 1;
  return {
    midi,
    label,
    displayName: `${label}${octave}`,
    letter: match?.[1] || label[0],
    accidental: match?.[2] || "",
    octave,
    isBlack: sharpNames[pitchClass].includes("#")
  };
}

function getSolfege(letter) {
  const map = currentLanguage === "zh"
    ? { C: "Do", D: "Re", E: "Mi", F: "Fa", G: "Sol", A: "La", B: "Si" }
    : { C: "Do", D: "Re", E: "Mi", F: "Fa", G: "Sol", A: "La", B: "Ti / Si" };
  return map[letter] || "";
}

function getStaffPosition(noteInfo, clef) {
  const letterIndex = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };
  const anchor = clef === "treble"
    ? { letter: "E", octave: 4, top: 74 }
    : { letter: "G", octave: 2, top: 74 };
  const noteDiatonic = noteInfo.octave * 7 + letterIndex[noteInfo.letter];
  const anchorDiatonic = anchor.octave * 7 + letterIndex[anchor.letter];
  const staffStep = noteDiatonic - anchorDiatonic;
  const rawTop = anchor.top - staffStep * 6;
  const ledgerLines = getLedgerLines(rawTop);

  return {
    rawTop,
    top: Math.max(-12, Math.min(112, rawTop)),
    ledgerLines: ledgerLines.slice(0, 5),
    isFarOutside: ledgerLines.length > 5
  };
}

function getLedgerLines(rawTop) {
  const lines = [];
  if (rawTop > 74) {
    for (let lineTop = 86; lineTop <= rawTop + 0.1; lineTop += 12) {
      lines.push(Math.min(114, lineTop));
    }
  }

  if (rawTop < 26) {
    for (let lineTop = 14; lineTop >= rawTop - 0.1; lineTop -= 12) {
      lines.push(Math.max(-8, lineTop));
    }
  }

  return lines;
}

function getStaffDescription(midi) {
  if (midi === 60) return currentLanguage === "zh" ? "中央 C，加线位置" : "Middle C, ledger-line position";
  return midi > 60
    ? currentLanguage === "zh" ? "中央 C 上方" : "Above Middle C"
    : currentLanguage === "zh" ? "中央 C 下方" : "Below Middle C";
}

function getMiddleCRelation(midi, labels) {
  if (midi === 60) return labels.middleCYes;
  if (Math.abs(midi - 60) <= 12) return labels.middleCNear;
  return labels.middleCNo;
}

function updateBeginnerToggleText() {
  const beginner = translations[currentLanguage].beginnerBasics;
  dom.beginnerToggle.textContent = beginnerBasicsExpanded ? beginner.hideButton : beginner.showButton;
  dom.beginnerToggle.setAttribute("aria-expanded", String(beginnerBasicsExpanded));
}

function renderLearningTips() {
  renderCards(dom.tipsGrid, translations[currentLanguage].tips.tips, "tip-card");
}

function renderLearningPath() {
  renderCards(dom.learningPathGrid, translations[currentLanguage].learningPath.cards, "path-card");
}

function renderScaleGuide() {
  renderCards(dom.scaleGuideGrid, translations[currentLanguage].scaleGuide.cards, "scale-card");
}

function renderComparison() {
  const comparison = translations[currentLanguage].comparison;
  dom.comparisonGrid.innerHTML = "";

  comparison.rows.forEach((row, index) => {
    const article = document.createElement("article");
    article.className = "comparison-row";

    const number = document.createElement("span");
    number.className = "card-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const guitar = document.createElement("div");
    guitar.className = "comparison-cell";
    guitar.innerHTML = `<span>${comparison.labels.guitar}</span><p>${row.guitar}</p>`;

    const piano = document.createElement("div");
    piano.className = "comparison-cell";
    piano.innerHTML = `<span>${comparison.labels.piano}</span><p>${row.piano}</p>`;

    const takeaway = document.createElement("div");
    takeaway.className = "comparison-cell takeaway";
    takeaway.innerHTML = `<span>${comparison.labels.takeaway}</span><p>${row.takeaway}</p>`;

    article.append(number, guitar, piano, takeaway);
    dom.comparisonGrid.appendChild(article);
  });

  observeRevealElements(dom.comparisonGrid.querySelectorAll(".comparison-row"));
}

function renderRoutine() {
  dom.routineSteps.innerHTML = "";

  translations[currentLanguage].routine.steps.forEach((step, index) => {
    const article = document.createElement("article");
    article.className = "routine-step";

    const number = document.createElement("span");
    number.className = "routine-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const title = document.createElement("h3");
    title.textContent = step.title;

    const copy = document.createElement("p");
    copy.textContent = step.copy;

    article.append(number, title, copy);
    dom.routineSteps.appendChild(article);
  });

  observeRevealElements(dom.routineSteps.querySelectorAll(".routine-step"));
}

function formatText(template, values) {
  return template.replace(/\{(\w+)}/g, (_, key) => values[key] ?? "");
}

function observeRevealElements(elements) {
  if (!revealObserver) return;
  elements.forEach((element) => {
    element.classList.add("reveal-on-scroll");
    revealObserver.observe(element);
  });
}

function initScrollReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal-on-scroll").forEach((element) => element.classList.add("is-revealed"));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  observeRevealElements(
    document.querySelectorAll(".section.reveal-on-scroll, .mode-explanation, .fretboard-shell, .piano-shell, .shape-explanation")
  );
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

function renderPianoKeyboard() {
  const root = dom.rootSelect.value;
  const currentMode = dom.modeSelect.value;
  const selectedScale = dom.scaleSelect.value;
  const chordTones = getChordTones(root);
  const scaleTones = getScaleTones(root, selectedScale);
  const showAllNotes = dom.showAllNotes.checked;
  const highlightTones = dom.highlightChordTones.checked;
  const showIntervals = dom.showIntervals.checked;
  const t = translations[currentLanguage].piano;

  dom.pianoKeyboard.innerHTML = "";

  const whiteLayer = document.createElement("div");
  whiteLayer.className = "piano-white-layer";
  const blackLayer = document.createElement("div");
  blackLayer.className = "piano-black-layer";

  pianoNotes.forEach((noteWithOctave) => {
    const baseNote = getBaseNote(noteWithOctave);
    const intervalName =
      currentMode === "scale" ? getScaleIntervalName(baseNote, scaleTones) : getIntervalName(baseNote, chordTones);
    const isActiveTone = Boolean(intervalName);
    const isBlackKey = baseNote.includes("#");
    const key = document.createElement("button");
    const classes = ["piano-key", isBlackKey ? "black-key" : "white-key"];

    if (isActiveTone) {
      classes.push(currentMode === "scale" ? "is-scale" : "is-chord", getIntervalClass(intervalName, currentMode));
    }
    if (isActiveTone && !highlightTones) classes.push("is-soft-highlight");
    if (!showAllNotes && !isActiveTone) classes.push("is-hidden");
    if (showAllNotes && !isActiveTone) classes.push("is-muted");

    key.type = "button";
    key.className = classes.filter(Boolean).join(" ");
    key.setAttribute(
      "aria-label",
      formatText(t.keyLabel, {
        note: noteWithOctave,
        baseNote,
        interval: intervalName ? formatText(translations[currentLanguage].fretboard.intervalLabel, { interval: intervalName }) : ""
      })
    );

    const label = document.createElement("span");
    label.className = "piano-note-label";
    label.textContent = showAllNotes || isActiveTone ? noteWithOctave : "";
    key.appendChild(label);

    if (showIntervals && isActiveTone) {
      const interval = document.createElement("span");
      interval.className = "piano-interval";
      interval.textContent = intervalName;
      key.appendChild(interval);
    }

    if (isBlackKey) {
      key.style.left = `calc(${(blackKeyOffsets[noteWithOctave] / 14) * 100}% - 18px)`;
      blackLayer.appendChild(key);
    } else {
      whiteLayer.appendChild(key);
    }
  });

  dom.pianoKeyboard.append(whiteLayer, blackLayer);
}

function updateShapeExplanation() {
  const selectedShape = dom.shapeSelect.value;
  const info = translations[currentLanguage].shapeInfo[selectedShape];
  const isChordMode = dom.modeSelect.value === "chord";
  const isGuitar = dom.instrumentSelect.value === "guitar";

  dom.shapeExplanation.classList.toggle("is-hidden", !isChordMode || !isGuitar);
  if (!isChordMode || !isGuitar) return;
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
  const isPiano = dom.instrumentSelect.value === "piano";

  dom.shapeField.classList.toggle("is-hidden", currentMode !== "chord" || isPiano);
  dom.scaleField.classList.toggle("is-hidden", !isScaleMode);
  dom.showAllNotes.disabled = false;
  dom.highlightChordTones.disabled = false;
  dom.showIntervals.disabled = false;
  dom.highlightToneLabel.textContent = isScaleMode ? t.controls.highlightScaleTones : t.controls.highlightChordTones;

  dom.legendRootLabel.textContent = t.legend.root;
  dom.legendTitle.textContent = t.legend.title;
  dom.legendThirdLabel.textContent = t.legend.third;
  dom.legendFifthLabel.textContent = t.legend.fifth;
  dom.legendScaleLabel.textContent = t.legend.scaleTone;
  dom.legendOtherLabel.textContent = t.legend.other;
  dom.legendThirdItem.classList.toggle("is-hidden", isScaleMode);
  dom.legendFifthItem.classList.toggle("is-hidden", isScaleMode);
  dom.legendScaleItem.classList.toggle("is-hidden", !isScaleMode);
  dom.fretboardShell.classList.toggle("is-hidden", isPiano);
  dom.pianoShell.classList.toggle("is-hidden", !isPiano);
  dom.pianoBadge.textContent = t.piano.badge;

  if (isScaleMode) {
    const scaleInfo = t.scaleInfo[dom.scaleSelect.value];
    dom.modeExplanationTitle.textContent = `${dom.rootSelect.value} ${scaleInfo.title}`;
    dom.modeExplanationCopy.textContent = isPiano ? scaleInfo.pianoCopy : scaleInfo.guitarCopy;
    dom.shapeBadge.textContent = t.modes.scale;
    return;
  }

  dom.modeExplanationTitle.textContent = isPiano ? t.modes.triad : t.modeInfo.chord.title;
  dom.modeExplanationCopy.textContent = isPiano ? t.piano.triadCopy : t.modeInfo.chord.copy;
}

function updateStatePills() {
  const t = translations[currentLanguage];
  const currentMode = dom.modeSelect.value;
  const isPiano = dom.instrumentSelect.value === "piano";
  const isScaleMode = currentMode === "scale";
  const modeLabel = isScaleMode ? t.modes.scale : isPiano ? t.modes.triad : t.modes.chord;
  const items = [
    [t.status.instrument, t.instruments[dom.instrumentSelect.value]],
    [t.status.mode, modeLabel],
    [t.status.root, dom.rootSelect.value]
  ];

  if (!isPiano && currentMode === "chord") {
    items.push([t.status.shape, `${dom.shapeSelect.value} Shape`]);
  }

  if (isScaleMode) {
    items.push([t.status.scale, t.scales[dom.scaleSelect.value]]);
  }

  dom.statePills.innerHTML = "";
  items.forEach(([label, value]) => {
    const pill = document.createElement("span");
    pill.className = "state-pill";
    pill.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    dom.statePills.appendChild(pill);
  });
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

  dom.currentChordTitle.textContent =
    currentLanguage === "zh"
      ? `${root} 大三和弦`
      : dom.instrumentSelect.value === "piano"
        ? `${root} Major Triad`
        : `${root} Major`;
  dom.currentChordTitle.setAttribute(
    "title",
    currentLanguage === "zh"
      ? `${root} 大三和弦音：${chordTones.root}, ${chordTones.third}, ${chordTones.fifth}`
      : `${root} Major chord tones: ${chordTones.root}, ${chordTones.third}, ${chordTones.fifth}`
  );
}

function updateView() {
  updateModeControls();
  updateStatePills();
  updateCurrentTitle();
  updateShapeExplanation();
  renderFretboard();
  renderPianoKeyboard();
  triggerToneRefresh();
}

function triggerToneRefresh() {
  [dom.fretboard, dom.pianoKeyboard].forEach((surface) => {
    if (!surface) {
      return;
    }

    surface.classList.remove("is-refreshing");
    void surface.offsetWidth;
    surface.classList.add("is-refreshing");
    window.setTimeout(() => surface.classList.remove("is-refreshing"), 700);
  });
}

function bindEvents() {
  [
    dom.instrumentSelect,
    dom.modeSelect,
    dom.rootSelect,
    dom.shapeSelect,
    dom.scaleSelect,
    dom.showAllNotes,
    dom.highlightChordTones,
    dom.showIntervals
  ].forEach((control) => {
    control.addEventListener("change", () => {
      if (control === dom.instrumentSelect) {
        saveInstrument(dom.instrumentSelect.value);
        updateSelectOptions();
        updateTexts();
      }
      updateView();
    });
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
    button.addEventListener("click", () => {
      flashGateSelection(button, () => chooseLanguage(button.dataset.languageChoice));
    });
  });

  document.querySelectorAll("[data-instrument-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      flashGateSelection(button, () => chooseInstrument(button.dataset.instrumentChoice));
    });
  });

  dom.languageToggle.addEventListener("click", () => {
    changeLanguage(currentLanguage === "zh" ? "en" : "zh");
  });

  dom.beginnerToggle.addEventListener("click", () => {
    beginnerBasicsExpanded = !beginnerBasicsExpanded;
    updateBeginnerToggleText();

    if (beginnerBasicsExpanded) {
      dom.beginnerContent.hidden = false;
      window.requestAnimationFrame(() => dom.beginnerContent.classList.add("is-expanded"));
      return;
    }

    dom.beginnerContent.classList.remove("is-expanded");
    window.setTimeout(() => {
      if (!beginnerBasicsExpanded) {
        dom.beginnerContent.hidden = true;
      }
    }, 520);
  });
}

function cacheDom() {
  dom.languageGate = document.querySelector("#language-gate");
  dom.languageGateTitle = document.querySelector("#language-gate-title");
  dom.languageGateEyebrow = document.querySelector("#language-gate-eyebrow");
  dom.languageGateIntro = document.querySelector("#language-gate-intro");
  dom.instrumentGate = document.querySelector("#instrument-gate");
  dom.instrumentGateEyebrow = document.querySelector("#instrument-gate-eyebrow");
  dom.instrumentGateTitle = document.querySelector("#instrument-gate-title");
  dom.instrumentGateIntro = document.querySelector("#instrument-gate-intro");
  dom.instrumentGateGuitarName = document.querySelector("#instrument-gate-guitar-name");
  dom.instrumentGateGuitarTags = document.querySelector("#instrument-gate-guitar-tags");
  dom.instrumentGateGuitarNote = document.querySelector("#instrument-gate-guitar-note");
  dom.instrumentGatePianoName = document.querySelector("#instrument-gate-piano-name");
  dom.instrumentGatePianoTags = document.querySelector("#instrument-gate-piano-tags");
  dom.instrumentGatePianoNote = document.querySelector("#instrument-gate-piano-note");
  dom.app = document.querySelector("#app");
  dom.languageToggle = document.querySelector("#language-toggle");
  dom.brand = document.querySelector(".brand");
  dom.heroTitle = document.querySelector(".hero-content h1");
  dom.heroEyebrow = document.querySelector(".hero-content .eyebrow");
  dom.heroSubtitle = document.querySelector(".hero-content .subtitle");
  dom.heroCopy = document.querySelector(".hero-content .hero-copy");
  dom.heroChips = document.querySelector("#hero-chips");
  dom.instrumentSelect = document.querySelector("#instrument-select");
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
  dom.conceptTitle = document.querySelector("#concept-title");
  dom.conceptGrid = document.querySelector("#concept-grid");
  dom.beginnerOptionalBadge = document.querySelector("#beginner-optional-badge");
  dom.beginnerToggle = document.querySelector("#beginner-toggle");
  dom.beginnerContent = document.querySelector("#beginner-content");
  dom.beginnerPiano = document.querySelector("#beginner-piano");
  dom.beginnerCMajor = document.querySelector("#beginner-c-major");
  dom.beginnerStaff = document.querySelector("#beginner-staff");
  dom.keyboardStaffExplorer = document.querySelector("#keyboard-staff-explorer");
  dom.learningPathGrid = document.querySelector("#learning-path-grid");
  dom.scaleGuideGrid = document.querySelector("#scale-guide-grid");
  dom.comparisonGrid = document.querySelector("#comparison-grid");
  dom.routineSteps = document.querySelector("#routine-steps");
  dom.tipsGrid = document.querySelector("#tips-grid");
  dom.fretboardShell = document.querySelector(".fretboard-shell");
  dom.fretboardScroll = document.querySelector("#fretboard-scroll");
  dom.fretboard = document.querySelector("#fretboard");
  dom.pianoShell = document.querySelector("#piano-shell");
  dom.pianoScroll = document.querySelector("#piano-scroll");
  dom.pianoKeyboard = document.querySelector("#piano-keyboard");
  dom.pianoBadge = document.querySelector("#piano-badge");
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
  dom.statePills = document.querySelector("#state-pills");
  dom.legendTitle = document.querySelector("#legend-title");
  dom.legendRootLabel = document.querySelector("#legend-root-label");
  dom.legendThirdItem = document.querySelector("#legend-third-item");
  dom.legendThirdLabel = document.querySelector("#legend-third-label");
  dom.legendFifthLabel = document.querySelector("#legend-fifth-label");
  dom.legendScaleItem = document.querySelector("#legend-scale-item");
  dom.legendScaleLabel = document.querySelector("#legend-scale-label");
  dom.legendOtherLabel = document.querySelector("#legend-other-label");
  dom.legendFifthItem = document.querySelector("#legend-fifth-item");
  dom.footerAuthor = document.querySelector("#footer-author");
}

function init() {
  cacheDom();
  initScrollReveal();
  bindEvents();

  const savedLanguage = getSavedLanguage();
  if (!savedLanguage) {
    showLanguageGate();
    return;
  }

  applyLanguage(savedLanguage);

  const savedInstrument = getSavedInstrument();
  if (!savedInstrument) {
    showInstrumentGate();
    return;
  }

  dom.instrumentSelect.value = savedInstrument;
  showApp();
}

document.addEventListener("DOMContentLoaded", init);
