import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';


const About = () => {
    return (
        <>
            <Header />
            <Container>
                <p>At this time I'm not really sure what all is going to be on this site. Eventually probably some walkthroughs of CTF challenges, security events. Mostly security stuff.</p>
            </Container>
        </>
    );
}

export default About