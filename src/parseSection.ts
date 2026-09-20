import * as cheerio from "cheerio";
import type { Section } from "./section.js";

export function parseSections(html: string): Section[] {
    const $ = cheerio.load(html);
    const sections: Section[] = [];

    const abstract = $("div.ltx_abstract");
    if (abstract.length > 0) {
        sections.push({
            id: "abstract",
            title: "Abstract",
            text: abstract.text().trim(),
        });
    }

    $("section.ltx_section").each((i, el) => {
        const id = $(el).attr("id") ?? `section-${i}`;
        const title = $(el).find("h2.ltx_title").first().text().trim();
        const text = $(el).text().trim();
        sections.push({ id, title, text });
    });

    return sections;
}