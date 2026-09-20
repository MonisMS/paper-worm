
import z from "zod";

export const searchSectionSchema = z.object({
    query: z.string()
})

export const readValueSchema = z.object({
    id:z.string()
})


export type searchSectionSchema = z.infer<typeof searchSectionSchema>
export type readValueSchema = z.infer <typeof readValueSchema>