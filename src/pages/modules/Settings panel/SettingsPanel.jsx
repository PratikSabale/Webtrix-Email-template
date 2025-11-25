import { Box } from "@mui/material";
import { ChatCircleDots, HouseLine, Stack } from "phosphor-react";
import React from "react";
import { Switch } from "@mui/material";

const SettingsPanel = () => {
  const [activeTab, setActiveTab] = React.useState("Global");

  // Gmail annotation states
  const [gmailEnabled, setGmailEnabled] = React.useState(false);
  const [annotationType, setAnnotationType] = React.useState("Product Carousel");
  const [senderLogoEnabled, setSenderLogoEnabled] = React.useState(false);
  const [headlineEnabled, setHeadlineEnabled] = React.useState(false);
  const [priceEnabled, setPriceEnabled] = React.useState(false);

  const [headline, setHeadline] = React.useState("");
  const [price, setPrice] = React.useState("");

  // Slides
  const [slides, setSlides] = React.useState([{ image: null, url: "https://stripo.email/" }]);
  const [selectedSlide, setSelectedSlide] = React.useState(0);

  // UTM Toggle
  const [utmEnabled, setUtmEnabled] = React.useState(false);

  // Custom UTM Parameters
  const [customUtmEnabled, setCustomUtmEnabled] = React.useState(false);
  const [utmParams, setUtmParams] = React.useState([{ name: "", value: "" }]);

  const addParam = () => {
    setUtmParams([...utmParams, { name: "", value: "" }]);
  };

  const updateParam = (i, field, val) => {
    const updated = [...utmParams];
    updated[i][field] = val;
    setUtmParams(updated);
  };

  const removeParam = (i) => {
    if (utmParams.length === 1) return;
    setUtmParams(utmParams.filter((_, idx) => idx !== i));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const updated = [...slides];
    updated[selectedSlide].image = URL.createObjectURL(file);
    setSlides(updated);
  };

  const addSlide = () => {
    setSlides([...slides, { image: null, url: "https://stripo.email/" }]);
    setSelectedSlide(slides.length);
  };

  const deleteSlide = () => {
    if (slides.length === 1) return;
    const updated = slides.filter((_, i) => i !== selectedSlide);
    setSlides(updated);
    setSelectedSlide(0);
  };

  const settingControls = [
    { name: "Global", icon: <HouseLine size={20} /> },
    { name: "Layouts", icon: <Stack size={20} /> },
    { name: "Support", icon: <ChatCircleDots size={20} /> },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "90%", padding: 1 }}>
      {/* TAB BUTTONS */}
      <Box sx={{ display: "flex", flexDirection: "row", background: "#D3D3D3", width: "100%", justifyContent: "space-evenly", borderRadius: 3, padding: 1, mb: 2 }}>
        {settingControls.map((item, index) => {
          const bgColor = activeTab === item.name ? "white" : "#D3D3D3";
          return (
            <Box key={index} sx={{ background: bgColor, px: 3, py: 0.5, borderRadius: 3, cursor: "pointer" }} onClick={() => setActiveTab(item.name)}>
              {item.icon}
            </Box>
          );
        })}
      </Box>

      {/* GLOBAL TAB CONTENT */}
      {activeTab === "Global" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* SUBJECT */}
          <Box sx={{ background: "#f1f1f1", padding: 2, borderRadius: 2 }}>
            <Box sx={{ fontSize: "12px", color: "gray", mb: 1 }}>65 characters recommended</Box>
            <textarea placeholder="Subject / Title" style={{ width: "100%", height: "70px", borderRadius: "8px", padding: "10px", border: "1px solid #ccc", resize: "none", outline: "none" }} />
          </Box>

          {/* PREHEADER */}
          <Box sx={{ background: "#f1f1f1", padding: 2, borderRadius: 2 }}>
            <Box sx={{ fontSize: "12px", color: "gray", mb: 1 }}>50 - 100 characters</Box>
            <textarea placeholder="Hidden Preheader" style={{ width: "100%", height: "70px", borderRadius: "8px", padding: "10px", border: "1px solid #ccc", resize: "none", outline: "none" }} />
          </Box>

          {/* GMAIL ANNOTATION SWITCH */}
          <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2, border: "1px solid #ddd", borderRadius: 2 }}>
            <Box>
              <Box sx={{ fontWeight: 600, mb: 0.5 }}>Email annotations for Gmail</Box>
              <Box sx={{ fontSize: "13px", color: "gray" }}>Showcase deals, discounts, or offers directly in inbox previews.</Box>
            </Box>
            <Switch checked={gmailEnabled} onChange={() => setGmailEnabled(!gmailEnabled)} />
          </Box>

          {/* EXPANDED GMAIL SECTION */}
          {gmailEnabled && (
            <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
              <Box sx={{ mb: 2, fontWeight: 600 }}>Annotation</Box>
              <select value={annotationType} onChange={(e) => setAnnotationType(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}>
                <option>Product Carousel</option>
                <option>Deals</option>
                <option>Single Image</option>
              </select>

              <Box sx={{ mt: 3, fontWeight: 600 }}>Preview</Box>
              <Box sx={{ p: 2, border: "1px solid #ddd", mt: 1, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 35, height: 35, background: "#eee", borderRadius: "50%" }} />
                  <Box>
                    <Box>Sender name</Box>
                    <Box sx={{ fontSize: 13, color: "gray" }}>Promotional message subject</Box>
                  </Box>
                </Box>

                {/* Image row */}
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  {slides.map((slide, i) => (
                    <Box key={i} sx={{ width: "45%", height: 120, background: "#f5f5f5", display: "flex", justifyContent: "center", alignItems: "center", border: "1px dashed #bbb" }}>
                      {slide.image ? <img src={slide.image} width="100%" height="100%" style={{ objectFit: "cover" }} /> : "No image"}
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Sender Logo */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <span>Sender Logo</span>
                <Switch checked={senderLogoEnabled} onChange={() => setSenderLogoEnabled(!senderLogoEnabled)} />
              </Box>

              {/* Headline */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <span>Headline</span>
                <Switch checked={headlineEnabled} onChange={() => setHeadlineEnabled(!headlineEnabled)} />
              </Box>

              {headlineEnabled && (
                <input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Headline text" 
                  style={{ width: "100%", padding: 10, marginTop: 10, borderRadius: 6, border: "1px solid #ccc" }} />
              )}

              {/* Price */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <span>Price</span>
                <Switch checked={priceEnabled} onChange={() => setPriceEnabled(!priceEnabled)} />
              </Box>

              {priceEnabled && (
                <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Product Price" 
                  style={{ width: "100%", padding: 10, marginTop: 10, borderRadius: 6, border: "1px solid #ccc" }} />
              )}

              {/* SLIDE SELECTOR */}
              <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
                {slides.map((_, i) => (
                  <Box key={i} onClick={() => setSelectedSlide(i)} 
                    sx={{ flex: 1, textAlign: "center", padding: 1, borderRadius: 2, 
                      border: selectedSlide === i ? "2px solid black" : "1px solid #ccc", cursor: "pointer" }}>
                    {i + 1}
                  </Box>
                ))}
                <Box onClick={addSlide} 
                  sx={{ width: 40, textAlign: "center", padding: 1, borderRadius: 2, border: "1px solid #ccc", cursor: "pointer" }}>+</Box>
              </Box>

              {/* Promo Image Upload */}
              <Box sx={{ mt: 3 }}>
                <Box sx={{ mb: 1 }}>Promo Image</Box>
                <label style={{ width: "100%", height: 120, border: "2px dashed #bbb", borderRadius: 6, 
                  display: "flex", justifyContent: "center", alignItems: "center", color: "gray", cursor: "pointer" }}>
                  Drag & Drop or Browse
                  <input type="file" onChange={handleImageUpload} style={{ display: "none" }} />
                </label>
              </Box>

              {/* Product URL */}
              <Box sx={{ mt: 3 }}>
                <Box sx={{ mb: 1 }}>Product Card URL</Box>
                <input value={slides[selectedSlide].url} 
                  onChange={(e) => {
                    const updated = [...slides];
                    updated[selectedSlide].url = e.target.value;
                    setSlides(updated);
                  }} 
                  style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }} />
              </Box>

              {/* Delete Slide */}
              <button onClick={deleteSlide} 
                style={{ marginTop: 20, background: "#eee", border: "1px solid #ccc", padding: "10px 20px", borderRadius: 6, cursor: "pointer" }}>
                Delete Slide
              </button>
            </Box>
          )}

          {/* UTM PARAMETERS SWITCH */}
          <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2, border: "1px solid #ddd", borderRadius: 2 }}>
            <Box>
              <Box sx={{ fontWeight: 600, mb: 0.5 }}>UTM Parameters</Box>
              <Box sx={{ fontSize: "13px", color: "gray" }}>Add tracking parameters to all email URLs automatically.</Box>
            </Box>
            <Switch checked={utmEnabled} onChange={() => setUtmEnabled(!utmEnabled)} />
          </Box>

          {/* UTM EXPANDED AREA */}
          {utmEnabled && (
            <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
              <Box sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>Campaign Source (utm_source)</Box>
              <input placeholder="newsletter" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: 15 }} />

              <Box sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>Campaign Medium (utm_medium)</Box>
              <input placeholder="email" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: 15 }} />

              <Box sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>Campaign Name (utm_campaign)</Box>
              <input placeholder="Empty_template" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: 15 }} />

              <Box sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>Campaign Content (utm_content)</Box>
              <input placeholder="link, landing page" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: 15 }} />

              <Box sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>Campaign Term (utm_term)</Box>
              <input placeholder="free, -20%, registration" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: 15 }} />

              {/* Custom UTM Parameters */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Box sx={{ fontWeight: 600 }}>Custom UTM Parameters</Box>
                <Switch checked={customUtmEnabled} onChange={() => setCustomUtmEnabled(!customUtmEnabled)} />
              </Box>

              {customUtmEnabled && (
                <Box sx={{ mt: 2, p: 2, borderRadius: 2, background: "#fafafa", border: "1px solid #ddd" }}>
                  
                  {utmParams.map((param, i) => (
                    <Box key={i} sx={{display: "grid", gridTemplateColumns: "1fr 1fr 40px", gap: 1, mb: 2, alignItems: "center"}}>
                      <input value={param.name} onChange={(e) => updateParam(i, "name", e.target.value)} placeholder="Name"
                      style={{width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc"}}
                      />

                      <input value={param.value} onChange={(e) => updateParam(i, "value", e.target.value)} placeholder="Value"
                      style={{width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc"}}
                      />

                      <button onClick={() => removeParam(i)} style={{width: 32, height: 32, display: "flex", justifyContent: "center", alignItems: "center",
                      borderRadius: 6, border: "1px solid #ccc", cursor: "pointer", background: "#fff", fontSize: 18}}
                      >
                        🗑
                      </button>
                    </Box>
            ))}

                  {/* Add Button */}
                  <Box onClick={addParam} sx={{width: 32, height: 32, borderRadius: 2, border: "1px solid #ccc", display: "flex", justifyContent: "center",
                      alignItems: "center", cursor: "pointer", background: "#fff"}}
                  >
                    +
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
};

export default SettingsPanel;