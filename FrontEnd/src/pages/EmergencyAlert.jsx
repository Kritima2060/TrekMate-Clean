import "../App.css";
import sos from "../assets/sos.svg";

const EmergencyAlert = () => {
  return (
    <>
       <main className="contact-box">
        <div className="icon-circle">
         
            <img src={sos}/>
          
        </div>
        <h2>Alpine Rescue Service Pvt.Ltd.</h2>
        <div className="contact-columns">
          <div className="contactNo">
            <p><strong>24/7 Hotline:</strong></p>
            <p>+97714964222</p>
            <p>+979801068400</p>
            <p>+979851232668</p>
          </div>
          <div className="contactNo">
            <p><strong>24/7 Operation Landlines:</strong></p>
            <p>+97714962652</p>
            <p>+97714954711</p>
            <p>+97714960668</p>
          </div>
          <div className="contactNo">
            <p><strong>24/7 Satellite:</strong></p>
            <p>+88 21687729937</p>
          </div>
        </div>
        <p className="email">
          24/7 E-mail: 
          <a href="mailto:operation@alpine-rescue.com"> operation@alpine-rescue.com</a>, 
          <a href="mailto:info@alpine-rescue.com"> info@alpine-rescue.com</a>
        </p>
        <p className="website">
          Website: <a href="https://www.alpine-rescue.com" target="_blank" rel="noopener noreferrer">www.alpine-rescue.com</a>
        </p>
      </main>
    </>
  )
}

export default EmergencyAlert;
