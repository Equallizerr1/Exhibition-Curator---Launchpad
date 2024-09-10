import React, { useState, useEffect } from 'react'
import { fetchArtworks, fetchArtworksSearch } from '../services/artApi'
import ArtworkCard from '../components/ArtworkCard'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'

interface HomeProps {
    addToCollection: (artwork: any) => void
}

const Home: React.FC<HomeProps> = ({ addToCollection }) => {
    const [artworks, setArtworks] = useState<any[]>([])
    const [query, setQuery] = useState('')

    // Function to fetch artworks based on the query
    const searchArtworks = async () => {
        const data = await fetchArtworksSearch(query)
        if (data) setArtworks(data.data)
    }

    // Fetch artworks whenever the search query changes
    useEffect(() => {
        if (query) {
            searchArtworks()
        }
    }, [query])

    useEffect(() => {
        fetchArtworks().then((data) => {
            if (data) setArtworks(data.data)
        })
    }, [query])

    console.log(artworks)
    return (
        <body>
            <div className="bg-background">
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search artworks..."
                />
                <div className="artwork-grid">
                    {artworks.map((artwork) => (
                        <ArtworkCard
                            key={artwork.id}
                            artwork={artwork}
                            onAddToCollection={addToCollection}
                        />
                    ))}
                </div>
                <Link to="/exhibition">
                    <button>Go to My Exhibition</button>
                </Link>
            </div>
        </body>
    )
}

export default Home
