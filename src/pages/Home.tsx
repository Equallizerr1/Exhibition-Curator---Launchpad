'use client'
import React, { useState, useEffect } from 'react'
import {
    fetchArtworks,
    fetchArtworksSearch,
    fetchArtworkImages,
} from '../services/artApi'
import ArtworkCard from '../components/ArtworkCard'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'

interface HomeProps {
    addToCollection: (artwork: any) => void
}

const Home: React.FC<HomeProps> = ({ addToCollection }) => {
    const [artworks, setArtworks] = useState<any[]>([])
    const [artworkIds, setArtworkIds] = useState<any[]>([])
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        nextPage: 2,
        prevPage: 0,
    })
    const [nextPageData, setNextPageData] = useState<any[]>([])
    const tempArt: React.SetStateAction<any[]> = []
    const [searchedArt, setSearchedArt] = useState<any[]>([])

    // Function to fetch artworks based on the query
    const searchArtworks = async (artistId: string) => {
        const data = await fetchArtworksSearch(artistId)
        if (data) setArtworkIds(data)
    }

    // Function to fetch artworks based on the page
    const loadArtworks = async (page: number = 1) => {
        const data = await fetchArtworks(page)
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

    // Fetch initial artworks on mount
    useEffect(() => {
        loadArtworks(pagination.currentPage)
    }, [])

    // Preload the next page data
    const preloadNextPage = async (nextUrl: number) => {
        const nextPageData = await fetchArtworks(nextUrl)
        if (nextPageData) {
            setNextPageData(nextPageData.data)
        }
    }

    // Pagination buttons
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

    useEffect(() => {
        fetchArtworkImages(artworkIds).then((data) => {
            tempArt.push(data)
            setSearchedArt(tempArt.flat())
        })
    }, [artworkIds])

    const FormSchema = z.object({
        artistId: z.string().min(2, {
            message: 'Artist name must be at least 2 characters.',
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            artistId: '',
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        searchArtworks(data.artistId)
    }

    return (
        <>
            <div className="bg-background">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-2/3 space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="artistId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Search for Artwork"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                        <Button
                            type="button"
                            onClick={() => window.location.reload()}
                        >
                            Reset
                        </Button>
                    </form>
                </Form>
            </div>

            <div className="bg-background">
                <div>
                    {searchedArt.length > 0
                        ? // Render searched artworks
                        searchedArt.map((artwork) => (
                              <ArtworkCard
                                  key={artwork.id}
                                  artwork={artwork}
                                  onAddToCollection={addToCollection}
                              />
                          ))
                        : // Render artworks from initial load
                          artworks.map((artwork) => (
                              <ArtworkCard
                                  key={artwork.id}
                                  artwork={artwork}
                                  onAddToCollection={addToCollection}
                              />
                          ))}
                </div>

                {/* Pagination Controls */}
                <div className="mt-4 flex justify-center space-x-4">
                    <Button
                        onClick={handlePreviousPage}
                        disabled={!pagination.prevPage}
                    >
                        Previous
                    </Button>
                    <span className="self-center">
                        Page {pagination.currentPage} of {pagination.totalPages}
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
            </div>
        </>
    )
}

export default Home
