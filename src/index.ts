import { SystemPrompt, UserPrompt } from "./prompt.js";
import { client, model } from "./client.js";

import { ClaimList } from "./schema.js";
import { fetchPaper } from "./fetchPaper.js";
import { parseSections } from "./parseSection.js";
import { tools } from "./toolDefinition.js";
import { readValueSchema, searchSectionSchema } from "./toolsSchema.js";
import { readSection, searchSection } from "./tools.js";

const html = await fetchPaper("1706.03762")
const sections = parseSections(html)
const messages: any[] = [
  { role: "system", content: SystemPrompt },
  { role: "user", content: "What does the Results section say about BLEU scores?" }
]

function isGrounded(source: string, quote: string) {
    const normalize = (s: string) => s.replace(/\s+/g, " ")
    return normalize(source).includes(normalize(quote))
}

let finalContent: string | null | undefined = null

while (true) {
    const response = await client.chat.completions.create({
        model: model,
        messages: messages,
        tools: tools
    })
    const choice = response.choices[0]
    messages.push(choice?.message)
    if (choice?.finish_reason === "tool_calls") {
        for (const toolCall of choice.message.tool_calls ?? []) {
            if (toolCall.type !== "function") continue
            const parsedArgs = JSON.parse(toolCall.function.arguments)

            let result
            if (toolCall.function.name === "search_section") {
                const parsed = searchSectionSchema.safeParse(parsedArgs)
                result = parsed.success ? searchSection(sections, parsed.data.query) : { error: "bad args" }
            } else if (toolCall.function.name === "read_section") {
                const parsed = readValueSchema.safeParse(parsedArgs)
                result = parsed.success ? readSection(sections, parsed.data.id) : { error: "bad args" }
            } else {
                result = { error: `unknown tool: ${toolCall.function.name}` }
            }
            messages.push({
                role: "tool",
                tool_call_id: toolCall.id,
                content: JSON.stringify(result)
            })
            console.log("ran:", toolCall.function.name, "-> result:", JSON.stringify(result))
        }
    }
    if (choice?.finish_reason !== "tool_calls") {
        finalContent = choice?.message.content
        break
    }
}

if (!finalContent) throw new Error("no final content")

const start = finalContent.indexOf("[")
const end = finalContent.lastIndexOf("]")
const jsonText = finalContent.slice(start, end + 1)
const result = ClaimList.safeParse(JSON.parse(jsonText))

if (!result.success) {
    console.log("Validation failed:", result.error)
} else {
    for (const claim of result.data) {
        const section = sections.find((s) => s.id === claim.sectionId)
        const grounded = section ? isGrounded(section.text, claim.quote) : false
        console.log(claim.claim, "-> verified:", grounded, section ? "" : "(section not found)")
    }
}
