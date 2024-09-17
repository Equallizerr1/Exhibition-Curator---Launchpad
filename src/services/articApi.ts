import axios from 'axios'

const ARTIC_URL = 'https://api.artic.edu/api/v1/artworks'

// Function to fetch artworks for a specific page
export const fetchArtworksArtic = async (page: number = 1, limit: any) => {
    try {
        const response = await axios.get(`${ARTIC_URL}`, {
            params: { page, limit },
        })
        return response.data // Axios automatically parses the response as JSON
    } catch (error) {
        console.error('Error fetching artworks:', error)
        return null
    }
}

// Function to search for artworks based on a query
export const fetchArtworksSearchArtic = async (query: string) => {
    try {
        const response = await axios.get(`${ARTIC_URL}/search`, {
            params: { q: query },
        })
        const artworkIds = response.data.data.map(
            (artworkData: { id: any }) => {
                return artworkData.id
            }
        )
        return artworkIds
    } catch (error) {
        console.error('Error searching for artworks:', error)
        return null
    }
}

export const fetchArtworkImagesArtic = async (artworkIds: any[]) => {
    try {
        const responseArr = []
        for (let i = 0; i < artworkIds.length; i++) {
            const { data } = await axios.get(`${ARTIC_URL}/${artworkIds[i]}`)
            responseArr.push(data.data)
        }
        return responseArr
    } catch (error) {
        console.error('Error fetching artworks:', error)
        return null
    }
}
