(() => {
  "use strict";

  const styles = [];
  const ids = new Set();

  window.PORTFOLIO_REGISTER_STYLE = style => {
    if (!style || typeof style.id !== "string" || !style.id.trim()) {
      throw new Error("A portfolio style requires a non-empty id.");
    }
    if (ids.has(style.id)) {
      throw new Error(`Portfolio style "${style.id}" is already registered.`);
    }
    if (!Array.isArray(style.classNames) || style.classNames.length === 0) {
      throw new Error(`Portfolio style "${style.id}" requires at least one body class.`);
    }

    ids.add(style.id);
    styles.push(Object.freeze({
      ...style,
      classNames: Object.freeze([...style.classNames]),
      variables: Object.freeze({ ...(style.variables || {}) }),
      label: Object.freeze({ ...(style.label || {}) }),
      introduction: Object.freeze({ ...(style.introduction || {}) })
    }));
  };

  window.PORTFOLIO_STYLE_POOL = styles;
})();
