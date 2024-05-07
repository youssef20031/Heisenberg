import React, { useState, useEffect } from "react";
import { ref, push, remove, update, onValue, get } from "firebase/database";
import { db } from "@/firebase";
import "./Home2.css";
import { useParams } from "react-router-dom";

type DonationPost = {
  id: string;
  email: string;
  category: string;
  content: string;
  details: any;
  timestamp: string;
  status: string;
  donorDetails: any;
  deliveryDate: string;
};

const Home2: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [donationPost, setDonationPost] = useState<string>("");
  const [details, setDetails] = useState<any>({});
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [donationPosts, setDonationPosts] = useState<DonationPost[]>([]);
  const [pendingPosts, setPendingPosts] = useState<DonationPost[]>([]);
  const [donatedPosts, setDonatedPosts] = useState<DonationPost[]>([]);
  const [displayOption, setDisplayOption] = useState<string>("pending");
  const { email } = useParams<{ email: string }>();
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonationPosts = async () => {
      try {
        const donationPostsRef = ref(db, "donationPosts");
        onValue(donationPostsRef, (snapshot) => {
          if (snapshot.exists()) {
            const donationPostsData: Record<string, any> = snapshot.val();
            const donationPostsArray: DonationPost[] = Object.entries(
                donationPostsData
            ).map(([id, value]) => ({
              id,
              ...value,
            }));
            setDonationPosts(donationPostsArray);

            const filteredDonationPosts = donationPostsArray.filter(
                (post) => post.email === email
            );

            setDonationPosts(filteredDonationPosts);
            // Separate posts based on status
            const pending: DonationPost[] = [];
            const donated: DonationPost[] = [];
            filteredDonationPosts.forEach((post) => {
              if (post.status === "Pending") {
                pending.push(post);
              } else if (post.status === "Donated") {
                donated.push(post);
              }
            });
            setPendingPosts(pending);
            setDonatedPosts(donated);
          } else {
            console.log("No donation posts available");
          }
        });
      } catch (error) {
        console.error("Error fetching donation posts:", error);
      }
    };

    fetchDonationPosts();
  }, []);

  const handleDeliveryDateChange = (
      e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryDate(e.target.value);
  };
  const handleCategoryChange = (
      e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    setCategory(selectedCategory);
    setDetails({});
  };

  const handleDonationPostChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDonationPost(e.target.value);
  };

  const handleDetailChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Parse the value to a number, or use 0 as default if parsing fails
    const amount =
        name === "quantity" || name === "amount" ? parseInt(value) || 0 : value;
    setDetails({ ...details, [name]: amount });
  };

  const handleViewDonorDetails = async (id: string) => {
    try {
      const donationPostRef = ref(db, `donationPosts/${id}`);
      const snapshot = await get(donationPostRef);
      if (snapshot.exists()) {
        const donationPostData = snapshot.val();
        const donorEmail = donationPostData.donorDetails.email;
        console.log("Donor Email:", donorEmail);
        // You can now display donor email in your organization page UI
      } else {
        console.log("Donor details not available.");
      }
    } catch (error) {
      console.error("Error fetching donor details:", error);
      alert(
          "An error occurred while fetching donor details. Please try again later."
      );
    }
  };

  const handleSubmitDonationPost = () => {
    if (!category && !donationPost) {
      alert("Please select a category and provide donation post content.");
      return;
    } else if (!category) {
      alert("Please select a category.");
      return;
    } else if (!donationPost) {
      alert("Please provide content for the donation post.");
      return;
    }
    try {
      const donationPostsRef = ref(db, "donationPosts");
      push(donationPostsRef, {
        email: email,
        category: category,
        content: donationPost,
        details: details,
        timestamp: new Date().toISOString(),
        status: "Pending",
        deliveryDate: deliveryDate,
      });

      alert("Donation post submitted successfully!");

      setCategory("");
      setDonationPost("");
      setDetails({});
    } catch (error) {
      console.error("Error submitting donation post:", error);
      alert(
          "An error occurred while submitting the donation post. Please try again later."
      );
    }
  };

  const handleEdit = (id: string) => {
    setEditId(id);
    setEditMode(true);
    const postToEdit = donationPosts.find((post) => post.id === id);
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
        details: details,
      });
      alert("Donation post updated successfully!");
      setEditMode(false);
      setEditId("");
      setCategory("");
      setDonationPost("");
      setDetails({});
    } catch (error) {
      console.error("Error updating donation post:", error);
      alert(
          "An error occurred while updating the donation post. Please try again later."
      );
    }
  };

  const handleDelete = (id: string) => {
    try {
      const donationPostRef = ref(db, `donationPosts/${id}`);
      remove(donationPostRef);
      const updatedDonationPosts = donationPosts.filter(
          (post) => post.id !== id
      );
      setDonationPosts(updatedDonationPosts);
      alert("Donation post deleted successfully!");
    } catch (error) {
      console.error("Error deleting donation post:", error);
      alert(
          "An error occurred while deleting the donation post. Please try again later."
      );
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
                        <option value="Board_Games">Board Games</option>
                        <option value="Stuffed_toys">Stuffed toys</option>
                        <option value="Dolls">Dolls</option>
                        <option value="Sports">Sports</option>
                        <option value="Cars">Cars</option>
                        <option value="Outdoors">Outdoors</option>
                    </select>
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
                    <label htmlFor="Toy_Picture">Toy Picture:</label>
                    <input
                        type="file"
                        id="Toy_Picture"
                        name="Toy_Picture"
                        onChange={(e) => setDetails({ ...details, Toy_Picture: e.target.files[0] })}
                    />
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
                    {details.School_Supplies === "Books" && (
                        <>
                            <label htmlFor="ISBN">ISBN:</label>
                            <input
                                type="text"
                                id="ISBN"
                                name="ISBN"
                                value={details.ISBN || ""}
                                onChange={handleDetailChange}
                            />
                            <label htmlFor="Book_Name">Book Name:</label>
                            <input
                                type="text"
                                id="Book_Name"
                                name="Book_Name"
                                value={details.Book_Name || ""}
                                onChange={handleDetailChange}
                            />
                            <label htmlFor="Author">Author:</label>
                            <input
                                type="text"
                                id="Author"
                                name="Author"
                                value={details.Author || ""}
                                onChange={handleDetailChange}
                            />
                            <label htmlFor="Language">Language:</label>
                            <input
                                type="text"
                                id="Language"
                                name="Language"
                                value={details.Language || ""}
                                onChange={handleDetailChange}
                            />
                            <label htmlFor="Book_Picture">Book Picture:</label>
                            <input
                                type="file"
                                id="Book_Picture"
                                name="Book_Picture"
                                onChange={handleDetailChange}
                            />
                        </>
                    )}
                </>
            );
      default:
        return null;
    }
  };

    const handleQuantityChange = (e: { target: { value: any; }; }) => {
        const inputValue = e.target.value;

        // Allow the input to be empty or match the regex for digits
        if (inputValue === '' || /^\d+$/.test(inputValue)) {
            setValue(inputValue);
            setError('');
            handleDetailChange({ target: { name: 'amount', value: inputValue } } as React.ChangeEvent<HTMLInputElement>);
        } else {
            setError('Please enter a valid positive number.');
        }
    };

  const handleUpdateUserInfo = () => {
    // Add logic to update user information
    alert("User information updated successfully!");
  };

  const handleDeleteUserInfo = () => {
    // Add logic to delete user information
    alert("User information deleted successfully!");
  };

  return (
      <div className="home2">
        <div className="header">
          <h1>{editMode ? "Edit Donation Post" : "Create Donation Post"}</h1>
        </div>
        <div className="form-container">
            <form>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                >
                    <option value="">Select Category</option>
                    <option value="clothes">Clothes</option>
                    <option value="toys">Toys</option>
                    <option value="food">Food</option>
                    <option value="medical">Medical Supplies</option>
                    <option value="school">School Supplies</option>
                    <option value="blood">Blood Donations</option>
                </select>

                {renderDetailFields()}
                <label htmlFor="amount">Amount:</label>
                <input
                    type="text"
                    id="amount"
                    value={value}
                    onChange={handleQuantityChange}
                    placeholder="Enter a positive number"
                />
                <label htmlFor="donation-post">Details:</label>
                <textarea
                    id="donation-post"
                    value={donationPost}
                    onChange={handleDonationPostChange}
                ></textarea>

                <label htmlFor="delivery-date">Delivery Date:</label>
                <input
                    type="date"
                    id="delivery-date"
                    name="deliveryDate"
                    value={deliveryDate}
                    onChange={handleDeliveryDateChange}
                />

                {editMode ? (
                    <>
                        <button type="button" onClick={handleUpdateDonationPost}>
                            Update Donation Post
                        </button>
                        <button type="button" onClick={handleUpdateUserInfo}>
                            Update Account
                        </button>
                        <button type="button" onClick={handleDeleteUserInfo}>
                            Delete Account
                        </button>
                    </>
                ) : (
                    <button type="button" onClick={handleSubmitDonationPost}>
                        Submit Donation Post
                    </button>
                )}
            </form>
        </div>
          <div className="posts-container">
              <div className="posts-header">
                  <h2>My Donation Posts</h2>
            <select
                value={displayOption}
                onChange={(e) => setDisplayOption(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="donated">Donated</option>
            </select>
          </div>
          <div className="posts-list">
            {displayOption === "pending" &&
                pendingPosts.map((post) => (
                    <div key={post.id} className="post">
                      <p>{post.category}</p>
                      <p>{post.content}</p>
                      <p>{post.status}</p>
                      <p>{post.deliveryDate}</p>
                      <button onClick={() => handleEdit(post.id)}>Edit</button>
                      <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>
                ))}
            {displayOption === "donated" &&
                donatedPosts.map((post) => (
                    <div key={post.id} className="post">
                        <p>{post.category}</p>
                        <p>{post.content}</p>
                        <p>{post.status}</p>
                        <p>{post.deliveryDate}</p>
                        <button onClick={() => handleViewDonorDetails(post.id)}>
                            View Donor Details
                        </button>
                    </div>
                ))}
          </div>
        </div>
      </div>
  );
};

export default Home2;