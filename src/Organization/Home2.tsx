import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '@/firebase';
import './Home2.css'; 

const Home2: React.FC = () => {
    const [category, setCategory] = useState<string>('');
    const [donationPost, setDonationPost] = useState<string>('');

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    const handleDonationPostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDonationPost(e.target.value);
    };

    const handleSubmitDonationPost = () => {
      // Basic form validation
      if (!category || !donationPost) {
          alert('Please select a category and provide donation post content.');
          return;
      }
  
      try {
          // Get a reference to the donation posts collection in your Firebase database
          const donationPostsRef = ref(db, 'donationPosts');
  
          // Push the new donation post data to the collection
          push(donationPostsRef, {
              category: category,
              content: donationPost,
              timestamp: new Date().toISOString() // Add a timestamp to track when the donation post was created
          });
  
          alert('Donation post submitted successfully!');
          
          // Clear the form fields after submission
          setCategory('');
          setDonationPost('');
      } catch (error) {
          console.error('Error submitting donation post:', error);
          alert('An error occurred while submitting the donation post. Please try again later.');
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
                <label htmlFor="donation-post">Donation Post:</label>
                <textarea id="donation-post" value={donationPost} onChange={handleDonationPostChange}></textarea>
                <button onClick={handleSubmitDonationPost}>Create Donation Post</button>
            </div>
        </div>
    );
}

export default Home2;
