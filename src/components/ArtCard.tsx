import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import IconButton from '@mui/joy/IconButton'
import Typography from '@mui/joy/Typography'
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined'
import CardOverflow from '@mui/joy/CardOverflow'
import { ArtworkProps } from './Home'

export default function ArtCard({ artworks }: { artworks: ArtworkProps }) {
    return (
        <>
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
                                    //alt={props.thumbnail.alt_text}
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
