import { IoIosAdd } from "react-icons/io";
import Link from "next/link";

const HomePrograms = () => {
    return (
        <section className="home-programmes">
            <div className="home-programmes__top">
                <div className="home-programmes__top-container">
                    <p className="title title--sm mb-2 ml-7">
                        tailor made for you
                    </p>
                    <p className="title title--lg mb-3 ml-1">Programs</p>
                    <p className="mb-3 home-programmes__description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Cumque, obcaecati? Tempora ipsum, minus qui
                        inventore similique eveniet ducimus architecto ad magnam
                        asperiores atque corporis rerum laboriosam rem
                        reprehenderit fuga consectetur?
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
                            <span className="ml-1 text-white">Weight Loss</span>
                        </li>
                        <li className="home-programmes__item-li">
                            <IoIosAdd />
                            <span className="ml-1 text-white">Weight Loss</span>
                        </li>
                        <li className="home-programmes__item-li">
                            <IoIosAdd />
                            <span className="ml-1 text-white">Weight Loss</span>
                        </li>
                        <li className="home-programmes__item-li">
                            <IoIosAdd />
                            <span className="ml-1 text-white">Weight Loss</span>
                        </li>
                        <li className="home-programmes__item-li">
                            <IoIosAdd />
                            <span className="ml-1 text-white">Weight Loss</span>
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
                            <span className="ml-1 text-white">Weight Loss</span>
                        </li>
                        <li className="home-programmes__item-li">
                            <IoIosAdd />
                            <span className="ml-1 text-white">Weight Loss</span>
                        </li>
                        <li className="home-programmes__item-li">
                            <IoIosAdd />
                            <span className="ml-1 text-white">Weight Loss</span>
                        </li>
                        <li className="home-programmes__item-li">
                            <IoIosAdd />
                            <span className="ml-1 text-white">Weight Loss</span>
                        </li>
                        <li className="home-programmes__item-li">
                            <IoIosAdd />
                            <span className="ml-1 text-white">Weight Loss</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default HomePrograms;
