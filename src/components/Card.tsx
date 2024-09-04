import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import IconButton from '@mui/joy/IconButton'
import Typography from '@mui/joy/Typography'
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined'
import CardOverflow from '@mui/joy/CardOverflow'

import { useState, useEffect } from 'react'

interface Artworks {
    id: number
    artist_title: string
    title: string
    image_id: number
    thumbnail: {
        [key: string]: string
    }
    alt_text: string
}

export default function BasicCard() {
    const [artWorks, setArtworks] = useState([])

    const getAllArtworks = async () => {
        const url = 'https://api.artic.edu/api/v1/artworks'
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            const json = await response.json()
            return json.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        ;(async () => {
            return setArtworks(await getAllArtworks())
        })()
    }, [])
    console.log(artWorks)
    return (
        <>
            {artWorks.map((artWork: Artworks) => (
                <>
                    <div className="flex justify-center text-left">
                        <Card
                            size="lg"
                            sx={{ width: 640, margin: 1 }}
                            key={artWork.id}
                        >
                            <CardOverflow>
                                <AspectRatio
                                    minHeight="120px"
                                    maxHeight="800px"
                                >
                                    <img
                                        src={`https://www.artic.edu/iiif/2/${artWork.image_id}/full/843,/0/default.jpg`}
                                        srcSet={`https://www.artic.edu/iiif/2/${artWork.image_id}/full/843,/0/default.jpg`}
                                        loading="lazy"
                                        alt={artWork.thumbnail.alt_text}
                                    />
                                </AspectRatio>
                            </CardOverflow>
                            <Typography level="title-lg">
                                {artWork.title}
                            </Typography>
                            <Typography level="body-sm">
                                {artWork.artist_title}
                            </Typography>
                            <IconButton
                                aria-label="bookmark Bahamas Islands"
                                variant="plain"
                                color="neutral"
                                size="sm"
                                sx={{
                                    position: 'absolute',
                                    top: '0.875rem',
                                    right: '0.5rem',
                                }}
                            >
                                <BookmarkAdd />
                            </IconButton>
                        </Card>
                    </div>
                </>
            ))}
        </>
    )
}
