// @ts-expect-error
import { actors, adverbs, verbs, adjectives, nouns } from "../buzzwords.yml";

/**
 * Transforms input string into title-cased output
 * @param str
 * @returns string
 */
function toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

/**
 * Actions are defined here cause they're not very buzzy.
 */
const actions = [
    "will",
    "won't",
    "should",
    "shouldn't",
    "would",
    "wouldn't",
    "could",
    "couldn't",
];

/**
 * Bullshit interface
 */
interface Bullshit {
    phrase: string;
}

/**
 * Picks out random phrase components and concatenates them into a phrase
 * @returns Bullshit
 */
export function generateBullshit(): Bullshit {
    const actor = actors[Math.floor(Math.random() * actors.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const adverb = adverbs[Math.floor(Math.random() * adverbs.length)];
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    return {
        phrase: toTitleCase(
            `${actor} ${action} ${adverb} ${verb} ${adjective} ${noun}`
        ),
    };
}

export default generateBullshit;
