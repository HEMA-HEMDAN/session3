import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Where the installing project ran npm/yarn/pnpm
const initCwd = process.env.INIT_CWD || process.cwd();

// Source file inside the package
const sourceFile = path.resolve(__dirname, "..", "ModelsRenderer.jsx");
// Destination path in the consumer app (project root)
const destFile = path.resolve(initCwd, "ModelsRenderer.jsx");

function copyFileIfMissing(src, dest) {
  try {
    if (!fs.existsSync(src)) {
      console.warn(
        "[hema-3d-renderer] ModelsRenderer.jsx not found in package. Skipping."
      );
      return;
    }

    // Ensure we never overwrite an existing file in the consumer
    if (fs.existsSync(dest)) {
      console.log(
        "[hema-3d-renderer] ModelsRenderer.jsx already exists in your project. Skipping copy."
      );
      return;
    }

    fs.copyFileSync(src, dest);
    console.log(
      "[hema-3d-renderer] Copied ModelsRenderer.jsx to your project root."
    );
  } catch (err) {
    console.error(
      "[hema-3d-renderer] Failed to copy ModelsRenderer.jsx:",
      err?.message || err
    );
  }
}

copyFileIfMissing(sourceFile, destFile);
