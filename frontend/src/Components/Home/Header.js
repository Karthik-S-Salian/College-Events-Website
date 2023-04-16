//import airbnbLogo from '../../images/airbnb-logo.png';
import logo from '../../icons/png/logo-no-background.png';

function Header(){
    return (
        <header>
            <img src={logo}  id="logo" alt="airbnb logo"/>
            <nav className="header__link">
                <a href="http://" className="nav-link">Home</a>
                <a href="http://" className="nav-link">Contact Us</a>
                <a href="http://" className="nav-link">About</a>
            </nav>
        </header>
    );
}

export default Header;