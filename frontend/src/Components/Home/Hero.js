import photoGrid from '../../images/Group 77.png';

function Hero() {
    return (
        <section className='hero-container'>
            <img src={photoGrid} alt="airbnb logo" />
            <div>
                <h1>
                    Eventbuddy
                </h1>
                <p>

                    Eventbuddy is one of the greatest event apps for finding local happenings of all kinds. Music f estivals, craft shows, and even bar crawls are right at your fingertips.

                    Enable access to your location to see what's happening around you, or search by city. The app then gives you dates, times, locations, maps, and similar events. You can also check ticket prices and order those that are available.

                    You can browse events by category or search for something specific. Plus, you can share happenings with your friends or save your favorites with a free account.
                </p>
            </div>
        </section>
    );
}

export default Hero;