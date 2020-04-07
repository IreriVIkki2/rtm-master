import PropTypes from "prop-types";
import moment from "moment";

const AllPrograms = ({
    programs,
    edit,
    del,
    publish,
    showModal,
    closeModal,
}) => {
    if (programs === undefined) {
        return (
            <div>
                <p className="title title--sm">Loading</p>
            </div>
        );
    }

    return (
        <ul className="a-programs">
            {programs.map((p) => (
                <li key={p._id} className="a-program">
                    <div className="flex-grow">
                        <p className="d-flex">
                            <span className="title--md text-black mb-1">
                                {p.title}
                            </span>
                            <span className="ml-auto mr-3 text-secondary">
                                {!p.published && "draft"}
                            </span>
                        </p>
                        <div className="d-flex">
                            <p className="mr-1">{p.isFree ? "free" : "paid"}</p>
                            <p className="mr-1">{p.daysCount} days</p>
                            <p className="mr-1">{p.routinesCount} routines</p>
                            <p className="mr-1">
                                {moment(p.updatedAt).format("MM/DD/YYYY")}
                            </p>
                        </div>
                    </div>
                    <div className="d-flex ml-1">
                        <div className="mr-2 btn btn--sm btn__link btn__link--primary">
                            {p.published ? (
                                <a onClick={() => publish(p._id, false)}>
                                    revert to draft
                                </a>
                            ) : (
                                <a onClick={() => publish(p._id, true)}>
                                    publish
                                </a>
                            )}
                        </div>
                        <a
                            className="btn btn__link btn__link--primary mr-2"
                            onClick={() => edit(p.slug)}
                        >
                            edit
                        </a>
                        <a
                            className="btn btn__link btn__link--tertiary"
                            onClick={() =>
                                showModal(
                                    <div className="a-program__delete-modal card text-center">
                                        <p className="mb-3">
                                            <span className="d-block mb-1">
                                                Deleting a program will remove
                                                all routines and
                                            </span>
                                            <span className="d-block mb-1">
                                                days associated with it
                                                permanently
                                            </span>
                                            <span className="d-block text-tertiary title">
                                                Are you sure you want to
                                                proceed?
                                            </span>
                                        </p>
                                        <div className="d-flex justify-center text-center">
                                            <button
                                                onClick={closeModal}
                                                className="btn btn--primary mr-2"
                                            >
                                                No, Cancel
                                            </button>
                                            <button
                                                onClick={() => del(p._id)}
                                                className="btn btn--tertiary"
                                            >
                                                Yes, Delete
                                            </button>
                                        </div>
                                    </div>,
                                )
                            }
                        >
                            delete
                        </a>
                    </div>
                </li>
            ))}
        </ul>
    );
};

AllPrograms.propTypes = {
    programs: PropTypes.any,
    edit: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    publish: PropTypes.func.isRequired,
};

export default AllPrograms;
