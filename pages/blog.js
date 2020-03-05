import React, { Component } from "react";
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
        // sessionStorage.setItem("page", JSON.stringify(this.props.page));
    }

    render() {
        const { page } = this.props;
        return (
            <div>
                <h1>
                    This is the <b>BLOG</b> page
                </h1>
                <h1>{page.header__title}</h1>
                <pre>{JSON.stringify(page, undefined, 2)}</pre>
            </div>
        );
    }
}
