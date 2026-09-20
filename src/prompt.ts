import { stringText } from "./source.js";

export const SystemPrompt = `Here is a passage from a paper. Give me exactly 3 claims made in it. For each claim, include the exact quote from the passage it's based on. Format as JSON: an array of {claim, quote,sectionId}
${stringText}`