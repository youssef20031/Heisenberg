// Home1.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue, remove } from 'firebase/database';
import { db } from '@/firebase';

type DonationPost = {
    id: string;
    category: string;
    content: string;
    details: any;
    showDetails?: boolean; 
};

const Home1: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [donationPosts, setDonationPosts] = useState<DonationPost[]>([]);

    useEffect(() => {
        const fetchDonationPosts = async () => {
            try {
                const donationPostsRef = ref(db, 'donationPosts');
                onValue(donationPostsRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const donationPostsData: Record<string, any> = snapshot.val();
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
            remove(donationPostRef);
            const updatedDonationPosts = donationPosts.filter(post => post.id !== id);
            setDonationPosts(updatedDonationPosts);
            alert('Donation successful!');
        } catch (error) {
            console.error('Error donating:', error);
            alert('An error occurred while processing the donation. Please try again later.');
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
                                    <p>{JSON.stringify(post.details)}</p>
                                    <button onClick={() => handleDonate(post.id)}>Donate</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-posts-message">No donation posts available for selected category.</p>
            )}
            <Link to="/update-account-info">Update Account Information</Link>
        </div>
    );
};

export default Home1;
