const { parseConversationalInput } = require("./generate-update.js");
const result = parseConversationalInput(`heading: Q1 2026 Performance Review
subheading: Strong Foundation Building
content: Our first quarter showed solid growth
quote: Execution excellence
attribution: CEO Perspective`);
console.log(JSON.stringify(result, null, 2));
