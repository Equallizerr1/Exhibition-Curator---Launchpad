import React from 'react'
import { Button } from './ui/button'

interface ArtworkCollectionProps {
    collection: any[]
    onRemove: (id: number) => void
}

const ArtworkCollection: React.FC<ArtworkCollectionProps> = ({
    collection,
    onRemove,
}) => {
    return (
        <div className="artwork-collection">
            <h2>My Collection</h2>
            <ul>
                {collection.map((artwork) => (
                    <li key={artwork.id}>
                        <span>{artwork.title}</span>
                        <Button
                            size={'sm'}
                            onClick={() => onRemove(artwork.id)}
                        >
                            Remove
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ArtworkCollection
