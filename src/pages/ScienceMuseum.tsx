import { fetchMuseumData } from '@/services/articApi'
import { useEffect } from 'react'

export const ScienceMuseum = () => {
    useEffect(() => {
        fetchMuseumData()
    }, [])

    return <h1>Science Museum</h1>
}
