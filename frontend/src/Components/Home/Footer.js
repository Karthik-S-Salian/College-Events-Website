import "./style.css";
import facebookIcon from "../../icons/icons8-facebook-24.png";
import instagramIcon from "../../icons/icons8-instagram-24.png";
import twitterIcon from "../../icons/icons8-twitter-24.png";

function Footer(){
    return (
        <footer>
            <h2>About Us</h2>
            <section>Lorem ipsum dolor sit amet. Qui iure expedita est quam dolorum ut 
                accusamus adipisci aut sunt necessitatibus. Ut accusamus distinctio 
                et dolorem molestiae eum voluptatem nostrum ab sint cupiditate! </section>
            <div id="socialMediaIcons-container">
            <img src={facebookIcon} alt="fb-logo"/>
            <img src={instagramIcon} alt="ig-logo"/>
            <img src={twitterIcon} alt="twiiter-logo"/>
        </div>
        </footer>
    )
}

export default Footer;