import { MessageType } from "../types/messageType";
import { MessageEmbed } from "discord.js";

export = {
  name: "ping",
  description: "Sends pong as a message",
  execute(message: MessageType, args: string) {
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
