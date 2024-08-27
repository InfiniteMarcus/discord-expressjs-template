import {
  APIInteraction,
  InteractionResponseType,
  InteractionType,
} from 'discord.js';
import express from 'express';

const discordRouter = express.Router();

discordRouter.post('/interactions', async (req, res) => {
  console.log(`Request received [${new Date().toISOString()}]`);

  try {
    const interaction = req.body as APIInteraction;

    if (interaction.type === InteractionType.Ping) {
      return res.status(200).json({
        type: InteractionResponseType.Pong,
      });
    }

    console.log(`Interaction type received: [${interaction.type}]`);

    if (
      interaction.type === InteractionType.ApplicationCommand &&
      interaction.data.name === 'ping'
    ) {
      return res.status(200).json({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: 'Pong!',
        },
      });
    }

    return res.status(200).json({
      type: InteractionResponseType.DeferredMessageUpdate,
    });
  } catch (error) {
    console.error(error);
  }
});

export default discordRouter;
