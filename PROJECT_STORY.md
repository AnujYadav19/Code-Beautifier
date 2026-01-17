# Code Beautifier - Project Story

## Inspiration

As developers and content creators, we often need to share code snippets in presentations, blog posts, social media, and design projects. However, creating beautiful, syntax-highlighted code visuals has always been a tedious process—requiring manual formatting, external tools, or screenshot editing that breaks workflow continuity.

We were inspired by the gap between development and design workflows. When working in Adobe Express, we found ourselves switching between code editors, screenshot tools, and design software just to showcase a simple code snippet. This friction sparked the idea: **What if we could transform code into beautiful visuals directly within Adobe Express?**

Our goal was to bridge the gap between code and design, enabling developers, educators, and content creators to generate professional, customizable code snippets instantly—without leaving their creative workflow.

---

## What it does

**Code Beautifier** is an Adobe Express add-on that transforms raw code into stunning, shareable images with professional syntax highlighting and visual customization.

### Key Features:

- **Multi-Language Support**: Syntax highlighting for JavaScript, Python, HTML, CSS, JSON, and more
- **Theme Selection**: Choose from popular themes like Dracula, VS Dark, and Atom Dark
- **Visual Customization**:
  - Glassmorphism effects for a modern, premium look
  - Gradient backgrounds for extra visual appeal
  - macOS-style window chrome with traffic light controls
- **Language Badge**: Clear visual indicator showing the selected programming language
- **One-Click Export**: Instantly add your beautified code snippet to the Adobe Express canvas as a high-quality image
- **Real-Time Preview**: See changes instantly as you customize colors, themes, and effects

The add-on integrates seamlessly into Adobe Express, allowing users to create professional code visuals in seconds—perfect for tutorials, documentation, social media, and presentations.

---

## How we built it

We built Code Beautifier as a modern React-based add-on using the Adobe Express Add-on SDK, following Adobe's architecture patterns for seamless integration.

### Tech Stack:

- **Frontend Framework**: React with Vite-based build system
- **UI Components**: Adobe Spectrum Web Components (`@swc-react`) for native Express look-and-feel
- **Syntax Highlighting**: `react-syntax-highlighter` with Prism for accurate code rendering
- **Image Generation**: `html-to-image` library to convert DOM elements to high-quality PNG blobs
- **Platform SDK**: `@adobe/express-addon-sdk` for communication with Adobe Express host

### Architecture:

```
┌─────────────────────────────────────────┐
│     Adobe Express Host (iframe)        │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐    ┌──────────────┐ │
│  │   Sidebar    │    │   CodeCard   │ │
│  │  (Controls)  │◄──►│   (Preview)  │ │
│  └──────────────┘    └──────────────┘ │
│         │                   │          │
│         └─────────┬─────────┘          │
│                   │                    │
│         ┌─────────▼─────────┐          │
│         │   App (State Mgmt) │         │
│         └─────────┬─────────┘          │
│                   │                    │
└───────────────────┼────────────────────┘
                    │
         ┌──────────▼──────────┐
         │  addOnUISdk         │
         │  (Export to Canvas) │
         └─────────────────────┘
```

### Key Implementation Details:

1. **State Management**: Centralized state in `App.jsx` using React hooks (`useState`, `useRef`) to manage code content, language, theme, and visual effects

2. **Theme System**: Dynamic theme loading from `react-syntax-highlighter/dist/esm/styles/prism`, with a mapping function to translate string names (e.g., `"dracula"`) to theme objects

3. **Glassmorphism Effects**: Custom CSS with `backdrop-filter` and `rgba()` backgrounds, carefully tuned for export stability using `html-to-image`

4. **Image Export Pipeline**:
   - Capture the preview container via `useRef`
   - Convert to high-quality blob using `toBlob()` with `pixelRatio: 2` for crisp rendering
   - Pass blob to Adobe Express via `addOnUISdk.app.document.addImage()`

5. **Event Handling**: Adobe Spectrum components use custom event props (`change` instead of `onChange`), requiring careful event listener configuration

6. **SDK Initialization**: Robust initialization with fallback mechanisms for standalone development, using `addOnUISdk.ready` promises with timeout handling

---

## Challenges we ran into

Building Code Beautifier presented several technical and design challenges:

### 1. **Adobe Spectrum Component Integration**
Adobe Spectrum Web Components use non-standard event handling (`change` prop instead of React's `onChange`), which initially caused state update failures. We solved this by implementing custom event handlers and boolean coercion for switch components.

### 2. **Theme Object Passing**
Initially, the `CodeCard` component received theme names as strings instead of theme objects from `react-syntax-highlighter`, causing all themes to appear identical. The fix required explicit prop passing (`theme={getThemeObject(values.theme)}`) instead of using spread operators that could override props.

### 3. **Image Export Quality**
The initial exports had blurry text on high-DPI displays. We resolved this by:
- Setting `pixelRatio: 2` in `html-to-image` options
- Ensuring no `overflow: hidden` on containers that would clip shadows/borders
- Adding sufficient padding to prevent border clipping during capture

### 4. **SDK Initialization Race Conditions**
The add-on SDK (`addOnUISdk`) wasn't always ready when the component mounted, causing crashes when accessing `addOnUISdk.app`. We implemented:
- `useEffect` hooks to wait for `addOnUISdk.ready`
- State tracking for SDK readiness (`sdkReady`, `initializedSdk`)
- Disabled export button until SDK is fully initialized
- Fallback timeout for standalone development mode

### 5. **Spectrum Theme Fragment Warnings**
Missing theme fragment imports caused deprecation warnings. We resolved this by importing required side-effect modules at the top of `App.jsx`:
```javascript
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/sp-theme.js";
```

### 6. **CSS Interference with Spectrum Components**
Global CSS resets were interfering with Spectrum component styling, causing thick black borders and transparent backgrounds. We cleaned up `App.css` to remove global border/background resets while maintaining only essential resets like `box-sizing`.

### 7. **Text Contrast and Readability**
Light-themed code text was hard to read against glass effects. We solved this by:
- Forcing a solid dark background (`#1E1E1E`) in the syntax highlighter's `customStyle`
- Adding generous padding (`25px`) and improved line height (`1.6`)
- Ensuring font size consistency across themes

---

## Accomplishments that we're proud of

We're particularly proud of several achievements in this project:

✅ **Seamless Adobe Express Integration**: Successfully building a native-feeling add-on that integrates smoothly with Adobe Express's UI and workflow

✅ **Professional Visual Quality**: Achieving glassmorphism effects and high-quality image exports that maintain crisp text and proper shadows/borders

✅ **Robust Error Handling**: Implementing comprehensive error handling, SDK initialization checks, and fallback mechanisms for standalone development

✅ **Real-Time Preview**: Creating a responsive, real-time preview system that updates instantly as users customize themes, languages, and visual effects

✅ **Multi-Theme Support**: Successfully integrating multiple syntax highlighting themes (Dracula, VS Dark, Atom Dark) with proper object mapping and validation

✅ **Cross-Language Support**: Implementing flexible language detection and formatting, with a clean language badge display in the header

✅ **Developer Experience**: Building a maintainable codebase with proper PropTypes validation, defensive coding practices, and clear component separation

✅ **Performance**: Optimizing image export with high-DPI support (`pixelRatio: 2`) while maintaining fast real-time preview updates

---

## What we learned

This project provided valuable insights into building add-ons for Adobe Express and working with modern web technologies:

### Technical Learnings:

1. **Adobe Express Add-on Architecture**: Understanding the iframe-based sandbox model, SDK initialization patterns, and communication between the UI and document sandbox

2. **Adobe Spectrum Web Components**: Learning the event handling patterns (`change` vs `onChange`), theme fragment requirements, and component styling constraints

3. **Image Generation from DOM**: Deep dive into `html-to-image` library, handling pixel ratios, clipping issues, and export quality optimization

4. **React State Management**: Best practices for prop passing, avoiding spread operator pitfalls, and managing complex state with hooks

5. **CSS Export Considerations**: Understanding how CSS properties like `backdrop-filter`, `rgba()`, and `overflow` affect image export quality

### Design Learnings:

1. **Native UI Integration**: The importance of matching platform design language (Adobe Spectrum) for seamless user experience

2. **Visual Hierarchy**: Using glassmorphism, contrast, and spacing to create professional, readable code visuals

3. **Real-Time Feedback**: The value of instant preview updates in creative tools

### Process Learnings:

1. **Incremental Development**: Breaking down complex features (export, themes, glass effects) into manageable, testable components

2. **Debugging Techniques**: Using console logging, state tracking, and visual inspection to diagnose event handling and theme propagation issues

3. **User-Centric Design**: Prioritizing features that solve real workflow problems (quick code snippets for social media, tutorials, presentations)

---

## What's next for Code Beautifier

We have exciting plans to enhance Code Beautifier and expand its capabilities:

### Short-Term Enhancements (v1.1):

- **More Languages**: Expand language support to include TypeScript, Go, Rust, Java, C++, and more
- **Additional Themes**: Add popular themes like GitHub Dark, Monokai, Solarized, and One Dark
- **Line Number Customization**: Allow users to toggle line numbers on/off and customize their appearance
- **Code Formatting**: Integrate Prettier or similar tools to auto-format code before highlighting
- **Copy to Clipboard**: Add ability to copy the highlighted code as HTML or markdown

### Medium-Term Features (v1.2):

- **Custom Theme Builder**: Let users create and save custom color schemes
- **Export Formats**: Support multiple export formats (SVG, PNG with different resolutions, PDF)
- **Code Snippet Library**: Save frequently used code snippets with custom names
- **Batch Processing**: Generate multiple code snippets at once
- **Font Customization**: Allow users to select from various monospace fonts (Fira Code, JetBrains Mono, etc.)

### Long-Term Vision (v2.0):

- **AI-Powered Suggestions**: AI assistance for code snippet generation and formatting
- **Collaboration Features**: Share code snippets with team members, create snippet collections
- **Animation Support**: Animate code reveal (typing effect) for presentations
- **GitHub Integration**: Import code directly from GitHub repositories or Gists
- **Dark/Light Mode Toggle**: Respect system preferences and allow manual theme switching
- **Accessibility Improvements**: Better screen reader support, keyboard navigation, and color contrast options

### Technical Improvements:

- **Performance Optimization**: Implement virtualization for large code files
- **Offline Support**: Cache themes and enable offline functionality
- **Internationalization**: Support multiple languages for the UI
- **Analytics**: Track usage patterns to guide feature development

We're excited to continue building Code Beautifier into the go-to tool for creating beautiful code visuals in Adobe Express!

---

## Conclusion

Code Beautifier represents our passion for bridging the gap between development and design. By combining modern web technologies with Adobe's powerful platform, we've created a tool that simplifies a common workflow challenge for developers, educators, and content creators.

We hope this add-on inspires others to build innovative solutions within the Adobe Express ecosystem and contribute to making creative workflows more seamless and efficient.

---

**Built with ❤️ for developers and designers everywhere.**
