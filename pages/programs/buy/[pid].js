import React, { Component } from "react";
import Router from "next/router";
import crud from "../../../utils/firebaseCRUD";
import Link from "next/link";

export class BuyProgram extends Component {
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
            .then(program => {
                console.log(
                    "BuyProgram -> componentDidMount -> program",
                    program,
                );
                this.setState({ program });
            })
            .catch(err => console.error(err));
    }

    render() {
        const { mounted, program } = this.state;
        console.log("BuyProgram -> render -> program", program);

        if (!program) return null;
        return (
            <div className="program-sales">
                <header
                    className="program-header"
                    style={{
                        backgroundImage: `linear-gradient(to right bottom, rgba(44, 45, 52, 0.8), rgba(44, 45, 52, 0.5)), url("${program.snippet.banner}")`,
                    }}
                >
                    <div className="program-header__content">
                        <div className="program-header__content--inner"></div>
                        <div className="program-header__content--inner">
                            <small className="title title--sm mb-3">
                                <span className="">
                                    {program.snippet.category}
                                </span>
                                {"  "} //{"  "}
                                <span className="">
                                    {program.snippet.difficulty}
                                </span>
                            </small>
                            <h1 className="title title--md mb-3 text-secondary">
                                {program.snippet.title}
                            </h1>
                            <p className="mb-3">
                                {program.snippet.description}
                            </p>

                            <Link
                                href="/programs/buy/[pid]"
                                as={`/programs/buy/${program.slug}`}
                            >
                                <a className="btn btn--secondary">
                                    {program.sales.callToAction}
                                </a>
                            </Link>
                        </div>
                    </div>
                </header>
                {mounted && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: program.sales.article,
                        }}
                        className="program-sales-article"
                    ></div>
                )}
            </div>
        );
    }
}

export default BuyProgram;
