#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import fs from "fs";
import { execSync } from "child_process";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let botName;

async function welcome() {
  const msg = `Create Discord.js Bot`;
  const author = chalkAnimation.neon("Made with ❤️ by @ctnkaan\n");

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    author.start();
  });

  await sleep(2000);
  author.stop();
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "bot_name",
    type: "input",
    message: "What is your bots name?",
    default() {
      return "Discord Bot";
    },
  });

  botName = answers.bot_name;
}

async function language() {
  const answers = await inquirer.prompt({
    name: "language",
    type: "list",
    message: "Which language would you like to use?",
    choices: ["JavaScript", "TypeScript"],
  });

  return handleAnswer(answers.language == "JavaScript");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Genereting...").start();
  await sleep(2000);

  //Create file
  fs.mkdir(`./${botName}`, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });

  //install npm packages
  const output = execSync(`cd ${botName} && npm init -y && npm i discord.js`, {
    encoding: "utf-8",
  });
  console.log(output);

  fs.copyFile("./templates/server.js", `./${botName}`, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });

  chalkAnimation.karaoke("Successfully created bot!").start();
  chalkAnimation.karaoke("Enjoy!").start();

  await sleep(2000);

  if (isCorrect) {
    spinner.success({ text: `Generated ${botName} as JavaScript Template` });
  } else {
    spinner.success({ text: `Generated ${botName} as TypeScript Template` });
  }
}

await welcome();
await askName();
await language();
