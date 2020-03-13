import React, { Component } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import baseUrl from "../baseUrl";
import UserContext from "../context/UserContext";
import crud from "../utils/firebaseCRUD";

export default class extends Component {
    static contextType = UserContext;
    static async getInitialProps(ctx) {
        const res = await fetch(`${baseUrl}/api/pages/home`);
        const json = await res.json();
        return { page: json.page };
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        crud.test(Date.now(), "this is the message I want to add.");
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
                            <button className="btn btn--secondary">
                                Contact Me
                            </button>
                            <Link href="/about">
                                <a>Learn more</a>
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
                <section className="welcome">
                    <div className="welcome__info">
                        <p className="title title--sm title--sm-redline">
                            Fit life with rhotimmi
                        </p>
                        <h1 className="title title--lg">Welcome</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Impedit consequatur veniam consequuntur id
                            voluptates quas temporibus earum quaerat blanditiis
                            suscipit. Minus veritatis suscipit voluptates
                            temporibus autem architecto necessitatibus delectus
                            nihil!
                        </p>
                        <Link href="#">
                            <a className="btn">Find out more</a>
                        </Link>
                    </div>
                    <div className="welcome__banners">
                        <div className="">
                            <img src="" alt="" />
                        </div>

                        <div>
                            <img src="" alt="" className="" />
                        </div>
                    </div>
                </section>
                <section className=""></section>
                <section className=""></section>
                <section className=""></section>
                <section className=""></section>
                <section className=""></section>
                <footer className=""></footer>
            </div>
        );
    }
}
