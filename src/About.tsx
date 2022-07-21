import React from 'react';
import Button from 'react-bootstrap/Button';

export const About = () => {
    return (
        <div style={{padding: 10}}>
            About
            <br />
            <Button onClick={() => window.alert('Clicked')}>Click Me</Button>
        </div>
    );
};
