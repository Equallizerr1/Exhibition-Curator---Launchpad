import axios from 'axios'

const BASE_URL = 'https://api.artic.edu/api/v1/artworks?page='

export const fetchArtworks = async (page: number = 1) => {
    try {
        const response = await fetch(
            `https://api.artic.edu/api/v1/artworks?page=${page}`
        )
        const data = await response.json()
        //console.log('API Response:', data) // Log API response to inspect pagination data
        return data
    } catch (error) {
        console.error('Error fetching artworks:', error)
        return null
    }
}

export const fetchArtworksSearch = async (query: string) => {
    try {
        const response = await fetch(
            `https://api.artic.edu/api/v1/artworks/search?q=${query}`
        )
        const data = await response.json()

        const artworkIds = data.data.map((artworkData: { id: any }) => {
            return artworkData.id
        })
        return artworkIds
    } catch (error) {
        console.error('Error fetching artworks:', error)
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
