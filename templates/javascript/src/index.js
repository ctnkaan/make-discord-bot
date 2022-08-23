import { Client } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

//commands
import { Ping } from "./commands/ping.js";

const client = new Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILDS",
  ],
});

//Prefix
const prefix = "!";

//create hashmap for imported commands files
const commands = new Map();
commands.set("ping", Ping);

client.on("ready", () => {
  console.log(`I am ready! Logged in as ${client.user.tag}`);
  client.user.setActivity(`${prefix}ping`);
});

//When there is a message in server
client.on("messageCreate", (message) => {
  //Ignore bot messages
  if (message.author.bot) return;

  //If the message does not start with the prefix return
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase();

  //Check if the command exists in the hashmap. It returns undefined if it doesn't exist
  const currCommand = commands.get(command);

  //If the currCommand is not undefined,
  if (currCommand) {
    currCommand.callback(message, args);
  } else {
    message.channel.send(`Command not found! Type ${prefix} help to see all commands`);
  }
});

client.login(process.env.DISCORD_TOKEN);
