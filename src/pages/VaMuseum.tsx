import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    fetchVaCategory,
    fetchVaData,
    fetchVaSearch,
} from '@/services/articApi'
import { Button } from '@/components/ui/button'
import { SearchForm } from '@/components/SearchForm'
import { VaCategoryData } from './CategoryPage'
import { FilterSortControls } from '@/components/FilterSortControls'

interface VaCategory {
    count: number
    count_max_error: number
    id: string
    value: string
}
interface VaMuseumProps {
    addToCollection: (artwork: any) => void
}
export const VaMuseum: React.FC<VaMuseumProps> = ({ addToCollection }) => {
    const [categories, setCategories] = useState<VaCategory[]>([])
    const [vaData, setVaDAta] = useState<VaCategoryData[]>([])
    const [sortOption, setSortOption] = useState<string>('title')
    const [filterArtist, setFilterArtist] = useState<string>('')
    const [filterMedium, setFilterMedium] = useState<string>('')
    const navigate = useNavigate() // Initialize useNavigate

    // Function to load categories
    const loadCategories = async () => {
        const categoryData = await fetchVaData()
        setCategories(categoryData)
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const handleClick = (categoryId: string) => {
        fetchVaCategory(categoryId)
        navigate(`/categories/${categoryId}`) // Navigate to CategoryPage with category ID
    }

    const searchArtworks = async ({ artistId }: { artistId: string }) => {
        const data = await fetchVaSearch(artistId)
        if (data) setVaDAta(data)
    }

    function setLimit(limit: number): void {
        console.log(limit)
        throw new Error('Function not implemented.')
    }

    const imgUrl = '/full/full/0/default.jpg'
    return (
        <>
            <h1>Victoria & Albert Museum</h1>
            <SearchForm
                onSubmit={searchArtworks}
                setLimit={setLimit}
                limit={0}
            />
            {/* Sorting and filtering controls */}
            <FilterSortControls
                filterArtist={filterArtist}
                setFilterArtist={setFilterArtist}
                filterMedium={filterMedium}
                setFilterMedium={setFilterMedium}
                sortOption={sortOption}
                setSortOption={setSortOption}
            />
            <div className="bg-surface">
                <div>
                    <h2>Categories</h2>
                    {categories.length === 0 ? (
                        <p>Loading categories...</p>
                    ) : (
                        <>
                            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {categories.map((category) => (
                                    <ul key={category.id}>
                                        <Button
                                            onClick={() =>
                                                handleClick(category.id)
                                            }
                                        >
                                            {category.value}
                                        </Button>
                                    </ul>
                                ))}
                            </div>
                        </>
                    )}
                    <>
                        {vaData.length == 0 ? (
                            <p>Search Results will appear here</p>
                        ) : (
                            <>
                                {vaData.map((record) => (
                                    <ul key={record.accessionNumber}>
                                        <img
                                            src={`${record._images._iiif_image_base_url}${imgUrl}`}
                                            alt={record._primaryTitle}
                                        />
                                        <h2>{record._primaryTitle}</h2>
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
                                                            objectType:
                                                                record.objectType,
                                                            primaryMaker:
                                                                record
                                                                    ._primaryMaker
                                                                    .name,
                                                            primaryMakerAssociation:
                                                                record
                                                                    ._primaryMaker
                                                                    .association,
                                                        },
                                                    ]
                                                )
                                            }
                                        >
                                            Add to Collection
                                        </Button>
                                    </ul>
                                ))}
                            </>
                        )}
                    </>
                </div>
            </div>
        </>
    )
}
