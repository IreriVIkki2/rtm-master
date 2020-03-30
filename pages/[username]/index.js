import { useContext, useState, useEffect, Fragment } from "react";
import AppContext from "../../context/AppContext";
import crud from "../../utils/firebaseCRUD";
import Link from "next/link";

export default () => {
    const { profile, isAdmin, user } = useContext(AppContext);

    if (!profile) return <h1 className="title title--sm">loading</h1>;
    console.log("profile", profile);

    const [programs, setPrograms] = useState(false);

    useEffect(() => {
        if (!programs) {
            const storagePrograms = sessionStorage.getItem("programs");
            // If there are no programs in local storage. make a query to fetch the programs
            if (storagePrograms) {
                setPrograms(JSON.parse(storagePrograms));
            } else {
                crud.getALlPrograms()
                    .then(programs => {
                        setPrograms(programs);
                        sessionStorage.setItem(
                            "programs",
                            JSON.stringify(programs),
                        );
                    })
                    .catch(err => console.error(err));
            }
        }
    }, [programs]);

    if (!isAdmin) {
        return (
            <div>
                <p className="mb-7"></p>
                <h1 className="title">You are Admin</h1>
            </div>
        );
    }

    // Render data...

    return (
        <div className="profile">
            <div className="profile__purchases">
                {profile.purchases.programs.length > 0 ? (
                    <div>
                        <div className="profile__purchases--title">
                            <p className="title--md text-tertiary profile__purchases--title-item">
                                Purchased Programs
                            </p>
                        </div>

                        <div className="profile__purchases--programs">
                            {profile.purchases.programs.map(p => {
                                return (
                                    <div
                                        key={p.programId}
                                        className="profile__purchases--program p-program"
                                    >
                                        <div className="p-program__info">
                                            <p className="p-program__title title--md text-black">
                                                {p.snippet.title}
                                            </p>
                                            <div className="p-program__meta">
                                                <p className="mr-1 text-tertiary">
                                                    {p.completion}% completed
                                                </p>

                                                {!p.isRestDay ? (
                                                    <Fragment>
                                                        <p className="mr-1 text-secondary">
                                                            Day {p.dayOrder}
                                                        </p>
                                                        <p className="mr-1 text-tertiary-2">
                                                            {p.routine}
                                                        </p>
                                                    </Fragment>
                                                ) : (
                                                    <p className="mr-1 text-secondary">
                                                        Resting day coffee
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <Link
                                            href="/[username]/[pid]"
                                            as={`/${user.displayName}/${p.slug}`}
                                        >
                                            <button className="btn btn--primary text-black p-program__cta">
                                                Continue
                                            </button>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="profile__purchases--none">
                        <p className="title--md text-secondary mb-7 mt-7">
                            You don't have any programs by Rhotimmi yet. Check
                            out these new and effective programs below or follow
                            Rhotimmi on social media to keep up with all the
                            latest on fitness.
                        </p>

                        <div className="profile__programs">
                            {programs &&
                                programs.map(p => (
                                    <div key={p._id} className="small-program">
                                        <div className="small-program__bg">
                                            <img
                                                className="small-program__bg--img"
                                                src={p.snippet.banner}
                                                alt={p.snippet.title}
                                            />
                                        </div>

                                        <div className="small-program__content">
                                            <p className="title title--sm mt-auto">
                                                {p.snippet.title}
                                            </p>

                                            <Link href="" as="">
                                                <button className="btn btn--secondary">
                                                    Learn more
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
