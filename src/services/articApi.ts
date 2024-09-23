import axios from 'axios'

const ARTIC_URL = 'https://api.artic.edu/api/v1/artworks'
const VA_URL =
    'https://api.vam.ac.uk/v2/objects/clusters/category/search?cluster_size=25'

// Function to fetch artworks for a specific page
export const fetchArtworksArtic = async (page: number = 1, limit: any) => {
    try {
        const response = await axios.get(`${ARTIC_URL}`, {
            params: { page, limit },
        })
        return response.data
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

export const fetchVaData = async () => {
    try {
        const response = await axios.get(VA_URL, {
            headers: {
                Accept: 'application/json',
            },
        })

        return response.data
    } catch (error) {
        console.error('Error fetching artworks:', error)
        return null
    }
}

export const fetchVaCategory = async (category: string) => {
    try {
        const response = await axios.get(
            `https://api.vam.ac.uk/v2/objects/search?id_category=${category}`
        )
        return response.data
    } catch (error) {}
}
