import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '@/Designs/EntryPage.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from "@/Donor/footer.tsx";
import HeaderBar from "@/Donor/HeaderBar.tsx";

interface ImageData {
    url: string;
    caption: string;
}

interface Props {
    images: ImageData[]; // Array of image sources and captions
    onImageClick: (index: number) => void; // Function to handle image click
}

const CarouselFadeExample: React.FC<Props> = ({ images, onImageClick }) => {
    return (
        <Carousel fade>
            {images.map((data, index) => (
                <Carousel.Item key={index} onClick={() => onImageClick(index)}>
                    <img src={data.url} className="d-block w-100" alt={`Slide ${index + 1}`} />
                    <Carousel.Caption>
                        <h3>{data.caption}</h3>
                        <p>Click to Sign Up</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

const NavigationButtons: React.FC = () => {
    const navigate = useNavigate();

    const handleImageClick = (index: number) => {
        switch (index) {
            case 0:
                navigate('/donor');
                break;
            case 1:
                navigate('/organization');
                break;
            case 2:
                navigate('/admin');
                break;
            default:
                break;
        }
    };

    // Array of image sources and captions
    const images: ImageData[] = [
        { url: '/src/volunteer.jpg', caption: 'Donor' },
        { url: '/src/charity.png', caption: 'Organization' },
        { url: '/src/Admin.jpg', caption: 'Admin' }
    ];

    return (
        <div style={{ backgroundColor: '#f0f0f0'}}>
            <Row>
                <HeaderBar></HeaderBar>
            </Row>
            <Row>
                <Col>

                {/*<div style={{ width: '33.33%', margin: 'auto' }}>*/}
                    <CarouselFadeExample images={images} onImageClick={handleImageClick} />
                {/*</div>*/}
                </Col>

            <Col>
                <div style={{ flex: '1', padding: '20px' }}>
                <h3>Our app facilitates the seamless connection between donors and organizations by allowing donors to
                    contribute essential items such as blood, medical supplies, clothes, and food. Organizations can
                    efficiently collect these donations, ensuring they reach those in need. With our platform, donors
                    can make a meaningful impact on their communities, while organizations can effectively manage and
                    distribute donated resources to those who require assistance. Together, we empower individuals and
                    organizations to make a positive difference in the lives of others.</h3>
                </div>
            </Col>
            </Row>
            <Row>
                <Footer/>
            </Row>
        </div>



);
};

export default NavigationButtons;
