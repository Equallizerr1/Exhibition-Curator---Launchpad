import { useEffect, useState } from 'react'
import { fetchVaCategory, fetchVaData } from '@/services/articApi'
import { Button } from '@/components/ui/button'

interface VaCategory {
    count: number
    count_max_error: number
    id: number
    value: string
}

export const VaMuseum = () => {
    const [categories, setCategories] = useState<VaCategory[]>([])

    // Function to load categories
    const loadCategories = async () => {
        const categoryData = await fetchVaData()
        setCategories(categoryData)
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const handleClick = (categoryName: string) => {
        fetchVaCategory(categoryName)
    }
    //console.log(categories)

    return (
        <>
            <h1>Victoria & Albert Museum</h1>
            <div>
                <h2>Categories</h2>
                {categories.length === 0 ? (
                    <p>Loading categories...</p>
                ) : (
                    <>
                        {categories.map((category) => (
                            <ul>
                                <Button
                                    key={category.id}
                                    onClick={(e) => {
                                        console.log(e.target.innerText)
                                        handleClick(category.id)
                                    }}
                                >
                                    {category.value}
                                </Button>
                            </ul>
                        ))}
                    </>
                )}
            </div>
        </>
    )
}
