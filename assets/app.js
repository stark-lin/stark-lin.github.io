(() => {
  "use strict";

  const locale = window.PORTFOLIO_LOCALE;
  if (!locale) throw new Error("Portfolio locale data is missing.");
  const { data: DATA, descriptions: PROJECT_DESCRIPTION_POOLS, ui: UI } = locale;

  const SAFE_BILINGUAL_QUIPS = [
    { zh: "这页会变，但不是在逃避责任。", en: "This page changes, but it is not dodging responsibility." },
    { zh: "随机的是外观，固定的是链接能点。", en: "The surface is random. The links are reliably clickable." },
    { zh: "如果这版不好看，至少它诚实地不好看。", en: "If this version is not pretty, at least it is honestly not pretty." },
    { zh: "主页负责变脸，项目负责站稳。", en: "The homepage changes faces. The projects hold their ground." },
    { zh: "这不是模板失效，是模板没有被邀请。", en: "This is not template failure. The template was not invited." },
    { zh: "风格可以抽签，工程不能靠抽签。", en: "Style can be drawn by lot. Engineering cannot." },
    { zh: "刷新一下，看看 CSS 今天想做什么。", en: "Refresh and see what CSS wants to do today." },
    { zh: "内容很认真，只是外壳不想穿正装。", en: "The content is serious. The shell just refuses formalwear." },
    { zh: "这是一个会换衣服的主页，不是一个会换项目的人。", en: "This is a homepage that changes outfits, not a person changing projects." },
    { zh: "如果你看到了奇怪边框，那是页面在热身。", en: "If you see a strange border, the page is warming up." },
    { zh: "它不保证优雅，但保证不是默认配置。", en: "It does not guarantee elegance. It guarantees non-default settings." },
    { zh: "项目是真的，皮肤是随机的。", en: "The projects are real. The skin is randomized." },
    { zh: "这页没有迷路，只是在走一条不太常规的路。", en: "This page is not lost. It is taking a less conventional route." },
    { zh: "页面风格可以冒险，信息结构不能失踪。", en: "The visual style may take risks. The information structure cannot disappear." },
    { zh: "这不是花哨，是给刷新按钮一点工作。", en: "This is not decoration. It is giving the refresh button a job." },
    { zh: "如果这版像实验记录，那说明实验还活着。", en: "If this version looks like a lab note, the experiment is still alive." },
    { zh: "同一个作者，不同的 CSS 天气。", en: "Same author, different CSS weather." },
    { zh: "随机页面，固定邮箱，基本职业道德。", en: "Random page, fixed email, basic professional discipline." },
    { zh: "这页比较会变通，但不会把仓库地址变没。", en: "This page is flexible, but it will not hide the repository links." },
    { zh: "简历负责直线叙事，这页负责旁边开一扇窗。", en: "The resume keeps the straight line. This page opens a side window." },
    { zh: "视觉上可以有脾气，语义上必须讲道理。", en: "The visuals may have attitude. The semantics must make sense." },
    { zh: "如果你觉得这页太安静，它可能还没抽到响亮配色。", en: "If this page feels too quiet, it may not have drawn a loud palette yet." },
    { zh: "这不是个人品牌，是个人接口。", en: "This is not personal branding. It is a personal interface." },
    { zh: "每次刷新都像小型改版，但不用开会。", en: "Every refresh feels like a tiny redesign, without a meeting." },
    { zh: "它有时像档案，有时像便利贴墙，但都能点开项目。", en: "Sometimes it is a dossier, sometimes a wall of sticky notes. The projects still open." },
    { zh: "这页不是为了显得完美，是为了显得有人在场。", en: "This page is not trying to look perfect. It is trying to show someone is present." },
    { zh: "如果它看起来像草稿，那也是可部署草稿。", en: "If it looks like a draft, it is still a deployable draft." },
    { zh: "主页在换装，后端在值班。", en: "The homepage is changing outfits. The backend is on duty." },
    { zh: "我没有隐藏个性，只是给它加了版本号。", en: "I did not hide personality. I gave it a version number." },
    { zh: "随机不是借口，是一种有 seed 的展示方式。", en: "Randomness is not an excuse. It is presentation with a seed." },
    { zh: "这页没有端着，但也没有乱扔信息。", en: "This page is not stiff, but it does not throw information around." },
    { zh: "外观在抽样，判断没有抽样。", en: "The appearance is sampled. The judgment is not." },
    { zh: "如果这版很顺眼，那是算法今天比较客气。", en: "If this version looks pleasant, the algorithm is being polite today." },
    { zh: "如果这版不顺眼，那也是一个可复现结论。", en: "If this version does not look pleasant, that is still a reproducible result." },
    { zh: "项目列表很短，因为噪音不参与部署。", en: "The project list is short because noise does not get deployed." },
    { zh: "这页在认真和不正经之间做负载均衡。", en: "This page load-balances between serious and unserious." },
    { zh: "它不是完美主页，它是一个有证据的入口。", en: "It is not a perfect homepage. It is an entry point with evidence." },
    { zh: "刷新按钮不是逃生门，是换镜头。", en: "The refresh button is not an escape hatch. It is a camera cut." },
    { zh: "这页的目标不是赢设计奖，是让合适的人多看一眼。", en: "The goal is not to win a design award. It is to make the right person look twice." }
  ];

    const STYLE_GENES = {
      density: [
        { variables: { "--style-site-width": "720px", "--style-card-padding": "16px", "--style-card-gap": "10px", "--style-section-padding-y": "42px", "--style-section-gap": "20px", "--style-hero-pad-top": "54px", "--style-hero-pad-bottom": "44px", "--style-hero-gap": "18px" } },
        { variables: { "--style-site-width": "780px", "--style-card-padding": "18px", "--style-card-gap": "12px", "--style-section-padding-y": "50px", "--style-section-gap": "22px", "--style-hero-pad-top": "58px", "--style-hero-pad-bottom": "48px", "--style-hero-gap": "20px" } },
        { variables: { "--style-site-width": "840px", "--style-card-padding": "20px", "--style-card-gap": "14px", "--style-section-padding-y": "58px", "--style-section-gap": "26px", "--style-hero-pad-top": "64px", "--style-hero-pad-bottom": "56px", "--style-hero-gap": "22px" } },
        { variables: { "--style-site-width": "900px", "--style-card-padding": "22px", "--style-card-gap": "15px", "--style-section-padding-y": "66px", "--style-section-gap": "28px", "--style-hero-pad-top": "72px", "--style-hero-pad-bottom": "62px", "--style-hero-gap": "24px" } },
        { variables: { "--style-site-width": "960px", "--style-card-padding": "24px", "--style-card-gap": "16px", "--style-section-padding-y": "74px", "--style-section-gap": "32px", "--style-hero-pad-top": "82px", "--style-hero-pad-bottom": "72px", "--style-hero-gap": "28px" } },
        { variables: { "--style-site-width": "1020px", "--style-card-padding": "26px", "--style-card-gap": "18px", "--style-section-padding-y": "82px", "--style-section-gap": "34px", "--style-hero-pad-top": "90px", "--style-hero-pad-bottom": "78px", "--style-hero-gap": "30px" } },
        { variables: { "--style-site-width": "1080px", "--style-card-padding": "28px", "--style-card-gap": "20px", "--style-section-padding-y": "90px", "--style-section-gap": "38px", "--style-hero-pad-top": "98px", "--style-hero-pad-bottom": "84px", "--style-hero-gap": "34px" } },
        { variables: { "--style-site-width": "940px", "--style-card-padding": "30px", "--style-card-gap": "22px", "--style-section-padding-y": "100px", "--style-section-gap": "42px", "--style-hero-pad-top": "110px", "--style-hero-pad-bottom": "92px", "--style-hero-gap": "38px" } },
        { variables: { "--style-site-width": "860px", "--style-card-padding": "21px", "--style-card-gap": "26px", "--style-section-padding-y": "76px", "--style-section-gap": "46px", "--style-hero-pad-top": "86px", "--style-hero-pad-bottom": "66px", "--style-hero-gap": "42px" } },
        { variables: { "--style-site-width": "1120px", "--style-card-padding": "32px", "--style-card-gap": "24px", "--style-section-padding-y": "104px", "--style-section-gap": "48px", "--style-hero-pad-top": "116px", "--style-hero-pad-bottom": "96px", "--style-hero-gap": "40px" } }
      ],
      border: [
        { variables: { "--style-border-width": "0px", "--style-border-style": "solid", "--style-section-border-width": "1px", "--style-section-border-style": "solid" } },
        { variables: { "--style-border-width": "1px", "--style-border-style": "solid", "--style-section-border-width": "1px", "--style-section-border-style": "solid" } },
        { variables: { "--style-border-width": "2px", "--style-border-style": "solid", "--style-section-border-width": "2px", "--style-section-border-style": "solid" } },
        { variables: { "--style-border-width": "1px", "--style-border-style": "dashed", "--style-section-border-width": "1px", "--style-section-border-style": "dashed" } },
        { variables: { "--style-border-width": "2px", "--style-border-style": "dashed", "--style-section-border-width": "1px", "--style-section-border-style": "solid" } },
        { variables: { "--style-border-width": "1px", "--style-border-style": "dotted", "--style-section-border-width": "1px", "--style-section-border-style": "dotted" } },
        { variables: { "--style-border-width": "3px", "--style-border-style": "double", "--style-section-border-width": "3px", "--style-section-border-style": "double" } },
        { variables: { "--style-border-width": "1px", "--style-border-style": "solid", "--style-section-border-width": "0px", "--style-section-border-style": "solid" } }
      ],
      shadow: [
        { variables: { "--style-card-shadow": "none", "--style-panel-shadow": "none", "--style-blur": "0px" } },
        { variables: { "--style-card-shadow": "0 8px 22px rgba(0,0,0,.04)", "--style-panel-shadow": "0 18px 58px rgba(0,0,0,.07)", "--style-blur": "8px" } },
        { variables: { "--style-card-shadow": "0 18px 60px rgba(0,0,0,.08)", "--style-panel-shadow": "0 26px 90px rgba(0,0,0,.10)", "--style-blur": "14px" } },
        { variables: { "--style-card-shadow": "inset 0 1px 0 color-mix(in srgb, var(--fg), transparent 88%)", "--style-panel-shadow": "inset 0 1px 0 color-mix(in srgb, var(--fg), transparent 84%)", "--style-blur": "18px" } },
        { variables: { "--style-card-shadow": "8px 8px 0 color-mix(in srgb, var(--accent), transparent 44%)", "--style-panel-shadow": "10px 10px 0 color-mix(in srgb, var(--accent), transparent 38%)", "--style-blur": "0px" } },
        { variables: { "--style-card-shadow": "0 1px 0 color-mix(in srgb, var(--fg), transparent 80%)", "--style-panel-shadow": "0 1px 0 color-mix(in srgb, var(--fg), transparent 76%)", "--style-blur": "0px" } },
        { variables: { "--style-card-shadow": "0 30px 90px rgba(0,0,0,.11)", "--style-panel-shadow": "0 42px 120px rgba(0,0,0,.15)", "--style-blur": "24px" } },
        { variables: { "--style-card-shadow": "-6px 6px 0 color-mix(in srgb, var(--fg), transparent 90%)", "--style-panel-shadow": "-8px 8px 0 color-mix(in srgb, var(--fg), transparent 86%)", "--style-blur": "4px" } },
        { variables: { "--style-card-shadow": "0 0 0 1px color-mix(in srgb, var(--accent), transparent 76%), 0 20px 70px rgba(0,0,0,.08)", "--style-panel-shadow": "0 0 0 1px color-mix(in srgb, var(--accent), transparent 70%), 0 34px 100px rgba(0,0,0,.11)", "--style-blur": "20px" } },
        { variables: { "--style-card-shadow": "0 0 0 999px rgba(255,255,255,.015) inset", "--style-panel-shadow": "0 0 0 999px rgba(255,255,255,.025) inset", "--style-blur": "12px" } }
      ],
      type: [
        { variables: { "--style-line-height": "1.42", "--style-h1-min": "44px", "--style-h1-fluid": "9vw", "--style-h1-max": "104px", "--style-h1-tracking": "-0.095em", "--style-h2-tracking": "-0.07em", "--style-h3-tracking": "-0.045em", "--style-desc-size": "18px", "--style-section-lead-size": "17px" } },
        { variables: { "--style-line-height": "1.48", "--style-h1-min": "40px", "--style-h1-fluid": "7.5vw", "--style-h1-max": "86px", "--style-h1-tracking": "-0.065em", "--style-h2-tracking": "-0.05em", "--style-h3-tracking": "-0.03em", "--style-desc-size": "17px", "--style-section-lead-size": "16px" } },
        { variables: { "--style-line-height": "1.6", "--style-h1-min": "42px", "--style-h1-fluid": "8vw", "--style-h1-max": "92px", "--style-h1-tracking": "-0.075em", "--style-h2-tracking": "-0.055em", "--style-h3-tracking": "-0.035em", "--style-desc-size": "18px", "--style-section-lead-size": "17px" } },
        { variables: { "--style-line-height": "1.68", "--style-h1-min": "38px", "--style-h1-fluid": "6.8vw", "--style-h1-max": "78px", "--style-h1-tracking": "-0.04em", "--style-h2-tracking": "-0.035em", "--style-h3-tracking": "-0.018em", "--style-desc-size": "19px", "--style-section-lead-size": "18px" } },
        { variables: { "--style-line-height": "1.52", "--style-h1-min": "46px", "--style-h1-fluid": "10vw", "--style-h1-max": "116px", "--style-h1-tracking": "-0.11em", "--style-h2-tracking": "-0.08em", "--style-h3-tracking": "-0.05em", "--style-desc-size": "17px", "--style-section-lead-size": "17px" } },
        { variables: { "--style-line-height": "1.5", "--style-h1-min": "36px", "--style-h1-fluid": "6vw", "--style-h1-max": "70px", "--style-h1-tracking": "-0.025em", "--style-h2-tracking": "-0.02em", "--style-h3-tracking": "-0.012em", "--style-desc-size": "16px", "--style-section-lead-size": "15px" } },
        { variables: { "--style-line-height": "1.74", "--style-h1-min": "42px", "--style-h1-fluid": "7vw", "--style-h1-max": "84px", "--style-h1-tracking": "-0.05em", "--style-h2-tracking": "-0.04em", "--style-h3-tracking": "-0.02em", "--style-desc-size": "20px", "--style-section-lead-size": "19px" } },
        { variables: { "--style-line-height": "1.36", "--style-h1-min": "48px", "--style-h1-fluid": "9.5vw", "--style-h1-max": "108px", "--style-h1-tracking": "-0.085em", "--style-h2-tracking": "-0.065em", "--style-h3-tracking": "-0.04em", "--style-desc-size": "16px", "--style-section-lead-size": "16px" } },
        { variables: { "--style-line-height": "1.58", "--style-h1-min": "41px", "--style-h1-fluid": "8.4vw", "--style-h1-max": "98px", "--style-h1-tracking": "-0.09em", "--style-h2-tracking": "-0.06em", "--style-h3-tracking": "-0.028em", "--style-desc-size": "19px", "--style-section-lead-size": "18px" } },
        { variables: { "--style-line-height": "1.46", "--style-h1-min": "39px", "--style-h1-fluid": "7.8vw", "--style-h1-max": "88px", "--style-h1-tracking": "-0.055em", "--style-h2-tracking": "-0.042em", "--style-h3-tracking": "-0.024em", "--style-desc-size": "17px", "--style-section-lead-size": "18px" } }
      ],
      chrome: [
        { variables: { "--style-title-rule-width": "0px", "--style-title-rule-padding": "0px", "--style-outline-width": "0px", "--style-outline-offset": "0px" } },
        { variables: { "--style-title-rule-width": "1px", "--style-title-rule-padding": "12px", "--style-outline-width": "0px", "--style-outline-offset": "0px" } },
        { variables: { "--style-title-rule-width": "2px", "--style-title-rule-padding": "14px", "--style-outline-width": "0px", "--style-outline-offset": "0px" } },
        { variables: { "--style-title-rule-width": "0px", "--style-title-rule-padding": "0px", "--style-outline-width": "0px", "--style-outline-style": "solid", "--style-outline-offset": "0px" } },
        { variables: { "--style-title-rule-width": "1px", "--style-title-rule-style": "dashed", "--style-title-rule-padding": "10px", "--style-outline-width": "0px", "--style-outline-style": "solid", "--style-outline-offset": "0px" } },
        { variables: { "--style-title-rule-width": "0px", "--style-title-rule-padding": "0px", "--style-outline-width": "0px", "--style-outline-style": "solid", "--style-outline-offset": "0px" } },
        { variables: { "--style-title-rule-width": "3px", "--style-title-rule-style": "double", "--style-title-rule-padding": "16px", "--style-outline-width": "0px", "--style-outline-offset": "0px" } },
        { variables: { "--style-title-rule-width": "1px", "--style-title-rule-style": "solid", "--style-title-rule-padding": "18px", "--style-outline-width": "0px", "--style-outline-style": "solid", "--style-outline-offset": "0px" } }
      ],
      rhythm: [
        { variables: { "--style-text-width": "620px", "--style-micro-opacity": ".72" } },
        { variables: { "--style-text-width": "680px", "--style-micro-opacity": ".82" } },
        { variables: { "--style-text-width": "720px", "--style-micro-opacity": ".9" } },
        { variables: { "--style-text-width": "760px", "--style-micro-opacity": "1" } },
        { variables: { "--style-text-width": "820px", "--style-micro-opacity": ".88" } },
        { variables: { "--style-text-width": "900px", "--style-micro-opacity": ".76" } },
        { variables: { "--style-text-width": "560px", "--style-micro-opacity": ".95" } },
        { variables: { "--style-text-width": "100%", "--style-micro-opacity": ".68" } }
      ],
      controls: [
        { variables: { "--style-button-y": "9px", "--style-button-x": "12px", "--style-button-size": "12px" } },
        { variables: { "--style-button-y": "10px", "--style-button-x": "14px", "--style-button-size": "13px" } },
        { variables: { "--style-button-y": "12px", "--style-button-x": "16px", "--style-button-size": "14px" } },
        { variables: { "--style-button-y": "13px", "--style-button-x": "18px", "--style-button-size": "14px" } },
        { variables: { "--style-button-y": "14px", "--style-button-x": "22px", "--style-button-size": "15px" } },
        { variables: { "--style-button-y": "11px", "--style-button-x": "20px", "--style-button-size": "12px" } },
        { variables: { "--style-button-y": "15px", "--style-button-x": "18px", "--style-button-size": "16px" } },
        { variables: { "--style-button-y": "8px", "--style-button-x": "18px", "--style-button-size": "13px" } }
      ],
      index: [
        { variables: { "--style-index-box-border-width": "0px", "--style-index-box-padding": "0px", "--style-meta-transform": "uppercase", "--style-meta-spacing": ".08em" } },
        { variables: { "--style-index-box-border-width": "1px", "--style-index-box-padding": "6px 8px", "--style-meta-transform": "uppercase", "--style-meta-spacing": ".1em" } },
        { variables: { "--style-index-box-border-width": "1px", "--style-index-box-padding": "8px 10px", "--style-meta-transform": "none", "--style-meta-spacing": ".02em" } },
        { variables: { "--style-index-box-border-width": "2px", "--style-index-box-padding": "7px 9px", "--style-meta-transform": "uppercase", "--style-meta-spacing": ".14em" } },
        { variables: { "--style-index-box-border-width": "0px", "--style-index-box-padding": "0px", "--style-meta-transform": "lowercase", "--style-meta-spacing": ".04em" } },
        { variables: { "--style-index-box-border-width": "1px", "--style-index-box-padding": "4px 12px", "--style-meta-transform": "uppercase", "--style-meta-spacing": ".18em" } },
        { variables: { "--style-index-box-border-width": "0px", "--style-index-box-padding": "0px", "--style-meta-transform": "none", "--style-meta-spacing": "0" } },
        { variables: { "--style-index-box-border-width": "1px", "--style-index-box-padding": "10px 12px", "--style-meta-transform": "uppercase", "--style-meta-spacing": ".06em" } }
      ]
    };

    function styleGeneSpace() {
      return DATA.surfaceStyles.length * Object.values(STYLE_GENES).reduce((total, options) => total * options.length, 1);
    }

    function chooseGene(rng, options) {
      const trait = weightedTrait(rng, options, 0.8);
      return { index: trait.index, option: trait.value, probability: trait.probability };
    }

    function createStyleGenome(rng) {
      const modeTrait = weightedTrait(rng, DATA.surfaceStyles);
      const modeIndex = modeTrait.index;
      const mode = modeTrait.value;
      const variables = {};
      const signature = [modeIndex];
      const rarityTraits = [{ dimension: "surface", value: mode, probability: modeTrait.probability }];

      Object.entries(STYLE_GENES).forEach(([name, options]) => {
        const { index, option, probability } = chooseGene(rng, options);
        signature.push(index);
        Object.assign(variables, option.variables);
        rarityTraits.push({ dimension: `style.${name}`, value: index, probability });
      });

      return {
        id: "SG-" + signature.map(value => value.toString(36).toUpperCase()).join(""),
        mode,
        variables,
        signature,
        rarityTraits,
        space: styleGeneSpace()
      };
    }


    function cyrb128(str) {
      let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
      for (let i = 0; i < str.length; i++) {
        const k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
      }
      h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
      h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
      h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
      h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
      return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
    }

    function sfc32(a, b, c, d) {
      return function() {
        a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
        let t = (a + b) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        d = (d + 1) | 0;
        t = (t + d) | 0;
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      }
    }

    function createRandom(seed) {
      const [a, b, c, d] = cyrb128(seed);
      return sfc32(a, b, c, d);
    }

    function pick(rng, arr) {
      return arr[Math.floor(rng() * arr.length)];
    }

    function weightedTrait(rng, options, decay = 0.86) {
      const weights = options.map((_, index) => Math.max(1, Math.round(1000 * Math.pow(decay, index))));
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      let roll = rng() * totalWeight;

      for (let index = 0; index < options.length; index++) {
        roll -= weights[index];
        if (roll <= 0) {
          return { value: options[index], index, probability: weights[index] / totalWeight };
        }
      }

      const index = options.length - 1;
      return { value: options[index], index, probability: weights[index] / totalWeight };
    }

    const RARITY_INTERACTIONS = [
      {
        factor: 0.18,
        when: config => ["limewire", "magma", "warning"].includes(config.colorTheme) &&
          ["scanlines", "matrix", "terminal-bars", "blue-noise"].includes(config.backgroundStyle)
      },
      {
        factor: 0.08,
        when: config => ["manifesto", "zine", "mega", "overprint"].includes(config.surfaceStyle) &&
          ["cut", "offset", "badge"].includes(config.shapeStyle)
      },
      {
        factor: 0.24,
        when: config => ["paper", "bone", "porcelain", "newsprint"].includes(config.colorTheme) &&
          ["matrix", "radar", "zebra", "terminal-bars"].includes(config.backgroundStyle)
      },
      {
        factor: 0.2,
        when: config => ["receipt", "dossier", "spec", "labelmaker"].includes(config.surfaceStyle) &&
          ["notebook", "window", "stage"].includes(config.backgroundStyle)
      },
      {
        factor: 0.12,
        when: config => config.styleGenome.signature.slice(1).filter(index => index >= 7).length >= 3
      }
    ];

    function getRarityTier(log10Odds) {
      if (log10Odds < 8) return { id: "common", severity: 1 };
      if (log10Odds < 10) return { id: "uncommon", severity: 2 };
      if (log10Odds < 13) return { id: "rare", severity: 3 };
      if (log10Odds < 16) return { id: "ultraRare", severity: 4 };
      if (log10Odds < 20) return { id: "mythic", severity: 5 };
      if (log10Odds < 25) return { id: "cursed", severity: 6 };
      if (log10Odds < 35) return { id: "statisticallyOffensive", severity: 7 };
      return { id: "shouldNotExist", severity: 8 };
    }

    function formatRarityOdds(log10Odds) {
      const exponent = Math.floor(log10Odds);
      if (exponent < 15) {
        return Math.round(Math.pow(10, log10Odds)).toLocaleString(document.documentElement.lang);
      }
      const mantissa = Math.pow(10, log10Odds - exponent);
      return `${mantissa.toFixed(2)} × 10^${exponent}`;
    }

    function calculateRarity(traits, config) {
      let log10Odds = traits.reduce((sum, trait) => sum - Math.log10(trait.probability), 0);
      const activeInteractions = RARITY_INTERACTIONS.filter(rule => rule.when(config));
      activeInteractions.forEach(rule => {
        log10Odds -= Math.log10(rule.factor);
      });

      const tier = getRarityTier(log10Odds);
      const comments = UI.rarity.comments[tier.id] || UI.rarity.comments.common;
      const commentIndex = Math.floor(log10Odds * 100) % comments.length;

      return {
        log10Odds,
        odds: formatRarityOdds(log10Odds),
        tier,
        comment: comments[commentIndex],
        activeInteractions: activeInteractions.length
      };
    }

    function shuffle(rng, arr) {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    function pickN(rng, arr, n) {
      return shuffle(rng, arr).slice(0, n);
    }

    function createShortSeed() {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      let seed = "SL-";
      for (const byte of bytes) seed += chars[byte % chars.length];
      return seed;
    }

    function getSeed() {
      const params = new URLSearchParams(window.location.search);
      let seed = params.get("seed");
      if (!seed) {
        seed = createShortSeed();
        const url = new URL(window.location.href);
        url.searchParams.set("seed", seed);
        window.history.replaceState(null, "", url);
      }
      return seed;
    }

    function generateConfig(seed) {
      const rng = createRandom(seed);
      const layout = "single";
      const colorThemeTrait = weightedTrait(rng, DATA.colorThemes);
      const backgroundStyleTrait = weightedTrait(rng, DATA.backgroundStyles);
      const colorTheme = colorThemeTrait.value;
      const backgroundStyle = backgroundStyleTrait.value;
      const styleGenome = createStyleGenome(rng);
      const surfaceStyle = styleGenome.mode;
      const shapeStyleTrait = weightedTrait(rng, DATA.shapeStyles);
      const shapeStyle = shapeStyleTrait.value;
      const educationPlacement = pick(rng, ["hero", "section"]);
      const sectionPool = ["work", "experience", "principles", "skills", "now"];
      if (educationPlacement === "section") sectionPool.push("education");
      const sections = shuffle(rng, sectionPool);
      const projects = shuffle(rng, DATA.projects).map(project => {
        const descriptionPool = PROJECT_DESCRIPTION_POOLS[project.id] || project.intros;
        return {
          ...project,
          intro: pick(rng, project.intros),
          description: pick(rng, descriptionPool),
          descriptionMode: pick(rng, UI.descriptionModes),
          tag: pick(rng, project.tags)
        };
      });

      const experienceSource = DATA.experienceProject;
      const experienceDescriptionPool = PROJECT_DESCRIPTION_POOLS[experienceSource.id] || experienceSource.intros;
      const experienceProject = {
        ...experienceSource,
        intro: pick(rng, experienceSource.intros),
        description: pick(rng, experienceDescriptionPool),
        descriptionMode: pick(rng, UI.descriptionModes),
        tag: pick(rng, experienceSource.tags)
      };

      const config = {
        seed,
        layout,
        colorTheme,
        backgroundStyle,
        surfaceStyle,
        styleGenome,
        shapeStyle,
        educationPlacement,
        motion: pick(rng, DATA.motions),
        tone: pick(rng, DATA.tones),
        bias: pick(rng, DATA.biases),
        kicker: pick(rng, DATA.heroKickers),
        headline: pick(rng, DATA.heroHeadlines),
        subhead: pick(rng, DATA.heroSubheads),
        sections,
        projects,
        experienceProject,
        principles: pickN(rng, DATA.principles, 4),
        currentState: pick(rng, DATA.currentStates),
        educationBody: pick(rng, DATA.educationBodies),
        contactCopy: pick(rng, DATA.contactCopies),
        revealCopy: pick(rng, DATA.revealCopies),
        leads: Object.fromEntries(Object.entries(DATA.sectionLeads).map(([key, values]) => [key, pick(rng, values)])),
        footerQuip: pick(rng, SAFE_BILINGUAL_QUIPS)
      };

      config.rarity = calculateRarity([
        { dimension: "palette", value: colorTheme, probability: colorThemeTrait.probability },
        { dimension: "background", value: backgroundStyle, probability: backgroundStyleTrait.probability },
        ...styleGenome.rarityTraits,
        { dimension: "shape", value: shapeStyle, probability: shapeStyleTrait.probability }
      ], config);

      return config;
    }

    function escapeHtml(str) {
      return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function renderShell(config) {
      const { shell } = UI;
      const language = document.documentElement.lang.startsWith("zh") ? "zh" : "en";
      const footerQuip = config.footerQuip?.[language] || shell.footer;
      document.body.innerHTML = `
        <div class="regenerating" id="regenerating" aria-hidden="true">
          <div class="regen-box">
            ${shell.regenerating.map((line, index) => `<div class="regen-line${index === 0 ? " active" : ""}">${escapeHtml(line)}</div>`).join("")}
          </div>
        </div>
        <header class="topbar">
          <div class="topbar-inner">
            <a class="brand" href="#top" aria-label="${escapeHtml(shell.brandAria)}">
              <span class="brand-mark">SL</span>
              <span>Stark Lin</span>
            </a>
            <nav id="nav" aria-label="${escapeHtml(shell.navAria)}"></nav>
          </div>
        </header>
        <div class="site" id="top">
          <section class="hero" id="hero"></section>
          <main id="main"></main>
          <section class="reveal" id="reveal"></section>
          <section class="complete-version" id="completeVersion" hidden></section>
      <footer class="tiny-footer">
        <span>© 2026 Stark Lin</span>
        <span>${escapeHtml(footerQuip)}</span>
        <span>
          <a href="https://github.com/stark-lin/stark-lin.github.io" target="_blank" rel="noreferrer">${escapeHtml(shell.sourceLabel)}</a>
          · <a href="./LICENSE">AGPL-3.0</a>
        </span>
      </footer>
        </div>
        <div class="toast" id="toast">${escapeHtml(shell.copied)}</div>
      `;
    }

    function renderNav(config) {
      document.getElementById("nav").innerHTML = [...config.sections, "contact"]
        .map(id => `<a href="#${id}">${escapeHtml(UI.nav[id])}</a>`)
        .join("");
    }

    function renderHero(config) {
      const summaryCard = config.educationPlacement === "hero" ? `
        <aside class="hero-card" aria-label="${escapeHtml(UI.profileSummary.ariaLabel)}">
          <div class="stat-grid">
            ${UI.profileSummary.items.map(([label, value]) => `
              <div class="stat">
                <div class="stat-label">${escapeHtml(label)}</div>
                <div class="stat-value">${escapeHtml(value)}</div>
              </div>
            `).join("")}
          </div>
        </aside>
      ` : "";
    
      document.getElementById("hero").innerHTML = `
        <div class="hero-grid fade-in">
          <div>
            <div class="kicker">${escapeHtml(config.kicker)}</div>
            <h1>${escapeHtml(config.headline)}</h1>
            <p class="hero-sub">${escapeHtml(config.subhead)}</p>
            <div class="hero-actions">
              <a class="button" href="#work">${escapeHtml(UI.heroActions.work)}</a>
              <a class="button secondary" href="#contact">${escapeHtml(UI.heroActions.contact)}</a>
            </div>
          </div>
          ${summaryCard}
        </div>
      `;
    }

    function sectionShell(index, id, title, lead, body) {
      return `
        <section class="section" id="${id}">
          <div class="section-head">
            <div class="section-index">${String(index).padStart(2, "0")} / ${escapeHtml(id)}</div>
            <div>
              <h2>${escapeHtml(title)}</h2>
              <p class="section-lead">${escapeHtml(lead)}</p>
            </div>
          </div>
          ${body}
        </section>
      `;
    }

    function renderWork(config, index) {
      const cards = config.projects.map((project, i) => `
        <article class="card ${i === 0 ? "full" : ""}">
          <div class="card-title-row">
            <div>
              <h3>${escapeHtml(project.title)} — ${escapeHtml(project.subtitle)}</h3>
              <div class="stack">${escapeHtml(project.stack)}</div>
            </div>
            <span class="tag">${escapeHtml(project.tag)}</span>
          </div>
          <div class="generated-desc-meta">${escapeHtml(UI.labels.projectNote)} · ${escapeHtml(project.descriptionMode)}</div>
          <p class="generated-description">${escapeHtml(project.description)}</p>
          ${project.url.startsWith("http") ? `<p style="margin-top:18px"><a href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer">${escapeHtml(UI.labels.openRepository)}</a></p>` : ""}
        </article>
      `).join("");
    
      return sectionShell(index, "work", UI.sectionTitles.work, config.leads.work, `<div class="cards">${cards}</div>`);
    }

    function renderExperience(config, index) {
      const project = config.experienceProject;
      const body = `
        <div class="timeline">
          <article class="timeline-item">
            <div class="time-label">${escapeHtml(UI.labels.courseProject)}</div>
            <div>
              <h3>${escapeHtml(project.title)}</h3>
              <div class="stack">${escapeHtml(project.subtitle)}</div>
              <div class="generated-desc-meta">${escapeHtml(UI.labels.projectNote)} · ${escapeHtml(project.descriptionMode || UI.labels.defaultProjectSlice)}</div>
              <p class="generated-description">${escapeHtml(project.description || project.intros[0])}</p>
            </div>
          </article>
        </div>
      `;
      return sectionShell(index, "experience", UI.sectionTitles.experience, config.leads.experience, body);
    }

    function renderEducation(config, index) {
      const education = DATA.identity.education;
      const body = `
        <div class="cards">
          <article class="card full">
            <div class="card-title-row">
              <div>
                <h3>${escapeHtml(education.school)}</h3>
                <div class="stack">${escapeHtml(education.degree)}</div>
              </div>
              <span class="tag">${escapeHtml(education.graduation)}</span>
            </div>
            <p>${escapeHtml(config.educationBody)}</p>
          </article>
        </div>
      `;
      return sectionShell(index, "education", UI.sectionTitles.education, config.leads.education, body);
    }

    function renderPrinciples(config, index) {
      const body = `
        <div class="principles">
          ${config.principles.map((principle, i) => `<div class="principle"><span class="tag">P${String(i + 1).padStart(2, "0")}</span><p style="margin-top:16px">${escapeHtml(principle)}</p></div>`).join("")}
        </div>
      `;
      return sectionShell(index, "principles", UI.sectionTitles.principles, config.leads.principles, body);
    }

    function renderSkills(config, index) {
      const body = `
        <div class="cards">
          ${UI.skills.map(([title, skills]) => `
            <article class="card third">
              <h3>${escapeHtml(title)}</h3>
              <div class="skill-cloud" style="margin-top:18px">
                ${skills.map(skill => `<span class="skill-pill">${escapeHtml(skill)}</span>`).join("")}
              </div>
            </article>
          `).join("")}
        </div>
      `;
      return sectionShell(index, "skills", UI.sectionTitles.skills, config.leads.skills, body);
    }

    function renderNow(config, index) {
      const body = `
        <div class="cards">
          <article class="card full">
            <div class="card-title-row">
              <h3>${escapeHtml(config.currentState.title)}</h3>
              <span class="tag">${escapeHtml(UI.labels.now)}</span>
            </div>
            <p>${escapeHtml(config.currentState.body)}</p>
          </article>
        </div>
      `;
      return sectionShell(index, "now", UI.sectionTitles.now, config.leads.now, body);
    }

    function renderContact(config, index) {
      return sectionShell(index, "contact", UI.sectionTitles.contact, config.leads.contact, `
        <div class="contact-panel">
          <div>
            <h2>${escapeHtml(config.contactCopy.headline)}</h2>
            <p class="section-lead">${escapeHtml(config.contactCopy.body)}</p>
          </div>
          <div class="contact-links">
            <a class="button" href="mailto:${escapeHtml(DATA.identity.contact.email)}">${escapeHtml(UI.labels.email)}</a>
            <a class="button secondary" href="${escapeHtml(DATA.identity.contact.github)}" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      `);
    }

    function renderCompleteVersion(config, forceShow = false) {
      const params = new URLSearchParams(window.location.search);
      const shouldShow = forceShow || params.get("complete") === "1";
      const complete = document.getElementById("completeVersion");
      complete.hidden = !shouldShow;
      if (!shouldShow) return;
    
      const projects = DATA.projects.map(project => `
        <article class="card complete-project">
          <div class="card-title-row">
            <div>
              <h3>${escapeHtml(project.title)} — ${escapeHtml(project.subtitle)}</h3>
              <div class="stack">${escapeHtml(project.stack)}</div>
            </div>
            <span class="tag">${escapeHtml(UI.labels.fullRecord)}</span>
          </div>
          <div class="generated-desc-meta">${escapeHtml(UI.labels.projectIntroduction)}</div>
          <div class="intro-list">
            <p>${escapeHtml(project.intros[0])}</p>
          </div>
          <div class="generated-desc-meta" style="margin-top:22px">${escapeHtml(UI.labels.implementationNotes)}</div>
          <ul>${project.bullets.map(bullet => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>
          ${project.url.startsWith("http") ? `<p style="margin-top:16px"><a href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer">${escapeHtml(UI.labels.openRepository)}</a></p>` : ""}
        </article>
      `).join("");
    
      const education = DATA.identity.education;
      complete.innerHTML = `
        <div class="complete-head">
          <div class="section-index">${escapeHtml(UI.labels.completeIndex)}</div>
          <div>
            <h2>${escapeHtml(UI.labels.completeTitle)}</h2>
            <p class="section-lead">${escapeHtml(UI.labels.completeLead)}</p>
          </div>
        </div>
        <div class="cards">
          <article class="card full">
            <div class="card-title-row">
              <div>
                <h3>${escapeHtml(education.school)}</h3>
                <div class="stack">${escapeHtml(education.degree)}</div>
              </div>
              <span class="tag">${escapeHtml(education.graduation)}</span>
            </div>
            <p>${escapeHtml(DATA.identity.stableLine)}</p>
          </article>
          ${projects}
        </div>
      `;
    }

    function showCompleteVersion(config) {
      const url = new URL(window.location.href);
      url.searchParams.set("complete", "1");
      window.history.replaceState(null, "", url.toString());
      renderCompleteVersion(config, true);
      document.getElementById("completeVersion").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function renderMain(config) {
      const renderers = {
        work: renderWork,
        experience: renderExperience,
        education: renderEducation,
        principles: renderPrinciples,
        skills: renderSkills,
        now: renderNow
      };
      const sections = config.sections.map((key, i) => renderers[key](config, i + 1)).join("");
      document.getElementById("main").innerHTML = sections + renderContact(config, config.sections.length + 1);
    }

    function renderReveal(config) {
      const reveal = document.getElementById("reveal");
      reveal.innerHTML = `
        <div class="kicker">${escapeHtml(config.revealCopy.kicker)}</div>
        <h2>${escapeHtml(config.revealCopy.headline)}</h2>
        <p style="margin-top:18px">${escapeHtml(config.revealCopy.body)}</p>
        <div class="reveal-grid">
          <div class="reveal-stat">
            <div class="reveal-stat-section">
              <div class="reveal-stat-label">${escapeHtml(UI.labels.referenceCode)}</div>
              <div class="reveal-stat-value">${escapeHtml(config.seed)}</div>
            </div>
            <div class="reveal-stat-section rarity-report" data-rarity-tier="${escapeHtml(config.rarity.tier.id)}">
              <div class="reveal-stat-label">${escapeHtml(UI.rarity.label)}</div>
              <div class="rarity-heading">
                <div class="reveal-stat-value rarity-tier">${escapeHtml(UI.rarity.tiers[config.rarity.tier.id])}</div>
                <div class="rarity-odds">${escapeHtml(UI.rarity.odds.replace("{odds}", config.rarity.odds))}</div>
              </div>
              <div class="rarity-comment">${escapeHtml(config.rarity.comment)}</div>
            </div>
          </div>
        </div>
        <div class="reveal-actions">
          <button class="button" id="rollAgain">${escapeHtml(UI.labels.refreshView)}</button>
          <button class="button secondary" id="copyVersion">${escapeHtml(UI.labels.copyView)}</button>
          <button class="button secondary surrender" id="surrenderComplete">${escapeHtml(UI.labels.showComplete)}</button>
        </div>
      `;
    
      document.getElementById("rollAgain").addEventListener("click", rollAgain);
      document.getElementById("copyVersion").addEventListener("click", () => copyText(window.location.href, UI.labels.viewCopied));
      document.getElementById("surrenderComplete").addEventListener("click", () => showCompleteVersion(config));
    }

    function copyText(text, message) {
      navigator.clipboard.writeText(text).then(() => showToast(message)).catch(() => {
        const input = document.createElement("input");
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
        showToast(message);
      });
    }

    function showToast(message) {
      const toast = document.getElementById("toast");
      toast.textContent = message;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1400);
    }

    function rollAgain() {
      const overlay = document.getElementById("regenerating");
      overlay.classList.add("active");
      const lines = [...overlay.querySelectorAll(".regen-line")];
      lines.forEach((line, index) => {
        setTimeout(() => line.classList.add("active"), index * 210);
      });
      setTimeout(() => {
        const seed = createShortSeed();
        const url = new URL(window.location.href);
        url.searchParams.set("seed", seed);
        window.location.href = url.toString();
      }, 980);
    }

    function applyStyleGenome(styleGenome) {
      Object.entries(styleGenome.variables).forEach(([property, value]) => {
        document.body.style.setProperty(property, value);
      });
      document.documentElement.dataset.styleGenome = styleGenome.id;
    }

    function applyBodyClass(config) {
      document.body.className = [
        `theme-${config.colorTheme}`,
        `bg-${config.backgroundStyle}`,
        `style-${config.surfaceStyle}`,
        `shape-${config.shapeStyle}`,
        "style-generated",
        "layout-single"
      ].join(" ");
      applyStyleGenome(config.styleGenome);
    }

    function init() {
      const seed = getSeed();
      const config = generateConfig(seed);
      renderShell(config);
      applyBodyClass(config);
      renderNav(config);
      renderHero(config);
      renderMain(config);
      renderReveal(config);
      renderCompleteVersion(config);
    }

    init();
})();
