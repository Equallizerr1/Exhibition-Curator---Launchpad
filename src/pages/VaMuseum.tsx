import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchVaCategory, fetchVaData } from '@/services/articApi'
import { Button } from '@/components/ui/button'
import { SearchForm } from '@/components/SearchForm'

interface VaCategory {
    count: number
    count_max_error: number
    id: string
    value: string
}

export const VaMuseum = () => {
    const [categories, setCategories] = useState<VaCategory[]>([])
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

    function searchArtworks(data: { artistId: string }): void {
        throw new Error('Function not implemented.')
    }

    function setLimit(limit: any): void {
        throw new Error('Function not implemented.')
    }

    return (
        <>
            <h1>Victoria & Albert Museum</h1>
            <SearchForm
                onSubmit={searchArtworks}
                setLimit={setLimit}
                limit={undefined}
            />
            <div className="bg-surface">
                <div>
                    <h2>Categories</h2>
                    {categories.length === 0 ? (
                        <p>Loading categories...</p>
                    ) : (
                        <>
                            {categories.map((category) => (
                                <ul key={category.id}>
                                    <Button
                                        onClick={() => handleClick(category.id)}
                                    >
                                        {category.value}
                                    </Button>
                                </ul>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
