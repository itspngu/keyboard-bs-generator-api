// @ts-expect-error
import { intros, adverbs, verbs, adjectives, nouns } from "../buzzwords.yml";

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
    const intro = intros[Math.floor(Math.random() * intros.length)];
    const adverb = adverbs[Math.floor(Math.random() * adverbs.length)];
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    return {
        phrase: toTitleCase(`${intro} ${adverb} ${verb} ${adjective} ${noun}`),
    };
}

export default generateBullshit;
