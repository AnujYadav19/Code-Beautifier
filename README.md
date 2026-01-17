# Code Beautifier

> **Turn code into beautiful, shareable images—instantly.** An Adobe Express add-on that transforms raw code into stunning, syntax-highlighted visuals ready for your design projects.

[![Adobe Express](https://img.shields.io/badge/Adobe%20Express-FF0000?style=flat&logo=adobe-express&logoColor=white)](https://express.adobe.com/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ESNext-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## ✨ Features

- 🎨 **Multi-Language Support**: Syntax highlighting for JavaScript, Python, HTML, CSS, JSON, and more
- 🌈 **Theme Selection**: Choose from popular themes like Dracula, VS Dark, and Atom Dark
- ✨ **Visual Customization**:
  - Glassmorphism effects for a modern, premium look
  - Gradient backgrounds for extra visual appeal
  - macOS-style window chrome with traffic light controls
- 🏷️ **Language Badge**: Clear visual indicator showing the selected programming language
- 📤 **One-Click Export**: Instantly add your beautified code snippet to the Adobe Express canvas as a high-quality image
- ⚡ **Real-Time Preview**: See changes instantly as you customize colors, themes, and effects
- 📱 **Native UI**: Built with Adobe Spectrum Web Components for seamless Adobe Express integration

## 📸 Demo

_Add screenshots or GIFs of your add-on in action here_

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Adobe Express account (for testing the add-on)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/code-beautifier.git
cd code-beautifier
```

2. Install dependencies:
```bash
npm install
```

3. Build the application:
```bash
npm run build
```

4. Start the development server:
```bash
npm run start
```

The add-on will be available at `https://localhost:5241/{testId}/index.html` (the testId will be displayed in the terminal).

## 📖 Usage

1. **Open Adobe Express** and create a new project or open an existing one.

2. **Install the Add-on**: 
   - Navigate to Add-ons in Adobe Express
   - Search for "Code Beautifier" or use the development URL

3. **Create Your Code Snippet**:
   - Paste or type your code in the text area
   - Select the programming language from the dropdown
   - Choose your preferred theme (Dracula, VS Dark, or Atom Dark)

4. **Customize Appearance**:
   - Toggle **Glass Effect** for a modern, frosted glass look
   - Toggle **Background** to add a gradient background
   - Watch the preview update in real-time

5. **Export to Canvas**:
   - Click **"Add to Page"** to export your code snippet as a high-quality image
   - Your code will appear on the Adobe Express canvas, ready to use in your design

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **UI Components**: Adobe Spectrum Web Components (`@swc-react`)
- **Syntax Highlighting**: `react-syntax-highlighter` with Prism
- **Image Generation**: `html-to-image` for DOM-to-image conversion
- **Build Tool**: Webpack 5
- **Bundler**: `@adobe/ccweb-add-on-scripts`
- **Platform SDK**: Adobe Express Add-on SDK

### Key Dependencies

- `react` & `react-dom` - UI framework
- `@swc-react/*` - Adobe Spectrum Web Components
- `react-syntax-highlighter` - Syntax highlighting engine
- `html-to-image` - Image export functionality
- `prop-types` - Runtime type checking

## 📁 Project Structure

```
code-beautifier/
├── src/
│   ├── components/          # Shared components (legacy)
│   ├── ui/
│   │   ├── components/
│   │   │   ├── App.jsx      # Main application component
│   │   │   ├── App.css      # Application styles
│   │   │   ├── CodeCard.jsx # Code display component
│   │   │   └── Sidebar.jsx  # Control panel component
│   │   └── index.jsx        # React entry point
│   ├── sandbox/
│   │   └── code.js          # Document sandbox runtime
│   ├── index.html           # HTML template
│   └── manifest.json        # Add-on manifest
├── dist/                    # Build output
├── webpack.config.js        # Webpack configuration
├── tsconfig.json            # TypeScript config (for IDE support)
└── package.json             # Project dependencies
```

## 🏗️ Development

### Available Scripts

- `npm run start` - Start the development server
- `npm run build` - Build for production
- `npm run clean` - Clean build artifacts
- `npm run package` - Package the add-on for distribution

### Architecture

The add-on follows Adobe Express's architecture pattern:

- **UI Runtime**: React-based UI running in an iframe
- **Document Sandbox**: Separate runtime for document manipulation
- **Communication**: SDK-based messaging between UI and sandbox

### Component Overview

- **App.jsx**: Main container managing global state and SDK initialization
- **Sidebar.jsx**: Control panel with input fields, dropdowns, and switches
- **CodeCard.jsx**: Preview component displaying syntax-highlighted code

## 🐛 Troubleshooting

### Add-on not loading
- Ensure the development server is running (`npm run start`)
- Check the console for any errors
- Verify the URL matches the testId shown in the terminal

### Export not working
- Ensure the SDK is fully initialized (check console for "SDK initialized and ready")
- Wait for the "Add to Page" button to be enabled
- Check that `addOnUISdk.app.document.addImage()` is available

### Theme not applying
- Verify theme imports are at the top of `App.jsx`
- Check console for theme object validation logs
- Ensure `getThemeObject()` returns a valid theme object

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Adobe Express Add-on SDK team for the excellent platform
- `react-syntax-highlighter` for syntax highlighting capabilities
- `html-to-image` for DOM-to-image conversion
- Adobe Spectrum team for the UI components

## 📚 Learn More

- [Adobe Express Add-on Documentation](https://developer.adobe.com/express/add-ons/)
- [React Documentation](https://reactjs.org/)
- [Adobe Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/)

## 📖 Project Story

Read our full development story, including inspiration, challenges, and lessons learned: [PROJECT_STORY.md](./PROJECT_STORY.md)

---

**Built with ❤️ for developers and designers everywhere.**

Made with [Adobe Express Add-ons](https://developer.adobe.com/express/add-ons/)
