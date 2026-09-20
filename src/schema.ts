import { z } from "zod";
import type { TypeOf } from "zod/v3";
export const Claim = z.object({
    claim : z.string(),
    quote : z.string(),
    sectionId:z.string()
})


export const ClaimList = z.array(Claim)

export type Claim = z.infer<typeof Claim >
export type ClaimList = z.infer<typeof ClaimList> 