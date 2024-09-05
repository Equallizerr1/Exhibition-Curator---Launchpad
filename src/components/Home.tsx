import { useEffect, useState } from 'react'
import DrawerScrollable from './DrawerScrollable'
import ArtCardList from './ArtCardList'
import { getAllArtworks } from '../../utils/api'

export interface ArtworkProps {
    [x: string]: any
    id: number
    artist_title: string
    date_display: number
    title: string
    image_id: number
    thumbnail: {
        alt_text: string
    }
    alt_text: string
}

function Home() {
    const [artworks, setArtworks] = useState([])
    const [artworkIds, setArtworkIds] = useState([])

    useEffect(() => {
        ;(async () => {
            return setArtworks(await getAllArtworks())
        })()
    }, [])

    return (
        <>
            <div className="flex h-48 items-center bg-background">
                <h1 className="text-3xl font-bold text-text underline">Home</h1>
                <DrawerScrollable />
            </div>
            <div className="h-24 bg-primary">
                <ArtCardList props={artworks} />
            </div>
        </>
    )
}

export default Home
