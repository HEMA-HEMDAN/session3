#!/usr/bin/env node

// The package's sole purpose is to install the model file via postinstall.
// All previous CLI logic is preserved below but fully commented out (not removed).

// import { Command } from "commander";
// import inquirer from "inquirer";
// import fs from "fs";
//
// const program = new Command();
// const filePhat = "answers.json";
// program
//   .name("mycli")
//   .description("CLI tool using commander and inquirer")
//   .version("1.1.0");
//
// program
//   .command("greet")
//   .alias("g")
//   .description("Ask for your name and greet you")
//   .action(() => {
//     inquirer
//       .prompt([
//         {
//           type: "input",
//           name: "username",
//           message: "What is your name?",
//         },
//         {
//           type: "list",
//           name: "mood",
//           message: "How are you feeling today?",
//           choices: ["Happy", "Sad", "Excited", "Tired"],
//         },
//       ])
//       .then((answers) => {
//         if (fs.existsSync(filePhat)) {
//           fs.readFile(filePhat, "utf-8", (err, fileContent) => {
//             if (err) {
//               console.log("error", err);
//               process.exit();
//             }
//             if (!fileContent) {
//               fileContent = "[]";
//             }
//             const data = JSON.parse(fileContent);
//             const found = data.find((u) => u.username === answers.username);
//             if (found) {
//               found.mood = answers.mood;
//             } else {
//               data.push(answers);
//             }
//
//             fs.writeFile(filePhat, JSON.stringify(data), "utf-8", () => {
//               console.log("added");
//             });
//           });
//         } else {
//           fs.writeFile(filePhat, JSON.stringify([answers]), "utf-8", () => {
//             console.log("added");
//           });
//         }
//       });
//   });
// program
//   .command("list")
//   .alias("l")
//   .description("List all users")
//   .action(() => {
//     fs.readFile(filePhat, "utf-8", (err, fileContent) => {
//       if (err) {
//         console.log("error", err);
//         process.exit();
//       }
//       if (!fileContent) {
//         fileContent = "[]";
//       }
//       const data = JSON.parse(fileContent);
//       console.table(data);
//     });
//   });
//
// program.parse(process.argv);
