import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Add timeout fallback for standalone development
const initTimeout = setTimeout(() => {
  console.warn("addOnUISdk.ready timed out - initializing app in standalone mode");
  const root = createRoot(document.getElementById("root"));
  root.render(<App addOnUISdk={null} sandboxProxy={null} />);
}, 3000);

addOnUISdk.ready
  .then(async () => {
    clearTimeout(initTimeout);
    console.log("addOnUISdk is ready for use.");

    try {
      // Get the UI runtime.
      const { runtime } = addOnUISdk.instance;

      // Get the proxy object, which is required
      // to call the APIs defined in the Document Sandbox runtime
      // i.e., in the `code.js` file of this add-on.
      const sandboxProxy = await runtime.apiProxy("documentSandbox");

      const root = createRoot(document.getElementById("root"));
      root.render(<App addOnUISdk={addOnUISdk} sandboxProxy={sandboxProxy} />);
    } catch (error) {
      console.error("Error initializing app:", error);
      // Fallback: render app without SDK
      const root = createRoot(document.getElementById("root"));
      root.render(<App addOnUISdk={null} sandboxProxy={null} />);
    }
  })
  .catch((error) => {
    clearTimeout(initTimeout);
    console.error("addOnUISdk.ready failed:", error);
    // Fallback: render app without SDK
    const root = createRoot(document.getElementById("root"));
    root.render(<App addOnUISdk={null} sandboxProxy={null} />);
  });
