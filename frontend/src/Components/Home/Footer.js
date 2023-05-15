import "./style.css";
import facebookIcon from "../../icons/icons8-facebook-24.png";
import instagramIcon from "../../icons/icons8-instagram-24.png";
import twitterIcon from "../../icons/icons8-twitter-24.png";

function Footer() {
    return (
        <footer id="footer">
            <h2>About Us</h2>
            <section>This Project is developed as a First year Internship by 1st year Computer Science Students <br />
                HRITHIK H SHETTY   -  NNM22CS078<br />
                HRUTHIK R SALIAN   -  NNM22CS079<br />
                IBRAHIM MAHAMMED AOUF NNM22CS080<br />
                JOVIAN RODRIGUES  -   NNM22CS081<br />
                JUSTIN FRANCIS     -  NNM22CS082<br />
            </section>
            <div id="socialMediaIcons-container">
                <img src={facebookIcon} alt="fb-logo" />
                <img src={instagramIcon} alt="ig-logo" />
                <img src={twitterIcon} alt="twiiter-logo" />
            </div>
        </footer>
    )
}

export default Footer;