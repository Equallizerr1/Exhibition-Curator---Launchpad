import { List, ListItem } from '@mui/joy'
import ArtCard from './ArtCard'
import { ArtworkProps } from './Home'

export default function ArtCardList(
    { artworks }: { artworks: ArtworkProps },
) {
    console.log(artworkIds)
    return (
        <>
            <div className="bg-primary text-left">
                <List>
                    <ListItem>
                        <ArtCard artworks={artworks} />
                    </ListItem>
                </List>
            </div>
        </>
    )
}
