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
                                    {console.log(artwork.image_id)}
                                    <CarouselItem>
                                        <div className="p-1">
                                            <Card>
                                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                                    <span className="text-4xl font-semibold">
                                                        {artwork.image ? (
                                                            <img
                                                                src={
                                                                    artwork.image
                                                                }
                                                                alt=""
                                                            />
                                                        ) : (
                                                            <img
                                                                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                                                                //alt={artwork.thumbnail.alt_text}
                                                            />
                                                        )}
                                                    </span>
                                                </CardContent>
                                            </Card>
                                        </div>
                                        <li key={artwork.id}>
                                            <span>{artwork.title}</span>
                                            <Button
                                                size={'sm'}
                                                onClick={() =>
                                                    onRemove(artwork.id)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </li>
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
