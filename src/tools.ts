
import type { Section } from "./section.js"

export function searchSection(sections: Section[], query: string): { id: string, title: string }[] {
    const words = query.toLowerCase().split(/\s+/)

    const searchValue = sections.filter((section) => {
        const titleLower = section.title.toLowerCase()
        const textLower = section.text.toLowerCase()
        return words.some((word) => titleLower.includes(word) || textLower.includes(word))
    })
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