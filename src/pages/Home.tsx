import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <>
            <h1> Home</h1>
            <Button>
                <Link to="/artic">Art Institute of Chicago</Link>
            </Button>
            <Button>
                <Link to="/sciencemuseum">Science Museum</Link>
            </Button>
        </>
    )
}
