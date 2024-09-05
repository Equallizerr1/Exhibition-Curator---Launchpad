export const ids: number[] = []

export const addToList = (artworkId: number) => {
    if (ids.includes(artworkId)) {
        return
    }
    ids.push(artworkId)
    return ids
}
