import { Fragment } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import baseUrl from "../../baseUrl";

export default ({ allPrograms }) => {
    const mainProgram = allPrograms[0];
    const programs = allPrograms.slice(1, allPrograms.length);
    return (
        <div>
            <header
                className="header"
                style={{
                    backgroundImage: `linear-gradient(to right bottom, rgba(44, 45, 52, 0.8), rgba(44, 45, 52, 0.5)),url("${mainProgram.snippet.banner}")`,
                }}
            >
                <div className="header__content">
                    <div className="header__content--inner"></div>
                    <div className="header__content--inner">
                        <small className="title title--sm mb-3">
                            <span className="">
                                {mainProgram.snippet.category}
                            </span>
                            {"  "} //{"  "}
                            <span className="">
                                {mainProgram.snippet.difficulty}
                            </span>
                        </small>
                        <h1 className="title title--md mb-3 text-secondary">
                            {mainProgram.snippet.title}
                        </h1>
                        <p className="mb-3">
                            {mainProgram.snippet.description}
                        </p>

                        <Link
                            href="/programs/buy/[pid]"
                            as={`/programs/buy/${mainProgram._id}`}
                        >
                            <button className="btn btn--secondary">
                                {mainProgram.sales.callToAction}
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            <section className="">
                <div>
                    {programs.map(program => {
                        const { snippet, _id, sales } = program;
                        const {
                            difficulty,
                            category,
                            banner,
                            title,
                            description,
                        } = snippet;
                        return (
                            <div key={_id} className="program">
                                <div className="program__banner">
                                    <div className="program__banner--inner">
                                        <div className="program__banner--bg">
                                            <div className="program__banner--bg-item" />
                                            <div className="program__banner--bg-item" />
                                            <div className="program__banner--bg-item" />
                                            <div className="program__banner--bg-item" />
                                            <div className="program__banner--bg-item" />
                                        </div>
                                        <img
                                            src={banner}
                                            alt=""
                                            className="program__banner--img"
                                        />
                                    </div>
                                </div>
                                <div className="program__info">
                                    <small className="title title--sm mb-3">
                                        <span className="">{category}</span>
                                        {"  "} // {"  "}
                                        <span className="">{difficulty}</span>
                                    </small>
                                    <p className="title title--md text-black mb-2">
                                        {title}
                                    </p>
                                    <p className="mb-2">{description}</p>
                                    <Link
                                        href="/programs/buy/[pid]"
                                        as={`/programs/buy/${_id}`}
                                    >
                                        <button className="btn btn--tertiary">
                                            {sales.callToAction}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

// This function gets called at build time
export async function getStaticProps(ctx) {
    // Call an external API endpoint to get posts
    console.log("Programs -> getStaticProps -> ctx", typeof ctx, ctx);
    const res = await fetch(`${baseUrl}/api/programs`);
    const json = await res.json();
    return { props: { allPrograms: json.programs } };
}
