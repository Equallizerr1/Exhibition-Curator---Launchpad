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
        <div className="col-span-4 col-start-1 grid grid-cols-3 gap-5 p-3">
            <div className="col-span-4 col-start-1 w-96">
                <ArtworkDetails artwork={artwork}></ArtworkDetails>
                <Button
                    variant={'outline'}
                    onClick={() => onAddToCollection(artwork)}
                >
                    Add to Collection
                </Button>
            </div>
        </div>
    )
}

export default ArtworkCard
