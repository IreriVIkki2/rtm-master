import PropTypes from "prop-types";
import Routines from "../../../../containers/admin/programs/routines";

const ProgramDays = ({ days, createNewDay, did, setDid }) => {
    return (
        <div className="days">
            <aside className="days__aside">
                <button className="btn mb-2 w-100" onClick={createNewDay}>
                    Add Day
                </button>
                {days.map(day => {
                    return (
                        <div
                            key={day._id}
                            onClick={() => setDid(day._id)}
                            className=""
                        >
                            <a className="" onClick={() => {}}>
                                Day {day.order}
                            </a>
                        </div>
                    );
                })}
            </aside>
            <main className="days__main">
                {did !== undefined && <Routines did={did} />}
            </main>
        </div>
    );
};

ProgramDays.propTypes = {};

export default ProgramDays;
