'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DropdownMenuRadioGroupDemoProps {
    limit: any // Limit value passed from the parent
    setLimit: (newLimit: any) => void // Setter function to update the limit
}

export const DropdownMenuRadioGroupDemo: React.FC<
    DropdownMenuRadioGroupDemoProps
> = ({ limit, setLimit }) => {
    // Handle the limit selection
    const handleSelectLimit = (newLimit: any) => {
        setLimit(newLimit) // Update the limit value in the parent component
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'}>Artworks per page</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Choose a number</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={limit}
                    onValueChange={handleSelectLimit}
                >
                    <DropdownMenuRadioItem value={'25'}>
                        25
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value={'50'}>
                        50
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value={'100'}>
                        100
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
