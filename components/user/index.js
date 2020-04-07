import { useState } from "react";
import Link from "next/link";

export default ({
    profile,
    programs,
    myPrograms,
    showModal,
    closeModal,
    restartProgress,
}) => {
    if (!programs) return <p className="title title--sm">loading...</p>;
    const [checked, setChecked] = useState("programs");

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
        <div className="pt-7 profile">
            <div className="profile__info">
                <div className="">
                    <p className="text-bolder title--md text-black">
                        {profile.displayName}
                    </p>
                </div>
                <div className="profile__info--img">
                    <img
                        className="img-cover"
                        height="auto"
                        src={profile.photoUrl}
                    />
                </div>
            </div>

            <ul className="profile__nav">
                <li className="profile__nav--item">
                    <input
                        className="profile__nav--item-check"
                        type="radio"
                        name="user-menu"
                        id="programs"
                        onChange={() => setChecked("programs")}
                        checked={checked === "programs"}
                    />
                    <label
                        className="profile__nav--item-label"
                        htmlFor="programs"
                    >
                        programs
                    </label>
                </li>
                <li className="profile__nav--item">
                    <input
                        className="profile__nav--item-check"
                        type="radio"
                        name="user-menu"
                        id="settings"
                        onChange={() => setChecked("settings")}
                        checked={checked === "settings"}
                    />
                    <label
                        className="profile__nav--item-label"
                        htmlFor="settings"
                    >
                        settings
                    </label>
                </li>
                <li className="profile__nav--item">
                    <input
                        className="profile__nav--item-check"
                        type="radio"
                        name="user-menu"
                        id="notifs"
                        onChange={() => setChecked("notifs")}
                        checked={checked === "notifs"}
                    />
                    <label
                        className="profile__nav--item-label"
                        htmlFor="notifs"
                    >
                        notifications
                    </label>
                </li>
            </ul>

            <ul className="profile__programs">
                {programs.map((program) => {
                    const pp = myPrograms.find((p) => p._id === program._id);
                    return (
                        <li key={program._id} className="profile__program">
                            <div>
                                <p className="title--md bolder">
                                    {program.title}
                                </p>
                                <div className="d-flex">
                                    <p className="mr-1">
                                        {pp.progress} % completed
                                    </p>
                                    <p className="">
                                        week{" "}
                                        {Math.ceil(pp.daysCompleted / 7) || 1}{" "}
                                        of {program.weeksCount}
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex mt-2">
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
                                    <button className="btn btn--sm btn--secondary">
                                        continue
                                    </button>
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
