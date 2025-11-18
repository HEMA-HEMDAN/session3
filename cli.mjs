#!/usr/bin/env node

import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name("3drenderer")
  .description("CLI tool to setup 3D renderer component in your React project")
  .version("1.4.2");

program
  .command("init")
  .description("Initialize 3D renderer component in your project")
  .option("-o, --output <path>", "Output directory for the component")
  .option("-y, --yes", "Skip confirmation prompts")
  .action(async (options) => {
    try {
      console.log(chalk.blue("\n🚀 3D Renderer Setup\n"));

      // Source file inside the package
      const sourceFile = path.resolve(__dirname, "ModelsRenderer.jsx");

      // Check if source exists
      if (!fs.existsSync(sourceFile)) {
        console.error(
          chalk.red("❌ Error: ModelsRenderer.jsx not found in package.")
        );
        process.exit(1);
      }

      // Determine output path
      let outputDir = options.output || process.cwd();
      let destFile = path.resolve(outputDir, "ModelsRenderer.jsx");

      // If not using -y flag, ask for confirmation
      if (!options.yes) {
        const answers = await inquirer.prompt([
          {
            type: "input",
            name: "outputPath",
            message: "Where do you want to install the component?",
            default: "./",
            validate: (input) => {
              const fullPath = path.resolve(process.cwd(), input);
              const dir = path.dirname(fullPath);
              if (!fs.existsSync(dir)) {
                return `Directory ${dir} does not exist`;
              }
              return true;
            },
          },
          {
            type: "confirm",
            name: "overwrite",
            message: (answers) => {
              const checkPath = path.resolve(
                process.cwd(),
                answers.outputPath,
                "ModelsRenderer.jsx"
              );
              if (fs.existsSync(checkPath)) {
                return "File already exists. Do you want to overwrite it?";
              }
              return "Continue with installation?";
            },
            default: false,
            when: (answers) => {
              const checkPath = path.resolve(
                process.cwd(),
                answers.outputPath,
                "ModelsRenderer.jsx"
              );
              return fs.existsSync(checkPath);
            },
          },
        ]);

        // Update destination based on user input
        const userPath = path.resolve(process.cwd(), answers.outputPath);
        if (fs.statSync(userPath).isDirectory()) {
          destFile = path.join(userPath, "ModelsRenderer.jsx");
        } else {
          destFile = userPath;
        }

        // Check if user declined overwrite
        if (answers.overwrite === false && fs.existsSync(destFile)) {
          console.log(chalk.yellow("\n⚠️  Installation cancelled."));
          process.exit(0);
        }
      }

      // Check if file exists and we're not overwriting
      if (fs.existsSync(destFile) && !options.yes) {
        console.log(
          chalk.yellow(
            "\n⚠️  ModelsRenderer.jsx already exists. Use --yes to force overwrite."
          )
        );
        process.exit(0);
      }

      // Create directory if it doesn't exist
      const destDir = path.dirname(destFile);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      // Copy the file
      fs.copyFileSync(sourceFile, destFile);

      console.log(chalk.green("\n✅ Success!"));
      console.log(
        chalk.gray(
          `📁 Component installed at: ${path.relative(process.cwd(), destFile)}`
        )
      );
      console.log(chalk.blue("\n📚 Usage:"));
      console.log(
        chalk.gray('   import ModelRenderer from "./ModelsRenderer";\n')
      );
      console.log(chalk.blue("📖 Documentation:"));
      console.log(
        chalk.gray("   https://github.com/HEMA-HEMDAN/3drenderer#readme\n")
      );
    } catch (err) {
      console.error(chalk.red("\n❌ Error:"), err.message);
      process.exit(1);
    }
  });

program.parse();
