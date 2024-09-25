// Artic.tsx
import React, { useState, useEffect } from 'react'
import {
    fetchArtworksArtic,
    fetchArtworksSearchArtic,
    fetchArtworkImagesArtic,
} from '../services/articApi'
import ArtworkCard from '../components/ArtworkCard'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchForm } from '@/components/SearchForm'

export interface ArticProps {
    addToCollection: (artwork: Array<[]>) => void
}

export interface Artwork {
    image_id: number
    thumbnail: {
        alt_text: string
    }
    id: number
    title: string
    image_url: string
    artist_display: string
    date_display: number
    medium_display: string
}

export const Artic: React.FC<ArticProps> = ({ addToCollection }) => {
    const [artworks, setArtworks] = useState<Artwork[]>([])
    const [limit, setLimit] = useState<any>()
    const [artworkIds, setArtworkIds] = useState<number[]>([])
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        nextPage: 2,
        prevPage: 0,
    })
    const [nextPageData, setNextPageData] = useState<Artwork[]>([])
    const [searchedArt, setSearchedArt] = useState<Artwork[]>([])

    const [sortOption, setSortOption] = useState<string>('title')
    const [filterArtist, setFilterArtist] = useState<string>('')
    const [filterMedium, setFilterMedium] = useState<string>('')

    const searchArtworks = async ({ artistId }: { artistId: string }) => {
        const data = await fetchArtworksSearchArtic(artistId)
        if (data) setArtworkIds(data)
    }

    const loadArtworks = async (page: number = 1) => {
        const data = await fetchArtworksArtic(page, limit)
        if (data) {
            setArtworks(data.data)
            setPagination({
                currentPage: page,
                totalPages: data.pagination.total_pages,
                nextPage: data.pagination.next_url,
                prevPage: data.pagination.prev_url,
            })
            if (data.pagination.next_url) {
                preloadNextPage(data.pagination.current_page + 1)
            }
        }
    }

    useEffect(() => {
        loadArtworks(pagination.currentPage)
    }, [limit])

    const preloadNextPage = async (nextUrl: number) => {
        const nextPageData = await fetchArtworksArtic(nextUrl, limit)
        if (nextPageData) {
            setNextPageData(nextPageData.data)
        }
    }

    const handleNextPage = () => {
        if (nextPageData.length > 0) {
            setArtworks(nextPageData)
            setPagination((prev) => ({
                ...prev,
                currentPage: prev.currentPage + 1,
                prevPage: prev.currentPage,
            }))
            setNextPageData([])
        } else if (pagination.nextPage) {
            loadArtworks(pagination.currentPage + 1)
        }
    }

    const handlePreviousPage = () => {
        if (pagination.prevPage) {
            loadArtworks(pagination.currentPage - 1)
        }
    }

    const filteredAndSortedArtworks = artworks
        .filter((artwork) => {
            return (
                (!filterArtist ||
                    artwork.artist_display
                        .toLowerCase()
                        .includes(filterArtist.toLowerCase())) &&
                (!filterMedium ||
                    artwork.medium_display
                        .toLowerCase()
                        .includes(filterMedium.toLowerCase()))
            )
        })
        .sort((a, b) => {
            if (sortOption === 'title') return a.title.localeCompare(b.title)
            if (sortOption === 'artist')
                return a.artist_display.localeCompare(b.artist_display)
            if (sortOption === 'date') return a.date_display - b.date_display
            return 0
        })

    useEffect(() => {
        fetchArtworkImagesArtic(artworkIds).then((data: Artwork[] | null) => {
            if (data) {
                setSearchedArt(data)
            }
        })
    }, [artworkIds])

    return (
        <>
            <h1>Art Institute of Chicago</h1>

            <SearchForm
                onSubmit={searchArtworks}
                setLimit={setLimit}
                limit={limit}
            />

            {/* Sorting and filtering controls */}
            <div className="mt-4 flex space-x-4">
                <Input
                    placeholder="Filter by Artist"
                    value={filterArtist}
                    onChange={(e) => setFilterArtist(e.target.value)}
                />
                <Input
                    placeholder="Filter by Medium"
                    value={filterMedium}
                    onChange={(e) => setFilterMedium(e.target.value)}
                />
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="title">Sort by Title</option>
                    <option value="artist">Sort by Artist</option>
                    <option value="date">Sort by Date</option>
                </select>
            </div>

            {artworks.length == 0 ? (
                <p>loading</p>
            ) : (
                <>
                    <div className="bg-surface p-5 py-3">
                        {searchedArt.length > 0
                            ? searchedArt.map((artwork) => (
                                  <ArtworkCard
                                      key={artwork.id}
                                      artwork={artwork}
                                      onAddToCollection={addToCollection}
                                  />
                              ))
                            : filteredAndSortedArtworks.map((artwork) => (
                                  <ArtworkCard
                                      key={artwork.id}
                                      artwork={artwork}
                                      onAddToCollection={addToCollection}
                                  />
                              ))}
                    </div>
                    <div className="mt-4 flex justify-center space-x-4">
                        <Button
                            onClick={handlePreviousPage}
                            disabled={!pagination.prevPage}
                        >
                            Previous
                        </Button>
                        <span className="self-center">
                            Page {pagination.currentPage} of{' '}
                            {pagination.totalPages}
                        </span>
                        <Button
                            onClick={handleNextPage}
                            disabled={!pagination.nextPage}
                        >
                            Next
                        </Button>
                    </div>
                    <Link to="/exhibition">
                        <Button>Go to My Exhibition</Button>
                    </Link>
                </>
            )}
        </>
    )
}
