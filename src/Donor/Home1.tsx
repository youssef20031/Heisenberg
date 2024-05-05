// Home1.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue, remove } from 'firebase/database';
import { db } from '@/firebase';
import { Navigate, useNavigate } from "react-router-dom";

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
    const [ageFilter, setAgeFilter] = useState<string>('');
    const [genderFilter, setGenderFilter] = useState<string>('');
    const [seasonFilter, setSeasonFilter] = useState<string>('');

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
    const navigate = useNavigate();

    const handleDonate = (id: string) => {
        try {
            const donationPostRef = ref(db, `donationPosts/${id}`);
            remove(donationPostRef);
            const updatedDonationPosts = donationPosts.filter(post => post.id !== id);
            setDonationPosts(updatedDonationPosts);
        } catch (error) {
            console.error('Error donating:', error);
            alert('An error occurred while processing the donation. Please try again later.');
        }//test
    };

    const filteredDonationPosts = selectedCategory
        ? donationPosts.filter(post => {
            if (post.category === selectedCategory) {
                if (selectedCategory === 'clothes') {
                    // Apply additional filters for clothes category
                    return (
                        (!ageFilter || post.details.age === ageFilter) &&
                        (!genderFilter || post.details.gender === genderFilter) &&
                        (!seasonFilter || post.details.season === seasonFilter)
                    );
                } else {
                    return true; // For other categories, no additional filtering needed
                }
            }
            return false;
        })
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
            {selectedCategory === 'clothes' && (
                <div className="clothes-filters">
                    <label htmlFor="ageFilter">Age:</label>
                    <input type="text" id="ageFilter" value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)} />
                    <label htmlFor="genderFilter">Gender:</label>
                    <input type="text" id="genderFilter" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} />
                    <label htmlFor="seasonFilter">Season:</label>
                    <input type="text" id="seasonFilter" value={seasonFilter} onChange={(e) => setSeasonFilter(e.target.value)} />
                </div>
            )}
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
