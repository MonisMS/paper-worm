
import type { Section } from "./section.js"

export function searchSection(sections: Section[], query: string): { id: string, title: string }[] {
    const searchValue = sections.filter((section) => (section.title.toLowerCase().includes(query.toLowerCase()) || section.text.toLowerCase().includes(query.toLowerCase())))
        .map((section) => ({
            id: section.id, title: section.title
        }))
        return searchValue
} 

export function readSection(sections: Section[],id:string): string{
    const readValue = sections.find((section) => (section.id === id ))
    if (readValue === undefined ){
        return `no section with id ${id}`
    }
    else {
        return readValue.text
    }
}