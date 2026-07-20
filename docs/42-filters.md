# 42 Filters of Art, Design, and Visual Culture

> **Document status:** Implemented specification
>
> **Scope:** Runtime selection, visual constraints, and theme-file organization
>
> **Language:** English · [中文版](42-filters-zh.md)

## Purpose and scope

This document defines the selection behavior, implementation requirements, and visual boundaries for a continuous exhibition of the same personal portfolio in 42 historically grounded visual languages.

The following constraints apply to every filter:

- Follow the portfolio's established content and interaction rules.
- Do not alter, remove, or rewrite copy.
- Do not change the content structure or interaction logic.
- Restrict visual changes to typography, boundaries, surfaces, patterns, decoration, and motion tone.
- Keep the style introduction and **Roll Again** together in **Room Control** at the end of the page.
- Maintain equal runtime status and stable modulo indexes across all 42 filters.

### Selection criteria

The selection priorities are:

1. significance in the history of art, design, or visual culture;
2. ability to translate into a visual language for web surfaces;
3. suitability for preserving the identity of “the same portfolio”;
4. visual distinctiveness.

Some styles resemble an ordinary modern website. This is not a weakness, but a consequence of how deeply they have shaped contemporary visual design.

## Runtime requirements

- Each visit activates exactly one filter; palettes, backgrounds, surfaces, shapes, and typographic traits are not randomized separately.
- A valid case-insensitive HEX seed of at least one character selects index `seed mod 42`; a non-HEX reference uses a deterministic hash fallback before modulo reduction.
- The same reference code produces the same filter in both the English and Chinese versions.
- Copy uses a versioned random stream derived from the reference code; style selection directly uses `seed mod 42`. Consuming or expanding the copy pool must not remap the selected style.
- Each filter is a complete, indivisible visual system whose internal rules jointly determine typography, boundaries, surfaces, patterns, decoration, and motion tone.
- **Roll Again** adds a uniformly random value from 1 through 40 to the current hexadecimal reference code and selects the resulting filter from the catalog. Legacy non-HEX links fall back to a fresh current-format code when refreshed.
- Random selection does not affect copy, content structure, project order, or interaction logic.

## Theme-file requirements

- Every filter must have its own corresponding HTML, JavaScript, and CSS files. Theme-specific markup, behavior, and styling must not be combined with another theme's files.
- The three files for a theme must share the same filename stem and begin with a zero-padded, two-digit index.
- File indexes start at `00` and increase continuously in document order through `41`; indexes must not be skipped or reused.
- Catalog numbers remain `01`–`42`, so each file index equals the catalog number minus one. For example, Futurism uses `00-futurism.html`, `00-futurism.js`, and `00-futurism.css`; Dada uses the `01-dada` trio; Post-Internet Art uses the `41-post-internet-art` trio.
- Shared foundations may remain in common files, but they do not replace the required three-file set for any theme.

---

## Filter catalog

### Act I: The Avant-Garde and Modern Order

#### 01. Futurism, 1900s–1940s

**Historical core:** Speed, machines, the city, motion, and a sense of time.

**Filter language:** Diagonal structural lines, wedge-shaped boundaries, progressive changes in scale, and graphics advancing in a single direction.

**Boundary:** Body copy must not be italicized, and the result must not resemble a racing or sports brand website.

---

#### 02. Dada, 1910s–1920s

**Historical core:** Anti-art, chance, absurdity, collage, and typographic experimentation.

**Filter language:** Text as a plane, numbered blocks, conflicting scales, limited rotation, and inconsistent boundaries.

**Boundary:** Do not disassemble real copy or use newspaper imagery, paper textures, or numerous randomly chosen typefaces.

---

#### 03. Suprematism, 1910s–1920s

**Historical core:** Non-objectivity, pure geometry, weightless space, and visual perception.

**Filter language:** A small number of floating rectangles, circles, and lines set against large areas of open background.

**Boundary:** Do not scatter shapes randomly or alter the existing spatial relationships among content elements.

---

#### 04. De Stijl, 1910s–1930s

**Historical core:** Horizontals, verticals, unequal rectangles, and asymmetrical balance.

**Filter language:** A visible orthogonal grid, dividers of varying weight, and controlled fields of color.

**Boundary:** Do not lock the palette to the three primary colors or use diagonal lines, circles, or a uniform tiled grid.

---

#### 05. Purism, 1910s–1920s

**Historical core:** Simplified objects, stable proportions, clear outlines, and machine-age order.

**Filter language:** Restrained typography, a few circles and rectangles, and expansive, quiet surfaces.

**Boundary:** The result may resemble a conventional modern website; do not overdecorate it merely to make the style more recognizable.

---

#### 06. Constructivism, 1910s–1930s

**Historical core:** Structure, function, organization, active typography, and geometric tension.

**Filter language:** Diagonal axes, heavy lines, clipped corners, circular nodes, and high-contrast planes.

**Boundary:** Do not lock the palette to red and black, add imperative copy, or reproduce a propaganda poster.

---

#### 07. Bauhaus, 1910s–1930s

**Historical core:** The union of art, craft, industrial production, material experimentation, and functional design.

**Filter language:** Primary geometry, clearly defined functional zones, and component surfaces that are experimental yet legible.

**Boundary:** Do not reduce the style to a collection of primary-colored circles and triangle stickers.

---

#### 08. Surrealism, 1920s–1960s

**Historical core:** The unconscious, dreams, automatism, defamiliarization, and impossible juxtapositions.

**Filter language:** Soft contours, biomorphic forms, anomalous scales, and locally illogical decorative relationships.

**Boundary:** Do not alter the copy or turn the portfolio into a dream narrative or image collage.

---

#### 09. New Typography, 1920s–1930s

**Historical core:** Asymmetry, functional organization of information, left alignment, and modern printing technology.

**Filter language:** Pronounced type-size hierarchy, dynamic whitespace, a few diagonal guide lines, and a strong informational rhythm.

**Boundary:** Do not reorganize the copy or rotate and slant every heading.

---

#### 10. Art Deco, 1910s–1930s

**Historical core:** Geometric ornament, central axes, stepped structures, radiating lines, and the machine-age metropolis.

**Filter language:** Symmetrical frames, fan shapes, slender lines, layered boundaries, and vertical emphasis.

**Boundary:** Do not lock the palette to gold and black or rely on vintage photographs, paper, or metallic textures.

---

#### 11. International Style, 1920s–1960s

**Historical core:** Open plans, structural rationalism, modular volumes, and the elimination of ornament.

**Filter language:** Horizontal extension, architectural proportions, open whitespace, and rational surfaces.

**Boundary:** It may resemble a conventional modern portfolio; spatial relationships matter more than conspicuous decoration.

---

#### 12. Concrete Art, 1930s–1960s

**Historical core:** Autonomous geometry, mathematical relationships, proportion, sequence, and non-symbolic form.

**Filter language:** A finite system of type sizes, spacing, line weights, and shape proportions.

**Boundary:** The mathematical rules must be perceptible on the page surface rather than existing only in the code.

---

### Act II: Postwar Abstraction, Perception, and Popular Culture

#### 13. Abstract Expressionism, 1940s–1950s

**Historical core:** Large scale, gestural traces, all-over surfaces, and individual expression.

**Filter language:** Restrained SVG brushstrokes, splattered contours, irregular edges, and gestural backgrounds.

**Boundary:** Real content must remain on stable surfaces; do not use reproductions of paintings or material texture images.

---

#### 14. Spatialism, 1940s–1960s

**Historical core:** Cuts, holes, penetration of the picture plane, and the space behind the surface.

**Filter language:** Slits, voids, a second color layer, and component surfaces that appear to have been opened.

**Boundary:** Cuts must not pass through body copy; do not simulate torn paper or comprehensively fragment the page.

---

#### 15. Color Field Painting, 1940s–1960s

**Historical core:** Vast fields of color, immersive space, weak boundaries, and low element density.

**Filter language:** Continuous fields of color spanning large areas of the page, with content appearing as quiet islands of text.

**Boundary:** Do not imitate painted textures or merely substitute an ordinary background color.

---

#### 16. Hard-Edge Painting, 1950s–1960s

**Historical core:** Flat color, sharply adjoining fields, absence of brushwork, and crisp contours.

**Filter language:** Large color fields meet directly, without gradients, shadows, or blurred edges.

**Boundary:** Do not turn the page into a patchwork of small colored cards.

---

#### 17. Pop Art, 1950s–1970s

**Historical core:** Mass media, advertising, consumer goods, mechanical reproduction, and popular culture.

**Filter language:** Heavy outlines, halftones, repeated units, print misregistration, and strong planar relationships.

**Boundary:** Do not reproduce brands, comic-book characters, celebrity portraits, or advertising copy.

---

#### 18. Op Art, 1960s–1970s

**Historical core:** Visual vibration, repeated lines, changing frequencies, and spatial illusion.

**Filter language:** Localized waves, checkerboards, concentric structures, and regularly repeated patterns.

**Boundary:** No flashing; body copy must remain on stable, quiet surfaces.

---

#### 19. ZERO, 1950s–1960s

**Historical core:** Light, emptiness, vibration, subtle repetition, and a new beginning.

**Filter language:** Low-contrast dot matrices, perforations, fine lines, and visual intensity reduced almost to zero.

**Boundary:** Do not let the result collapse into an ordinary white minimalist page, and do not use neon colors or glows.

---

#### 20. Minimalism, 1960s–1970s

**Historical core:** Simple geometry, industrial fabrication, seriality, repetition, and impersonal form.

**Filter language:** Reduced decoration, consistent modular surfaces, stable spacing, and few levels of visual hierarchy.

**Boundary:** Do not hide content or emulate luxury-brand minimalism.

---

#### 21. International Typographic Style, 1950s–1960s

**Historical core:** Rigorous grids, neutral sans-serif type, left alignment, and an objective information hierarchy.

**Filter language:** Stable columns, precise baselines, clear type-size ratios, and restrained metadata.

**Boundary:** This may be the result closest to a conventional modern portfolio; it does not need to be made conspicuously artistic.

---

#### 22. Atomic Age Futurism / Atompunk, 1940s–1960s

**Historical core:** The Atomic Age, the Space Age, postwar technological optimism, and popular visions of the future.

**Filter language:** Elliptical orbits, starbursts, boomerang forms, dart-shaped corners, and floating structures.

**Boundary:** Do not imitate *Fallout* or add rockets, robots, flying saucers, or control-panel copy.

---

#### 23. Supergraphics, 1960s–1970s

**Historical core:** Giant letters, numbers, bands of color, and wayfinding graphics extending across architectural surfaces.

**Filter language:** Large-scale numbering, arcs, or bands of color that cross multiple page regions.

**Boundary:** Do not duplicate body copy as a background or make all text enormous.

---

### Act III: Material, Concept, and Radical Design

#### 24. Brutalism, 1950s–1970s

**Historical core:** Raw materials, exposed structure, clarity of form, and architectural weight.

**Filter language:** Thick borders, heavy lines, massive rectangles, and exposed structural joints.

**Boundary:** This refers to architectural and graphic language, not native web brutalism.

---

#### 25. Soviet Modernism, 1950s–1990s

**Historical core:** Post-Stalinist modernization, public infrastructure, standardized production, monumental spaces, regional adaptation, and visions of a technological future.

**Filter language:** Monumental cantilevers and heavy masses, repetitive window grids, deep frames, circular or polyhedral civic structures, abstract mural-like color fields, and large areas of open space at an architectural scale.

**Boundary:** Do not lock the palette to gray concrete; do not use red stars, portraits of leaders, Cyrillic text, or propaganda slogans; and do not turn the result into a military base, nuclear control room, or science-fiction HUD.

---

#### 26. Conceptual Art, 1960s–1970s

**Historical core:** The primacy of ideas, language, definitions, documentation, and the dematerialization of the art object.

**Filter language:** Almost no decoration, document-like hierarchy, numbering, marginal notes, and existing metadata.

**Boundary:** Do not rewrite projects as artistic propositions or invent archival fields that do not already exist.

---

#### 27. Arte Povera, 1960s–1970s

**Historical core:** Everyday materials, non-precious matter, transience, and resistance to the commodification of art.

**Filter language:** Rough abstract edges, fiber-like lines, exposed connections, and unfinished surfaces.

**Boundary:** Do not fabricate photographs of wood, soil, fabric, or other real materials.

---

#### 28. Metabolism, 1960s–1970s

**Historical core:** Infrastructure, growing units, replaceable modules, and imagination at an urban scale.

**Filter language:** Core frameworks, attached boundaries, repeated interfaces, and scalable surface relationships.

**Boundary:** Do not alter component structure or literally turn the portfolio into capsules or a science-fiction city.

---

#### 29. High-Tech, 1960s–1980s

**Historical core:** Exposed technology, lightweight frameworks, connectors, tracks, and precision construction.

**Filter language:** Fine-line frameworks, nodes, edge graduations, exposed connections, and lightweight panels.

**Boundary:** Do not turn the page into a dark terminal, science-fiction HUD, or cyberpunk interface.

---

#### 30. Radical Design, 1960s–1970s

**Historical core:** Conceptual counterproposals to functionalism, standardized ways of living, and the conventions of modern design.

**Filter language:** Controlled enlargement, elongation, compression, or extreme reproportioning of one established visual element.

**Boundary:** Use only one primary strategy of extremity at a time, without changing the content or controls.

---

#### 31. Anti-Design, 1960s–1980s

**Historical core:** Rejection of unified standards, rational functionalism, and so-called “good taste.”

**Filter language:** Controlled conflict between two limited rules for type, boundaries, or surfaces.

**Boundary:** Do not create real layout errors, poor contrast, obstruction, or random visual accidents.

---

### Act IV: Postmodernism and Plural Surfaces

#### 32. Postmodernism, 1970s–1990s

**Historical core:** Historical reference, parody, complexity and contradiction, the return of ornament, and stylistic self-awareness.

**Filter language:** Frames within frames, limited historicizing linework, juxtapositions of serif and sans-serif type, and multilayered surfaces.

**Boundary:** Do not produce a miscellaneous retro pastiche or treat the style as synonymous with Memphis.

---

#### 33. Memphis, 1980s

**Historical core:** Synthetic materials, vivid patterns, humor, strange geometry, and anti-functionalism.

**Filter language:** Waves, zigzags, semicircles, diagonal lines, and dispersed decorative objects.

**Boundary:** Do not make a children's website, sticker wall, or neon-retro template.

---

#### 34. New Wave Typography, 1970s–1990s

**Historical core:** Breaking the Swiss grid, transparent layering, displaced baselines, and multidirectional type.

**Filter language:** Slight displacement of headings and numbers, elements crossing columns, localized rotation, and layered type.

**Boundary:** Body copy must remain stable; do not disassemble or repeat real content.

---

#### 35. Deconstructivism, 1980s–1990s

**Historical core:** Fractured grids, displaced planes, non-orthogonal structures, and unstable boundaries.

**Filter language:** Localized fractures, displacement, cutting, and planar tension in component frames.

**Boundary:** Body copy inside components must remain intact; do not use random rotation or glitch scanning.

---

#### 36. Neo-Geo, 1980s–1990s

**Historical core:** Polished geometry, repeated symbols, commercial surfaces, and critical distance from systems of consumption.

**Filter language:** Consistent abstract symbols, precise repetition, serialized contours, and an artificial degree of finish.

**Boundary:** Do not add real logos, marketing copy, or generic technology gradients.

---

#### 37. Pattern and Decoration, 1970s–1980s

**Historical core:** Continuous patterns, decorative surfaces, craft traditions, and a challenge to modernism's rejection of ornament.

**Filter language:** CSS-generated waves, checkerboards, diamonds, arcs, or woven linework.

**Boundary:** Do not appropriate specific cultural patterns, and use no more than two primary patterns on screen at once.

---

### Act V: Computers, the Web, and Future Visual Culture

#### 38. Early Computer Art, 1950s–1970s

**Historical core:** Plotters, matrices, limited computation, linear algorithms, and deterministic variation.

**Filter language:** Fine-line structures, sequences, grid deformations, and limited algorithmic graphics generated with SVG or Canvas.

**Boundary:** Do not redraw continuously in real time, place real text inside Canvas, or turn the result into contemporary particle art.

---

#### 39. Early Web Design, 1990s

##### Web 1.0 Vernacular, 1990s

**Historical core:** HTML documents, hyperlinks, lists, tables, browser defaults, and the vernacular of the early web.

**Filter language:** System fonts, direct links, simple horizontal rules, thin-bordered tables, native-looking buttons, and limited repeating backgrounds.

**Boundary:** Do not add “Under Construction” notices, visitor counters, animated icons, compatibility badges, or other fictional content.

**Difference from Early Computer Art:** Early Computer Art explores how computers generate graphics; Early Web explores how browsers organize information.

---

#### 40. Cyberpunk Visual Culture, 1980s–1990s

**Historical core:** Cyberpunk emerged from the science-fiction literature, film, comics, and video-game culture of the 1980s and 1990s, organized around the contradiction of “high tech, low life.” It imagines near futures where computer networks, artificial intelligence, body augmentation, transnational corporations, and urban infrastructure have become highly advanced while inequality, environmental decay, social disorder, identity crises, and continuous surveillance intensify. Technology is not inherently liberating; it often becomes a medium through which capital, power, and control expand, while individuals search for autonomy at the edges, in the loopholes, and beneath the surfaces of enormous systems.

**Filter language:** Establish night-time cities and electronic space with black or near-black grounds, then add highly saturated neon, cold light, localized warning colors, and hard contrast. Controlled glitch text, scan lines, electronic noise, pixel displacement, chromatic separation, terminal characters, surveillance marks, identity numbers, coordinates, system states, data streams, and intrusive notices are permitted. Information density may be high: advertising, system messages, corporate marks, data fragments, and private content should appear to compete for attention. Borders, dividers, and controls may borrow from industrial terminals, street signage, surveillance equipment, and early computer interfaces, making the page feel like a personal access terminal deployed within city infrastructure.

**Boundary:** Preserve cyberpunk’s most recognizable elements—neon light, deep backgrounds, glitch text, and electronic noise—but do not rely on random neon gradients, meaningless gibberish, or excessive malfunction effects to manufacture a superficial sense of technology. Visual interference must not damage body-copy legibility, interaction feedback, or information hierarchy. Glitches should remain local and controlled, serving the narrative of unstable systems, information overload, or machine-managed identity. Avoid collapsing into a generic game UI, esports interface, vaporwave styling, pure terminal aesthetic, or generic science-fiction control panel. The page should remain seductive, oppressive, and operable at once: a city operating system that still runs, but should not be fully trusted.

---

#### 41. Glitch Art, 1990s–2020s

**Historical core:** The visualization of corrupted data, signal displacement, slicing, and system anomalies.

**Filter language:** Brief, localized displacement in decorative layers, duplicated heading layers, or component edges.

**Boundary:** Body copy must always remain stable; no flashing, continuous shaking, garbled text, or real functional errors.

---

#### 42. Post-Internet Art, 2000s

**Historical core:** How platforms, copying, circulation, and interface packaging shape identity and culture after the internet has become the default cultural environment.

**Filter language:** An abstract combination of profile pages, search results, indexes, product displays, and platform-like surfaces.

**Boundary:** Do not fully reproduce a specific platform or add likes, comments, prices, ratings, or follower counts.

---

## Catalog summary

| Act | Count |
| --- | ---: |
| The Avant-Garde and Modern Order | 12 |
| Postwar Abstraction, Perception, and Popular Culture | 11 |
| Material, Concept, and Radical Design | 8 |
| Postmodernism and Plural Surfaces | 6 |
| Computers, the Web, and Future Visual Culture | 5 |
| **Total** | **42** |

---

## Historical relationships

### International Style, Swiss Typography, and the Conventional Modern Web

Their similarity to today's conventional websites is not a flaw, but evidence of their historical influence.

- International Style shaped approaches to space, volume, and structure.
- Swiss typography shaped grids, type, and information hierarchy.
- Minimalism shaped reduction, repetition, and restraint in components.
- Bauhaus shaped function, systems, and modern design education.

They should not be exaggerated or caricatured simply to make them look more like “art filters.”

---

### Futurism, Atomic Age Futurism, and Cyberpunk

- **Futurism:** The machine surges forward.
- **Atomic Age Futurism:** The future is packaged as an optimistic mass-market product.
- **Cyberpunk:** Technology is highly advanced, but society and the conditions of everyday life continue to deteriorate.

---

### Soviet Modernism and Adjacent Filters

- **Constructivism:** Revolutionary action, diagonals, typographic dynamism, and structural organization.
- **Brutalism:** Material weight, exposed structure, and a raw sense of construction.
- **Soviet Modernism:** Public institutions, megastructural massing, modular repetition, and an unfamiliar collective future.
- **Atomic Age Futurism:** Optimistic products of the future aimed at consumers.
- **Cyberpunk:** Social wear after technological systems have become highly developed.

---

### Two Starting Points for Digital Media

- **Early Computer Art:** The computer becomes a tool for generating graphics.
- **Early Web Design:** HTML and the browser establish a new page-based medium.

They represent two distinct starting points for digital visual culture: graphics and web pages.

---

## Project naming

### Official title

**42 Filters of Art, Design, and Visual Culture**

### Short form

The following short form may be used in informal contexts:

> **42 Art History Filters**

### Approved project description

> This project presents the same personal portfolio as a continuous exhibition across 42 filters of art, design, and visual culture. Each filter follows the portfolio's established rules and changes only typography, boundaries, surfaces, decoration, and motion tone; it does not change copy, content structure, or interaction logic. The style introduction and **Roll Again** together form the exhibition label at the end of the page and the entry point to the next view.
