import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoLogoFacebook } from "react-icons/io";
import { IoLogoTwitter } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io";

const HomeHeader = () => {
    return (
        <header className="home-header">
            <div className="home-header__top ml-7">
                <div className="home-header__meta">
                    <p className=" home-header__subtitle title title--sm title--sm-redline">
                        Elite personal training services
                    </p>
                    <h1 className="home-header__title mb-3">
                        <span className="title title--lg">THE TRAINER</span>
                        <span className="title title--lg bolder">MATTERS</span>
                    </h1>

                    <div className="home-header__cta">
                        <Link href="/contact">
                            <a className="btn btn--secondary mr-3">
                                Learn more
                            </a>
                        </Link>
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
                    <span className="home-header__bottom-scroller-02">02</span>
                </div>
            </div>

            <div className="home-header__explore">
                <p className="home-header__explore-item title">Explore</p>
            </div>
        </header>
    );
};

export default HomeHeader;
