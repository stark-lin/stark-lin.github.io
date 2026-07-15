(() => {
  "use strict";

  const room = {
    number: "01",
    id: "purism",
    nameZh: "纯粹主义",
    nameEn: "Purism",
    period: "c. 1918–1925",
    curatorial: {
      zh: "本展厅以稳定双轴、精确比例与低信息密度重组同一份个人档案。几何体不是装饰，而是负责对齐、配重与标记版本；安静平面让项目、经历与联系方式保持清晰。",
      en: "This room reorganises the same personal archive through stable axes, exact proportions, and low information density. Geometry is not ornamental: each form aligns, counterweights, extends, or marks the current version, while quiet planes keep projects, experience, and contact details legible."
    },

    configure({ deriveRng, pick, shuffle }) {
      const layout = deriveRng("room-01-layout");
      const decoration = deriveRng("room-01-decoration");
      const motion = deriveRng("room-01-motion");
      return {
        heroHeight: pick(layout, ["90svh", "100svh", "120svh"]),
        planeSide: pick(layout, ["left", "right"]),
        planeOffset: pick(layout, ["4%", "6%", "8%"]),
        relations: shuffle(layout, ["label-left", "label-right", "label-top"]).slice(0, 2),
        projectTemplates: shuffle(layout, ["still-life", "balance", "monolith"]).slice(0, 2),
        circlePosition: pick(decoration, ["high", "low"]),
        longBarAxis: pick(decoration, ["horizontal", "vertical"]),
        rollLabel: pick(decoration, ["RECOMPOSE", "CALIBRATE AGAIN", "NEXT CONFIGURATION"]),
        transitionMs: pick(motion, [360, 440, 500])
      };
    },

    render(model, { escapeHtml: e }) {
      const c = model.roomConfig;
      const labels = model.labels;
      const languageTarget = model.isZh ? "en" : "zh";
      document.documentElement.style.setProperty("--purism-hero-height", c.heroHeight);
      document.documentElement.style.setProperty("--purism-plane-offset", c.planeOffset);

      const sectionTitles = {
        projects: labels.sections.projects,
        experience: labels.sections.experience,
        education: labels.sections.education,
        "working-stack": labels.sections.stack,
        "room-introduction": labels.sections.room
      };

      const renderProjects = () => `
        <div class="purism-projects">
          ${model.projects.map((project, index) => {
            const detailsId = `project-${e(project.id)}-details`;
            const template = c.projectTemplates[index % c.projectTemplates.length];
            return `
              <article class="purism-project project-${template}" aria-labelledby="project-${e(project.id)}-title">
                <div class="project-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</div>
                <div class="project-primary">
                  <h3 id="project-${e(project.id)}-title">${e(project.title)}</h3>
                  <p class="project-subtitle">${e(project.subtitle)}</p>
                </div>
                <p class="project-description">${e(project.description)}</p>
                <div class="project-technology"><span>${e(labels.technology)}</span>${e(project.stack)}</div>
                <div class="project-actions">
                  <button class="project-toggle" type="button" aria-expanded="false" aria-controls="${detailsId}" data-project-toggle>${e(labels.details)}</button>
                  <a href="${e(project.url)}" target="_blank" rel="noopener noreferrer">${e(labels.repository)} ↗</a>
                </div>
                <div class="project-details" id="${detailsId}" hidden>
                  <ul>${project.bullets.map(item => `<li>${e(item)}</li>`).join("")}</ul>
                </div>
                <div class="project-proportion" aria-hidden="true"></div>
              </article>`;
          }).join("")}
        </div>`;

      const renderExperience = () => `
        <article class="purism-record experience-record">
          <div class="record-year">${e(labels.courseProject)}</div>
          <div><h3>${e(model.experience.title)}</h3><p>${e(model.experience.subtitle)}</p></div>
          <div><p>${e(model.experience.description)}</p><ul>${model.experience.bullets.map(item => `<li>${e(item)}</li>`).join("")}</ul></div>
        </article>`;

      const renderEducation = () => `
        <article class="purism-record education-record">
          <div class="education-marker" aria-hidden="true"></div>
          <div><h3>${e(model.education.school)}</h3><p>${e(model.education.degree)}</p></div>
          <div><strong>${e(model.education.graduation)}</strong><p>${e(model.education.body)}</p></div>
        </article>`;

      const renderStack = () => `
        <div class="purism-stack">
          ${model.skills.map(([group, skills]) => `
            <section aria-label="${e(group)}"><h3>${e(group)}</h3><ul>${skills.map(skill => `<li><span>${e(group)}</span>${e(skill)}</li>`).join("")}</ul></section>`).join("")}
        </div>`;

      const renderRoomIntroduction = () => `
        <div class="purism-exhibition-note">
          <p class="room-mark">ROOM 01 / 42</p>
          <div><h3>${e(room.nameZh)}<br><span lang="en">${e(room.nameEn)}</span></h3><p>${e(room.period)}</p></div>
          <p>${e(model.isZh ? room.curatorial.zh : room.curatorial.en)}</p>
          <dl>
            <div><dt>${e(labels.layout)}</dt><dd>${e(c.relations.join(" / "))}</dd></div>
            <div><dt>${e(labels.seed)}</dt><dd class="seed-value">${e(model.seed)}</dd></div>
          </dl>
          <button class="copy-control" type="button" data-copy-url>${e(labels.copy)}</button>
        </div>`;

      const bodies = {
        projects: renderProjects,
        experience: renderExperience,
        education: renderEducation,
        "working-stack": renderStack,
        "room-introduction": renderRoomIntroduction
      };

      const middle = model.middleOrder.map((key, index) => {
        const relation = c.relations[index % c.relations.length];
        return `
          <section class="purism-section relation-${relation}" id="${key}" aria-labelledby="${key}-title">
            <header class="label-plane">
              <span>${String(index + 2).padStart(2, "0")}</span>
              <h2 id="${key}-title">${e(sectionTitles[key])}</h2>
            </header>
            <div class="content-plane">${bodies[key]()}</div>
          </section>`;
      }).join("");

      const navigation = `
        <a class="purism-brand" href="#hero">STARK LIN</a>
        <span aria-hidden="true">ROOM 01</span>
        <div class="purism-nav-links">
          <a href="#hero" data-nav-target>01 — ${e(labels.nav.entry)}</a>
          <a href="#middle-sequence" data-nav-target>02 — ${e(labels.nav.archive)}</a>
          <a href="#contact" data-nav-target>03 — ${e(labels.nav.contact)}</a>
          <a href="#roll-again" data-nav-target>04 — ${e(labels.nav.again)}</a>
        </div>
        <a href="?lang=${languageTarget}" data-language-switch aria-label="${e(labels.languageAria)}">${e(labels.language)}</a>`;

      const hero = `
        <div class="purism-hero plane-${c.planeSide} circle-${c.circlePosition} bar-${c.longBarAxis}">
          <div class="hero-copy">
            <p class="semantic-label">${e(model.hero.kicker)}</p>
            <h1 id="hero-title">${e(model.data.identity.name)}</h1>
            <p class="hero-statement">${e(model.hero.headline)}</p>
            ${model.hero.secondary ? `<p class="hero-secondary">${e(model.hero.secondary)}</p>` : ""}
          </div>
          <div class="hero-meta"><span>01 / 42</span><span class="seed-value">${e(model.seed)}</span></div>
          <div class="purism-geometry" aria-hidden="true"><i class="shape rectangle"></i><i class="shape circle"></i><i class="shape bar"></i><i class="shape square"></i></div>
          <a class="hero-scroll" href="#middle-sequence">${e(labels.scroll)} ↓</a>
        </div>`;

      const contact = `
        <div class="purism-contact-plane">
          <div><p class="semantic-label">07 / ${e(labels.sections.contact || labels.nav.contact)}</p><h2 id="contact-title">${e(model.contactCopy.headline)}</h2><p>${e(model.contactCopy.body)}</p></div>
          <address>
            <a href="mailto:${e(model.contact.email)}"><span>${e(labels.email)}</span>${e(model.contact.email)}</a>
            <a href="${e(model.contact.github)}" target="_blank" rel="noopener noreferrer"><span>GitHub</span>${e(model.contact.github.replace("https://", ""))}</a>
            ${model.contact.linkedin ? `<a href="${e(model.contact.linkedin)}" target="_blank" rel="noopener noreferrer"><span>LinkedIn</span>${e(model.contact.linkedin.replace("https://", ""))}</a>` : `<span class="missing-link"><strong>LinkedIn</strong>${e(labels.linkedinMissing)}</span>`}
          </address>
        </div>`;

      const rollAgain = `
        <button class="purism-roll-control" id="roll-title" type="button" data-roll-again>
          <span class="roll-action">${e(c.rollLabel)}</span>
          <span>${e(labels.generate)}</span>
          <span class="seed-value">${e(model.seed)}</span>
          <i aria-hidden="true"></i>
        </button>`;

      return { navigation, hero, middle, contact, rollAgain, transitionMs: c.transitionMs };
    }
  };

  window.RoomRuntime.start(room);
})();
