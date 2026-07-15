# 42 Filters of Art, Design, and Visual Culture

## Project Definition

This project is a continuous exhibition of the same personal portfolio in 42 historic visual languages.

All filters:

* follow the portfolio's existing rules;
* do not alter, remove, or rewrite any copy;
* do not change the content structure or interaction logic;
* change only the typography, boundaries, surfaces, patterns, decoration, and tone of motion;
* keep the style introduction and Roll Again together in Room Control at the end of the page;
* have equal status and an equal probability of appearing at runtime.

The selection priorities are:

1. significance in the history of art, design, or visual culture;
2. ability to translate into a visual language for web surfaces;
3. suitability for preserving the identity of “the same portfolio”;
4. visual distinctiveness.

Some styles resemble an ordinary modern website. This is not a weakness, but a consequence of how deeply they have shaped contemporary visual design.

## Runtime Rules

* Each visit activates exactly one filter; palettes, backgrounds, surfaces, shapes, and typographic traits are no longer randomized separately.
* The reference code selects one of the following 42 filters deterministically and with equal probability.
* The same reference code always produces the same filter, in both the English and Chinese versions.
* Copy and style selection use separate, versioned random streams derived from the reference code; consuming or expanding either pool must not advance or remap the other stream.
* Each filter is a complete, indivisible visual system whose internal rules jointly determine typography, boundaries, surfaces, patterns, decoration, and the tone of motion.
* Roll Again generates a new reference code and selects again from the 42 filters.
* Random selection does not affect the copy, content structure, project order, or interaction logic.

## Theme File Requirements

* Every filter/theme must have its own matching HTML, JavaScript, and CSS files. Theme-specific markup, behavior, and styling must not be combined into another theme's files.
* The three files for a theme must share the same filename stem and begin with a zero-padded, two-digit index.
* File indexes start at `00` and increase continuously in the document order through `41`; no index may be skipped or reused.
* The catalog numbers below remain `01`–`42`, so the file index is the catalog number minus one. For example, Futurism uses `00-futurism.html`, `00-futurism.js`, and `00-futurism.css`; Dada uses the `01-dada` trio; Post-Internet Art uses the `41-post-internet-art` trio.
* Shared foundations may remain in common files, but they do not replace the required three-file set for any theme.

---

# Act I: The Avant-Garde and Modern Order

## 01. Futurism

**Historical core:** Speed, machines, the city, motion, and a sense of time.

**Filter language:** Diagonal structural lines, wedge-shaped boundaries, progressive changes in scale, and graphics advancing in a single direction.

**Boundary:** Body copy must not be italicized, and the result must not resemble a racing or sports brand website.

---

## 02. Dada

**Historical core:** Anti-art, chance, absurdity, collage, and typographic experimentation.

**Filter language:** Text as a plane, numbered blocks, conflicting scales, limited rotation, and inconsistent boundaries.

**Boundary:** Do not disassemble real copy or use newspaper imagery, paper textures, or numerous randomly chosen typefaces.

---

## 03. Suprematism

**Historical core:** Non-objectivity, pure geometry, weightless space, and visual perception.

**Filter language:** A small number of floating rectangles, circles, and lines set against large areas of open background.

**Boundary:** Do not scatter shapes randomly or alter the existing spatial relationships among content elements.

---

## 04. De Stijl

**Historical core:** Horizontals, verticals, unequal rectangles, and asymmetrical balance.

**Filter language:** A visible orthogonal grid, dividers of varying weight, and controlled fields of color.

**Boundary:** Do not lock the palette to the three primary colors or use diagonal lines, circles, or a uniform tiled grid.

---

## 05. Purism

**Historical core:** Simplified objects, stable proportions, clear outlines, and machine-age order.

**Filter language:** Restrained typography, a few circles and rectangles, and expansive, quiet surfaces.

**Boundary:** The result may resemble a conventional modern website; do not overdecorate it merely to make the style more recognizable.

---

## 06. Constructivism

**Historical core:** Structure, function, organization, active typography, and geometric tension.

**Filter language:** Diagonal axes, heavy lines, clipped corners, circular nodes, and high-contrast planes.

**Boundary:** Do not lock the palette to red and black, add imperative copy, or reproduce a propaganda poster.

---

## 07. Bauhaus

**Historical core:** The union of art, craft, industrial production, material experimentation, and functional design.

**Filter language:** Primary geometry, clearly defined functional zones, and component surfaces that are experimental yet legible.

**Boundary:** Do not reduce the style to a collection of primary-colored circles and triangle stickers.

---

## 08. Surrealism

**Historical core:** The unconscious, dreams, automatism, defamiliarization, and impossible juxtapositions.

**Filter language:** Soft contours, biomorphic forms, anomalous scales, and locally illogical decorative relationships.

**Boundary:** Do not alter the copy or turn the portfolio into a dream narrative or image collage.

---

## 09. New Typography

**Historical core:** Asymmetry, functional organization of information, left alignment, and modern printing technology.

**Filter language:** Pronounced type-size hierarchy, dynamic whitespace, a few diagonal guide lines, and a strong informational rhythm.

**Boundary:** Do not reorganize the copy or rotate and slant every heading.

---

## 10. Art Deco

**Historical core:** Geometric ornament, central axes, stepped structures, radiating lines, and the machine-age metropolis.

**Filter language:** Symmetrical frames, fan shapes, slender lines, layered boundaries, and vertical emphasis.

**Boundary:** Do not lock the palette to gold and black or rely on vintage photographs, paper, or metallic textures.

---

## 11. International Style

**Historical core:** Open plans, structural rationalism, modular volumes, and the elimination of ornament.

**Filter language:** Horizontal extension, architectural proportions, open whitespace, and rational surfaces.

**Boundary:** It may resemble a conventional modern portfolio; spatial relationships matter more than conspicuous decoration.

---

## 12. Concrete Art

**Historical core:** Autonomous geometry, mathematical relationships, proportion, sequence, and non-symbolic form.

**Filter language:** A finite system of type sizes, spacing, line weights, and shape proportions.

**Boundary:** The mathematical rules must be perceptible on the page surface rather than existing only in the code.

---

# Act II: Postwar Abstraction, Perception, and Popular Culture

## 13. Abstract Expressionism

**Historical core:** Large scale, gestural traces, all-over surfaces, and individual expression.

**Filter language:** Restrained SVG brushstrokes, splattered contours, irregular edges, and gestural backgrounds.

**Boundary:** Real content must remain on stable surfaces; do not use reproductions of paintings or material texture images.

---

## 14. Spatialism

**Historical core:** Cuts, holes, penetration of the picture plane, and the space behind the surface.

**Filter language:** Slits, voids, a second color layer, and component surfaces that appear to have been opened.

**Boundary:** Cuts must not pass through body copy; do not simulate torn paper or comprehensively fragment the page.

---

## 15. Color Field Painting

**Historical core:** Vast fields of color, immersive space, weak boundaries, and low element density.

**Filter language:** Continuous fields of color spanning large areas of the page, with content appearing as quiet islands of text.

**Boundary:** Do not imitate painted textures or merely substitute an ordinary background color.

---

## 16. Hard-Edge Painting

**Historical core:** Flat color, sharply adjoining fields, absence of brushwork, and crisp contours.

**Filter language:** Large color fields meet directly, without gradients, shadows, or blurred edges.

**Boundary:** Do not turn the page into a patchwork of small colored cards.

---

## 17. Pop Art

**Historical core:** Mass media, advertising, consumer goods, mechanical reproduction, and popular culture.

**Filter language:** Heavy outlines, halftones, repeated units, print misregistration, and strong planar relationships.

**Boundary:** Do not reproduce brands, comic-book characters, celebrity portraits, or advertising copy.

---

## 18. Op Art

**Historical core:** Visual vibration, repeated lines, changing frequencies, and spatial illusion.

**Filter language:** Localized waves, checkerboards, concentric structures, and regularly repeated patterns.

**Boundary:** No flashing; body copy must remain on stable, quiet surfaces.

---

## 19. ZERO

**Historical core:** Light, emptiness, vibration, subtle repetition, and a new beginning.

**Filter language:** Low-contrast dot matrices, perforations, fine lines, and visual intensity reduced almost to zero.

**Boundary:** Do not let the result collapse into an ordinary white minimalist page, and do not use neon colors or glows.

---

## 20. Minimalism

**Historical core:** Simple geometry, industrial fabrication, seriality, repetition, and impersonal form.

**Filter language:** Reduced decoration, consistent modular surfaces, stable spacing, and few levels of visual hierarchy.

**Boundary:** Do not hide content or emulate luxury-brand minimalism.

---

## 21. International Typographic Style

**Historical core:** Rigorous grids, neutral sans-serif type, left alignment, and an objective information hierarchy.

**Filter language:** Stable columns, precise baselines, clear type-size ratios, and restrained metadata.

**Boundary:** This may be the result closest to a conventional modern portfolio; it does not need to be made conspicuously artistic.

---

## 22. Atomic Age Futurism / Atompunk

**Historical core:** The Atomic Age, the Space Age, postwar technological optimism, and popular visions of the future.

**Filter language:** Elliptical orbits, starbursts, boomerang forms, dart-shaped corners, and floating structures.

**Boundary:** Do not imitate *Fallout* or add rockets, robots, flying saucers, or control-panel copy.

---

## 23. Supergraphics

**Historical core:** Giant letters, numbers, bands of color, and wayfinding graphics extending across architectural surfaces.

**Filter language:** Large-scale numbering, arcs, or bands of color that cross multiple page regions.

**Boundary:** Do not duplicate body copy as a background or make all text enormous.

---

# Act III: Material, Concept, and Radical Design

## 24. Brutalism

**Historical core:** Raw materials, exposed structure, clarity of form, and architectural weight.

**Filter language:** Thick borders, heavy lines, massive rectangles, and exposed structural joints.

**Boundary:** This refers to architectural and graphic language, not native web brutalism.

---

## 25. Conceptual Art

**Historical core:** The primacy of ideas, language, definitions, documentation, and the dematerialization of the art object.

**Filter language:** Almost no decoration, document-like hierarchy, numbering, marginal notes, and existing metadata.

**Boundary:** Do not rewrite projects as artistic propositions or invent archival fields that do not already exist.

---

## 26. Arte Povera

**Historical core:** Everyday materials, non-precious matter, transience, and resistance to the commodification of art.

**Filter language:** Rough abstract edges, fiber-like lines, exposed connections, and unfinished surfaces.

**Boundary:** Do not fabricate photographs of wood, soil, fabric, or other real materials.

---

## 27. Metabolism

**Historical core:** Infrastructure, growing units, replaceable modules, and imagination at an urban scale.

**Filter language:** Core frameworks, attached boundaries, repeated interfaces, and scalable surface relationships.

**Boundary:** Do not alter component structure or literally turn the portfolio into capsules or a science-fiction city.

---

## 28. High-Tech

**Historical core:** Exposed technology, lightweight frameworks, connectors, tracks, and precision construction.

**Filter language:** Fine-line frameworks, nodes, edge graduations, exposed connections, and lightweight panels.

**Boundary:** Do not turn the page into a dark terminal, science-fiction HUD, or cyberpunk interface.

---

## 29. Radical Design

**Historical core:** Conceptual counterproposals to functionalism, standardized ways of living, and the conventions of modern design.

**Filter language:** Controlled enlargement, elongation, compression, or extreme reproportioning of one established visual element.

**Boundary:** Use only one primary strategy of extremity at a time, without changing the content or controls.

---

## 30. Anti-Design

**Historical core:** Rejection of unified standards, rational functionalism, and so-called “good taste.”

**Filter language:** Controlled conflict between two limited rules for type, boundaries, or surfaces.

**Boundary:** Do not create real layout errors, poor contrast, obstruction, or random visual accidents.

---

# Act IV: Postmodernism and Plural Surfaces

## 31. Postmodernism

**Historical core:** Historical reference, parody, complexity and contradiction, the return of ornament, and stylistic self-awareness.

**Filter language:** Frames within frames, limited historicizing linework, juxtapositions of serif and sans-serif type, and multilayered surfaces.

**Boundary:** Do not produce a miscellaneous retro pastiche or treat the style as synonymous with Memphis.

---

## 32. Memphis

**Historical core:** Synthetic materials, vivid patterns, humor, strange geometry, and anti-functionalism.

**Filter language:** Waves, zigzags, semicircles, diagonal lines, and dispersed decorative objects.

**Boundary:** Do not make a children's website, sticker wall, or neon-retro template.

---

## 33. New Wave Typography

**Historical core:** Breaking the Swiss grid, transparent layering, displaced baselines, and multidirectional type.

**Filter language:** Slight displacement of headings and numbers, elements crossing columns, localized rotation, and layered type.

**Boundary:** Body copy must remain stable; do not disassemble or repeat real content.

---

## 34. Deconstructivism

**Historical core:** Fractured grids, displaced planes, non-orthogonal structures, and unstable boundaries.

**Filter language:** Localized fractures, displacement, cutting, and planar tension in component frames.

**Boundary:** Body copy inside components must remain intact; do not use random rotation or glitch scanning.

---

## 35. Neo-Geo

**Historical core:** Polished geometry, repeated symbols, commercial surfaces, and critical distance from systems of consumption.

**Filter language:** Consistent abstract symbols, precise repetition, serialized contours, and an artificial degree of finish.

**Boundary:** Do not add real logos, marketing copy, or generic technology gradients.

---

## 36. Pattern and Decoration

**Historical core:** Continuous patterns, decorative surfaces, craft traditions, and a challenge to modernism's rejection of ornament.

**Filter language:** CSS-generated waves, checkerboards, diamonds, arcs, or woven linework.

**Boundary:** Do not appropriate specific cultural patterns, and use no more than two primary patterns on screen at once.

---

# Act V: Computers, the Web, and Future Visual Culture

## 37. Early Computer Art

**Historical core:** Plotters, matrices, limited computation, linear algorithms, and deterministic variation.

**Filter language:** Fine-line structures, sequences, grid deformations, and limited algorithmic graphics generated with SVG or Canvas.

**Boundary:** Do not redraw continuously in real time, place real text inside Canvas, or turn the result into contemporary particle art.

---

## 38. ASCII Art

**Historical core:** Character grids, monospaced text, and digital images formed through character density.

**Filter language:** Character borders, character-based numbering, abstract character fields, and monospaced typographic surfaces.

**Boundary:** Real copy must display normally; do not use green text on black, code rain, or ASCII portraits.

---

## 39. Early Web Design

### Web 1.0 Vernacular, 1991–1999

**Historical core:** HTML documents, hyperlinks, lists, tables, browser defaults, and the vernacular of the early web.

**Filter language:** System fonts, direct links, simple horizontal rules, thin-bordered tables, native-looking buttons, and limited repeating backgrounds.

**Boundary:** Do not add “Under Construction” notices, visitor counters, animated icons, compatibility badges, or other fictional content.

**Difference from ASCII:** ASCII uses characters as image-making material; Early Web uses the structure of an HTML document as page-making material.

**Difference from Early Computer Art:** Early Computer Art explores how computers generate graphics; Early Web explores how browsers organize information.

---

## 40. Cyberpunk Visual Culture

**Historical core:** High tech and low life, corporate systems, industrial density, information overload, and social wear.

**Filter language:** Segmented borders, clipped corners, monospaced metadata, edge graduations, localized scan lines, and dense peripheral structures.

**Boundary:** Do not lock the palette to neon purple and cyan, reproduce a specific film or game, or add fictional copy such as access permissions or threat levels.

---

## 41. Glitch Art

**Historical core:** The visualization of corrupted data, signal displacement, slicing, and system anomalies.

**Filter language:** Brief, localized displacement in decorative layers, duplicated heading layers, or component edges.

**Boundary:** Body copy must always remain stable; no flashing, continuous shaking, garbled text, or real functional errors.

---

## 42. Post-Internet Art

**Historical core:** How platforms, copying, circulation, and interface packaging shape identity and culture after the internet has become the default cultural environment.

**Filter language:** An abstract combination of profile pages, search results, indexes, product displays, and platform-like surfaces.

**Boundary:** Do not fully reproduce a specific platform or add likes, comments, prices, ratings, or follower counts.

---

# Final Grouping

| Act | Count |
| --- | ---: |
| The Avant-Garde and Modern Order | 12 |
| Postwar Abstraction, Perception, and Popular Culture | 11 |
| Material, Concept, and Radical Design | 7 |
| Postmodernism and Plural Surfaces | 6 |
| Computers, the Web, and Future Visual Culture | 6 |
| **Total** | **42** |

---

# Key Historical Relationships

## International Style, Swiss Typography, and the Conventional Modern Web

Their similarity to today's conventional websites is not a flaw, but evidence of their historical influence.

* International Style shaped approaches to space, volume, and structure.
* Swiss typography shaped grids, type, and information hierarchy.
* Minimalism shaped reduction, repetition, and restraint in components.
* Bauhaus shaped function, systems, and modern design education.

They should not be exaggerated or caricatured simply to make them look more like “art filters.”

---

## Futurism, Atomic Age Futurism, and Cyberpunk

* **Futurism:** The machine surges forward.
* **Atomic Age Futurism:** The future is packaged as an optimistic mass-market product.
* **Cyberpunk:** Technology is highly advanced, but society and the conditions of everyday life continue to deteriorate.

---

## Three Starting Points for Digital Media

* **Early Computer Art:** The computer becomes a tool for generating graphics.
* **ASCII Art:** Characters become material for digital images.
* **Early Web Design:** HTML and the browser establish a new page-based medium.

They represent three distinct starting points for digital visual culture: graphics, characters, and web pages.

---

# Official Project Name

## 42 Filters of Art, Design, and Visual Culture

The shorter name may still be used:

> **42 Art History Filters**

Final project definition:

> This is a continuous exhibition of the same personal portfolio under 42 filters of art, design, and visual culture. Each filter follows the portfolio's existing rules and changes only the typography, boundaries, surfaces, decoration, and tone of motion—never the copy, content structure, or interaction logic. Together, the style introduction and Roll Again form the exhibition label at the end of the page and the entrance to the next room.
