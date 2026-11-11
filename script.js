const output = document.querySelector("#random-output");
const copyStatus = document.querySelector("#copy-status");
const items = ["Why did the function return early? It needed some space.", "CSS walked into a bar and ordered display: block.", "The developer went broke because they used up all their cache.", "I told my browser a joke, but it did not respond."];

function generate() {
  const index = Math.floor(Math.random() * items.length);
  output.textContent = items[index];
  copyStatus.textContent = "";
}
document.querySelector("#generate").addEventListener("click", generate);
document.querySelector("#copy").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(output.textContent.trim());
    copyStatus.textContent = "Copied to the clipboard.";
  } catch {
    copyStatus.textContent = "Clipboard access is unavailable. Select and copy the text manually.";
  }
});
generate();
