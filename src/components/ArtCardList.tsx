import { useState, useEffect } from 'react'
import { getAllArtworks } from '../../utils/api'
import { List } from '@mui/joy'
import ArtCard from './ArtCard'

export default function ArtCardList() {
    const [artworks, setArtworks] = useState([])

    useEffect(() => {
        ;(async () => {
            return setArtworks(await getAllArtworks())
        })()
    }, [])

    // console.log(artworks)
    return (
        <>
            <div className="flex justify-center bg-primary text-left">
                <List>
                    <>
                        {artworks.map((artwork) => (
                            <ArtCard props={artwork} />
                        ))}
                    </>
                </List>
            </div>
        </>
    )
}
