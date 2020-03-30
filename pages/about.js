import React, { Component } from "react";
import AppContext from "../context/AppContext";

export default class extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            activities: [
                {
                    title: "fitness model",
                    description:
                        "I just genuinely love being in front of the camera. Hence, my appearance has always been a priority for me. I have been a fashion model since 2015 starring in clothing brand photoshoot, music videos, magazine shoots both in Africa and Europe. In for collaborations as a fitness and fashion modelling. Here are some of my photos…",
                },
                {
                    title: "FITNESS TRAINER",
                    description:
                        "I am a certified fitness professional. As you already know, there are so many reasons why people choose to exercise. Whether you want to improve your sport performance, lose weight, gain weight, build muscle or look and feel better I can help you achieve your goals. Why not send a message and let’s discuss about how to reach your goals. Start today!",
                },
                {
                    title: "FITNESS ENTHUSIAST",
                    description:
                        "As part of my initiative to give everyone an insight to how I train and a professional guidance physical fitness, I post my daily workouts on my social media accounts. Make sure you follow, comment, tag and share the videos. Tag my social media handles so I can repost on my page.",
                },
                {
                    title: "CONTENT CREATOR",
                    description:
                        "I bring my creative ideas to live through creation of contents so as to entertain, educate, motivate and change the perception of the common man to exercise.",
                },
            ],
        };
    }

    componentDidMount() {}

    render() {
        const { activities } = this.state;
        return (
            <div className="about">
                <section className="about-header pt-7">
                    <div className="about-header__bg">
                        <span></span>
                        <span></span>
                        <img
                            src="/about-header.png"
                            alt=""
                            className="about-header__bg--img img-cover"
                        />
                    </div>
                    <div className="about-header__content">
                        <p className="title about-header__content--title">
                            <span className="title--lg mb-1">welcome</span>
                            <span className="mb-1 title--md">to the</span>
                            <span className="mb-1 title--lg">fit life</span>
                            <span className="mb-1 title--md">with</span>
                            <span className="mb-1 title--lg text-secondary">
                                rhotimmi
                            </span>
                        </p>
                        <span></span>
                    </div>
                    <div className="home-header__explore">
                        <p className="home-header__explore-item title">
                            Read more
                        </p>
                    </div>
                </section>

                <section className="about-me">
                    <div className="about-me__title">
                        <p className="title title--sm">This is my story</p>
                        <p className="title title--lg text-black">
                            Rhotimmi peter
                        </p>
                    </div>
                    <div className="about-me__meta">
                        <p className="mr-3">
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
                        <p className="">
                            My breakthrough year was 2018 when I gained 6kg in a
                            month. I started receiving a lot of engagements on
                            my social media from people are also struggling to
                            gain mass and build a body like mine. Right then, I
                            knew I have found something to live for and a
                            purpose for life. Seeing the results made me fall in
                            love with the lifestyle and I went into professional
                            fitness studies.
                        </p>
                    </div>
                    <div className="home-header__explore">
                        <p className="home-header__explore-item title">
                            my certifications
                        </p>
                    </div>
                </section>

                <section className="about-certs">
                    <div className="about-certs__container">
                        <div className="about-certs__item">
                            <p className="">
                                Certified ACE Personal Trainer | Kenyan Red
                                <i> Cross CPR/AED/First Aid</i>
                            </p>
                        </div>
                        <div className="about-certs__item">
                            <p className="">
                                BS Biotechnology, Medical Anatomy (
                                <i>Practicing Health medicine</i>).
                            </p>
                        </div>
                    </div>
                </section>

                <section className="about-imgs">
                    <div className="about-imgs__item">
                        <img
                            src="/images/insta1.jpg"
                            alt=""
                            className="img-cover"
                        />
                    </div>
                    <div className="about-imgs__item">
                        <img
                            src="/images/insta2.jpg"
                            alt=""
                            className="img-cover"
                        />
                    </div>
                </section>

                <section className="about-know">
                    <ul className="about-know__inner">
                        {activities.map((activity, index) => {
                            return (
                                <div key={index} className="about-know__item">
                                    <p className="about-know__item-counter title">
                                        <span className="about-know__item-counter--number">
                                            0{index + 1}
                                        </span>
                                        <span className="about-know__item-counter--small-line"></span>
                                        <span className="about-know__item-counter--long-line"></span>
                                    </p>
                                    <div className="about-know__content">
                                        <div className="">
                                            <p className="title bolder title--md text-white">
                                                {activity.title}
                                            </p>
                                        </div>
                                        <div className="">
                                            <p className="">
                                                {activity.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                    <div className="home-header__explore">
                        <p className="home-header__explore-item title">
                            my certifications
                        </p>
                    </div>
                </section>

                <section className="about-me">
                    <div className="about-me__title">
                        <p className="title title--sm">
                            {" "}
                            No bullshit. No Speculation.
                        </p>
                        <p className="title title--lg text-black">
                            Rhotimmi peter
                        </p>
                    </div>
                    <div className="about-me__meta">
                        <p className="mr-3">
                            People needs to understand that bodybuilding is a
                            pretty challenging and mentally tasking sport that
                            requires strong determination and will to push
                            through the physical and mental barriers it holds. I
                            am still a work in progress. I still have so many
                            fitness goals to crush in the coming years so as to
                            be just like how I have always pictured myself to
                            be. That ‘strong athletic guy with a shredded abs”
                            look.
                        </p>
                        <p className="">
                            I am hoping to educate, entertain and motivate other
                            people with my fitness journey. I am looking to
                            build a fit minded community and eventually change
                            the local community’s view on the concept of body
                            building and physical exercise in general.
                        </p>
                    </div>
                </section>
            </div>
        );
    }
}
