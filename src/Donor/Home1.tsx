import './Home1.css';
import React, { useEffect, useState } from 'react';
import { ref, onValue, update,get } from 'firebase/database';
import { db } from '@/firebase';

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

    const handleDonate = (id: string) => {
        try {
            const donationPostRef = ref(db, `donationPosts/${id}`);
            const donationPost = donationPosts.find(post => post.id === id);
            if (donationPost) {

                update(donationPostRef, {
                    status: 'Donated',
                });


                (async () => {
                    const donationPostRef2 = ref(db, `donationPosts/${id}/details`);

                    const donationPostSnapshot = await get(donationPostRef2);
                    const donationPostData = donationPostSnapshot.val();
                    const currentAmount = donationPostData.amount || 0;
                    const updatedQuantity = currentAmount - 1;
                    update(donationPostRef2, {
                        amount: updatedQuantity,
                    });
                })();

                alert('Donation successful!');
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
            case 'food':
                return (
                    <>
                        <label htmlFor="foodType">Type of Food:</label>
                        <select
                            id="foodType"
                            name="foodType"
                            value={details.foodType || ''}
                            onChange={(e) => setDetails({ ...details, foodType: e.target.value })}
                        >
                            <option value="">Select Food Type</option>
                            <option value="fruits_vegetables">Fruit and Vegetables</option>
                            <option value="canned_foods">Canned Foods</option>
                            <option value="fresh_meals">Fresh Meals</option>
                            <option value="baked_goods">Baked Goods</option>
                            <option value="drinks">Drinks</option>
                        </select>
                    </>
                );
            case 'medical':
                return (
                    <>
                        <label htmlFor="medsup">Medical Supplies:</label>
                        <select
                            id="medsup"
                            name="medsup"
                            value={details.medsup || ''}
                            onChange={(e) => setDetails({ ...details, medsup: e.target.value })}
                        >
                            <option value="">Select Medical Supplies</option>
                            <option value="syringe">Syringe</option>
                            <option value="spatula">Spatula</option>
                            <option value="firstAidKit">First Aid Kits</option>
                            <option value="bandage">Bandages</option>
                            <option value="oxy">Oxygen Masks</option>
                            <option value="wheels">Wheelchairs</option>
                            <option value="bpm">Blood Pressure Monitors</option>
                        </select>
                    </>
                );
            case 'blood':
                return (
                    <>
                        <label htmlFor="bloodT">Blood Type:</label>
                        <select
                            id="bloodT"
                            name="bloodT"
                            value={details.bloodT || ''}
                            onChange={(e) => setDetails({ ...details, bloodT: e.target.value })}
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
            default:
                return null;
        }
    };


    const filteredDonationPosts = selectedCategory
        ? donationPosts.filter(post => post.category === selectedCategory)
        : donationPosts;

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
                    <option value="teaching">Teaching Posts</option>
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
