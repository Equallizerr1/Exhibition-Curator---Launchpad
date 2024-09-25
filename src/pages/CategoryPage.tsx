import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchVaCategory } from '@/services/articApi'
import { Button } from '@/components/ui/button'

export interface VaCategoryData {
    accessionNumber: string
    objectType: string
    _currentLocation: {
        id: string
        onDisplay: string
    }
    _images: {
        _iiif_image_base_url: string
        _iiif_presentation_url: string
        _primary_thumbnail: string
    }
    _primaryDate: string
    _primaryMaker: {
        association: string
        name: string
    }
    _primaryPlace: string
    _primaryTitle: string
}

interface CategoryPageProps {
    addToCollection: (artwork: any) => void
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
    addToCollection,
}) => {
    const { id } = useParams<{ id: string }>()
    const [categoryRecords, setCategoryData] = useState<VaCategoryData[]>([])
    const [loading, setLoading] = useState(true)

    const loadCategoryData = async () => {
        if (id) {
            const data = await fetchVaCategory(id)
            console.log(data)
            setCategoryData(data.records)
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCategoryData()
    }, [id])

    if (loading) {
        return <p>Loading category data...</p>
    }

    if (!categoryRecords || categoryRecords.length === 0) {
        return <p>No data found for this category.</p>
    }
    const imgUrl = '/full/full/0/default.jpg'
    return (
        <>
            <h1>{categoryRecords[0].objectType}</h1>
            <div className="bg-surface">
                <div className="mx-10">
                    {categoryRecords.map((record, index) => (
                        <div
                            key={index}
                            className="border-gray-300 mb-4 w-72 rounded-lg border p-4"
                        >
                            <img
                                className="mb-4 block"
                                src={`${record._images._iiif_image_base_url}${imgUrl}`}
                                alt={`${record._primaryTitle} thumbnail`}
                            />
                            <h2>{record._primaryTitle}</h2>
                            <p> {record._primaryDate}</p>
                            <Button
                                variant={'outline'}
                                onClick={() =>
                                    addToCollection(
                                        ...[
                                            {
                                                title: record._primaryTitle,
                                                image: `${record._images._iiif_image_base_url}${imgUrl}`,
                                                id: record.accessionNumber,
                                                date: record._primaryDate,
                                                primaryPlace:
                                                    record._primaryPlace,
                                                currentLocation:
                                                    record._currentLocation,
                                                objectType: record.objectType,
                                                primaryMaker:
                                                    record._primaryMaker.name,
                                                primaryMakerAssociation:
                                                    record._primaryMaker
                                                        .association,
                                            },
                                        ]
                                    )
                                }
                            >
                                Add to Collection
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
