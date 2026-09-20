
import { SystemPrompt } from "./prompt.js";
import { client, model } from "./client.js";

import { stringText } from "./source.js";
import { Claim, ClaimList } from "./schema.js";


const response = await client.chat.completions.create({
    model:model,messages:[{role:"user", content:SystemPrompt}]
})

console.log(response.choices[0]?.message.content);


function isGrounded(source:string,quote:string){
   return source.includes(quote)
 
}
const raw = response.choices[0]?.message.content

if(!raw)
    throw new Error("value does not exist")

const trimmed = raw.replace(/^```json\n?/, "").replace(/```$/, "").trim()
const result = ClaimList.safeParse(JSON.parse(trimmed))

if (!result.success) {
    console.log("Validation failed:", result.error)
} else {
    for (const claim of result.data) {
        console.log(isGrounded(stringText, claim.quote))
    }
}

