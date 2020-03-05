import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import baseUrl from "../baseUrl";
import UserContext from "../context/UserContext";
import crud from "../utils/firebaseCRUD";

export default class Index extends Component {
    static contextType = UserContext;
    static async getInitialProps(ctx) {
        const res = await fetch(`${baseUrl}/api/pages/home`);
        const json = await res.json();
        console.log("Index -> getInitialProps -> json", json);
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
                <h1>{page.header__title}</h1>
                <pre>{JSON.stringify(page, undefined, 2)}</pre>
            </div>
        );
    }
}
