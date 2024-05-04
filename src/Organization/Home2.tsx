import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '@/firebase';
import './Home2.css';

const Home2: React.FC = () => {
    const [category, setCategory] = useState<string>('');
    const [donationPost, setDonationPost] = useState<string>('');
    const [details, setDetails] = useState<any>({});

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        setDetails({});
    };

    const handleDonationPostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDonationPost(e.target.value);
    };

    const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    };

    const handleSubmitDonationPost = () => {
        if (!category && !donationPost) {
            alert('Please select a category and provide donation post content.');
            return;
        }
        else if (!category){
            alert('Please select a category.');
            return;
        }
        else if(!donationPost){
            alert('Please provide content for the donation post.')
            return;
        }
        try {
            const donationPostsRef = ref(db, 'donationPosts');

            push(donationPostsRef, {
                category: category,
                content: donationPost,
                details: details,
                timestamp: new Date().toISOString()
            });

            alert('Donation post submitted successfully!');

            setCategory('');
            setDonationPost('');
            setDetails({});
        } catch (error) {
            console.error('Error submitting donation post:', error);
            alert('An error occurred while submitting the donation post. Please try again later.');
        }
    };

    const renderDetailFields = () => {
        switch (category) {
            case 'food':
                return (
                    <>
                        <label htmlFor="foodType">Type of Food:</label>
                        <input type="text" id="foodType" name="foodType" value={details.foodType || ''} onChange={handleDetailChange} />
                        <label htmlFor="quantity">Quantity:</label>
                        <input type="text" id="quantity" name="quantity" value={details.quantity || ''} onChange={handleDetailChange} />
                    </>
                );
            case 'clothes':
                return (
                    <>
                        <label htmlFor="size">Size:</label>
                        <input type="text" id="size" name="size" value={details.size || ''} onChange={handleDetailChange} />
                        <label htmlFor="color">Color:</label>
                        <input type="text" id="color" name="color" value={details.color || ''} onChange={handleDetailChange} />
                    </>
                );
            case 'toys':
                return (
                    <>
                        <label htmlFor="amount">Amount:</label>
                        <input type="text" id="amount" name="amount" value={details.amount || ''} onChange={handleDetailChange} />
                    </>
                );
            case 'medical':
                return (
                    <>
                        <label htmlFor="type">Type:</label>
                        <input type="text" id="type" name="type" value={details.type || ''} onChange={handleDetailChange} />
                        <label htmlFor="amount">Amount:</label>
                        <input type="text" id="amount" name="amount" value={details.amount || ''} onChange={handleDetailChange} />
                    </>
                );
            case 'school':
                return (
                    <>
                        <label htmlFor="type">Type:</label>
                        <input type="text" id="type" name="type" value={details.type || ''} onChange={handleDetailChange} />
                        <label htmlFor="amount">Amount:</label>
                        <input type="text" id="amount" name="amount" value={details.amount || ''} onChange={handleDetailChange} />
                    </>
                );
            case 'blood':
                return (
                    <>
                        <label htmlFor="bloodType">Blood Type:</label>
                        <select id="bloodType" name="bloodType" value={details.bloodType || ''} onChange={handleDetailChange}>
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

    return (
        <div className="home2">
            <div className="header">
                <h1>Create Donation Post</h1>
            </div>
            <div className="form-container">
                <label htmlFor="category">Category:</label>
                <select id="category" value={category} onChange={handleCategoryChange}>
                    <option value="">Select Category</option>
                    <option value="clothes">Clothes</option>
                    <option value="toys">Toys</option>
                    <option value="food">Food</option>
                    <option value="medical">Medical Supplies</option>
                    <option value="school">School Supplies</option>
                    <option value="blood">Blood Donations</option>
                </select>
                {renderDetailFields()}
                <label htmlFor="donation-post">Details:</label>
                <textarea id="donation-post" value={donationPost} onChange={handleDonationPostChange}></textarea>
                <button onClick={handleSubmitDonationPost}>Create Donation Post</button>
            </div>
        </div>
    );
}

export default Home2;
