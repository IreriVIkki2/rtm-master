import React, { Component } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

export class Exercise extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        console.log(Router.query);
    }

    render() {
        return (
            <div style={{ display: "flex" }}>
                <aside
                    style={{
                        borderRight: "solid 1px #242424",
                        paddingRight: "20px",
                        marginRight: "20px",
                    }}
                >
                    <button>Add Day</button>
                    <ul>
                        <li>Day 1</li>
                    </ul>
                </aside>
                <main>
                    <div style={{ display: "flex", marginRight: "15px" }}>
                        <button>Add Routine</button>
                        <ul style={{ display: "flex", marginRight: "15px" }}>
                            <li>Routine 1</li>
                        </ul>
                    </div>
                </main>
            </div>
        );
    }
}

export default Exercise;
