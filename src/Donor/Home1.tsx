import './Home1.css';
import React, { useEffect, useState } from 'react';
import { ref, onValue, update, get, remove } from 'firebase/database';
import { auth, db } from '@/firebase';
import { useNavigate, useParams } from "react-router-dom";
import HeaderBar from "@/Donor/HeaderBar.tsx";
import {Button, Card, Row} from 'react-bootstrap';
import Footer from './footer';

type DonationPost = {
    id: string;
    category: string;
    content: string;
    details: any;
    status: string;
    showDetails?: boolean;
};

const Home1: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [donationPosts, setDonationPosts] = useState<DonationPost[]>([]);
    const [details, setDetails] = useState<any>({
        Gender: '',
        Age: '',
        Season: '',
    });
    
    const [burgerMenuOpen, setBurgerMenuOpen] = useState<boolean>(false);
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
    const navigate = useNavigate();
    const { email } = useParams<{ email: string }>();
    const [showMap, setShowMap] = useState<boolean>(false);

    useEffect(() => {
        const fetchDonationPosts = async () => {
            try {
                const donationPostsRef = ref(db, 'donationPosts');
                onValue(donationPostsRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const donationPostsData: Record<any, any> = snapshot.val();
                        const donationPostsArray: DonationPost[] = Object.entries(donationPostsData).map(([id, value]) => ({
                            id,
                            ...value
                        }));
                        setDonationPosts(donationPostsArray);
                    } else {
                        console.log('No donation posts available');
                    }
                });
            } catch (error) {
                console.error('Error fetching donation posts:', error);
            }
        };

        fetchDonationPosts();
    }, []);

    const toggleDetails = (id: string) => {
        const updatedDonationPosts = donationPosts.map(post => {
            if (post.id === id) {
                return { ...post, showDetails: !post.showDetails };
            }
            return post;
        });
        setDonationPosts(updatedDonationPosts);
    };

    const handleDonate = async (id: string) => {
        try {
            const donationPostRef = ref(db, `donationPosts/${id}`);
            const donationPost = donationPosts.find(post => post.id === id);
            if (donationPost) {
                update(donationPostRef, {
                    status: 'Donated',
                });

                const donationPostRef2 = ref(db, `donationPosts/${id}/details`);
                const donationPostSnapshot = await get(donationPostRef2);
                const donationPostData = donationPostSnapshot.val();
                const currentAmount = donationPostData.amount || 0;
                const quantityToDonate = details.quantity || 0;
                if (quantityToDonate > 0 && quantityToDonate <= currentAmount) {
                    const updatedQuantity = currentAmount - quantityToDonate;
                    update(donationPostRef2, {
                        amount: updatedQuantity,
                    });
                    navigate(`/ChooseTransportation/${email}`);
                } else {
                    alert('Invalid quantity. Please enter a valid quantity to donate.');
                }
            } else {
                alert('Donation post not found.');
            }
        } catch (error) {
            console.error('Error donating:', error);
            alert('An error occurred while processing the donation. Please try again later.');
        }
    };

    const handleBurgerMenuClick = () => {
        const burgerIcon = document.querySelector(".burger-icon");
        if (burgerIcon) {
            burgerIcon.classList.toggle("active");
        }
    };

    const renderDetailFields = () => {
        switch (selectedCategory) {
            case "food":
                return (
                    <>
                        <label htmlFor="Type">Type of Food:</label>
                        <select
                            id="Type"
                            name="Type"
                            value={details.Type || ""}
                            onChange={(e) => setDetails({ ...details, Type: e.target.value })}
                        >
                            <option value="">Select Food Type</option>
                            <option value="Fruits_and_Vegetables">Fruit and Vegetables</option>
                            <option value="Canned_Foods">Canned Foods</option>
                            <option value="Fresh_Meals">Fresh Meals</option>
                            <option value="Baked_Goods">Baked Goods</option>
                            <option value="Drinks">Drinks</option>
                        </select>
                    </>
                );
            case "medical":
                return (
                    <>
                        <label htmlFor="Medical_Supplies">Medical Supplies:</label>
                        <select
                            id="Medical_Supplies"
                            name="Medical_Supplies"
                            value={details.Medical_Supplies || ""}
                            onChange={(e) => setDetails({ ...details, Medical_Supplies: e.target.value })}
                        >
                            <option value="">Select Medical Supplies</option>
                            <option value="Syringe">Syringe</option>
                            <option value="Spatula">Spatula</option>
                            <option value="First_Aid_Kit">First Aid Kits</option>
                            <option value="Bandage">Bandages</option>
                            <option value="Oxygen_Masks">Oxygen Masks</option>
                            <option value="Wheels_Chairs">Wheelchairs</option>
                            <option value="Blood_Pressure_Moniters">Blood Pressure Monitors</option>
                        </select>
                    </>
                );
            case "blood":
                return (
                    <>
                        <label htmlFor="Blood_Type">Blood Type:</label>
                        <select
                            id="Blood_Type"
                            name="Blood_Type"
                            value={details.Blood_Type || ""}
                            onChange={(e) => setDetails({ ...details, Blood_Type: e.target.value })}
                        >
                            <option value="">Select Blood Type</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </>
                );
            case "toys":
                return (
                    <>
                        <label htmlFor="Toys">Toys:</label>
                        <select
                            id="Toys"
                            name="Toys"
                            value={details.Toys || ""}
                            onChange={(e) => setDetails({...details, Toys: e.target.value})}
                        >
                            <option value="">All</option>
                            <option value="Board_Games">Board Games</option>
                            <option value="Stuffed_Toys">Stuffed toys</option>
                            <option value="Dolls">Dolls</option>
                            <option value="Sports">Sports</option>
                            <option value="Cars">Cars</option>
                            <option value="Outdoors">Outdoors</option>
                        </select>
                        <label htmlFor="Age">Age:</label>
                        <input
                            type="text"
                            id="Age"
                            name="Age"
                            value={details.Age || ""}
                            onChange={(e) => setDetails({...details, Age: e.target.value})}
                        />

                        <label htmlFor="Gender">Gender:</label>
                        <select
                            id="Gender"
                            name="Gender"
                            value={details.Gender || ""}
                            onChange={(e) => setDetails({...details, Gender: e.target.value})}
                        >
                            <option value="">All</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                    </>
                );
            case "school":
                return (
                    <>
                        <label htmlFor="School_Supplies">
                            <b>School Supplies:</b>
                        </label>
                        <select
                            id="School_Supplies"
                            name="School_Supplies"
                            value={details.School_Supplies || ""}
                            onChange={(e) => setDetails({...details, School_Supplies: e.target.value})}
                        >
                            <option value="">Select School supplies</option>
                            <option value="Books">Books</option>
                            <option value="Stationary">Stationary</option>
                        </select>
                        {details.School_Supplies === "Books" && (
                            <>
                                <div>
                                    <b>ISBN:</b><br/>
                                    <input
                                        type="text"
                                        id="ISBN"
                                        name="ISBN"
                                        value={details.ISBN || ""}
                                        onChange={(e) => setDetails({ ...details, ISBN: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <b>Book Name:</b><br />
                                    <input
                                        type="text"
                                        id="Book_Name"
                                        name="Book_Name"
                                        value={details.Book_Name || ""}
                                        onChange={(e) => setDetails({ ...details, Book_Name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <b>Author:</b><br />
                                    <input
                                        type="text"
                                        id="Author"
                                        name="Author"
                                        value={details.Author || ""}
                                        onChange={(e) => setDetails({ ...details, Author: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <b>Language:</b><br />
                                    <input
                                        type="text"
                                        id="Language"
                                        name="Language"
                                        value={details.Language || ""}
                                        onChange={(e) => setDetails({ ...details, Language: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <b>Book Picture:</b><br />
                                    <input
                                        type="file"
                                        id="Book_Picture"
                                        name="Book_Picture"
                                        onChange={(e) => {
                                            const file = e.target.files ? e.target.files[0] : null;
                                            if (file) {
                                                setDetails({ ...details, Book_Picture: file });
                                            }
                                        }}
                                    />
                                </div>
                            </>
                        )}
                    </>
                );
            case "clothes":
                return (
                    <>
                        <label htmlFor="Gender">Gender:</label>
                        <select
                            id="Gender"
                            name="Gender"
                            value={details.Gender || ""}
                            onChange={(e) => setDetails({ ...details, Gender: e.target.value })}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                
                        <label htmlFor="Age">Age:</label>
                        <input
                            type="text"
                            id="Age"
                            name="Age"
                            value={details.Age || ""}
                            onChange={(e) => setDetails({ ...details, Age: e.target.value })}
                        />
                
                        <label htmlFor="Season">Season:</label>
                        <select
                            id="Season"
                            name="Season"
                            value={details.Season || ""}
                            onChange={(e) => setDetails({ ...details, Season: e.target.value })}
                        >
                            <option value="">Select Season</option>
                            <option value="Summer">Summer</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Fall">Fall</option>
                        </select>
                    </>
                );
            default:
                return null;
        }
    };

    const handleUpdate = () => {
        setShowUpdateForm(true);
    };

    const handleShowMap = () => {
        navigate('/MapSetterDonor');
    };

    const handleDeleteUser = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                const userDataRef = ref(db, `UserData/${userId}`);
                await remove(userDataRef);
                navigate('/Signin1');
                alert('User deleted successfully!');
            } else {
                console.log('No user signed in');
                alert('No user signed in.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting user. Please try again later.');
        }
    };

    const filteredDonationPosts = selectedCategory
    ? donationPosts.filter(post => {
        if (post.category === selectedCategory && (!post.details || post.details.amount > 0)) {
            if (selectedCategory === 'clothes') {
                const { Age, Gender, Season } = details;
                if (
                    (!Age || post.details.Age === Age) &&
                    (!Gender || post.details.Gender === Gender) &&
                    (!Season || post.details.Season === Season)
                ) {
                    return true;
                }
            } else if (selectedCategory === 'toys') {
                const { Age, Gender, Toys } = details;
                if (
                    (!Age || post.details.Age === Age) &&
                    (!Gender || post.details.Gender === Gender) &&
                    (!Toys || post.details.Toys === Toys)
                ) {
                    return true;
                }
            } else if (selectedCategory === 'food') {
                const { Type } = details;
                if (!Type || post.details.Type === Type) {
                    return true;
                }
            } else if (selectedCategory === 'medical') {
                const { Medical_Supplies } = details;
                if (!Medical_Supplies || post.details.Medical_Supplies === Medical_Supplies) {
                    return true;
                }
            } else if (selectedCategory === 'school') {
                const { School_Supplies, ISBN, Book_Name, Author, Language } = details;
                if (
                    (!School_Supplies || post.details.School_Supplies === School_Supplies) &&
                    (!ISBN || post.details.ISBN === ISBN) &&
                    (!Book_Name || post.details.Book_Name === Book_Name) &&
                    (!Author || post.details.Author === Author) &&
                    (!Language || post.details.Language === Language)
                ) {
                    return true;
                }
            } else if (selectedCategory === 'blood') {
                const { Blood_Type } = details;
                if (!Blood_Type || post.details.Blood_Type === Blood_Type) {
                    return true;
                }
            } else {
                return true;
            }
        }
        return false;
    })
    : donationPosts.filter(post => !post.details || post.details.amount > 0);









    


    return (
        <div className="home1">
            <Row>
                <HeaderBar/>
            </Row>
            <div className="burger-menu">
                <button className={`burger-icon ${burgerMenuOpen ? 'active' : ''}`} onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}>
                    <div className="bar" />
                    <div className="bar" />
                    <div className="bar" />
                </button>
                {burgerMenuOpen && (
                    <div className="burger-menu-content">
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={handleDeleteUser}>Delete</button>
                    </div>
                )}
            </div>
            <h2 className="donation-posts-heading">Donation Posts</h2>
            <div className="category-dropdown">
                <label htmlFor="category">Select Category:</label>
                <select id="category" className="category-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">All</option>
                    <option value="clothes">Clothes</option>
                    <option value="toys">Toys</option>
                    <option value="food">Food</option>
                    <option value="medical">Medical Supplies</option>
                    <option value="school">School Supplies</option>
                    <option value="blood">Blood Donations</option>
                </select>
            </div>
            {renderDetailFields()}
            {filteredDonationPosts.length > 0 ? (
                <div className="card-container row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {filteredDonationPosts.map((post) => (
                        <div key={post.id} className="col">
                            <Card key={post.id} className="donation-card">
                                <Card.Body>
                                    <Card.Title>{post.category}</Card.Title>
                                    <Button onClick={() => toggleDetails(post.id)} className="view-details-button">
                                        View Details
                                    </Button>
                                    {post.showDetails && (
                                        <div className="donation-details">
                                            <p>{post.content}</p>
                                            <p>{JSON.stringify(post.details).replace(/[{"}]/g, ' ')}</p>
                                            <input
                                                type="number"
                                                placeholder="Enter quantity"
                                                onChange={(e) => {
                                                    const quantity = parseInt(e.target.value);
                                                    setDetails({...details, quantity});
                                                }}
                                            />
                                            <Button style={{marginRight: "10px"}} disabled={!details.quantity}
                                                    onClick={() => handleDonate(post.id)}>
                                                Donate
                                            </Button>
                                            <Button onClick={handleShowMap}>View Location</Button>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-posts-message">No donation posts available for selected category.</p>
            )}
            <Row>
                <Footer/>
            </Row>
        </div>
    );
};

export default Home1;
