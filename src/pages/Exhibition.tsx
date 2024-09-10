import React from 'react'
import ArtworkCollection from '../components/ArtworkCollection'

interface ExhibitionProps {
    collection: any[]
    onRemove: (id: number) => void
}

const Exhibition: React.FC<ExhibitionProps> = ({ collection, onRemove }) => {
    return (
        <div className="exhibition">
            <h1>Your Exhibition</h1>
            <ArtworkCollection collection={collection} onRemove={onRemove} />
        </div>
    )
}

export default Exhibition
