import axios from 'axios'

const BASE_URL = 'https://api.artic.edu/api/v1/artworks'

export const fetchArtworks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`)
        return response.data
    } catch (error) {
        console.error('Error fetching artworks:', error)
        return null
    }
}

export const fetchArtworksSearch = async (query: string) => {
    try {
        const response = await fetch(
            //go here to get artwork data
            `https://api.artic.edu/api/v1/artworks/search?q=${query}`
        )
        const data = await response.json()
        // then go here to get data of those artworks - map through return data
        // const response2 = `https://api.artic.edu/api/v1/artworks/${data}`

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
        // console.log(artworkIds)
        for (let i = 0; i < artworkIds.length; i++) {
            const { data } = await axios.get(`${BASE_URL}/${artworkIds[i]}`)
            responseArr.push(data.data)
            // console.log(responseArr)
        }
        return responseArr
    } catch (error) {
        console.error('Error fetching artworks:', error)
        return null
    }
}
