// @ts-expect-error
import { intros, adverbs, verbs, adjectives, nouns } from "../buzzwords.yml";

function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

async function handleRequest(req: Request): Promise<Response> {
    const random_intro = intros[Math.floor(Math.random() * intros.length)];
    const random_adverb = adverbs[Math.floor(Math.random() * adverbs.length)];
    const random_verb = verbs[Math.floor(Math.random() * verbs.length)];
    const random_adjective =
        adjectives[Math.floor(Math.random() * adjectives.length)];
    const random_noun = nouns[Math.floor(Math.random() * nouns.length)];

    const phrase = toTitleCase(
        `${random_intro} ${random_adverb} ${random_verb} ${random_adjective} ${random_noun}`
    );

    return new Response(JSON.stringify({ phrase: phrase }), {
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
    });
}

addEventListener("fetch", async (event) => {
    event.respondWith(handleRequest(event.request));
});
