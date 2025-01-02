import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");

console.log("Verifying build output...");

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.error("dist directory not found!");
  process.exit(1);
}

// Read the main JS file
const files = fs.readdirSync(distDir);
const jsFiles = files.filter((f) => f.endsWith(".js"));

console.log("Found JS files:", jsFiles);

// Check for translations in the built files
jsFiles.forEach((file) => {
  const content = fs.readFileSync(path.join(distDir, file), "utf-8");
  if (content.includes("Перетворіть")) {
    console.log(`Found Ukrainian text in ${file}`);
  }
});
