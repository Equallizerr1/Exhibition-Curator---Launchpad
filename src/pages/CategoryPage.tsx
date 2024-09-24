import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchVaCategory } from '@/services/articApi'

interface VaCategoryData {
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
    console.log(categoryRecords[0])
    const imgUrl = '/full/full/0/default.jpg'
    return (
        <div className="mx-10">
            <h1>Category Items</h1>
            {categoryRecords.map((record, index) => (
                <div
                    key={index}
                    className="border-gray-300 mb-4 w-72 rounded-lg border p-4"
                >
                    <h2>{record._primaryTitle}</h2>
                    <img
                        className="mb-4 block"
                        src={`${record._images._iiif_image_base_url}${imgUrl}`}
                        alt={`${record._primaryTitle} thumbnail`}
                    />
                    <p>
                        <strong>Accession Number:</strong>{' '}
                        {record.accessionNumber}
                    </p>
                    <p>
                        <strong>Object Type:</strong> {record.objectType}
                    </p>
                    <p>
                        <strong>Primary Date:</strong> {record._primaryDate}
                    </p>
                    <p>
                        <strong>Primary Maker:</strong>{' '}
                        {record._primaryMaker.name} (
                        {record._primaryMaker.association})
                    </p>
                    <p>
                        <strong>Primary Place:</strong> {record._primaryPlace}
                    </p>
                    <p>
                        <strong>Current Location:</strong>{' '}
                        {record._currentLocation.onDisplay}
                    </p>
                    <button
                        onClick={() =>
                            addToCollection(
                                ...[
                                    {
                                        title: record._primaryTitle,
                                        image: `${record._images._iiif_image_base_url}${imgUrl}`,
                                        id: record.accessionNumber,
                                    },
                                ]
                            )
                        }
                    >
                        Add to Collection
                    </button>
                </div>
            ))}
        </div>
    )
}
