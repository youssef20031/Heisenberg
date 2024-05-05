import React, { useState, useEffect } from 'react';
import { ref, push, remove, update, onValue } from 'firebase/database';
import { db } from '@/firebase';
import './Home2.css';

type DonationPost = {
    id: string;
    category: string;
    content: string;
    details: any; 
    timestamp: string; 
};

const Home2: React.FC = () => {
    const [category, setCategory] = useState<string>('');
    const [donationPost, setDonationPost] = useState<string>('');
    const [details, setDetails] = useState<any>({});
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editId, setEditId] = useState<string>('');
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

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        setDetails({});
        if(selectedCategory === 'teaching') {
            setDetails({
                NumberOfStudent: 5,
                addess: "hamada",
                subjects: "math"
            });
        }
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

    const handleEdit = (id: string) => {
        setEditId(id);
        setEditMode(true);
        const postToEdit = donationPosts.find(post => post.id === id);
        if (postToEdit) {
            setCategory(postToEdit.category);
            setDonationPost(postToEdit.content);
            setDetails(postToEdit.details);
        }
    };

    const handleUpdateDonationPost = () => {
        try {
            const donationPostRef = ref(db, `donationPosts/${editId}`);
            update(donationPostRef, {
                category: category,
                content: donationPost,
                details: details
            });
            alert('Donation post updated successfully!');
            setEditMode(false);
            setEditId('');
            setCategory('');
            setDonationPost('');
            setDetails({});
        } catch (error) {
            console.error('Error updating donation post:', error);
            alert('An error occurred while updating the donation post. Please try again later.');
        }
    };

    const handleDelete = (id: string) => {
        try {
            const donationPostRef = ref(db, `donationPosts/${id}`);
            remove(donationPostRef);
            const updatedDonationPosts = donationPosts.filter(post => post.id !== id);
            setDonationPosts(updatedDonationPosts);
            alert('Donation post deleted successfully!');
        } catch (error) {
            console.error('Error deleting donation post:', error);
            alert('An error occurred while deleting the donation post. Please try again later.');
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
                        <label htmlFor="type of clothing">type of clothing:</label>
                        <input type="text" id="type" name="type of clothing" value={details.size || ''} onChange={handleDetailChange} />
                        <label htmlFor="age">age:</label>
                        <input type="text" id="age" name="age" value={details.color || ''} onChange={handleDetailChange} />
                        <label htmlFor="gender">gender:</label>
                        <input type="text" id="gender" name="gender" value={details.color || ''} onChange={handleDetailChange} />
                        <label htmlFor="season">season:</label>
                        <input type="text" id="season" name="season" value={details.color || ''} onChange={handleDetailChange} />
                        <label htmlFor="material">material:</label>
                        <input type="text" id="material" name="material" value={details.color || ''} onChange={handleDetailChange} />
                        <label htmlFor="quality">quality:</label>
                        <input type="text" id="quality" name="quality" value={details.color || ''} onChange={handleDetailChange} />
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
            case 'teaching':
                return (
                    <>
                        <label htmlFor="NumberOfStudent">Number Of Student:</label>
                        <input type="text" id="NumberOfStudent" name="NumberOfStudent" value={details.NumberOfStudent || ''} onChange={handleDetailChange} />
                        <label htmlFor="addess">Address:</label>
                        <input type="text" id="addess" name="addess" value={details.addess || ''} onChange={handleDetailChange} />
                        <label htmlFor="subjects">Subjects:</label>
                        <input type="text" id="subjects" name="subjects" value={details.subjects || ''} onChange={handleDetailChange} />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="home2">
            <div className="header">
                <h1>{editMode ? 'Edit Donation Post' : 'Create Donation Post'}</h1>
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
                    <option value="teaching">Teaching Posts</option>
                </select>
                {renderDetailFields()}
                <label htmlFor="donation-post">Details:</label>
                <textarea id="donation-post" value={donationPost} onChange={handleDonationPostChange}></textarea>
                {editMode ? (
                    <button onClick={handleUpdateDonationPost}>Update Donation Post</button>
                ) : (
                    <button onClick={handleSubmitDonationPost}>Create Donation Post</button>
                )}
            </div>
            <div className="donation-posts">
                <h2>Donation Posts</h2>
                <ul>
                    {donationPosts.map(post => (
                        <li key={post.id}>
                            <div>
                                <h3>{post.category}</h3>
                                <p>{post.content}</p>
                                <p>{JSON.stringify(post.details)}</p>
                                <p>{post.timestamp}</p>
                                <button onClick={() => handleEdit(post.id)}>Edit</button>
                                <button onClick={() => handleDelete(post.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home2;
