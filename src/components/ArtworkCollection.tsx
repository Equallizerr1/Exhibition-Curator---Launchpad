import React from 'react'
import { Button } from './ui/button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from './ui/card'

interface ArtworkCollectionProps {
    collection: any[]
    onRemove: (id: number) => void
}

const ArtworkCollection: React.FC<ArtworkCollectionProps> = ({
    collection,
    onRemove,
}) => {
    return (
        <div className="mx-10">
            <h2>My Collection</h2>
            <ul>
                <>
                    <Carousel>
                        <CarouselContent>
                            {collection.map((artwork) => (
                                <>
                                    <CarouselItem>
                                        <div>
                                            <Card>
                                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                                    <span>
                                                        {artwork.image ? (
                                                            <>
                                                                <img
                                                                    src={
                                                                        artwork.image
                                                                    }
                                                                    alt=""
                                                                />
                                                                <br />
                                                                <h2>
                                                                    {
                                                                        artwork.title
                                                                    }
                                                                </h2>
                                                                <p>
                                                                    Primary
                                                                    Maker:{' '}
                                                                    {
                                                                        artwork.primaryMaker
                                                                    }
                                                                    {
                                                                        artwork.primaryMakerAssociation
                                                                    }
                                                                </p>
                                                                <p>
                                                                    Primary
                                                                    Date:{' '}
                                                                    {
                                                                        artwork.date
                                                                    }
                                                                </p>
                                                                <p>
                                                                    Object Type:{' '}
                                                                    {
                                                                        artwork.objectType
                                                                    }
                                                                </p>
                                                                <p>
                                                                    Primary
                                                                    Place:{' '}
                                                                    {
                                                                        artwork.primaryPlace
                                                                    }
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <img
                                                                    src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                                                                />
                                                                <br />
                                                                <h2>
                                                                    {
                                                                        artwork.title
                                                                    }
                                                                </h2>
                                                                <p>
                                                                    {
                                                                        artwork.artist_display
                                                                    }
                                                                </p>
                                                                <p>
                                                                    {
                                                                        artwork.date_display
                                                                    }
                                                                </p>
                                                                <p>
                                                                    {
                                                                        artwork.medium_display
                                                                    }
                                                                </p>
                                                                <br />
                                                                <p>
                                                                    {
                                                                        artwork.exhibition_history
                                                                    }
                                                                </p>
                                                                <br />
                                                                <p>
                                                                    {
                                                                        artwork.description
                                                                    }
                                                                </p>
                                                            </>
                                                        )}
                                                    </span>
                                                </CardContent>
                                                <li key={artwork.id}>
                                                    <Button
                                                        size={'lg'}
                                                        onClick={() =>
                                                            onRemove(artwork.id)
                                                        }
                                                    >
                                                        Remove
                                                    </Button>
                                                </li>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                </>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </>
            </ul>
        </div>
    )
}

export default ArtworkCollection
