import React, { useState, useRef } from 'react';
import './LandingPage.css';
import Carousel from 'react-bootstrap/Carousel';
import c1 from '../images/stevejobs.jpg';
import c2 from '../images/sandberg.webp';
import c3 from '../images/bezos.jpg';
import c4 from '../images/obama.jpg';
import c5 from '../images/susan.webp';
import { Navbar, Button, ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
function LandingPage() {
    const navigate = useNavigate();
    const navigateToSignup = () => {
        navigate('/signup');
    };

    // Add a ref to the section you want to scroll to
    const aboutUsSectionRef = React.createRef();

    const scrollToAboutUs = () => {
        aboutUsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    
  


    //EMAIL

    const form = useRef();

    const sendEmail = (e) => {
        emailjs.sendForm('service_ggs09rj', 'template_eqxf61m', form.current, 'KI4mKv2OPZRCbaOCY')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

    };
    return (
        <div className='box3'>
            <Navbar>
                <Navbar.Brand>
                    <h1 className='H1'>LISTINATOR</h1>
                </Navbar.Brand>
                <button className='abtus' onClick={scrollToAboutUs}>
                    <span>    About Us</span>
                </button>
                <a href='#connect'><button className='cntus' >
                   <span>Contact Us</span>
                </button></a> 

            </Navbar>
            <div className='box1'>
                <div className='box2'>
                    <Carousel>
                        <Carousel.Item interval={7000}>
                            <img src={c1} alt="todo" />
                            <Carousel.Caption>
                                -Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={5000}>
                            <img src={c2} alt="todo" />
                            <Carousel.Caption>
                                -I love to-do lists! They help me stay on track and make sure that I'm not forgetting anything important
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img src={c5} alt="todo" />
                            <Carousel.Caption>
                                -Done is better than perfect.
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={5000}>
                            <img src={c3} alt="todo" />
                            <Carousel.Caption>
                                -If you never want to be criticized, for goodness' sake don't do anything new.
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={5000}>
                            <img src={c4} alt="todo" />
                            <Carousel.Caption>
                                -The best way to not feel hopeless is to get up and do something.
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <button className='home' onClick={navigateToSignup}>
                    <span>Lets Do Something Today</span>
                </button>
            </div>

            {/* Add an id and ref to the section you want to scroll to */}
            <div className='foot' id='aboutUsSection' ref={aboutUsSectionRef}>
                <footer>
                    <h2 className='abthead'> ABOUT US </h2>
                    Welcome to our to-do list making website, where productivity meets simplicity!
                    At LISTINATOR, we understand the importance of staying organized in the hustle and bustle of everyday life.
                    Our platform is designed with you in mind, providing an intuitive and user-friendly experience to help you effortlessly manage your tasks.
                    Whether you're a student juggling assignments, a professional with deadlines, or simply someone looking to stay on top of their goals, our to-do list maker is here to streamline your day.
                    With a clean and straightforward interface, customizable features, and seamless synchronization across devices, We are your go-to companion for turning chaos into clarity.
                    Join us on the journey to enhanced productivity and make every day count!
                </footer>

                <h2 className='abthead'> GET IN TOUCH </h2>
            </div>
            <form className="contact-form" ref={form} onSubmit={sendEmail} id='connect'>
                <input
                    type="text"
                    name="fname"
                    placeholder="First Name"
                />

                <input
                    type="text"
                    name="lname"
                    placeholder="Last Name"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                />

                <input
                    type="tel"
                    name="phonenumber"
                    placeholder="Phone Number"
                />

                <textarea
                    name="message"
                    placeholder="Your Message"

                />
                <button type="submit" className='btnnn'>
                    <span>Send</span>
                </button>
            </form>
        </div>
    );
}

export default LandingPage;