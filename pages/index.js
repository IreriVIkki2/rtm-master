import React, { Component } from "react";
import Link from "next/link";
import UserContext from "../context/UserContext";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoLogoFacebook } from "react-icons/io";
import { IoLogoTwitter } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import Contact from "../components/Contact";

export default class extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            testimonials: [
                {
                    name: "John Doe",
                    photo: "/images/pexels1.jpg",
                    message:
                        " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, repudiandae quisquam mollitia velit totam, animi nihil nostrum sit rem aspernatur pariatur minus. Dolore quod harum quibusdam. Reiciendis perspiciatis praesentium commodi!",
                },
                {
                    name: "John Doe",
                    photo: "/images/pexels2.jpg",
                    message:
                        " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, repudiandae quisquam mollitia velit totam, animi nihil nostrum sit rem aspernatur pariatur minus. Dolore quod harum quibusdam. Reiciendis perspiciatis praesentium commodi!",
                },
                {
                    name: "Jane Doe",
                    photo: "/images/pexels5.jpg",
                    message:
                        " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, repudiandae quisquam mollitia velit totam, animi nihil nostrum sit rem aspernatur pariatur minus. Dolore quod harum quibusdam. Reiciendis perspiciatis praesentium commodi!",
                },
                {
                    name: "John Doe",
                    photo: "/images/pexels4.jpg",
                    message:
                        " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, repudiandae quisquam mollitia velit totam, animi nihil nostrum sit rem aspernatur pariatur minus. Dolore quod harum quibusdam. Reiciendis perspiciatis praesentium commodi!",
                },
                {
                    name: "Jane Doe",
                    photo: "/images/pexels6.jpg",
                    message:
                        " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, repudiandae quisquam mollitia velit totam, animi nihil nostrum sit rem aspernatur pariatur minus. Dolore quod harum quibusdam. Reiciendis perspiciatis praesentium commodi!",
                },
                {
                    name: "John Doe",
                    photo: "/images/pexels5.jpg",
                    message:
                        " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, repudiandae quisquam mollitia velit totam, animi nihil nostrum sit rem aspernatur pariatur minus. Dolore quod harum quibusdam. Reiciendis perspiciatis praesentium commodi!",
                },
            ],
        };
    }

    render() {
        return (
            <div className="home">
                <header className="home-header">
                    <div className="home-header__top ml-7">
                        <div className="home-header__meta">
                            <p className=" home-header__subtitle title title--sm title--sm-redline">
                                Elite personal training services
                            </p>
                            <h1 className="home-header__title">
                                <span className="title title--lg">
                                    THE TRAINER
                                </span>
                                <span className="title title--lg bolder">
                                    MATTERS
                                </span>
                            </h1>

                            <div className="home-header__cta">
                                <button className="btn btn--secondary mr-3">
                                    Contact Me
                                </button>
                                <Link href="/about">
                                    <a className="btn btn__link btn__link--tertiary">
                                        Learn more
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="home-header__social">
                            <div className="home-header__social-inner">
                                <p className="title">follow me</p>
                                <span className="home-header__social-inner-line"></span>
                                <span className="home-header__social-icon">
                                    <IoLogoFacebook />
                                </span>
                                <span className="home-header__social-icon">
                                    <IoLogoTwitter />
                                </span>
                                <span className="home-header__social-icon">
                                    <IoLogoInstagram />
                                </span>
                                <span className="home-header__social-icon">
                                    <IoLogoYoutube />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="home-header__bottom">
                        <div className="home-header__bottom-space"></div>
                        <div className="home-header__bottom-scroller">
                            <span className="home-header__bottom-scroller-arrow-back">
                                <IoIosArrowBack />
                            </span>
                            <span className="home-header__bottom-scroller-arrow-forward">
                                <IoIosArrowForward />
                            </span>

                            <span className="home-header__bottom-scroller-01 bolder">
                                01
                            </span>
                            <span className="home-header__bottom-scroller-line"></span>
                            <span className="home-header__bottom-scroller-02">
                                02
                            </span>
                        </div>
                    </div>

                    <div className="home-header__explore">
                        <p className="home-header__explore-item title">
                            Explore
                        </p>
                    </div>
                </header>

                {/* ---------- */}
                <section className="welcome">
                    <div className="welcome__info">
                        <p className="title title--sm title--sm-redline ml-7">
                            Fit life with rhotimmi
                        </p>
                        <h1 className="title title--lg mb-3 ml-7">Welcome</h1>
                        <p className="mb-3 ml-7">
                            My name is Rhotimmi Peter and I am a Certified
                            Personal Trainer, Fitness model, Enthusiast and
                            Content creator. I have always been a skinny boy
                            before I started working out back in 2009 with the
                            sole aim of building my body, having shredded abs
                            and looking just like those we see in the magazines.
                            I accomplished my goal of having those shredded abs
                            with little to no proper knowledge of body building
                            but I failed in recording any significant weight
                            gain or body size but I believed my goals were
                            attainable and I just had to keep pushing.
                        </p>
                        <Link href="#">
                            <a className="btn btn__link btn__link--tertiary ml-7">
                                Find out more
                            </a>
                        </Link>
                    </div>
                    <div className="welcome__banners">
                        <div className="welcome__banners--top">
                            <div className="welcome__banners--top-img">
                                <img
                                    className="img-cover"
                                    src="images/rph1.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="welcome__banners--bottom">
                            <div className="welcome__banners--bottom-img">
                                <img
                                    className="img-cover"
                                    src="images/rph5.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- */}

                <section className="clients">
                    <p className="title title--sm ml-7">Trusted by</p>
                    <h2 className="title title--lg ml-7">Satisfied</h2>
                    <div className="clients__container pl-7">
                        <h2 className="title title--lg mb-7 text-white">
                            clients
                        </h2>
                        <div className="clients__items mb-7">
                            {this.state.testimonials.map((t, i) => {
                                return (
                                    <div key={i} className="clients__item">
                                        <img
                                            src={t.photo}
                                            alt=""
                                            className="img-cover clients__item--img"
                                        />
                                        <div className="clients__item--meta title--md">
                                            <p className="font-smaller clients__item--testimonial">
                                                <span className="title--md clients__item--name">
                                                    <span>{t.name}</span>{" "}
                                                    <span className="ml-1 text-secondary">
                                                        {" "}
                                                        <IoIosAdd />{" "}
                                                    </span>
                                                </span>
                                                <span className="clients__item--testimonial-message">
                                                    {t.message}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="clients__scrollbar mt-7"></div>
                </section>

                {/* -------- */}

                <section className="services">
                    <div className="services__container">
                        <div className="services__main">
                            <div className="services__service-item--desc">
                                <p className="title title--sm mb-2">
                                    What I offer
                                </p>
                                <p className="title title--lg mb-2">Services</p>
                                <p className="mb-3">
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Quidem voluptate quas
                                    quasi ex consequuntur numquam eligendi
                                    minima dolores iste fuga, nemo laboriosam
                                    nam. Saepe quis similique, dolore odio
                                    praesentium molestiae.
                                </p>
                            </div>
                            <div className="services__service-item">
                                <div className="services__service-item--img">
                                    <img
                                        src="/images/rph1.jpg"
                                        alt=""
                                        className="img-cover"
                                    />
                                    <div className="services__service-item--img-meta">
                                        <p className="title title--md">
                                            Muscle Sculpig
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="services__second">
                            <div className="services__service-item mb-7">
                                <div className="services__service-item--img">
                                    <img
                                        src="/images/rph4.jpg"
                                        alt=""
                                        className="img-cover"
                                    />
                                    <div className="services__service-item--img-meta">
                                        <p className="title title--md">
                                            Fat Burning
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="services__service-item--desc">
                                <p className="mb-3">
                                    Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Quaerat quod nesciunt
                                    doloremque? Autem nesciunt labore
                                    accusantium excepturi illum, atque cum quasi
                                    voluptate sunt repellendus blanditiis
                                    dolores modi eius nulla dicta.
                                </p>
                                <Link href="#">
                                    <a className="btn btn__link btn__link--secondary">
                                        Find out more
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* -------- */}

                <section className="home-programmes">
                    <div className="home-programmes__top">
                        <div className="home-programmes__top-container">
                            <p className="title title--sm mb-2">
                                tailor made for you
                            </p>
                            <p className="title title--lg mb-3">Programs</p>
                            <p className="mb-3 home-programmes__description">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Cumque, obcaecati? Tempora
                                ipsum, minus qui inventore similique eveniet
                                ducimus architecto ad magnam asperiores atque
                                corporis rerum laboriosam rem reprehenderit fuga
                                consectetur?
                            </p>
                            <Link href="/programs">
                                <a className="btn btn__link btn__link--tertiary">
                                    Find out more
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="home-programmes__bottom">
                        <div className="home-programmes__item home-programmes__item-1">
                            <p className="title title--md mb-1 text-white">
                                Ultimate weight loss program
                            </p>
                            <ul className="home-programmes__item-ul">
                                <li className="home-programmes__item-li">
                                    <IoIosAdd />
                                    <span className="ml-1 text-white">
                                        Weight Loss
                                    </span>
                                </li>
                                <li className="home-programmes__item-li">
                                    <IoIosAdd />
                                    <span className="ml-1 text-white">
                                        Weight Loss
                                    </span>
                                </li>
                                <li className="home-programmes__item-li">
                                    <IoIosAdd />
                                    <span className="ml-1 text-white">
                                        Weight Loss
                                    </span>
                                </li>
                                <li className="home-programmes__item-li">
                                    <IoIosAdd />
                                    <span className="ml-1 text-white">
                                        Weight Loss
                                    </span>
                                </li>
                                <li className="home-programmes__item-li">
                                    <IoIosAdd />
                                    <span className="ml-1 text-white">
                                        Weight Loss
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="home-programmes__item home-programmes__item-2">
                            <p className="title title--md mb-1 text-white">
                                Ultimate weight loss program
                            </p>
                            <ul className="home-programmes__item-ul">
                                <li className="home-programmes__item-li">
                                    <IoIosAdd />
                                    <span className="ml-1 text-white">
                                        Weight Loss
                                    </span>
                                </li>
                                <li className="home-programmes__item-li">
                                    <IoIosAdd />
                                    <span className="ml-1 text-white">
                                        Weight Loss
                                    </span>
                                </li>
                                <li className="home-programmes__item-li">
                                    <IoIosAdd />
                                    <span className="ml-1 text-white">
                                        Weight Loss
                                    </span>
                                </li>
                                <li className="home-programmes__item-li">
                                    <IoIosAdd />
                                    <span className="ml-1 text-white">
                                        Weight Loss
                                    </span>
                                </li>
                                <li className="home-programmes__item-li">
                                    <IoIosAdd />
                                    <span className="ml-1 text-white">
                                        Weight Loss
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="clients__scrollbar mb-7"></div>
                </section>
                <section className="gallery"></section>
                <section className="contact">
                    <Contact />
                </section>
            </div>
        );
    }
}
