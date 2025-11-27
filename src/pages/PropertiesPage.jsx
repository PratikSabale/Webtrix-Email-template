import { useRecoilState } from "recoil";
import React from "react";
import { playAreaItemsState, selectedItemState } from "../recoil/layoutAtoms";
import {
  Box,
  Typography,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  Slider,
} from "@mui/material";

export default function PropertiesPanel() {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const [items, setItems] = useRecoilState(playAreaItemsState);

  const PANEL_WIDTH = 320;

  if (!selectedItem)
    return (
      <Paper
        sx={{
          width: PANEL_WIDTH,
          p: 3,
          borderRadius: 4,
          textAlign: "center",
          height: "100%",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography variant="h6">No item selected</Typography>
        <Typography variant="body2" color="gray">
          Click any item inside the play area
        </Typography>
      </Paper>
    );

  // 👉 FIX: Update child items inside container
  const updateItem = (updates) => {
    setItems((prev) =>
      prev.map((container) => {
        // Update container itself
        if (container.id === selectedItem.id) {
          return { ...container, ...updates };
        }

        // Update inside children
        if (container.children?.length) {
          return {
            ...container,
            children: container.children.map((child) =>
              child.id === selectedItem.id ? { ...child, ...updates } : child
            ),
          };
        }

        return container;
      })
    );

    // Update recoil selected value
    setSelectedItem((prev) => ({ ...prev, ...updates }));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: PANEL_WIDTH,
        p: 3,
        borderRadius: 4,
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(15px)",
        border: "1px solid #ddd",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Properties
      </Typography>

      {/* ---------------- Container Settings ---------------- */}
      {selectedItem.type === "Container" && (
        <>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Container Settings
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            Grid Columns
          </Typography>

          <ToggleButtonGroup
            exclusive
            value={selectedItem.gridColumns}
            onChange={(e, val) => val && updateItem({ gridColumns: val })}
            sx={{ mb: 3 }}
          >
            <ToggleButton value={1}>1</ToggleButton>
            <ToggleButton value={2}>2</ToggleButton>
            <ToggleButton value={3}>3</ToggleButton>
            <ToggleButton value={4}>4</ToggleButton>
          </ToggleButtonGroup>

          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* ---------------- Paragraph / Title Settings ---------------- */}
      {(selectedItem.type === "Paragraph" || selectedItem.type === "Title") && (
        <>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            {selectedItem.type} Settings
          </Typography>

          {/* ---------------- TITLE → Heading Tag ---------------- */}
          {selectedItem.type === "Title" && (
            <TextField
              select
              label="Heading Tag"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              value={selectedItem.headingTag || "h3"}
              onChange={(e) => {
                const tag = e.target.value;

                // Map heading tag → font size
                const headingSizes = {
                  h1: 32,
                  h2: 28,
                  h3: 24,
                  h4: 20,
                  h5: 18,
                  h6: 16,
                };

                updateItem({
                  headingTag: tag,
                  fontSize: headingSizes[tag], // apply mapped size
                });
              }}
            >
              {["h1", "h2", "h3", "h4", "h5", "h6"].map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag.toUpperCase()}
                </MenuItem>
              ))}
            </TextField>
          )}

          {/* ---------------- PARAGRAPH → Font Size ---------------- */}
          {selectedItem.type === "Paragraph" && (
            <TextField
              label="Font Size"
              type="number"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              value={selectedItem.fontSize || 16}
              onChange={(e) =>
                updateItem({ fontSize: parseInt(e.target.value) })
              }
            />
          )}

          {/* ------------ COMMON SETTINGS FOR BOTH ------------- */}

          <TextField
            select
            label="Font Weight"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={selectedItem.fontWeight || "400"}
            onChange={(e) => updateItem({ fontWeight: e.target.value })}
          >
            {["300", "400", "500", "600", "700", "800", "900"].map((w) => (
              <MenuItem key={w} value={w}>
                {w}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Text Align"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={selectedItem.textAlign || "left"}
            onChange={(e) => updateItem({ textAlign: e.target.value })}
          >
            {["left", "center", "right", "justify"].map((a) => (
              <MenuItem key={a} value={a}>
                {a}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Color"
            type="color"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={selectedItem.color || "#000000"}
            onChange={(e) => updateItem({ color: e.target.value })}
          />

          <TextField
            label="Line Height"
            type="number"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={selectedItem.lineHeight || 1.5}
            onChange={(e) =>
              updateItem({ lineHeight: parseFloat(e.target.value) })
            }
          />

          <TextField
            label="Letter Spacing"
            type="number"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={selectedItem.letterSpacing || 0}
            onChange={(e) =>
              updateItem({ letterSpacing: parseFloat(e.target.value) })
            }
          />

          <TextField
            select
            label="Font Family"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={selectedItem.fontFamily || "Arial"}
            onChange={(e) => updateItem({ fontFamily: e.target.value })}
          >
            {[
              "Arial",
              "Roboto",
              "Poppins",
              "Montserrat",
              "Times New Roman",
              "Georgia",
            ].map((font) => (
              <MenuItem key={font} value={font}>
                {font}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Margin (px)"
            type="number"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={selectedItem.margin || 0}
            onChange={(e) => updateItem({ margin: parseInt(e.target.value) })}
          />

          <TextField
            label="Padding (px)"
            type="number"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={selectedItem.padding || 0}
            onChange={(e) => updateItem({ padding: parseInt(e.target.value) })}
          />

          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* ---------------- Image Settings ---------------- */}
      {selectedItem.type === "Image" && (
        <>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Image Settings
          </Typography>

          <Slider
            min={50}
            max={1000}
            value={selectedItem.width || 200}
            onChange={(e, v) => updateItem({ width: v })}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />

          <Slider
            min={50}
            max={1000}
            value={selectedItem.height || 200}
            onChange={(e, v) => updateItem({ height: v })}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />

          <Slider
            min={0}
            max={50}
            value={selectedItem.borderRadius || 0}
            onChange={(e, v) => updateItem({ borderRadius: v })}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />

          <TextField
            select
            label="Object Fit"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={selectedItem.objectFit || "cover"}
            onChange={(e) => updateItem({ objectFit: e.target.value })}
          >
            {["cover", "contain", "fill", "none"].map((fit) => (
              <MenuItem key={fit} value={fit}>
                {fit}
              </MenuItem>
            ))}
          </TextField>

          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* ---------------- Video Settings ---------------- */}
      {selectedItem.type === "Video" && (
        <>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Video Settings
          </Typography>

          <Slider
            min={50}
            max={1000}
            value={selectedItem.width || 400}
            onChange={(e, v) => updateItem({ width: v })}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />

          <Slider
            min={50}
            max={1000}
            value={selectedItem.height || 300}
            onChange={(e, v) => updateItem({ height: v })}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={selectedItem.autoplay || false}
                onChange={(e) => updateItem({ autoplay: e.target.checked })}
              />
            }
            label="Autoplay"
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={selectedItem.loop || false}
                onChange={(e) => updateItem({ loop: e.target.checked })}
              />
            }
            label="Loop"
          />

          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* ---------------- Space ---------------- */}
      {selectedItem.type === "Space" && (
        <>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Space Settings
          </Typography>

          <Slider
            min={10}
            max={500}
            value={selectedItem.height || 50}
            onChange={(e, v) => updateItem({ height: v })}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />
        </>
      )}
    </Paper>
  );
}
