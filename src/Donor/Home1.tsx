import './Home1.css';
import React, { useEffect, useState } from 'react';
import { ref, onValue, update,get } from 'firebase/database';
import { db } from '@/firebase';
import {useNavigate} from "react-router-dom";

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
    const [details, setDetails] = useState<any>({});
    const navigate = useNavigate();
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
                    alert('Donation successful!');
                    navigate('/ChooseTransportation');
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
                            onChange={(e) => setDetails({ ...details, Toys: e.target.value })}
                        >
                            <option value="">Select Toys</option>
                            <option value="Barbie">Barbie</option>
                            <option value="Hot_Wheels">Hot Wheels</option>
                            <option value="Nerf_Guns">Nerf Guns</option>
                            <option value="Lego">Lego</option>
                            <option value="Dolls">Dolls</option>
                            <option value="Rubix_Cube">Rubix Cube</option>
                        </select>
                    </>
                );
            case "school":
                return (
                    <>
                        <label htmlFor="School_Supplies">School Supplies:</label>
                        <select
                            id="School_Supplies"
                            name="School_Supplies"
                            value={details.School_Supplies || ""}
                            onChange={(e) => setDetails({ ...details, School_Supplies: e.target.value })}
                        >
                            <option value="">Select School Supplies</option>
                            <option value="Books">Books</option>
                            <option value="Pencils">Pencils</option>
                            <option value="Pens">Pens</option>
                            <option value="Notebooks">Notebooks</option>
                            <option value="Erasers">Erasers</option>
                            <option value="Sharpener">Sharpener</option>
                            <option value="Rules">Ruler</option>
                        </select>
                    </>
                );
            case "clothes":
                return (
                    <>
                        <label htmlFor="Clothes">Pieces of Clothes:</label>
                        <select
                            id="Clothes"
                            name="Clothes"
                            value={details.Clothes || ""}
                            onChange={(e) => setDetails({ ...details, Clothes: e.target.value })}
                        >
                            <option value="">Select Clothes</option>
                            <option value="Pants">Pants</option>
                            <option value="T_shirt">T-shirt</option>
                            <option value="Shorts">Shorts</option>
                            <option value="Skirts">Skirts</option>
                            <option value="Sweaters">Sweaters</option>
                            <option value="Jackets">Jackets</option>
                            <option value="Hijab">Hijab</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Socks">Socks</option>
                        </select>
                    </>
                );
            default:
                return null;
        }
    };

    const filteredDonationPosts = selectedCategory
        ? donationPosts.filter(post => post.category === selectedCategory && (!post.details || post.details.amount > 0))
        : donationPosts.filter(post => !post.details || post.details.amount > 0);


    return (
        <div className="home1">
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
                <ul className="donation-list">
                    {filteredDonationPosts.map((post) => (
                        <li key={post.id} className="donation-list-item">
                            <div className="donation-header" onClick={() => toggleDetails(post.id)}>
                                <p>{post.category}</p>
                                {post.showDetails ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
                            </div>
                            {post.showDetails && (
                                <div className="donation-details">
                                    <p>{post.content}</p>
                                    <p>{JSON.stringify(post.details).replace(/[{"}]/g, ' ')}</p>
                                    <input
                                        type="number"
                                        placeholder="Enter quantity"
                                        onChange={(e) => {
                                            const quantity = parseInt(e.target.value);
                                            setDetails({ ...details, quantity });
                                        }}
                                    />
                                    <button disabled={!details.quantity} onClick={() => handleDonate(post.id)}>Donate</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-posts-message">No donation posts available for selected category.</p>
            )}
        </div>
    );
};

export default Home1;
