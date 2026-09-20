import z from "zod";
import { readValueSchema, searchSectionSchema } from "./toolsSchema.js";

export const tools = [
    {
        type: "function",
        function: {
            name: "search_section",
            description: "Search section titles and text for a keyword. Returns matching section ids and titles.",
            parameters: z.toJSONSchema(searchSectionSchema)

        }
    },
    {
        type: "function",
        function: {
            name: "read_section",
            description: "read the sction with the given id ",
            parameters: z.toJSONSchema(readValueSchema)

        }
    }

]