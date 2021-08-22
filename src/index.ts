// @ts-expect-error
import { adverbs, verbs, adjectives, nouns } from "../buzzwords.yml";

function randomarray(a: Array<string>) {
    var i;
    for (i = a.length; i--; ) {
        var j = Math.floor((i + 1) * Math.random());
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    return a;
}

function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function buzzword() {
    const rnd_adjectives = randomarray(adjectives);
    const rnd_nouns = randomarray(nouns);
    const rnd_adverbs = randomarray(adverbs);
    const rnd_verbs = randomarray(verbs);

    let statement = rnd_adverbs[rnd_adverbs.length - 1];
    rnd_adverbs.length -= 1;
    statement = statement + " " + rnd_verbs[rnd_verbs.length - 1];
    rnd_verbs.length -= 1;
    statement = statement + " " + rnd_adjectives[rnd_adjectives.length - 1];
    rnd_adjectives.length -= 1;
    statement = statement + " " + rnd_nouns[rnd_nouns.length - 1];
    rnd_nouns.length -= 1;

    return toTitleCase(statement);
}

async function handleRequest(req: Request): Promise<Response> {
    return new Response(JSON.stringify({ phrase: buzzword() }), {
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
    });
}

addEventListener("fetch", async (event) => {
    event.respondWith(handleRequest(event.request));
});
