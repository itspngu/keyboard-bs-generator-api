import { verifyKey } from "discord-interactions";
import {
    APIInteraction,
    InteractionType,
    InteractionResponseType,
    APIInteractionResponse,
} from "discord-api-types/payloads/v8/interactions";

import { generateBullshit } from "./bullshit";

export async function handleInteraction(
    interaction: APIInteraction
): Promise<APIInteractionResponse> {
    if (interaction.type === InteractionType.Ping) {
        // ACK ping with pong
        return {
            type: InteractionResponseType.Pong,
        };
    } else if (interaction.type === InteractionType.ApplicationCommand) {
        // Sanitize input - make sure we got some kind of command data in the payload
        if (!interaction.data) {
            throw new Error("No interaction data passed");
        }

        // Also make sure it's the correct command
        if (interaction.data.name === "bullshit") {
            const bullshit = generateBullshit();
            return {
                type: InteractionResponseType.ChannelMessageWithSource,
                data: {
                    content: bullshit.phrase,
                },
            };
        } else {
            throw new Error("Invalid interaction");
        }
    } else {
        throw new Error("Invalid interaction type");
    }
}

export async function parseRequest(req: Request): Promise<APIInteraction> {
    // Sanitize request
    if (req.headers.get("Content-Type") !== "application/json") {
        throw new Error(
            "Invalid request; Content-Type header needs to be application/json"
        );
    }

    // Ensure proper configuration
    const discord_pubkey = process.env.DISCORD_CLIENT_PUBKEY;
    if (!discord_pubkey) {
        throw new Error(
            "Missing client credentials on worker, check your configuration"
        );
    }

    // Ensure PSK headers are present
    const signature = req.headers.get("X-Signature-Ed25519");
    const timestamp = req.headers.get("X-Signature-Timestamp");
    if (!signature || !timestamp) {
        throw new Error("Invalid request; missing X-Signature header(s)");
    }

    return req
        .text()
        .then((rawBody) => {
            if (
                // Validate PSK - Discord regularly and intentionally sends malformed requests
                // and will flag the slash command as invalid if not handled appropriately.
                !verifyKey(rawBody, signature, timestamp, discord_pubkey)
            ) {
                throw new Error("Bad request signature");
            }
            return JSON.parse(rawBody);
        })
        .catch((err) => {
            throw err;
        });
}
