export const generateHTML = (items) => {
  if (!items || items.length === 0)
    return `<div style="padding:20px;font-family:Arial"><p>No content</p></div>`;

  const renderChild = (child) => {
    if (child.type === "Paragraph" || child.type === "Title") {
      const style = `
        font-size:${child.fontSize}px;
        font-weight:${child.fontWeight};
        color:${child.color};
        text-align:${child.textAlign};
        line-height:${child.lineHeight || 1.5};
        letter-spacing:${child.letterSpacing || 0}px;
        font-family:${child.fontFamily || "Arial"};
        margin:${child.margin || 0}px;
        padding:${child.padding || 0}px;
      `;
      const tag = child.type === "Title" ? child.headingTag || "h3" : "p";
      return `<${tag} style="${style}">${child.content || ""}</${tag}>`;
    }

    // Image / Video / Space can go here
    return "";
  };

  const renderContainer = (container) => {
    const cellsHTML = container.cells
      .map(
        (cell) =>
          `<div style="display:flex;flex-direction:column;gap:10px">
            ${cell.map(renderChild).join("")}
          </div>`
      )
      .join("");

    return `<div style="
      display:grid;
      grid-template-columns:repeat(${container.gridColumns},1fr);
      gap:10px;
      padding:0;
    ">
      ${cellsHTML}
    </div>`;
  };

  return items.map(renderContainer).join("");
};
