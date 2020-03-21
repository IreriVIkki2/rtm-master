import React from "react";

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
                <p className="title mb-3">
                    <a href="#">rhotimmi.com</a>
                </p>

                <div className="">
                    <div className="">
                        <img src="" alt="" className="img-cover" />
                    </div>
                    <div className="">
                        <img src="" alt="" className="img-cover" />
                    </div>
                    <div className="">
                        <img src="" alt="" className="img-cover" />
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
                <p>
                    <span>Designed and build by </span>
                    <a href="https://irerivictor.com" className="ml-1">
                        Ireri Victor
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
