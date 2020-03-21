import { IoLogoFacebook } from "react-icons/io";
import { IoLogoTwitter } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__main">
                <p className="title title--md mb-2">
                    <span className="mr-1">Rhotimmi</span>
                    <span className="bolder">Fitness</span>
                </p>
                <p className="title mb-1">Nairobi, Kenya. Smart Gyms</p>
                <p className="mb-1">+254 704 81261</p>
                <p className="title mb-7">
                    <a
                        href="/"
                        className="ml-1 btn btn__link btn__link--secondary"
                    >
                        rhotimmi.com
                    </a>
                </p>

                <div className="footer__socials">
                    <div className="footer__socials--item">
                        <a href="#" className="footer__socials--item-icon">
                            <IoLogoFacebook />
                        </a>
                    </div>
                    <div className="footer__socials--item">
                        <a href="#" className="footer__socials--item-icon">
                            <IoLogoTwitter />
                        </a>
                    </div>
                    <div className="footer__socials--item">
                        <a href="#" className="footer__socials--item-icon">
                            <IoLogoInstagram />
                        </a>
                    </div>
                    <div className="footer__socials--item">
                        <a href="#" className="footer__socials--item-icon">
                            <IoLogoYoutube />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer__meta font-smaller">
                <p className="title mb-sm">
                    @ rhotimmi 2020. all rights reserved
                </p>
                <p className="mb-sm d-inline-flex">
                    <a
                        href="#"
                        className="title d-inline-block font-smaller text-white mr-1"
                    >
                        privacy policy /
                    </a>
                    <a
                        href="#"
                        className="title d-inline-block font-smaller text-white mr-1"
                    >
                        terms of service /
                    </a>
                    <a
                        href="#"
                        className="title d-inline-block font-smaller text-white "
                    >
                        cookie policy
                    </a>
                </p>
                <small className="text-white title">
                    <span>Designed and built by </span>
                    <a
                        href="https://irerivictor.com"
                        className="ml-1 btn btn__link btn__link--secondary font-smaller"
                    >
                        Ireri Victor
                    </a>
                </small>
            </div>
        </footer>
    );
};

export default Footer;
