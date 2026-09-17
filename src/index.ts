;
import { SystemPrompt } from "./prompt.js";
import { client, model } from "./client.js";
import { log } from "console";
import { callbackify } from "util";
import { stringText } from "./source.js";
import { sourceMapsEnabled } from "process";

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


const claims = JSON.parse(raw)


for(const claim of claims){
    if(claim){
        console.log(isGrounded(stringText,claim.quote))
    }
}