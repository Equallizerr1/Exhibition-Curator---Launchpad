// FilterSortControls.tsx
import React from 'react'
import { Input } from '@/components/ui/input'

interface FilterSortControlsProps {
    filterArtist: string
    setFilterArtist: (artist: string) => void
    filterMedium: string
    setFilterMedium: (medium: string) => void
    sortOption: string
    setSortOption: (option: string) => void
}

export const FilterSortControls: React.FC<FilterSortControlsProps> = ({
    filterArtist,
    setFilterArtist,
    filterMedium,
    setFilterMedium,
    sortOption,
    setSortOption,
}) => {
    return (
        <div className="mt-4 flex space-x-4">
            <Input
                placeholder="Filter by Artist"
                value={filterArtist}
                onChange={(e) => setFilterArtist(e.target.value)}
            />
            <Input
                placeholder="Filter by Medium"
                value={filterMedium}
                onChange={(e) => setFilterMedium(e.target.value)}
            />
            <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="title">Sort by Title</option>
                <option value="artist">Sort by Artist</option>
                <option value="date">Sort by Date</option>
            </select>
        </div>
    )
}
