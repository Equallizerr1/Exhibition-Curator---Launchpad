import { useEffect, useState } from 'react'
import { fetchVaData } from '@/services/articApi'

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

    console.log(categories)

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
                            <p key={category.id}>{category.value}</p>
                        ))}
                    </>
                )}
            </div>
        </>
    )
}
