(() => {
  "use strict";

  const room = {
    number: "03",
    id: "suprematism",
    nameZh: "至上主义",
    nameEn: "Suprematism",
    period: "1910s–1920s",
    curatorial: {
      zh: "本展厅用开放距离、尺度差异与受控倾斜把同一份个人档案转译成非对象化空间场。文字和形体落在完整构图预设中，空白承担视觉重量，而核心正文与链接始终稳定可读。",
      en: "This room translates the same personal archive into a non-objective spatial field through open distance, scale contrast, and controlled inclination. Text and forms occupy complete composition presets, so emptiness carries visual weight while core copy and links remain stable and readable."
    },

    configure({ deriveRng, pick, shuffle }) {
      const layout = deriveRng("room-03-layout");
      const decoration = deriveRng("room-03-decoration");
      const motion = deriveRng("room-03-motion");
      const presets = ["left-heavy", "top-heavy", "diagonal-drift", "central-void", "four-corners", "horizontal-scatter", "vertical-rise", "centrifugal"];
      return {
        heroHeight: pick(layout, ["110svh", "120svh", "140svh"]),
        sectionHeights: shuffle(layout, ["90svh", "120svh", "150svh"]),
        presets: shuffle(layout, presets).slice(0, 5),
        mirror: pick(layout, ["normal", "mirrored"]),
        angles: shuffle(decoration, [-28, -18, -8, 0, 12, 22, 32]).slice(0, 2),
        heroShapeCount: pick(decoration, [3, 4, 5]),
        rollLabel: pick(decoration, ["RELEASE THE FORMS", "ANOTHER FIELD", "NEW SPATIAL STATE", "ROLL ANOTHER ROOM"]),
        transitionMs: pick(motion, [620, 760, 900])
      };
    },

    render(model, { escapeHtml: e }) {
      const c = model.roomConfig;
      const l = model.labels;
      const languageTarget = model.isZh ? "en" : "zh";
      document.documentElement.style.setProperty("--sup-hero-height", c.heroHeight);
      document.documentElement.style.setProperty("--sup-angle-a", `${c.angles[0]}deg`);
      document.documentElement.style.setProperty("--sup-angle-b", `${c.angles[1]}deg`);

      const titles = {
        projects: l.sections.projects,
        experience: l.sections.experience,
        education: l.sections.education,
        "working-stack": l.sections.stack,
        "room-introduction": l.sections.room
      };

      const fieldShapes = (count = 3) => Array.from({ length: count }, (_, index) => {
        const kinds = ["square", "circle", "bar", "cross", "trapezoid"];
        return `<i class="field-shape shape-${kinds[index % kinds.length]} shape-${index + 1}" aria-hidden="true"></i>`;
      }).join("");

      const projects = () => `
        <div class="sup-projects">
          ${model.projects.map((project, index) => {
            const detailId = `sup-${e(project.id)}-details`;
            const composition = ["triangle", "island"][index % 2];
            return `
              <article class="sup-project composition-${composition}" aria-labelledby="sup-${e(project.id)}-title">
                <span class="project-orbit" aria-hidden="true">0${index + 1}</span>
                <div class="project-title-node"><h3 id="sup-${e(project.id)}-title">${e(project.title)}</h3><p>${e(project.subtitle)}</p></div>
                <p class="project-copy-node">${e(project.description)}</p>
                <p class="project-stack-node">${e(project.stack)}</p>
                <div class="project-action-node"><button type="button" aria-expanded="false" aria-controls="${detailId}" data-project-toggle>${e(l.details)}</button><a href="${e(project.url)}" target="_blank" rel="noopener noreferrer">${e(l.repository)} ↗</a></div>
                <div class="project-details" id="${detailId}" hidden><ul>${project.bullets.map(item => `<li>${e(item)}</li>`).join("")}</ul></div>
                <i class="project-form" aria-hidden="true"></i>
              </article>`;
          }).join("")}
        </div>`;

      const experience = () => `
        <article class="sup-experience">
          <p class="experience-date">01 / ${e(l.courseProject)}</p>
          <div><h3>${e(model.experience.title)}</h3><p>${e(model.experience.subtitle)}</p></div>
          <p class="experience-copy">${e(model.experience.description)}</p>
          <ul>${model.experience.bullets.map(item => `<li>${e(item)}</li>`).join("")}</ul>
          <i aria-hidden="true"></i>
        </article>`;

      const education = () => `
        <article class="sup-education">
          <p>ANCHOR / 01</p>
          <h3>${e(model.education.school)}</h3>
          <p>${e(model.education.degree)}</p>
          <strong>${e(model.education.graduation)}</strong>
          <p>${e(model.education.body)}</p>
        </article>`;

      const stack = () => `
        <div class="sup-stack">
          ${model.skills.map(([group, skills], groupIndex) => `
            <section style="--group:${groupIndex}"><h3>${e(group)}</h3><ul>${skills.map((skill, itemIndex) => `<li style="--item:${itemIndex}">${e(skill)}</li>`).join("")}</ul></section>`).join("")}
        </div>`;

      const introduction = () => `
        <div class="sup-exhibition-note">
          <i aria-hidden="true"></i>
          <div><p>ROOM 03 / 42</p><h3>${e(room.nameZh)}<br><span lang="en">${e(room.nameEn)}</span></h3><p>${e(room.period)}</p></div>
          <p>${e(model.isZh ? room.curatorial.zh : room.curatorial.en)}</p>
          <dl><div><dt>${e(l.layout)}</dt><dd>${e(c.presets.join(" / "))}</dd></div><div><dt>${e(l.seed)}</dt><dd class="seed-value">${e(model.seed)}</dd></div></dl>
          <button type="button" data-copy-url>${e(l.copy)}</button>
        </div>`;

      const bodies = { projects, experience, education, "working-stack": stack, "room-introduction": introduction };
      const middle = model.middleOrder.map((key, index) => {
        const preset = c.presets[index];
        const height = c.sectionHeights[index % c.sectionHeights.length];
        return `
          <section class="sup-field preset-${preset} mirror-${c.mirror}" style="--field-height:${height}" id="${key}" aria-labelledby="${key}-title">
            <header><span>0${index + 2}</span><h2 id="${key}-title">${e(titles[key])}</h2></header>
            <div class="field-content">${bodies[key]()}</div>
            <div class="field-decoration">${fieldShapes(key === "room-introduction" ? 1 : 3)}</div>
          </section>`;
      }).join("");

      const navigation = `
        <a class="sup-brand" href="#hero">STARK LIN</a>
        <div class="sup-nav-nodes">
          <a href="#hero" data-nav-target>${e(l.nav.entry)}</a>
          <a href="#middle-sequence" data-nav-target>${e(l.nav.archive)}</a>
          <a href="#contact" data-nav-target>${e(l.nav.contact)}</a>
          <a href="#roll-again" data-nav-target>${e(l.nav.again)}</a>
        </div>
        <a href="?lang=${languageTarget}" data-language-switch aria-label="${e(l.languageAria)}">${e(l.language)}</a>`;

      const heroShapes = fieldShapes(c.heroShapeCount);
      const hero = `
        <div class="sup-hero mirror-${c.mirror}">
          <div class="sup-name-node"><p>${e(model.hero.kicker)}</p><h1 id="hero-title">${e(model.data.identity.name)}</h1></div>
          <div class="sup-statement-node"><h2>${e(model.hero.headline)}</h2>${model.hero.secondary ? `<p>${e(model.hero.secondary)}</p>` : ""}</div>
          <div class="sup-room-node"><span>03 / 42</span><span class="seed-value">${e(model.seed)}</span></div>
          <div class="sup-hero-forms">${heroShapes}</div>
          <a class="sup-path" href="#middle-sequence">${e(l.scroll)} ↘</a>
        </div>`;

      const contact = `
        <div class="sup-contact-field">
          <div class="contact-heading-node"><p>07 / CONTACT</p><h2 id="contact-title">${e(model.contactCopy.headline)}</h2><p>${e(model.contactCopy.body)}</p></div>
          <address>
            <a class="email-node" href="mailto:${e(model.contact.email)}"><strong>${e(l.email)}</strong><span>${e(model.contact.email)}</span></a>
            <a class="github-node" href="${e(model.contact.github)}" target="_blank" rel="noopener noreferrer"><strong>GitHub</strong><span>${e(model.contact.github.replace("https://", ""))}</span></a>
            ${model.contact.linkedin ? `<a class="linkedin-node" href="${e(model.contact.linkedin)}" target="_blank" rel="noopener noreferrer"><strong>LinkedIn</strong><span>${e(model.contact.linkedin.replace("https://", ""))}</span></a>` : `<span class="linkedin-node missing"><strong>LinkedIn</strong><span>${e(l.linkedinMissing)}</span></span>`}
          </address>
          <i class="contact-axis" aria-hidden="true"></i><i class="contact-form" aria-hidden="true"></i>
        </div>`;

      const rollAgain = `
        <div class="sup-roll-field">
          <i class="roll-form" aria-hidden="true"></i>
          <button id="roll-title" type="button" data-roll-again><strong>${e(c.rollLabel)}</strong><span>${e(l.generate)}</span><span class="seed-value">${e(model.seed)}</span></button>
        </div>`;

      return { navigation, hero, middle, contact, rollAgain, transitionMs: c.transitionMs };
    }
  };

  window.RoomRuntime.start(room);
})();
