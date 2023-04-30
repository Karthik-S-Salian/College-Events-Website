//import airbnbLogo from '../../images/airbnb-logo.png';
import logo from '../../icons/png/logo-no-background.png';
import { Link } from 'react-router-dom';

function Header(){

    function logout(){
        localStorage.setItem('access_token', null);
    }

    return (

        <header>
            <img src={logo}  id="logo" alt="event buddy logo"/>
            <nav className="header__link">
            <Link to="/"><span className="nav-link">Home</span></Link>
                <a href="#footer" className="nav-link">About Us</a>
            <Link to="/login"><button id="logout-button" onClick={logout}>logout</button></Link>
            </nav>
        </header>
    );
}

export default Header;