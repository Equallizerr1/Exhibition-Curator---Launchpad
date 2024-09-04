export const getAllArtworks = async () => {
    const url = 'https://api.artic.edu/api/v1/artworks'
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json()
        console.log(json)
    } catch (error) {
        console.log(error.message)
    }
}
