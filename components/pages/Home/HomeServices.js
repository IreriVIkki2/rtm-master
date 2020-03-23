import React from "react";

const HomeServices = () => {
    return (
        <section className="services">
            <div className="services__container">
                <div className="services__main">
                    <div className="services__service-item--desc">
                        <p className="title title--sm mb-2">What I offer</p>
                        <p className="title title--lg mb-2">Services</p>
                        <p className="mb-3">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Quidem voluptate quas quasi ex consequuntur
                            numquam eligendi minima dolores iste fuga, nemo
                            laboriosam nam. Saepe quis similique, dolore odio
                            praesentium molestiae.
                        </p>
                    </div>
                    <div className="services__service-item mb-3">
                        <div className="services__service-item--img">
                            <img
                                src="/images/rph1.jpg"
                                alt=""
                                className="img-cover"
                            />
                            <div className="services__service-item--img-meta">
                                <p className="title title--md">
                                    Muscle Sculpin
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="services__second">
                    <div className="services__service-item services__second--1">
                        <div className="services__service-item--img">
                            <img
                                src="/images/rph4.jpg"
                                alt=""
                                className="img-cover"
                            />
                            <div className="services__service-item--img-meta">
                                <p className="title title--md">Fat Burning</p>
                            </div>
                        </div>
                    </div>
                    <div className="services__service-item--desc services__service--2">
                        <p className="mb-3">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Quaerat quod nesciunt doloremque? Autem
                            nesciunt labore accusantium excepturi illum, atque
                            cum quasi voluptate sunt repellendus blanditiis
                            dolores modi eius nulla dicta.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeServices;
