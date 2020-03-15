import React, { Component } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import baseUrl from "../baseUrl";
import UserContext from "../context/UserContext";
import crud from "../utils/firebaseCRUD";

export default class extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header className="home-header">
                    <div className="home-header__top ml-7">
                        <p className=" home-header__subtitle title title--sm title--sm-redline">
                            Elite personal training services
                        </p>
                        <h1 className="home-header__title">
                            <span className="title title--lg">THE TRAINER</span>
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
                    <div className="home-header__bottom">
                        <div className="home-header__bottom-space"></div>
                        <div className="home-header__bottom-scroller">
                            <span>v v ------------</span>
                        </div>
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
                            <img
                                className="welcome__banners--top-img"
                                src="images/rph1.jpg"
                                alt=""
                            />
                        </div>
                        <div className="welcome__banners--bottom">
                            <img
                                className="welcome__banners--bottom-img"
                                src="images/rph5.jpg"
                                alt=""
                            />
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
                            <div className="clients__item">
                                <div className="clients__item--name title--md">
                                    <p className="title--md">John Doe</p>
                                </div>
                            </div>
                            <div className="clients__item">
                                <div className="clients__item--name title--md">
                                    <p className="title--md">John Doe</p>
                                </div>
                            </div>
                            <div className="clients__item">
                                <div className="clients__item--name title--md">
                                    <p className="title--md">John Doe</p>
                                </div>
                            </div>
                            <div className="clients__item">
                                <div className="clients__item--name title--md">
                                    <p className="title--md">John Doe</p>
                                </div>
                            </div>
                            <div className="clients__item">
                                <div className="clients__item--name title--md">
                                    <p className="title--md">John Doe</p>
                                </div>
                            </div>
                            <div className="clients__item">
                                <div className="clients__item--name title--md">
                                    <p className="title--md">John Doe</p>
                                </div>
                            </div>
                            <div className="clients__item">
                                <div className="clients__item--name title--md">
                                    <p className="title--md">John Doe</p>
                                </div>
                            </div>
                        </div>

                        <div className="clients__scrollbar mb-7"></div>
                    </div>
                </section>

                {/* -------- */}

                <section className="services"></section>
                <section className="programmes"></section>
                <section className="gallery"></section>
                <section className="contact"></section>

                <footer className="footer"></footer>
            </div>
        );
    }
}
