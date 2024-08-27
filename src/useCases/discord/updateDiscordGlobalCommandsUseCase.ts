import {
  APIApplicationCommand,
  REST,
  Routes,
  SlashCommandBuilder,
} from 'discord.js';

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping test command')
    .setDMPermission(false),
];

const TOKEN = String(process.env.DISCORD_APPLICATION_TOKEN);
const CLIENT_ID = String(process.env.DISCORD_APPLICATION_ID);

export const updateDiscordGlobalCommands = async () => {
  try {
    const rest = new REST().setToken(TOKEN);
    console.log(
      `Started refreshing [${commands.length}] application (/) commands.`,
    );

    const data = (await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    })) as APIApplicationCommand[];

    console.log(
      `Successfully reloaded [${data.length}] application (/) commands.`,
    );
  } catch (error) {
    console.error(error);
  }
};
