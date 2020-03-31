import React, { Component } from "react";
import Router from "next/router";
import crud from "../../../../utils/firebaseCRUD";
import axios from "axios";
import Link from "next/link";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mounted: false,
        };
    }

    componentDidMount() {
        const sessionPrograms = JSON.parse(sessionStorage.getItem("programs"));
        const pid = Router.query.pid.split("_id")[1];

        if (sessionPrograms) {
            const program = sessionPrograms.find(p => p._id == pid);
            this.setState({ program, mounted: true });
        }

        crud.getProgram(pid)
            .then(program => this.setState({ program }))
            .catch(err => console.error(err));
    }

    handlePay = () => {
        document.getElementById("pay-button").innerText = "paying";
        axios
            .get("/api/pay", {
                params: {
                    amount: "50",
                    pid: Router.query.pid,
                },
            })
            .then(res => {
                if (res.data.link) {
                    window.location.href = res.data.link;
                }
            });
    };

    render() {
        const { program } = this.state;

        if (!program) return null;
        return (
            <div className="mt-7">
                <div className="ml-7 mr-3 mt-7 mb-7">
                    <div className="mt-7 mb-7">
                        <div
                            className="btn btn--secondary"
                            id="pay-button"
                            onClick={this.handlePay}
                        >
                            pay
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
