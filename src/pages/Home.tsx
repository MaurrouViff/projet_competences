// import button from bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// import css
import "../assets/css/login.css";

export function Home() {
  return (
    <>
    
    <div className="split-screen">
        <div className="left">
            <section className="copy">
                <h1>Projet Compétences</h1>
                <p>Connectez-vous</p>
            </section>
        </div>

        <div className="right">

        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
     
      <Button variant="danger">danger</Button>{' '}
    </Form>

    <h5>Alpha 0.0.1</h5>
                
        </div>
    </div>
    
    </>
  );
}