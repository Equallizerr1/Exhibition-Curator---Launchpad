import React from 'react'
import { Button } from './ui/button'
import ArtworkDetails from './ArtworkDetails'

interface ArtworkCardProps {
    artwork: any
    onAddToCollection: (artwork: any) => void
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
    artwork,
    onAddToCollection,
}) => {
    return (
        <div className="bg-surface">
            <ArtworkDetails artwork={artwork}></ArtworkDetails>
            <Button
                variant={'outline'}
                onClick={() => onAddToCollection(artwork)}
            >
                Add to Collection
            </Button>
        </div>
    )
}

export default ArtworkCard
