import { Artwork } from '@/pages/Artic'
import React from 'react'

interface ArtworkDetailsProps {
    artwork: Artwork
}
const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({ artwork }) => {
    return (
        <>
            <div className="col-span-4 col-start-2 grid grid-cols-3 gap-4">
                <div className="col-span-4 col-start-2 w-96">
                    <>
                        {artwork.id === null ? (
                            <img
                                src="../src/assets/imagenotfound.png"
                                //alt={artwork.thumbnail.alt_text}
                            ></img>
                        ) : (
                            <>
                                <img
                                    src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                                    //alt={artwork.thumbnail.alt_text}
                                />

                                <br />
                                <h2>{artwork.title}</h2>
                                <p>{artwork.artist_display}</p>
                                <p>{artwork.date_display}</p>
                                <p>{artwork.medium_display}</p>
                            </>
                        )}
                    </>
                </div>
            </div>
        </>
    )
}

export default ArtworkDetails
