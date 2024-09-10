import React from 'react'
import { useState, useEffect } from 'react'
import { getAllArtworks } from '../../utils/api'

import Box from '@mui/joy/Box'
import IconButton from '@mui/joy/IconButton'
import Drawer from '@mui/joy/Drawer'
import Input from '@mui/joy/Input'
import List from '@mui/joy/List'
import ListItemButton from '@mui/joy/ListItemButton'
import Typography from '@mui/joy/Typography'
import ModalClose from '@mui/joy/ModalClose'
import Menu from '@mui/icons-material/Menu'
import Search from '@mui/icons-material/Search'
import ListItem from '@mui/joy/ListItem'

import CardOverflow from '@mui/joy/CardOverflow'
import Card from '@mui/joy/Card'
import AspectRatio from '@mui/joy/AspectRatio'
import { BookmarkAdd } from '@mui/icons-material'

interface ArtworkProps {
    [x: string]: any
    id: number
    artist_title: string
    date_display: number
    title: string
    image_id: number
    thumbnail: {
        alt_text: string
    }
    alt_text: string
}

function NewHome() {
    const [artworks, setArtworks] = useState([])
    const [artworkIds, setArtworkIds] = useState([])

    const [open, setOpen] = useState(false)

    useEffect(() => {
        ;(async () => {
            return setArtworks(await getAllArtworks())
        })()
    }, [])

    // const addToList = (id: number) => {
    //     if (artworkIds.includes(id)) {
    //         return
    //     }
    //     artworkIds.push(id)
    //     setArtworkIds(artworkIds)
    // }

    const addToList = (input: number) => {
        let listArray = this.state.lists

        listArray.push(input)

        this.setState(
            {
                lists: listArray,
                userInput: '',
            },
            () => {
                window.localStorage.setItem(
                    'savedList',
                    JSON.stringify(this.state.lists)
                )
            }
        )
    }

    return (
        <>
            <div className="flex h-48 items-center bg-background">
                <React.Fragment>
                    <IconButton
                        variant="outlined"
                        color="neutral"
                        onClick={() => setOpen(true)}
                    >
                        <Menu />
                    </IconButton>
                    <Drawer open={open} onClose={() => setOpen(false)}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                ml: 'auto',
                                mt: 1,
                                mr: 2,
                            }}
                        >
                            <Typography
                                component="label"
                                htmlFor="close-icon"
                                sx={{
                                    fontSize: 'sm',
                                    fontWeight: 'lg',
                                    cursor: 'pointer',
                                }}
                            >
                                Close
                            </Typography>
                            <ModalClose
                                id="close-icon"
                                sx={{ position: 'initial' }}
                            />
                        </Box>
                        <Input
                            size="sm"
                            placeholder="Search"
                            variant="plain"
                            endDecorator={<Search />}
                            slotProps={{
                                input: {
                                    'aria-label': 'Search anything',
                                },
                            }}
                            sx={{
                                m: 3,
                                borderRadius: 0,
                                borderBottom: '2px solid',
                                borderColor: 'neutral.outlinedBorder',
                                '&:hover': {
                                    borderColor: 'neutral.outlinedHoverBorder',
                                },
                                '&::before': {
                                    border: '1px solid var(--Input-focusedHighlight)',
                                    transform: 'scaleX(0)',
                                    left: 0,
                                    right: 0,
                                    bottom: '-2px',
                                    top: 'unset',
                                    transition:
                                        'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                                    borderRadius: 0,
                                },
                                '&:focus-within::before': {
                                    transform: 'scaleX(1)',
                                },
                            }}
                        />
                        <List>
                            {artworkIds.map((artwork, index) => (
                                <ListItem key={index}>
                                    <ListItemButton
                                        onClick={() => setOpen(false)}
                                    >
                                        Item {artwork}
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </React.Fragment>
                <h1 className="text-3xl font-bold text-text underline">Home</h1>
            </div>
            <div className="bg-primary text-left">
                {artworks.map((artwork: ArtworkProps) => (
                    <Card
                        size="lg"
                        sx={{ width: 640, margin: 1 }}
                        key={artwork.id}
                    >
                        <CardOverflow>
                            <AspectRatio minHeight="120px" maxHeight="800px">
                                <img
                                    src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                                    srcSet={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                                    loading="lazy"
                                    alt={artwork.thumbnail.alt_text}
                                />
                            </AspectRatio>
                        </CardOverflow>
                        <Typography level="title-lg">
                            {artwork.title}
                            <Typography level="body-sm">
                                {` ${artwork.date_display}`}
                            </Typography>
                        </Typography>
                        <Typography level="body-sm">
                            {artwork.artist_title}
                        </Typography>
                        <IconButton
                            aria-label="bookmark Bahamas Islands"
                            variant="soft"
                            color="neutral"
                            size="sm"
                            sx={{
                                position: 'absolute',
                                top: '0.875rem',
                                right: '0.5rem',
                            }}
                            onClick={() => {
                                addToList(artwork.id)
                            }}
                        >
                            <BookmarkAdd />
                        </IconButton>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default NewHome
