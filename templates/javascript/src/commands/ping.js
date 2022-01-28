import { MessageEmbed } from "discord.js";

export const Ping = {
  name: "ping",
  description: "Sends pong as a message",
  callback(message, args) {
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Ping Command")
      .setURL("")
      .addFields({
        name: "Pong!",
        value: "It's working!",
      })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
