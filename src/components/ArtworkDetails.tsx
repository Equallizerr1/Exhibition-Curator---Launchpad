import React from 'react'

interface ArtworkDetailsProps {
    artwork: any
}
// flex items-center justify-center
const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({ artwork }) => {
    return (
        <>
            <div className="col-span-4 col-start-2 grid grid-cols-3 gap-4">
                <div className="col-span-4 col-start-2 w-96">
                    <img
                        src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                        alt={artwork.thumbnail.alt_text}
                    />
                    <br />
                    <h2>{artwork.title}</h2>
                    <p>{artwork.artist_display}</p>
                    <p>{artwork.date_display}</p>
                    <p>{artwork.medium_display}</p>
                </div>
            </div>
        </>
    )
}

export default ArtworkDetails
