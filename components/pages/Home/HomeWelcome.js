import React from "react";
import Link from "next/link";

const HomeWelcome = () => {
    return (
        <section className="welcome">
            <div className="welcome__info">
                <p className="title title--sm title--sm-redline ml-7">
                    Fit life with rhotimmi
                </p>
                <h1 className="title title--lg mb-3 ml-7">Welcome</h1>
                <p className="mb-3 ml-7">
                    My name is Rhotimmi Peter and I am a Certified Personal
                    Trainer, Fitness model, Enthusiast and Content creator. I
                    have always been a skinny boy before I started working out
                    back in 2009 with the sole aim of building my body, having
                    shredded abs and looking just like those we see in the
                    magazines. I accomplished my goal of having those shredded
                    abs with little to no proper knowledge of body building but
                    I failed in recording any significant weight gain or body
                    size but I believed my goals were attainable and I just had
                    to keep pushing.
                </p>
                <Link href="/about">
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
    );
};

export default HomeWelcome;
