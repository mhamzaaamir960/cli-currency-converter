#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import showBanner from "node-banner"
import promptSync from 'prompt-sync';
const prompt = promptSync();


const input = prompt(chalk.magenta.italic("What is your name: "));
(async (input:string) => {
      showBanner('Currency Converter', chalk.bold(`\tWelcome ${input}!\n`));
})(input);

async function currency_converter () {
let api_link = "https://v6.exchangerate-api.com/v6/8f156ba354d53daffe96d68a/latest/PKR";

let fetch_data = async (data:any) => {
    let $fetch = await fetch(data);
    let res = await $fetch.json();
    return res.conversion_rates;
}
let fetched_data = await fetch_data(api_link);
let currencies =  Object.keys(fetched_data);


let first_currency = await inquirer.prompt({
  type:"list",
  name: "name",
  message: chalk.grey.bold(`Select the Currency which you convert from: `),
  choices: currencies,
});

let amount = await inquirer.prompt({
  type: "number",
  name: "name",
  message: chalk.yellow.bold(`Enter the amount in ${chalk.green.bold(first_currency.name)} : `),
});

let second_currency = await inquirer.prompt({
  type:"list",
  name: "name",
  message: chalk.grey.bold(`Select the Currency from ${chalk.yellowBright.bold(first_currency.name)} to:  `),
  choices: currencies,
});

let api_link2 = `https://v6.exchangerate-api.com/v6/8f156ba354d53daffe96d68a/pair/
${first_currency.name}/${second_currency.name}`;

let $fetch_data = async (data:any) => {
    let $fetch = await fetch(data);
    let res = await $fetch.json();
    return res.conversion_rate * amount.name;
}

let converted_currency = await $fetch_data(api_link2)
console.log(`\n  ${chalk.yellowBright.bold(amount.name)} ${chalk.greenBright.bold(first_currency.name)} \
${chalk.blue.italic(`is equal to`)} ${chalk.yellowBright.bold(converted_currency)} ${chalk.greenBright.bold(second_currency.name)}\n`)
}

async function $restart() {
let restart;
do {
   await currency_converter();
    const res  = await inquirer.prompt({
    type:"input",
    name: "restart",
    message: chalk.cyanBright(`Do you want to restart? ${chalk.yellow`(y/n)`}  `)
  })
  restart = res.restart.toLowerCase();
} while (restart === "y" || restart === "yes")
}
await $restart()




















