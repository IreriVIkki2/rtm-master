import Link from "next/link";

export default ({
    profile,
    programs,
    myPrograms,
    showModal,
    closeModal,
    restartProgress,
}) => {
    console.log("programs", programs);
    console.log("myPrograms", myPrograms);
    if (!programs) return <p className="title title--sm">loading...</p>;

    const confirmModal = () =>
        showModal(
            <div className="card text-center px-2 py-4">
                <p className="mb-1">
                    Are you sure you want to restart your progress
                </p>
                <p className="text-tertiary font-smaller mb-3">
                    this cannot be undone
                </p>

                <div onClick={closeModal} className="text-center">
                    <button className="btn btn--primary mr-3">cancel</button>
                    <button
                        onClick={() => restartProgress(pp._id)}
                        className="btn btn--secondary"
                    >
                        continue
                    </button>
                </div>
            </div>,
        );

    return (
        <div className="pt-7">
            <div className="d-flex">
                <div className="">
                    <p className="text-bolder title--md text-black">
                        {profile.displayName}
                    </p>
                </div>
                <div className="">
                    <img width="100px" height="auto" src={profile.photoUrl} />
                </div>
            </div>

            <div>
                <ul className="d-flex">
                    <li>
                        <label htmlFor="programs">programs</label>
                        <input type="radio" name="user-menu" id="programs" />
                    </li>
                    <li>
                        <label htmlFor="settings">settings</label>
                        <input type="radio" name="user-menu" id="settings" />
                    </li>
                    <li>
                        <label htmlFor="notifs">notifications</label>
                        <input type="radio" name="user-menu" id="notifs" />
                    </li>
                </ul>
            </div>

            <ul className="">
                {programs.map((program) => {
                    const pp = myPrograms.find((p) => p._id === program._id);
                    console.log("pp", pp, program);
                    return (
                        <li key={program._id} className="mb-3">
                            <p className="title--md bolder">{program.title}</p>
                            <div className="d-flex mb-2">
                                <p className="mr-1">
                                    {pp.progress} % completed
                                </p>
                                <p className="">
                                    week {Math.ceil(pp.daysCompleted / 7) || 1}{" "}
                                    of {program.weeksCount}
                                </p>
                            </div>
                            <div className="">
                                <button
                                    onClick={confirmModal}
                                    className="btn btn--sm btn--primary mr-3"
                                >
                                    restart
                                </button>
                                <Link
                                    href="/u/[username]/[pid]"
                                    as={`/u/${profile.displayName}/${program.slug}`}
                                >
                                    <a className="btn btn--sm btn--secondary">
                                        continue
                                    </a>
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
