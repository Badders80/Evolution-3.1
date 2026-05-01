#!/usr/bin/env node

/**
 * Evolution Update Generator CLI
 * Generates branded HTML updates from raw content
 * Usage: node generate-update.js < input.json > output.html
 */

const fs = require("fs");
const path = require("path");

// Generate HTML based on update type and content
function generateUpdate(data) {
  const {
    updateType = "investor",
    heading,
    subheading,
    content,
    quote,
    quoteAttribution,
    imageUrl,
    videoUrl,
    outputFormat = "both",
  } = data;

  // Generate both email and mobile versions
  const emailHtml = generateEmailVersion(data);
  const mobileHtml = generateMobileVersion(data);

  // For CLI output, return the requested format
  if (outputFormat === "email") return emailHtml;
  if (outputFormat === "mobile") return mobileHtml;

  // Default: return both (you can split this in your script)
  return emailHtml + "\n\n<!-- MOBILE VERSION -->\n\n" + mobileHtml;
}

function generateEmailVersion(data) {
  const {
    heading,
    subheading,
    content,
    quote,
    quoteAttribution,
    imageUrl,
    videoUrl,
  } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,300;0,400;0,600;1,400&family=Inter:wght@300;400;500;600;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { overflow-x: hidden; width: 100%; }
        body {
            background: #ffffff; color: #000000;
            font-family: 'Inter', sans-serif;
            margin: 0; padding: 0;
            width: 430px; min-height: 100vh;
        }
        img, iframe, video { max-width: 100%; }
        .page-container {
            width: 100%; padding: 24px 24px 24px;
            display: flex; flex-direction: column; min-height: 100%;
        }

        header {
            width: 100%; max-width: 430px;
            background: #ffffff;
            padding: 8px 0 12px 0;
            border-bottom: 1px solid #000000;
            display: flex;
            justify-content: flex-start;
        }
        .header-content { display: flex; flex-direction: column; align-items: flex-start; text-align: left; gap: 2px; }
        .brand-mark {
            display: block;
            line-height: 0;
            margin-bottom: 2px;
        }
        .brand-mark svg {
            height: 90px;
            width: auto;
            display: block;
        }
        .template-type {
            font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600;
            letter-spacing: 3px; text-transform: uppercase; color: #666; margin-top: 0;
        }

        main { flex: 1; display: flex; flex-direction: column; margin-top: 26px; }

        .headline {
            font-family: 'Playfair Display', serif;
            font-size: 44px;
            font-weight: 400;
            line-height: 1.1;
            margin-bottom: 20px;
            color: #000;
            letter-spacing: -0.5px;
        }
        .subheadline {
            font-family: 'Inter', sans-serif;
            font-size: 20px;
            font-weight: 500;
            line-height: 1.5;
            color: #222;
            margin-bottom: 24px;
            text-align: justify;
            hyphens: none;
        }

        .content {
            font-family: 'Inter', sans-serif;
            font-size: 15px;
            line-height: 1.75;
            color: #1a1a1a;
            margin-bottom: 16px;
            text-align: justify;
            hyphens: none;
        }
        .content p { margin-bottom: 2em; }
        .content:first-of-type p:first-of-type::first-letter {
            font-family: 'Playfair Display', serif; font-size: 3.8em; font-weight: 300;
            float: left; line-height: 0.8; margin-right: 8px; margin-top: 4px;
        }

        .quote-sidebar {
            background: #fafafa;
            padding: 32px 24px;
            border-left: 3px solid #d4a964;
            display: flex; flex-direction: column; gap: 24px;
            margin: 24px 0;
        }
        .quote-sidebar blockquote {
            font-family: 'Geist Sans', sans-serif;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 1.7;
            color: #000;
            margin: 0;
            text-align: left;
            letter-spacing: -0.01em;
        }
        .quote-sidebar cite {
            font-family: 'Inter', sans-serif; font-size: 11px; font-style: normal;
            color: #666; font-weight: 600; text-transform: uppercase;
            text-align: left; display: block; letter-spacing: 1px;
        }

        .media-container-landscape {
            position: relative; width: 100%; margin: 0 auto; border-radius: 8px;
            overflow: hidden; aspect-ratio: 16/9;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .media-container-portrait {
            position: relative; width: 100%; margin: 0 auto; border-radius: 8px;
            overflow: hidden; aspect-ratio: 9/16;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        iframe, .sidebar-media-image {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; object-fit: cover;
        }

        footer {
            position: relative; width: 100%; background: #000000; color: #ffffff;
            padding: 56px 24px 60px; margin-top: 72px; display: flex; flex-direction: column;
            gap: 32px; text-align: center;
        }
        .footer-hero h2 {
            font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 400;
            color: #fff; margin: 0 0 14px 0;
        }
        .footer-hero .highlight-ownership {
            color: #d4a964;
        }
        .footer-hero p {
            font-family: 'Inter', sans-serif; font-size: 10px; color: #888;
            text-transform: uppercase; letter-spacing: 1px;
            margin: 0 0 6px 0;
        }
    </style>
</head>
<body>
    <div class="page-container">
        <header>
            <div class="header-content">
                <div class="brand-mark">
                    <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                        <text x="10" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#000">EVOLUTION</text>
                    </svg>
                </div>
                <div class="template-type">INVESTOR UPDATE</div>
            </div>
        </header>

        <main>
            <h1 class="headline">${heading}</h1>
            ${subheading ? `<h2 class="subheadline">${subheading}</h2>` : ""}

            <div class="content">
                ${content
                  .split("\n")
                  .map((line) => (line.trim() ? `<p>${line}</p>` : ""))
                  .join("")}
            </div>

            ${
              quote
                ? `
            <div class="quote-sidebar">
                <blockquote>
                    "${quote}"
                </blockquote>
                ${quoteAttribution ? `<cite>${quoteAttribution}</cite>` : ""}
            </div>
            `
                : ""
            }

            ${
              imageUrl
                ? `
            <div class="media-container-landscape">
                <img src="${imageUrl}" alt="Hero image" class="sidebar-media-image">
            </div>
            `
                : ""
            }

            ${
              videoUrl
                ? `
            <div class="media-container-landscape">
                <iframe src="${videoUrl}" allowfullscreen></iframe>
            </div>
            `
                : ""
            }
        </main>

        <footer>
            <div class="footer-hero">
                <h2>Built for <span class="highlight-ownership">Evolution</span></h2>
                <p>Generated ${new Date().toLocaleDateString()}</p>
            </div>
        </footer>
    </div>
</body>
</html>`;
}

function generateMobileVersion(data) {
  // For now, return the same as email version
  // In a full implementation, this would have responsive styles
  return generateEmailVersion(data);
}

// Parse conversational input into structured data
function parseConversationalInput(text) {
  const data = {
    updateType: "investor",
    heading: "",
    subheading: "",
    content: "",
    quote: "",
    quoteAttribution: "",
    imageUrl: "",
    videoUrl: "",
  };

  // Simple line-by-line parsing
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  for (const line of lines) {
    if (
      line.toLowerCase().startsWith("heading:") ||
      line.toLowerCase().startsWith("title:")
    ) {
      data.heading = line.split(":").slice(1).join(":").trim();
    } else if (
      line.toLowerCase().startsWith("subheading:") ||
      line.toLowerCase().startsWith("subtitle:")
    ) {
      data.subheading = line.split(":").slice(1).join(":").trim();
    } else if (
      line.toLowerCase().startsWith("content:") ||
      line.toLowerCase().startsWith("body:")
    ) {
      data.content = line.split(":").slice(1).join(":").trim();
    } else if (line.toLowerCase().startsWith("quote:")) {
      data.quote = line.split(":").slice(1).join(":").trim();
    } else if (
      line.toLowerCase().startsWith("attribution:") ||
      line.toLowerCase().startsWith("author:")
    ) {
      data.quoteAttribution = line.split(":").slice(1).join(":").trim();
    } else if (
      line.toLowerCase().startsWith("image:") ||
      line.toLowerCase().startsWith("img:")
    ) {
      data.imageUrl = line.split(":").slice(1).join(":").trim();
    } else if (line.toLowerCase().startsWith("video:")) {
      data.videoUrl = line.split(":").slice(1).join(":").trim();
    } else if (line.toLowerCase().includes("investor update")) {
      data.updateType = "investor";
    } else if (line.toLowerCase().includes("pre-race")) {
      data.updateType = "pre-race";
    } else if (line.toLowerCase().includes("post-race")) {
      data.updateType = "post-race";
    } else if (line.toLowerCase().includes("nomination")) {
      data.updateType = "nomination";
    }
  }

  // If no explicit content found, use any remaining text as content
  if (!data.content) {
    const contentLines = lines.filter(
      (line) =>
        !line.toLowerCase().includes("heading:") &&
        !line.toLowerCase().includes("subheading:") &&
        !line.toLowerCase().includes("content:") &&
        !line.toLowerCase().includes("quote:") &&
        !line.toLowerCase().includes("attribution:") &&
        !line.toLowerCase().includes("image:") &&
        !line.toLowerCase().includes("video:") &&
        !line.toLowerCase().includes("investor update") &&
        !line.toLowerCase().includes("pre-race") &&
        !line.toLowerCase().includes("post-race") &&
        !line.toLowerCase().includes("nomination"),
    );
    data.content = contentLines.join(" ");
  }

  return data;
}

// Generate HTML from conversational input
function generateFromConversation(text) {
  const data = parseConversationalInput(text);
  return generateUpdate(data);
}

// Export for testing
if (require.main === module) {
  // Allow direct execution with file argument
  if (process.argv[2]) {
    const inputFile = process.argv[2];
    const input = fs.readFileSync(inputFile, "utf8");
    const data = JSON.parse(input);
    const html = generateUpdate(data);

    // Write to output file if specified
    const outputFile =
      process.argv[3] ||
      `public/updates/${data.updateType}-${new Date().toISOString().split("T")[0]}.html`;
    fs.writeFileSync(outputFile, html);
    console.log(`Generated: ${outputFile}`);
  } else {
    // Read input from stdin
    let input = "";
    process.stdin.on("data", (chunk) => {
      input += chunk;
    });

    process.stdin.on("end", () => {
      try {
        const data = JSON.parse(input);
        const html = generateUpdate(data);
        console.log(html);
      } catch (error) {
        console.error("Error: Please provide valid JSON input");
        console.error('Example: {"heading": "Title", "content": "Body text"}');
        process.exit(1);
      }
    });
  }
}

module.exports = {
  generateUpdate,
  generateEmailVersion,
  generateMobileVersion,
};
