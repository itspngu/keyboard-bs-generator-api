import { parseRequest, handleInteraction } from "./discord";
import { generateBullshit } from "./bullshit";

/**
 * Generates a JSON Response with proper headers containing a string-ified input object
 * @param obj
 * @returns Promise<Response>
 */
async function respondWithJson(obj: any): Promise<Response> {
    return new Response(JSON.stringify(obj), {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
    });
}

/**
 * Receives a request and responds to it
 * @param req
 * @returns Promise<Response>
 */
async function handleRequest(req: Request): Promise<Response> {
    const url = new URL(req.url);

    if (url.pathname === "/discord") {
        // Handle invocation of a "slash command"
        // ref: https://discord.com/developers/docs/interactions/application-commands
        return parseRequest(req).then(
            (interaction) => {
                return handleInteraction(interaction).then(
                    (interactionResponse) => {
                        // Respond with "discord-formatted" JSON data
                        return respondWithJson(interactionResponse);
                    },
                    (err) => {
                        throw err;
                    }
                );
            },
            (err) => {
                throw err;
            }
        );
    } else if (url.pathname === "/") {
        // Handle regular/bare API call
        return respondWithJson(generateBullshit());
    } else {
        return new Response("Not Found", {
            status: 404,
            statusText: "Not Found",
        });
    }
}

// Register handleRequest() as event listener
addEventListener("fetch", async (event) => {
    event.respondWith(handleRequest(event.request));
});
