(() => {
  "use strict";

  const room = {
    number: "02",
    id: "constructivism",
    nameZh: "构成主义",
    nameEn: "Constructivism",
    period: "1910s–1930s",
    curatorial: {
      zh: "本展厅以方向轴、机械边界和可见装配逻辑推动同一份个人档案。大编号与结构板负责建立行动节奏，正文始终保持水平，让项目、经历与技术信息在张力中仍然清楚。",
      en: "This room reorganises the same archive through a directional axis, mechanical boundaries, and visible assembly logic. Large numbers and structural plates create momentum, while body text remains horizontal so projects, experience, and technical facts stay clear inside the visual tension."
    },

    configure({ deriveRng, pick }) {
      const layout = deriveRng("room-02-layout");
      const decoration = deriveRng("room-02-decoration");
      const motion = deriveRng("room-02-motion");
      const templates = [];
      const choices = ["diagonal-split", "overlap", "command-band"];
      for (let index = 0; index < 5; index += 1) {
        let next = pick(layout, choices);
        if (index > 1 && templates[index - 1] === next && templates[index - 2] === next) {
          next = choices[(choices.indexOf(next) + 1) % choices.length];
        }
        templates.push(next);
      }
      return {
        axis: pick(layout, [-12, -8, 8, 12]),
        mobileAxis: pick(layout, [-6, -3, 3, 6]),
        templates,
        projectTemplates: ["title-corner", "vertical-title", "number-field", "circle-cut", "spanning-title"],
        heroLines: pick(decoration, [1, 2]),
        action: pick(decoration, ["BUILD", "STRUCTURE", "EXECUTE", "ASSEMBLE", "SYSTEM", "MODULE"]),
        rollLabel: pick(decoration, ["REASSEMBLE", "NEW CONSTRUCTION", "REBUILD THE PAGE", "EXECUTE ANOTHER VERSION"]),
        transitionMs: pick(motion, [500, 620, 760, 900])
      };
    },

    render(model, { escapeHtml: e }) {
      const c = model.roomConfig;
      const l = model.labels;
      const languageTarget = model.isZh ? "en" : "zh";
      document.documentElement.style.setProperty("--construct-axis", `${c.axis}deg`);
      document.documentElement.style.setProperty("--construct-mobile-axis", `${c.mobileAxis}deg`);

      const titles = {
        projects: l.sections.projects,
        experience: l.sections.experience,
        education: l.sections.education,
        "working-stack": l.sections.stack,
        "room-introduction": l.sections.room
      };

      const projects = () => `
        <div class="construct-projects">
          ${model.projects.map((project, index) => {
            const detailId = `construct-${e(project.id)}-details`;
            const template = c.projectTemplates[index % c.projectTemplates.length];
            const direction = index % 2 === 0 ? "forward" : "reverse";
            return `
              <article class="construct-project module-${template} direction-${direction}" aria-labelledby="construct-${e(project.id)}-title">
                <div class="module-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</div>
                <div class="module-heading"><p>${e(project.subtitle)}</p><h3 id="construct-${e(project.id)}-title">${e(project.title)}</h3></div>
                <p class="module-description">${e(project.description)}</p>
                <p class="module-stack">${e(project.stack)}</p>
                <div class="module-actions">
                  <button type="button" class="project-toggle" aria-expanded="false" aria-controls="${detailId}" data-project-toggle>${e(l.details)}</button>
                  <a href="${e(project.url)}" target="_blank" rel="noopener noreferrer">${e(l.repository)} ↗</a>
                </div>
                <div class="project-details" id="${detailId}" hidden><ul>${project.bullets.map(item => `<li>${e(item)}</li>`).join("")}</ul></div>
                <span class="module-cut" aria-hidden="true"></span>
              </article>`;
          }).join("")}
        </div>`;

      const experience = () => `
        <article class="mission-record">
          <div class="mission-code">TASK / 01</div>
          <div><h3>${e(model.experience.title)}</h3><p>${e(model.experience.subtitle)}</p><p>${e(model.experience.description)}</p></div>
          <ul>${model.experience.bullets.map(item => `<li>${e(item)}</li>`).join("")}</ul>
        </article>`;

      const education = () => `
        <article class="training-module">
          <div class="training-label">FOUNDATION / 01</div>
          <h3>${e(model.education.school)}</h3>
          <p class="training-degree">${e(model.education.degree)}</p>
          <strong>${e(model.education.graduation)}</strong>
          <p>${e(model.education.body)}</p>
        </article>`;

      const stack = () => `
        <div class="machine-stack">
          ${model.skills.map(([group, skills], groupIndex) => `
            <section><h3>${String(groupIndex + 1).padStart(2, "0")} / ${e(group)}</h3><ul>${skills.map((skill, index) => `<li style="--bar-index:${index + 1}">${e(skill)}</li>`).join("")}</ul></section>`).join("")}
        </div>`;

      const introduction = () => `
        <div class="construct-manifesto">
          <p class="manifesto-command" aria-hidden="true">DIRECTION / STRUCTURE / ACTION</p>
          <div><p>ROOM 02 / 42</p><h3>${e(room.nameZh)}<br><span lang="en">${e(room.nameEn)}</span></h3><strong>${e(room.period)}</strong></div>
          <div><p>${e(model.isZh ? room.curatorial.zh : room.curatorial.en)}</p><dl><div><dt>${e(l.layout)}</dt><dd>${e(c.templates.join(" / "))}</dd></div><div><dt>${e(l.seed)}</dt><dd class="seed-value">${e(model.seed)}</dd></div></dl><button type="button" data-copy-url>${e(l.copy)}</button></div>
        </div>`;

      const bodies = { projects, experience, education, "working-stack": stack, "room-introduction": introduction };
      const commands = ["DEPLOY", "ASSEMBLE", "INDEX", "CONNECT", "INSPECT"];
      const middle = model.middleOrder.map((key, index) => `
        <section class="construct-section template-${c.templates[index]}" id="${key}" aria-labelledby="${key}-title">
          <div class="section-command" aria-hidden="true">${commands[index]}</div>
          <header><span>${String(index + 2).padStart(2, "0")}</span><h2 id="${key}-title">${e(titles[key])}</h2><b>${commands[index]} →</b></header>
          <div class="construct-content">${bodies[key]()}</div>
        </section>`).join("");

      const navigation = `
        <a class="construct-brand" href="#hero">STARK LIN / 02</a>
        <div class="command-navigation">
          <a href="#hero" data-nav-target>[01 ${e(l.nav.entry)}]</a>
          <a href="#middle-sequence" data-nav-target>[02 ${e(l.nav.archive)}]</a>
          <a href="#contact" data-nav-target>[03 ${e(l.nav.contact)}]</a>
          <a href="#roll-again" data-nav-target>[04 ${e(l.nav.again)}]</a>
        </div>
        <a class="language-command" href="?lang=${languageTarget}" data-language-switch aria-label="${e(l.languageAria)}">[${e(l.language)}]</a>`;

      const lines = Array.from({ length: c.heroLines }, (_, index) => `<i class="axis-line axis-line-${index + 1}"></i>`).join("");
      const hero = `
        <div class="construct-hero">
          <div class="hero-number" aria-hidden="true">02</div>
          <div class="hero-action" aria-hidden="true">${e(c.action)}</div>
          <div class="construct-hero-copy">
            <p>${e(model.hero.kicker)}</p>
            <h1 id="hero-title">${e(model.data.identity.name)}</h1>
            <h2>${e(model.hero.headline)}</h2>
            ${model.hero.secondary ? `<p class="hero-secondary">${e(model.hero.secondary)}</p>` : ""}
          </div>
          <div class="construct-circle" aria-hidden="true"></div>${lines}
          <div class="hero-seed"><span>ROOM 02 / 42</span><span class="seed-value">${e(model.seed)}</span></div>
          <a class="hero-direction" href="#middle-sequence">${e(l.scroll)} ↓</a>
        </div>`;

      const contact = `
        <div class="transmission-terminal">
          <div class="terminal-label" aria-hidden="true">TRANSMIT / OPEN A CHANNEL</div>
          <div><p>07 / CONTACT</p><h2 id="contact-title">${e(model.contactCopy.headline)}</h2><p>${e(model.contactCopy.body)}</p></div>
          <address>
            <a href="mailto:${e(model.contact.email)}"><strong>${e(l.email)}</strong><span>${e(model.contact.email)}</span></a>
            <a href="${e(model.contact.github)}" target="_blank" rel="noopener noreferrer"><strong>GitHub</strong><span>${e(model.contact.github.replace("https://", ""))}</span></a>
            ${model.contact.linkedin ? `<a href="${e(model.contact.linkedin)}" target="_blank" rel="noopener noreferrer"><strong>LinkedIn</strong><span>${e(model.contact.linkedin.replace("https://", ""))}</span></a>` : `<span class="terminal-missing"><strong>LinkedIn</strong><span>${e(l.linkedinMissing)}</span></span>`}
          </address>
        </div>`;

      const rollAgain = `
        <button class="construct-roll" id="roll-title" type="button" data-roll-again>
          <span class="roll-index">08 / EXECUTE</span>
          <strong>${e(c.rollLabel)}</strong>
          <span>${e(l.generate)}</span>
          <span class="seed-value">${e(model.seed)}</span>
          <i aria-hidden="true"></i>
        </button>`;

      return { navigation, hero, middle, contact, rollAgain, transitionMs: c.transitionMs };
    }
  };

  window.RoomRuntime.start(room);
})();
