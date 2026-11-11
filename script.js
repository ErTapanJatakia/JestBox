const output = document.querySelector("#random-output");
const copyStatus = document.querySelector("#copy-status");
const items = ["Why did the function return early? It needed some space.", "CSS walked into a bar and ordered display: block.", "The developer went broke because they used up all their cache.", "I told my browser a joke, but it did not respond."];

function randomHex() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}
function generate() {
  const index = Math.floor(Math.random() * items.length);
  output.textContent = items[index];
  copyStatus.textContent = "";
}
document.querySelector("#generate").addEventListener("click", generate);
document.querySelector("#copy").addEventListener("click", async () => {
  await navigator.clipboard.writeText(output.textContent.trim());
  copyStatus.textContent = "Copied to the clipboard.";
});
generate();
