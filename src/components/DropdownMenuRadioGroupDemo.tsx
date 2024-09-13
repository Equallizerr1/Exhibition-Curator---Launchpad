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

export function DropdownMenuRadioGroupDemo() {
    const [position, setPosition] = React.useState(12)
    console.log(typeof position)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="default">Artworks per page</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Choose a number</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                >
                    <DropdownMenuRadioItem value={25}>25</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value={50}>50</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value={100}>
                        100
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
