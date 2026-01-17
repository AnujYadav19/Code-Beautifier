import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import PropTypes from "prop-types";

const CodeCard = ({ code, language = "javascript", theme = vscDarkPlus, showBackground = false, glassEffect = false }) => {
  // Defensive coding: default to placeholder text if code is null or undefined
  const safeCode = code || "// Type some code...";

  // Debug logging to verify theme prop
  React.useEffect(() => {
    console.log("CodeCard received theme:", typeof theme, theme ? "object" : "null/undefined", theme);
  }, [theme]);

  // Glassmorphism style constant (safe for image export)
  const glassStyle = {
    background: "rgba(255, 255, 255, 0.75)", // Higher opacity fallback for export stability
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)", // Safari support
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
    borderRadius: "12px",
  };

  // Solid style for non-glass effect
  const solidStyle = {
    background: "#ffffff",
    border: "1px solid #e0e0e0",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  };

  // Outer container styles
  const outerContainerStyle = {
    padding: showBackground ? "20px" : "0",
    background: showBackground ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "transparent",
    borderRadius: showBackground ? "16px" : "0",
  };

  // Window container styles - apply glass or solid based on glassEffect
  const windowContainerStyle = {
    borderRadius: "12px",
    // Remove overflow: hidden to prevent shadow clipping during export
    ...(glassEffect ? glassStyle : solidStyle),
  };

  // Content wrapper with padding to prevent border clipping
  const contentWrapperStyle = {
    padding: "32px", // Sufficient padding so glass border is not clipped
  };

  // Header bar styles
  const headerBarStyle = {
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // Space between traffic lights and language badge
    paddingLeft: "12px",
    paddingRight: "12px",
    gap: "8px",
    backgroundColor: glassEffect ? "rgba(0, 0, 0, 0.1)" : "#2d2d2d",
  };

  // macOS button styles
  const buttonStyle = {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    border: "none",
  };

  // Language badge style
  const languageBadgeStyle = {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", // System sans-serif font
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    color: "rgba(255, 255, 255, 0.6)", // Semi-transparent white
    letterSpacing: "0.5px",
    userSelect: "none", // Prevent text selection
  };

  // Format language name for display
  const formatLanguageName = (lang) => {
    if (!lang) return "TEXT";
    // Convert common language names to display format
    const languageMap = {
      javascript: "JAVASCRIPT",
      python: "PYTHON",
      css: "CSS",
      html: "HTML",
      json: "JSON",
    };
    return languageMap[lang.toLowerCase()] || lang.toUpperCase();
  };

  return (
    <div style={outerContainerStyle}>
      <div style={windowContainerStyle}>
        {/* Header Bar with macOS-style buttons and language badge */}
        <div style={headerBarStyle}>
          {/* Traffic lights on the left */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div
              style={{
                ...buttonStyle,
                backgroundColor: "#ff5f56",
              }}
            />
            <div
              style={{
                ...buttonStyle,
                backgroundColor: "#ffbd2e",
              }}
            />
            <div
              style={{
                ...buttonStyle,
                backgroundColor: "#27c93f",
              }}
            />
          </div>
          {/* Language badge on the right */}
          <div style={languageBadgeStyle}>{formatLanguageName(language)}</div>
        </div>

        {/* Code Area with padding wrapper */}
        <div style={contentWrapperStyle}>
          <SyntaxHighlighter
            language={language}
            style={theme}
            showLineNumbers={true}
            wrapLongLines={true}
            customStyle={{
              background: "#1E1E1E", // Solid dark background for contrast
              padding: "25px", // More breathing room
              borderRadius: "12px", // Soft corners for the code block itself
              margin: "0", // Remove default margins
              fontSize: "14px", // Ensure readable font size
              lineHeight: "1.6", // Better line spacing
              fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace", // System fonts (no external dependencies)
            }}
          >
            {safeCode}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

CodeCard.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  theme: PropTypes.object,
  showBackground: PropTypes.bool,
  glassEffect: PropTypes.bool,
};

export default CodeCard;
