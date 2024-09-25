// SearchForm.tsx
import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DropdownMenuRadioGroupDemo } from '@/components/DropdownMenuRadioGroupDemo'

interface SearchFormProps {
    onSubmit: (data: { artistId: string }) => void
    setLimit: (limit: any) => void
    limit: any
}

const FormSchema = z.object({
    artistId: z.string().min(2, {
        message: 'Artist name must be at least 2 characters.',
    }),
})

export const SearchForm: React.FC<SearchFormProps> = ({
    onSubmit,
    setLimit,
    limit,
}) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            artistId: '',
        },
    })

    return (
        <div className="bg-background">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="artistId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Search for Artwork"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant={'outline'}>
                        Submit
                    </Button>
                    <Button
                        type="button"
                        variant={'outline'}
                        onClick={() => window.location.reload()}
                    >
                        Reset
                    </Button>
                    <DropdownMenuRadioGroupDemo
                        limit={limit}
                        setLimit={setLimit}
                    />
                </form>
            </Form>
        </div>
    )
}
