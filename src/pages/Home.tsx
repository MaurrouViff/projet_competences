// import button from bootstrap
import Button from 'react-bootstrap/Button';

export function Home() {
    return (
        <>
            <div>
                <div className="left">
                    <h1>Compétences</h1>
                </div>
                <div className="login">
                    <Button variant="primary" href="/rh">RH</Button>
                    <Button variant="primary" href="/collaborateur">Collaborateur</Button>
                </div>
            </div>
        </>
    )
}
