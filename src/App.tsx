import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import Exhibition from './pages/Exhibition'
import {
    saveToLocalStorage,
    loadFromLocalStorage,
} from './utils/localStorageUtils'

const COLLECTION_STORAGE_KEY = 'artworkCollection'

const App: React.FC = () => {
    // Load the saved collection from localStorage
    const [collection, setCollection] = useState<any[]>(() => {
        const savedCollection = loadFromLocalStorage(COLLECTION_STORAGE_KEY)
        return savedCollection || []
    })

    // Save the collection to localStorage whenever it updates
    useEffect(() => {
        saveToLocalStorage(COLLECTION_STORAGE_KEY, collection)
    }, [collection])

    const addToCollection = (artwork: any) => {
        // Check if the artwork is already in the collection based on its ID
        const isArtworkInCollection = collection.some(
            (a) => a.id === artwork.id
        )

        if (!isArtworkInCollection) {
            setCollection([...collection, artwork])
        } else {
            // add a popup for this later
            console.log('Artwork is already in the collection.')
        }
    }

    const removeFromCollection = (id: number) => {
        setCollection(collection.filter((a) => a.id !== id))
    }

    return (
        <Router>
            <nav className="bg-primary text-xl">
                <ul className="m-4 ms-8 flex list-none gap-10">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/exhibition">My Exhibition</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route
                    path="/"
                    element={<Home addToCollection={addToCollection} />}
                />
                <Route
                    path="/exhibition"
                    element={
                        <Exhibition
                            collection={collection}
                            onRemove={removeFromCollection}
                        />
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
