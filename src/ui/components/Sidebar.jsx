import React from "react";
import PropTypes from "prop-types";

// Adobe Spectrum component imports
import { Picker } from "@swc-react/picker";
import { MenuItem } from "@swc-react/menu";
import { Switch } from "@swc-react/switch";
import { Textfield } from "@swc-react/textfield";
import { Button } from "@swc-react/button";

const Sidebar = ({ values, onChange, onExport, isExportDisabled = false }) => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
    width: "300px",
    borderRight: "1px solid #e0e0e0",
  };

  const titleStyle = {
    margin: "0 0 20px 0",
    fontSize: "20px",
    fontWeight: "700",
    color: "#2c2c2c",
  };

  // Textfield handler - use input event for real-time updates
  const handleCodeChange = (e) => {
    onChange("code", e.target.value);
  };

  // Picker handler - use change event (Adobe Spectrum uses 'change', not 'onChange')
  const handleLanguageChange = (e) => {
    onChange("language", e.target.value);
  };

  // Picker handler - use change event (Adobe Spectrum uses 'change', not 'onChange')
  const handleThemeChange = (e) => {
    onChange("theme", e.target.value);
  };

  // Switch handler - use change event, force boolean with !!
  const handleGlassEffectChange = (e) => {
    onChange("glassEffect", !!e.target.checked);
  };

  // Switch handler - use change event, force boolean with !!
  const handleShowBackgroundChange = (e) => {
    onChange("showBackground", !!e.target.checked);
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Code Beautifier</h2>

      {/* Code Input - Use input event for real-time typing */}
      <Textfield label="Code Snippet" multiline grows value={values.code || ""} onInput={handleCodeChange} />

      {/* Language Picker - Use 'change' prop (not 'onChange') for Adobe Spectrum */}
      <Picker label="Language" value={values.language || "javascript"} change={handleLanguageChange} style={{ width: "100%" }}>
        <MenuItem value="javascript">JavaScript</MenuItem>
        <MenuItem value="python">Python</MenuItem>
        <MenuItem value="css">CSS</MenuItem>
        <MenuItem value="html">HTML</MenuItem>
        <MenuItem value="json">JSON</MenuItem>
      </Picker>

      {/* Theme Picker - Use 'change' prop (not 'onChange') for Adobe Spectrum */}
      <Picker label="Theme" value={values.theme || "vsDark"} change={handleThemeChange} style={{ width: "100%" }}>
        <MenuItem value="dracula">Dracula</MenuItem>
        <MenuItem value="vsDark">VS Dark</MenuItem>
        <MenuItem value="atomDark">Atom Dark</MenuItem>
      </Picker>

      {/* Glass Effect Switch - Use 'change' prop (not 'onChange') for Adobe Spectrum */}
      <Switch checked={values.glassEffect || false} change={handleGlassEffectChange}>
        Glass Effect
      </Switch>

      {/* Background Switch - Use 'change' prop (not 'onChange') for Adobe Spectrum */}
      <Switch checked={values.showBackground || false} change={handleShowBackgroundChange}>
        Background
      </Switch>

      {/* Export Button - Disabled if SDK not ready */}
      <Button variant="accent" onClick={onExport} disabled={isExportDisabled}>
        Add to Page
      </Button>
    </div>
  );
};

Sidebar.propTypes = {
  values: PropTypes.shape({
    code: PropTypes.string,
    language: PropTypes.string,
    theme: PropTypes.string,
    showBackground: PropTypes.bool,
    glassEffect: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
  isExportDisabled: PropTypes.bool,
};

export default Sidebar;
