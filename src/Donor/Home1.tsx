import './Home1.css';
import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/firebase';

const Home1: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [donationPosts, setDonationPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchDonationPosts = async () => {
            try {
                const donationPostsRef = ref(db, 'donationPosts');
                onValue(donationPostsRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const donationPostsData = snapshot.val();
                        setDonationPosts(Object.values(donationPostsData));
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

    const toggleDetails = (index: number) => {
        const updatedDonationPosts = [...donationPosts];
        updatedDonationPosts[index].showDetails = !updatedDonationPosts[index].showDetails;
        setDonationPosts(updatedDonationPosts);
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
                </select>
            </div>
            {filteredDonationPosts.length > 0 ? (
                <ul className="donation-list">
                    {filteredDonationPosts.map((post, index) => (
                        <li key={index} className="donation-list-item">
                            <div className="donation-header" onClick={() => toggleDetails(index)}>
                                <p>{post.category}</p>
                                {post.showDetails ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
                            </div>
                            {post.showDetails && (
                                <div className="donation-details">
                                    <p>{post.content}</p>
                                    <p>{JSON.stringify(post.details)}</p> {}
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
