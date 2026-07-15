(() => {
  "use strict";

  const room = {
    number: "04",
    id: "de-stijl",
    nameZh: "风格派",
    nameEn: "De Stijl",
    period: "1917–1931",
    curatorial: {
      zh: "本展厅把同一份个人档案分配到贯穿整页的不等正交网格中。水平线与垂直线真正切割内容，空白矩形保留呼吸，大小强调平面通过非对称重量维持持续的数字建筑。",
      en: "This room distributes the same personal archive across a continuous unequal orthogonal grid. Horizontal and vertical lines genuinely divide content, empty rectangles preserve breathing space, and asymmetrically weighted planes maintain a continuous digital architecture from entry to regeneration."
    },

    configure({ deriveRng, pick, shuffle }) {
      const layout = deriveRng("room-04-layout");
      const decoration = deriveRng("room-04-decoration");
      const motion = deriveRng("room-04-motion");
      const grids = [
        "minmax(20px,.45fr) 1fr 1.55fr .75fr 2fr minmax(20px,.45fr)",
        "minmax(20px,.4fr) 1.65fr .7fr 1.2fr 1.8fr minmax(20px,.55fr)",
        "minmax(20px,.6fr) .8fr 1.8fr 1fr 1.45fr minmax(20px,.35fr)"
      ];
      return {
        grid: pick(layout, grids),
        mobileGrid: pick(layout, [".45fr 1.5fr 1fr .35fr", ".35fr 1fr 1.6fr .45fr", ".55fr 1.7fr .8fr .4fr"]),
        templates: shuffle(layout, ["narrow-wide", "horizontal-cut", "interlocking", "edge-index"]),
        heroSide: pick(layout, ["left", "right"]),
        emptyPosition: pick(layout, ["upper", "lower"]),
        rollLabel: pick(decoration, ["RECOMPOSE THE GRID", "ANOTHER PLAN", "NEW RECTANGULAR ORDER", "ROLL ANOTHER ROOM"]),
        transitionMs: pick(motion, [260, 360, 500])
      };
    },

    render(model, { escapeHtml: e }) {
      const c = model.roomConfig;
      const l = model.labels;
      const languageTarget = model.isZh ? "en" : "zh";
      document.documentElement.style.setProperty("--de-grid", c.grid);
      document.documentElement.style.setProperty("--de-mobile-grid", c.mobileGrid);

      const titles = {
        projects: l.sections.projects,
        experience: l.sections.experience,
        education: l.sections.education,
        "working-stack": l.sections.stack,
        "room-introduction": l.sections.room
      };

      const projects = () => `
        <div class="de-projects">
          ${model.projects.map((project, index) => {
            const detailId = `de-${e(project.id)}-details`;
            return `
              <article class="de-project project-layout-${index % 2 === 0 ? "a" : "b"}" aria-labelledby="de-${e(project.id)}-title">
                <div class="project-index">0${index + 1}</div>
                <div class="project-title-cell"><h3 id="de-${e(project.id)}-title">${e(project.title)}</h3><p>${e(project.subtitle)}</p></div>
                <p class="project-description-cell">${e(project.description)}</p>
                <p class="project-stack-cell">${e(project.stack)}</p>
                <div class="project-actions-cell"><button type="button" aria-expanded="false" aria-controls="${detailId}" data-project-toggle>${e(l.details)}</button><a href="${e(project.url)}" target="_blank" rel="noopener noreferrer">${e(l.repository)} ↗</a></div>
                <div class="project-details" id="${detailId}" hidden><ul>${project.bullets.map(item => `<li>${e(item)}</li>`).join("")}</ul></div>
                <div class="project-empty-cell" aria-hidden="true"></div><div class="project-accent-cell" aria-hidden="true"></div>
              </article>`;
          }).join("")}
        </div>`;

      const experience = () => `
        <article class="de-experience">
          <div class="experience-code">01</div><div class="experience-role"><h3>${e(model.experience.title)}</h3><p>${e(model.experience.subtitle)}</p></div><p class="experience-description">${e(model.experience.description)}</p><ul>${model.experience.bullets.map(item => `<li>${e(item)}</li>`).join("")}</ul><div class="experience-empty" aria-hidden="true"></div><div class="experience-accent" aria-hidden="true"></div>
        </article>`;

      const education = () => `
        <article class="de-education">
          <div class="education-anchor"><p>01 / FOUNDATION</p><h3>${e(model.education.school)}</h3><p>${e(model.education.degree)}</p><strong>${e(model.education.graduation)}</strong></div>
          <p class="education-copy">${e(model.education.body)}</p><div class="education-empty" aria-hidden="true"></div><div class="education-accent" aria-hidden="true"></div>
        </article>`;

      const stack = () => `
        <div class="de-stack">
          ${model.skills.map(([group, skills], groupIndex) => `<section class="stack-group group-${groupIndex + 1}"><h3>${e(group)}</h3><ul>${skills.map(skill => `<li>${e(skill)}</li>`).join("")}</ul></section>`).join("")}
          <div class="stack-empty" aria-hidden="true"></div><div class="stack-accent" aria-hidden="true"></div>
        </div>`;

      const introduction = () => `
        <div class="de-exhibition-note">
          <div class="note-number">ROOM<br>04 / 42</div>
          <div class="note-name"><h3>${e(room.nameZh)}<br><span lang="en">${e(room.nameEn)}</span></h3><p>${e(room.period)}</p></div>
          <p class="note-copy">${e(model.isZh ? room.curatorial.zh : room.curatorial.en)}</p>
          <dl><div><dt>${e(l.layout)}</dt><dd>${e(c.templates.join(" / "))}</dd></div><div><dt>${e(l.seed)}</dt><dd class="seed-value">${e(model.seed)}</dd></div></dl>
          <button type="button" data-copy-url>${e(l.copy)}</button><div class="note-empty" aria-hidden="true"></div><div class="note-accent" aria-hidden="true"></div>
        </div>`;

      const bodies = { projects, experience, education, "working-stack": stack, "room-introduction": introduction };
      const middle = model.middleOrder.map((key, index) => `
        <section class="de-section template-${c.templates[index % c.templates.length]}" id="${key}" aria-labelledby="${key}-title">
          <header><span>0${index + 2}</span><h2 id="${key}-title">${e(titles[key])}</h2></header>
          <div class="de-content">${bodies[key]()}</div>
          <div class="section-empty-plane" aria-hidden="true"></div><div class="section-accent-plane" aria-hidden="true"></div>
        </section>`).join("");

      const navigation = `
        <a class="de-brand" href="#hero">STARK LIN</a>
        <a href="#hero" data-nav-target>${e(l.nav.entry)}</a>
        <a href="#middle-sequence" data-nav-target>${e(l.nav.archive)}</a>
        <a href="#contact" data-nav-target>${e(l.nav.contact)}</a>
        <a href="#roll-again" data-nav-target>${e(l.nav.again)}</a>
        <a href="?lang=${languageTarget}" data-language-switch aria-label="${e(l.languageAria)}">${e(l.language)}</a>`;

      const hero = `
        <div class="de-hero hero-${c.heroSide} empty-${c.emptyPosition}">
          <div class="hero-name-cell"><p>${e(model.hero.kicker)}</p><h1 id="hero-title">${e(model.data.identity.name)}</h1></div>
          <div class="hero-copy-cell"><h2>${e(model.hero.headline)}</h2>${model.hero.secondary ? `<p>${e(model.hero.secondary)}</p>` : ""}</div>
          <div class="hero-room-cell"><span>04 / 42</span><span class="seed-value">${e(model.seed)}</span></div>
          <div class="hero-empty-cell" aria-hidden="true"></div><div class="hero-major-cell" aria-hidden="true"></div><div class="hero-minor-cell" aria-hidden="true"></div>
          <a class="hero-entry-cell" href="#middle-sequence">${e(l.scroll)} ↓</a>
        </div>`;

      const contact = `
        <div class="de-contact-grid">
          <div class="contact-heading-cell"><p>07 / CONTACT</p><h2 id="contact-title">${e(model.contactCopy.headline)}</h2><p>${e(model.contactCopy.body)}</p></div>
          <a class="contact-email" href="mailto:${e(model.contact.email)}"><strong>${e(l.email)}</strong><span>${e(model.contact.email)}</span></a>
          <a class="contact-github" href="${e(model.contact.github)}" target="_blank" rel="noopener noreferrer"><strong>GitHub</strong><span>${e(model.contact.github.replace("https://", ""))}</span></a>
          ${model.contact.linkedin ? `<a class="contact-linkedin" href="${e(model.contact.linkedin)}" target="_blank" rel="noopener noreferrer"><strong>LinkedIn</strong><span>${e(model.contact.linkedin.replace("https://", ""))}</span></a>` : `<span class="contact-linkedin missing"><strong>LinkedIn</strong><span>${e(l.linkedinMissing)}</span></span>`}
          <div class="contact-empty" aria-hidden="true"></div><div class="contact-accent" aria-hidden="true"></div>
        </div>`;

      const rollAgain = `
        <div class="de-roll-grid">
          <div class="roll-empty" aria-hidden="true"></div>
          <button id="roll-title" type="button" data-roll-again><span>08 / AGAIN</span><strong>${e(c.rollLabel)}</strong><span>${e(l.generate)}</span><span class="seed-value">${e(model.seed)}</span></button>
          <div class="roll-accent" aria-hidden="true"></div><div class="roll-balance" aria-hidden="true"></div>
        </div>`;

      return { navigation, hero, middle, contact, rollAgain, transitionMs: c.transitionMs };
    }
  };

  window.RoomRuntime.start(room);
})();
