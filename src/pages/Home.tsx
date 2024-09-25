import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <>
            <h1>Home</h1>
            <p>
                Click on the button or image below to view artworks and records
                from an organisation.
            </p>
            <br />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div>
                    <Link to="/artic">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Art_Institute_of_Chicago_logo.svg/480px-Art_Institute_of_Chicago_logo.svg.png"
                            alt="Art Institute of Chicago"
                        />
                    </Link>
                    <Button>
                        <Link to="/artic">Art Institute of Chicago</Link>
                    </Button>
                </div>
                <div>
                    <Link to="/vamuseum">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Victoria_and_Albert_Museum_Logo.svg/640px-Victoria_and_Albert_Museum_Logo.svg.png"
                            alt="Victoria & Albert Museum"
                        />
                    </Link>
                    <Button>
                        <Link to="/vamuseum">Victoria & Albert Museum</Link>
                    </Button>
                </div>
            </div>
        </>
    )
}
