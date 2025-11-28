export const generateHTML = (items) => {
  if (!items || items.length === 0) {
    return `
      <div style="padding:20px;font-family:Arial,sans-serif;">
        <p>No content added yet.</p>
      </div>
    `;
  }

  let html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body, table, td, p, a, li, blockquote {
        margin:0; padding:0; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;
      }
      img { border:0; line-height:100%; text-decoration:none; display:block; max-width:100%; height:auto; }
      table { border-collapse: collapse !important; }
      p { display:block; margin:0; }
    </style>
  </head>
  <body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f4f4f4;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f4f4f4">
      <tr>
        <td align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; width:100%; background-color:#ffffff;">
  `;

  items.forEach((container) => {
    const padding = container.padding ?? 0;
    const margin = container.margin ?? 0;
    const bgColor = container.backgroundColor || "#ffffff";
    const borderColor = container.borderColor || "#cccccc";
    const borderWidth = container.borderWidth ?? 0;
    const gap = container.gap ?? 0;

    html += `
      <tr>
        <td style="
          padding:${padding}px;
          margin:${margin}px;
          background-color:${bgColor};
          border:${borderWidth}px solid ${borderColor};
        ">
    `;

    // table for columns
    const cols = container.cells || [];
    html += `<table width="100%" border="0" cellpadding="0" cellspacing="${gap}"><tr>`;

    // IMPORTANT: index-based loop over columns
    for (let i = 0; i < cols.length; i++) {
      const column = cols[i];

      html += `<td valign="top" style="padding:0; margin:0;">`;

      column.forEach((child) => {
        html += `
          <div style="
            font-size:${child.fontSize}px;
            font-weight:${child.fontWeight};
            color:${child.color};
            text-align:${child.textAlign};
            line-height:${child.lineHeight || 1.4};
            margin:${child.margin || 0}px;
            padding:${child.padding || 0}px;
            font-family:${child.fontFamily || "Arial,sans-serif"};
            letter-spacing:${child.letterSpacing || 0}px;
            width:100%;
            box-sizing:border-box;
          ">
            ${child.content || ""}
          </div>
        `;
      });

      html += `</td>`;
    }

    html += `</tr></table>`;

    html += `
        </td>
      </tr>
    `;
  });

  html += `
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  return html;
};
