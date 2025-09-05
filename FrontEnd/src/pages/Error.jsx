import errorimg from "../assets/errorimage.svg";
import errorImage from "../assets/error-img.svg";
import "../App.css";
import { Link } from "react-router-dom";


const Error = () => {
  return (
    <>
      <div className="error-image-logo-container">
        <img src={errorimg} className="error-image" />
        <div className="goHome-container">
          <div className="error-container">
            <div className="error404">
              <b>
                <h1>404</h1>
              </b>
              <p>Whoops... Can Not Found !!!</p>
            </div>
            <img src={errorImage} className="error-icon" />
          </div>
          <Link to="/">
          <button className="start-btn GoHome">Go Home</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
