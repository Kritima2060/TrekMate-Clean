import "../App.css";
import { useState } from "react";
import reviewimg1 from "../assets/reviewAvatar1.svg";
import reviewimg2 from "../assets/reviewAvatar2.svg";
import reviewimg3 from "../assets/reviewAvatar3.svg";
const sampleReviews = [
  {
    name: "Sushma R., Pokhara",
    image: reviewimg2,
    message:
      "TrekMate made my solo trek feel like a guided adventure. The AI suggestions and weather updates were spot-on!",
  },
  {
    name: "Kiran M., Kathmandu",
    image: reviewimg3,
    message:
      "I loved how easy it was to find and book a verified homestay. The photo reviews helped a lot!",
  },
  {
    name:"Sita R., Chitwan",
    image: reviewimg1,
    message:"I was able to connect with a local guide through TrekMate, and the language support was very helpful. I’ll use it again next season!"
  },
 
];
const Review = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, image: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Review submitted!");
    console.log(formData);
  };

  return (
    <>
      <div className="reviews-container">
        <main className="main-content">
          <div className="feedbacks">
            <h2>Recent Feedbacks</h2>
            {sampleReviews.map((review, index) => (
              <div className="feedback-card" key={index}>
                <img src={review.image} alt="user" className="avatar" />
                <div className="feedback-text">
                  <h4>{review.name}</h4>
                  <p>{review.message}</p>
                </div>
                <div className="quote-icon">”</div>
              </div>
            ))}
          </div>

          <div className="review-form">
            <h2>Add a Review</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                placeholder="Write Your Review"
                name="review"
                value={formData.review}
                onChange={handleChange}
                required
              ></textarea>
              <label htmlFor="upload" className="upload-btn">
                Click here to upload image
              </label>
              <input
                type="file"
                id="upload"
                name="image"
                onChange={handleChange}
                hidden
              />
              {formData.image && (
                <div className="preview">
                  <img src={formData.image} alt="preview" />
                  <p>{formData.name || "Uploaded Image"}</p>
                </div>
              )}
              <button type="submit">Submit</button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Review;
