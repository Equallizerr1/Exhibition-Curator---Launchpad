import Card from './Card'

function Home() {
    return (
        <>
            <div className="flex h-48 items-center bg-background">
                <h1 className="text-3xl font-bold text-text underline">Home</h1>
            </div>
            <div className="h-24 bg-primary">
                <Card />
            </div>
        </>
    )
}

export default Home
