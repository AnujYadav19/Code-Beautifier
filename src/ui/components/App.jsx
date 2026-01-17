import React, { useState, useRef, useEffect } from "react";
import { Theme } from "@swc-react/theme";
import { dracula, vscDarkPlus, atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toBlob } from "html-to-image";
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import Sidebar from "./Sidebar";
import CodeCard from "./CodeCard";
import "./App.css";

// Load theme fragments to prevent warnings
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
// Load core theme styles for proper component rendering
import "@spectrum-web-components/theme/scale-medium.js";
import "@spectrum-web-components/theme/theme-light.js";

// Helper function to translate theme name string to theme object
const getThemeObject = (themeName) => {
  let themeObj;
  switch (themeName) {
    case "dracula":
      themeObj = dracula;
      break;
    case "vsDark":
      themeObj = vscDarkPlus;
      break;
    case "atomDark":
      themeObj = atomDark;
      break;
    default:
      // Security fallback: default to dracula if unrecognized
      themeObj = dracula;
  }
  console.log("Theme mapping:", themeName, "->", themeObj ? "object" : "null", themeObj);
  return themeObj;
};

const App = ({ addOnUISdk: addOnUISdkProp, sandboxProxy }) => {
  // Initialize state with default values
  const [values, setValues] = useState({
    code: "console.log('Hello Adobe Express!');",
    language: "javascript",
    theme: "dracula", // Stores the string name
    showBackground: true,
    glassEffect: true,
  });

  // State to track SDK readiness
  const [sdkReady, setSdkReady] = useState(false);
  const [initializedSdk, setInitializedSdk] = useState(null);

  // Ref for the preview container (for future image capture)
  const previewRef = useRef(null);

  // Wait for SDK to be ready
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        // Use the prop if available, otherwise use the imported SDK
        const sdk = addOnUISdkProp || addOnUISdk;

        if (sdk && sdk.ready) {
          await sdk.ready;
          setInitializedSdk(sdk);
          setSdkReady(true);
          console.log("SDK initialized and ready");
        } else {
          // If no SDK available, mark as ready anyway (standalone mode)
          setSdkReady(true);
          console.warn("SDK not available - running in standalone mode");
        }
      } catch (error) {
        console.error("Failed to initialize SDK:", error);
        setSdkReady(true); // Allow app to function even if SDK fails
      }
    };

    initializeSDK();
  }, [addOnUISdkProp]);

  // Handle state updates immutably
  const handleChange = (field, value) => {
    console.log("State Updated:", field, value);
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  // Export function to capture and add image to Adobe Express
  const handleExport = async () => {
    // Validation Layer
    if (!previewRef.current) {
      console.error("Preview ref is not available");
      return;
    }

    // Check if SDK is ready
    if (!sdkReady || !initializedSdk) {
      console.error("SDK is not ready yet. Please wait for initialization.");
      return;
    }

    try {
      // User Feedback
      console.log("Starting export...");

      // Capture Logic (High Quality)
      const blob = await toBlob(previewRef.current, {
        cacheBust: true,
        skipAutoScale: true,
        pixelRatio: 2, // Ensures crisp text on high-DPI screens
      });

      // Check if blob is null
      if (!blob) {
        throw new Error("Failed to generate image blob");
      }

      // SDK Interaction (Security Boundary)
      // Use the initialized SDK
      if (!initializedSdk || !initializedSdk.app || !initializedSdk.app.document) {
        throw new Error("Adobe Express SDK is not available or not properly initialized");
      }

      await initializedSdk.app.document.addImage(blob);
      console.log("Export successful!");
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <Theme theme="express" scale="medium" color="light" style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <div className="app-container">
        {/* Left Panel: Sidebar */}
        <Sidebar values={values} onChange={handleChange} onExport={handleExport} isExportDisabled={!sdkReady || !initializedSdk} />

        {/* Right Panel: Preview Area */}
        <div className="preview-area">
          <div className="capture-container" ref={previewRef}>
            <CodeCard {...values} theme={getThemeObject(values.theme)} />
          </div>
        </div>
      </div>
    </Theme>
  );
};

export default App;
