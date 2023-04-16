import photoGrid from '../../images/Group 77.png';

function Hero(){
    return (
        <section className='hero-container'>
            <img src={photoGrid} alt="airbnb logo"/>
            <div>
                <h1>
                    Online Experiences
                </h1>
                <p>
                    Join unique interactive activities led by one-of-a-kind hosts—all without leaving home.
                </p>
            </div>
        </section>
    );
}

export default Hero;