import React, { useCallback, useEffect, useState } from 'react';
import { TextField, FormControlLabel, Switch, Box, Button, ButtonGroup } from '@mui/material';
import { ChromePicker } from 'react-color';

function App() {
  const [color, setColor] = useState("rgba(0, 0, 0, 0.15)");
  const [height, setHeight] = useState(20);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState("line");

  console.log("color", color);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (!chrome?.storage) {
      return;
    }

    // eslint-disable-next-line no-undef
    chrome.storage.local.get(["color", "height", "mode", "enabled"]).then(({ color, height, mode, enabled }) => {
      if (!!color) {
        setColor(color);
      }

      if (typeof height === "number") {
        setHeight(height);
      }

      if (!!mode) {
        setMode(mode);
      }

      if (typeof enabled === "boolean") {
        setEnabled(enabled);
      }
    });
  }, []);

  const onColorChange = useCallback((value, _) => {
    const { r, g, b, a } = value.rgb;
    const rgbaString = `rgba(${r}, ${g}, ${b}, ${a})`;

    setColor(rgbaString);

    // eslint-disable-next-line no-undef
    if (!chrome?.storage) {
      return;
    }

    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ color: rgbaString });
  }, []);


  const onHeightChange = useCallback(event => {
    const value = event.target.value;
    setHeight(value);

    // eslint-disable-next-line no-undef
    if (!chrome?.storage) {
      return;
    }

    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ height: value });
  }, []);

  const onEnabledChange = useCallback(value => {
    setEnabled(value);

    // eslint-disable-next-line no-undef
    if (!chrome?.storage) {
      return;
    }

    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ enabled: value });
  }, []);

  const onModeChange = useCallback(value => {
    setMode(value);

    // eslint-disable-next-line no-undef
    if (!chrome?.storage) {
      return;
    }

    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ mode: value });
  }, []);

  return (
    <div style={{ width: "300px", height: "fit-content" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Focus Line</h1>
        <FormControlLabel
          control={<Switch checked={enabled} onChange={(e) => onEnabledChange(e.target.checked)} />}
          label={enabled ? "ON" : "OFF"}
        />
      </div>


      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ width: '100%' }}>
          <ChromePicker color={color} onChange={onColorChange} disableAlpha styles={{ default: { picker: { width: '100%' } } }} />
        </div>
        <TextField
          type="number"
          label="Height"
          onChange={onHeightChange}
          value={height}
          InputProps={{ endAdornment: <span>px</span> }}
        />
        <ButtonGroup variant="outlined" color="primary" sx={{ width: '100%' }}>
          <Button
            variant={mode === "line" ? "contained" : "outlined"}
            onClick={() => onModeChange("line")}
            sx={{ flexGrow: 1 }}
          >
            Line
          </Button>
          <Button
            variant={mode === "focus" ? "contained" : "outlined"}
            onClick={() => onModeChange("focus")}
            sx={{ flexGrow: 1 }}
          >
            Focus
          </Button>
        </ButtonGroup>
      </Box>
    </div>
  );
}

export default App;
