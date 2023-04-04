import './Home.css'

// This is a functional component called Home
const Home = () => {
    // Returns the following JSX to be rendered on the screen
    return (
        <div className="home">

            {/* Section 1 with a heading and an image */}
            <section className="main_section_1">
                <h1>We deliver products in minutes!<br /><span>With Love,care and affection!</span></h1>
                <img src="home_img_4.png" alt="" />
            </section>

            {/* Section 2 with an image and a heading */}
            <section className="main_section_3">
                <img src="home_img_3.PNG" alt="" />
                <h1>This is a new generation store.<br /><span>You no longer need to go to the store, we deliver the goods you want to your door in minutes!</span></h1>
            </section>

            {/* Section 3 with a heading and an image */}
            <section className="main_section_2">
                <h1>Unable to go to Restaurant?<br /> <span>Don't worry we will deliver your favorite food to you!</span></h1>
                <img src="home_img_2.PNG" alt="" />
            </section>
        </div>
    );
}

// Exports the Home component as the default export of the module
export default Home;
