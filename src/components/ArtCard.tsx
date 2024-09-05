import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import IconButton from '@mui/joy/IconButton'
import Typography from '@mui/joy/Typography'
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined'
import CardOverflow from '@mui/joy/CardOverflow'
import { addToList } from '../../utils/addToList'
import { ArtworkProps } from './Home'


export default function ArtCard({ props }: { props: ArtworkProps }) {
    return (
        <>
            <div className="flex justify-center bg-primary text-left">
                <Card size="lg" sx={{ width: 640, margin: 1 }} key={props.id}>
                    <CardOverflow>
                        <AspectRatio minHeight="120px" maxHeight="800px">
                            <img
                                src={`https://www.artic.edu/iiif/2/${props.image_id}/full/843,/0/default.jpg`}
                                srcSet={`https://www.artic.edu/iiif/2/${props.image_id}/full/843,/0/default.jpg`}
                                loading="lazy"
                                //alt={props.thumbnail.alt_text}
                            />
                        </AspectRatio>
                    </CardOverflow>
                    <Typography level="title-lg">
                        {props.title}
                        <Typography level="body-sm">
                            {props.date_display}
                        </Typography>
                    </Typography>
                    <Typography level="body-sm">
                        {props.artist_title}
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
                            addToList(props.id)
                        }}
                    >
                        <BookmarkAdd />
                    </IconButton>
                </Card>
            </div>
        </>
    )
}
