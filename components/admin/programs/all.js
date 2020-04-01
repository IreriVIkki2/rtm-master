import PropTypes from "prop-types";
import moment from "moment";

const AllPrograms = ({ programs, edit, del }) => {
    if (programs === undefined) {
        return (
            <div>
                <p className="title title--sm">Loading</p>
            </div>
        );
    }
    return (
        <ul>
            {programs.map(p => {
                return (
                    <li key={p._id} className="">
                        <div>
                            <p className="">
                                <span>{p.title}</span>
                                <span>{!p.published && "draft"}</span>
                            </p>
                            <p className="">{p.isFree ? "free" : "paid"}</p>
                            <p className="">{p.daysCount} days</p>
                            <p className="">{p.routinesCount} routines</p>
                            <p className="">
                                {moment(p.updatedAt).format("MM/DD/YYYY")}
                            </p>
                        </div>
                        <div>
                            <a
                                className="btn btn__link"
                                onClick={() => edit(p.slug)}
                            >
                                edit
                            </a>
                            <a
                                className="btn btn__link btn__link--tertiary"
                                onClick={() => del(p._id)}
                            >
                                delete
                            </a>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

AllPrograms.propTypes = {
    programs: PropTypes.any,
    edit: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
};

export default AllPrograms;
