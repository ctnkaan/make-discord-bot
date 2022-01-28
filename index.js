#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import fse from "fs-extra";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const __userDirname = process.cwd();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let botName;

async function welcome() {
  const author = chalkAnimation.pulse("<> with ❤️ by Çetin Kaan Taşkıngenç\n");

  figlet(`Make Discord Bot`, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    author.start();
  });

  await sleep(2500);
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

async function handleAnswer(isJavaScript) {
  const spinner = createSpinner("Generating...").start();
  await sleep(2000);

  //Create file
  fse.mkdir(`./${botName}`, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });

  if (isJavaScript) {
    fse.copy(
      `${__dirname}/templates/javascript`,
      `${__userDirname}/${botName}`,
      (err) => {
        if (err) return console.error(err);
      }
    );

    await sleep(1000);

    //install npm packages
    const output = execSync(`cd ${botName} && npm install`, {
      encoding: "utf-8",
    });
    console.log(output);

    await sleep(2000);

    spinner.success({ text: `Generated ${botName} as JavaScript Template` });
  } else {
    fse.copy(
      `${__dirname}/templates/typescript`,
      `${__userDirname}/${botName}`,
      (err) => {
        if (err) return console.error(err);
      }
    );

    await sleep(1000);

    //install npm packages
    const output = execSync(`cd ${botName} && npm install`, {
      encoding: "utf-8",
    });
    console.log(output);

    await sleep(2000);
    spinner.success({ text: `Generated ${botName} as TypeScript Template` });
  }

  console.log(
    chalk.bgBlue(`You can start working on your project by typing\n`)
  );

  console.log(chalk.bgMagenta(`cd ${botName}`));
  console.log(chalk.bgMagenta(`rename dotenv to .env`));
  console.log(chalk.bgMagenta(`nodemon dev\n`));

  const success = chalkAnimation.karaoke(`Happy Coding!`).start();

  await sleep(3000);

  success.stop();
}

await welcome();
await askName();
await language();
