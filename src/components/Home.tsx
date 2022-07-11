import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';

const Home = () => {
    return (
        <>
            <Header />
            <Container>
                <h1>This is the home page for my security blog site</h1>
            </Container>
        </>

    );
};

export default Home;
