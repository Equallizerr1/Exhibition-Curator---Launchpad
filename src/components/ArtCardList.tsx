import { List } from '@mui/joy'
import ArtCard from './ArtCard'
import { ArtworkProps } from './Home'

export default function ArtCardList({ props }: { props: ArtworkProps }) {
    console.log(props)

    return (
        <>
            <div className="flex justify-center bg-primary text-left">
                <List>
                    <>
                        {props.map((artwork: ArtworkProps) => (
                            <ArtCard props={artwork} />
                        ))}
                    </>
                </List>
            </div>
        </>
    )
}
