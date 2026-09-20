import { fetchPaper } from "./fetchPaper.js";
import { parseSections } from "./parseSection.js";

const html = await fetchPaper("1706.03762");
const sections = parseSections(html);

console.log("total sections:", sections.length);
for (const s of sections) {
    console.log(s.id, "-", s.title, "-", s.text.length, "chars");
}