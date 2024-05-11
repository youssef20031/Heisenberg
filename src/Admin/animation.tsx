import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

interface Props {
    images: string[]; // Specify the type of the images array as an array of strings
}

function CarouselFadeExample({ images }: Props) {
    return (
        <Carousel fade>
            {images.map((image: string, index: number) => ( // Specify the types of image and index
                <Carousel.Item key={index}>
                    <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`} />
                    <Carousel.Caption>
                        {index === 0 && (
                            <>
                                <h3>{"Donor"}</h3>
                                <p>{"Click to Sign Up"}</p>
                            </>
                        )}
                        {index === 1 && (
                            <>
                                <h3>{"Organization"}</h3>
                                <p>{"Click to Sign Up"}</p>
                            </>
                        )}
                        {index === 2 && (
                            <>
                                <h3>{"Admin"}</h3>
                                <p>{"Click to Sign Up"}</p>
                            </>
                        )}
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default CarouselFadeExample;
