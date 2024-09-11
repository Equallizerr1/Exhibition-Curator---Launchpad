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
    const tempArt: React.SetStateAction<any[]> = []

    // Function to fetch artworks based on the query
    const searchArtworks = async (artistId: string) => {
        console.log(artistId)
        const data = await fetchArtworksSearch(artistId)
        if (data) setArtworkIds(data)
    }
    //gets initial images from API
    useEffect(() => {
        fetchArtworks().then((data) => {
            if (data) setArtworks(data.data)
        })
    }, [])

    useEffect(() => {
        fetchArtworkImages(artworkIds).then((data) => {
            tempArt.push(data)
            setArtworks(tempArt.flat())
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

    console.log(artworks)
    return (
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
            <div>
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
    )
}

export default Home
