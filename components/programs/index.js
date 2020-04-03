import Link from "next/link";

export default ({ programs }) => {
    if (programs.length === 0) {
        return <p className="title">No programs</p>;
    }
    const pMain = programs[0];
    console.log("pMain", pMain);
    const allPrograms = programs.slice(1, programs.length);
    return (
        <div className="bg--color-text-light">
            <header
                className="program-header"
                style={{
                    backgroundImage: `linear-gradient(to right bottom, rgba(44, 45, 52, 0.8), rgba(44, 45, 52, 0.5)), url("${pMain.banner}")`,
                }}
            >
                <div className="program-header__content">
                    <div className="program-header__content--inner"></div>
                    <div className="program-header__content--inner">
                        <small className="title title--sm mb-3">
                            <span className="">
                                {pMain.category || "Work Out"}
                            </span>
                            {"  "} //{"  "}
                            <span className="">
                                {pMain.difficulty || "Beginner"}
                            </span>
                        </small>
                        <h1 className="title title--md mb-3 text-secondary">
                            {pMain.title}
                        </h1>
                        <p className="mb-3">{pMain.description}</p>

                        <Link
                            href="/programs/[pid]"
                            as={`/programs/${pMain.slug}`}
                        >
                            <a className="btn btn--secondary">Read More</a>
                        </Link>
                    </div>
                </div>
            </header>

            <section className="">
                <div>
                    {programs.map(p => {
                        return (
                            <div key={p._id} className="program">
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
                                            src={p.banner}
                                            alt=""
                                            className="program__banner--img"
                                        />
                                    </div>
                                </div>
                                <div className="program__info">
                                    <small className="title title--sm mb-3">
                                        <span className="">
                                            {p.category || "Work Out"}
                                        </span>
                                        {"  "} // {"  "}
                                        <span className="">
                                            {p.difficulty || "Beginner"}
                                        </span>
                                    </small>
                                    <p className="title title--md text-black mb-2">
                                        {p.title}
                                    </p>
                                    <p className="mb-2">{p.description}</p>
                                    <Link
                                        href="/programs/[pid]"
                                        as={`/programs/${p.slug}`}
                                    >
                                        <a className="btn btn--tertiary">
                                            Read More
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
