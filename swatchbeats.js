// Lazily copy-pasted from https://stackoverflow.com/a/41886794
const replaceOnDocument = () => {
  const pattern = /\d{2}(:|\.)\d{2}((:|\.)\d{2})?( ?(am|AM|pm|PM))?/g;
  const target = document.body;
  // Handle `string` — see the last section
  [
    target,
    ...target.querySelectorAll("*:not(script):not(noscript):not(style)")
  ].forEach(({childNodes: [...nodes]}) => nodes
    .filter(({nodeType}) => nodeType === document.TEXT_NODE)
    .forEach((textNode) => textNode.textContent = textNode.textContent.replace(pattern, timeToSwatchBeat)));
};

const timeToSwatchBeat = (time) => {
  time = time.replace(/ ?(am|AM|pm|PM)?/g, "");
  time = time.replace(".", ":");
  // Assuming time is in format 12:00 or 12:00:00
  const h = time.slice(0, 2);
  const m = time.slice(3, 5);
  var s = 0;
  if (time.length === 8) {
    s = time.slice(6, 8);
  }
  const timeZoneOffset = new Date().getTimezoneOffset();
  const swatch = '000' + (Math.floor((h * 3600 + (m + timeZoneOffset) * 60 + s) / 86.4) % 1000).slice(-3);
  return swatch;
}

window.setInterval(replaceOnDocument, 1);
