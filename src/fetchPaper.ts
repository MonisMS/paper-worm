

export async function fetchPaper(arxivId:string):Promise<string> {
    const url= `https://arxiv.org/html/${arxivId}`
   try {
    const response = await fetch(url)
    if(response.ok){
        const text = await response.text()
        return text
    }else {
        throw new Error (`arxiv id failed for ${arxivId} : status ${response.status}`)
    }
   } catch (error) {
    throw new Error(`network error fetching arxiv paper ${arxivId}: ${error}`)
   }
}

