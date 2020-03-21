import { Fragment } from "react";
import Link from "next/link";
import crud from "../../utils/firebaseCRUD";

export default ({ allPrograms }) => {
    const mainProgram = allPrograms[0];
    const programs = allPrograms.slice(1, allPrograms.length);
    return (
        <div>
            <header
                className="program-header"
                style={{
                    backgroundImage: `linear-gradient(to right bottom, rgba(44, 45, 52, 0.8), rgba(44, 45, 52, 0.5)), url("${mainProgram.snippet.banner}")`,
                }}
            >
                <div className="program-header__content">
                    <div className="program-header__content--inner"></div>
                    <div className="program-header__content--inner">
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
                            as={`/programs/buy/${mainProgram.slug}`}
                        >
                            <a className="btn btn--secondary">
                                {mainProgram.sales.callToAction}
                            </a>
                        </Link>
                    </div>
                </div>
            </header>

            <section className="">
                <div>
                    {programs.map(program => {
                        const { snippet, _id, sales, slug } = program;
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
                                        as={`/programs/buy/${slug}`}
                                    >
                                        <a className="btn btn--tertiary">
                                            {sales.callToAction}
                                        </a>
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
export async function getStaticProps() {
    let programs = null;
    await crud
        .getALlPrograms()
        .then(docs => {
            programs = docs;
        })
        .catch(err => {
            console.error(err);
            return { props: {} };
        });
    return { props: { allPrograms: programs } };
}
