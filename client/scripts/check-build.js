import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");
console.log("Checking build output...");

if (!fs.existsSync(distDir)) {
  console.error("dist directory not found!");
  process.exit(1);
}

const files = fs.readdirSync(distDir);
const jsFiles = files.filter((f) => f.endsWith(".js"));

console.log("Found JS files:", jsFiles);

let foundUkrainianText = false;
jsFiles.forEach((file) => {
  const content = fs.readFileSync(path.join(distDir, file), "utf-8");
  if (content.includes("Перетворіть")) {
    console.log(`Found Ukrainian text in ${file}`);
    foundUkrainianText = true;
  }
});

if (!foundUkrainianText) {
  console.error("No Ukrainian text found in build files!");
  process.exit(1);
}
