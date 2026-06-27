---
name: Kinetic Emerald
colors:
  surface: '#0f1510'
  surface-dim: '#0f1510'
  surface-bright: '#343b35'
  surface-container-lowest: '#0a100b'
  surface-container-low: '#171d18'
  surface-container: '#1b211c'
  surface-container-high: '#252c26'
  surface-container-highest: '#303630'
  on-surface: '#dee4dc'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dee4dc'
  inverse-on-surface: '#2c322c'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#8bd6b6'
  on-secondary: '#003828'
  secondary-container: '#005c43'
  on-secondary-container: '#87d2b2'
  tertiary: '#45dfa4'
  on-tertiary: '#003825'
  tertiary-container: '#00b982'
  on-tertiary-container: '#00422c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#a6f2d1'
  secondary-fixed-dim: '#8bd6b6'
  on-secondary-fixed: '#002116'
  on-secondary-fixed-variant: '#00513b'
  tertiary-fixed: '#68fcbf'
  tertiary-fixed-dim: '#45dfa4'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#0f1510'
  on-background: '#dee4dc'
  surface-variant: '#303630'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  code-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max: 1440px
---

## Brand & Style

The brand personality is high-velocity, precise, and sophisticated. It targets a technical audience—developers and data architects—who value efficiency and a premium, high-performance aesthetic.

The design style is a hybrid of **Minimalism** and **Glassmorphism**, leaning into a dark, immersive environment. It prioritizes clarity and speed, using deep green tones to create a sense of focused stability. The UI should evoke an emotional response of "controlled power" through a high-contrast relationship between the void-like background and sharp, glowing emerald interactive elements.

## Colors

The palette is centered on a "Deep Forest" spectrum, replacing all traditional cool grays and purples with organic, high-tech greens.

- **Primary (#10b981):** A vibrant Emerald used for critical actions, active states, and primary brand markers. It should appear to "glow" against the dark background.
- **Secondary (#065f46):** A muted Dark Emerald for secondary buttons, subtle accents, and focused states.
- **Surface (#050a06):** The base background, a deep forest black that provides maximum contrast for text and vibrant accents.
- **Surface Containers:** Three tiers of hunter green used to establish hierarchy and grouping. These should be used for cards, sidebars, and navigation rails.
- **Success/Error:** Use the Primary Emerald for success; use a high-chroma coral (#fb7185) for errors to ensure they remain distinct from the green-dominant system.

## Typography

This design system uses a dual-font approach to balance character with technical precision.

- **Hanken Grotesk** is used for headlines. Its sharp, contemporary geometry reinforces the high-velocity feel. Use tighter letter-spacing on larger headings to maintain a "compressed" high-end editorial look.
- **Geist** is the workhorse for body copy, labels, and data. As a font designed for developers, it provides exceptional legibility in dark environments and handles monospaced-style characters with ease, fitting the Kinetic theme.
- **Scale:** On mobile devices, shrink `headline-xl` and `headline-lg` by 25% to ensure headers don't wrap awkwardly.

## Layout & Spacing

The layout utilizes a **Fluid Grid** system based on a 4px baseline rhythm.

- **Desktop:** 12-column grid with 24px gutters and wide 64px outer margins to give the content "room to breathe" amidst the dark theme.
- **Tablet:** 8-column grid with 20px gutters.
- **Mobile:** 4-column grid with 16px gutters and 20px margins.

Spacing should be used to group related technical data. Use 8px/12px for internal component spacing and 32px/48px for section vertical rhythm.

## Elevation & Depth

In this dark-green ecosystem, depth is communicated through **Tonal Layers** and **Backdrop Blurs** rather than traditional shadows.

1.  **Level 0 (Base):** #050a06.
2.  **Level 1 (Cards/Sidebar):** Surface Container Low with a 1px stroke of #142617.
3.  **Level 2 (Modals/Popovers):** Surface Container Mid with a `backdrop-filter: blur(12px)` and a subtle Primary Emerald outer glow (opacity 10%).
4.  **Interactive Elements:** Use 1px "ghost borders" (low-opacity white or primary green) to define interactive boundaries without adding visual bulk.

## Shapes

The design system adopts a **Rounded** shape language (`roundedness: 2`). This softens the "industrial" feel of the dark green palette, making the high-tech environment feel more modern and approachable.

- **Standard Elements:** Buttons and Input fields use `0.5rem` (8px).
- **Containers:** Larger cards and modals use `rounded-lg` (1rem / 16px) to create a clear structural distinction from smaller UI components.
- **Status Indicators:** Pills and chips use `rounded-full` for maximum contrast against the geometric grid.

## Components

- **Buttons:** 
    - *Primary:* Solid #10b981 with black text. On hover, apply a subtle emerald outer glow.
    - *Secondary:* Ghost style with #10b981 border and text.
- **Input Fields:** Deep hunter green backgrounds (#0e1a10) with a 1px border. The border turns Primary Emerald on focus.
- **Lists:** Use subtle dividers using the #142617 border color. Hover states should use a slight brightness increase of the background.
- **Cards:** Use `surface_container_low` as the base. Headlines inside cards should always be Hanken Grotesk.
- **Chips/Status:** Use a "glowing dot" indicator next to labels to represent live data or active states, utilizing the primary emerald color.
- **Data Visualizations:** Charts should use the Primary Emerald and Tertiary Green, avoiding reds or yellows unless indicating a critical system failure.