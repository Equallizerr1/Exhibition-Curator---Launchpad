import axios from 'axios'

const BASE_URL = 'https://api.artic.edu/api/v1/artworks'

// Function to fetch artworks for a specific page
export const fetchArtworks = async (page: number = 1, limit: number) => {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: { page, limit },
        })
        return response.data // Axios automatically parses the response as JSON
    } catch (error) {
        console.error('Error fetching artworks:', error)
        return null
    }
}

// Function to search for artworks based on a query
export const fetchArtworksSearch = async (query: string) => {
    try {
        const response = await axios.get(
            `https://api.artic.edu/api/v1/artworks/search`,
            {
                params: { q: query },
            }
        )
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

export const fetchArtworkImages = async (artworkIds: any[]) => {
    try {
        const responseArr = []
        for (let i = 0; i < artworkIds.length; i++) {
            const { data } = await axios.get(`${BASE_URL}/${artworkIds[i]}`)
            responseArr.push(data.data)
        }
        return responseArr
    } catch (error) {
        console.error('Error fetching artworks:', error)
        return null
    }
}
