import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import Routines from "../../../../containers/admin/programs/routines";
import { useRouter } from "next/router";

const ProgramDays = ({ days, createNewDay, did, setDid, deleteDay }) => {
    const restDay = days.find((day) => day._id === did);
    const router = useRouter();
    return (
        <div className="days">
            <aside className="days__aside">
                <button className="btn btn__link btn__link--light mb-2 font-smaller w-100">
                    <p className="">
                        <span className="mr-1">
                            <AiOutlineLeft />
                        </span>
                        edit program
                    </p>
                </button>
                <button
                    className="btn btn--secondary mb-2 w-100"
                    onClick={createNewDay}
                >
                    New Day
                </button>
                {days.map((day) => (
                    <div
                        key={day._id}
                        onClick={() => setDid(day._id)}
                        className={`d-flex days__day ${
                            did === day._id && "days__day--current"
                        } `}
                    >
                        <a className="days__day--title" onClick={() => {}}>
                            Day {day.order}
                        </a>

                        <span
                            onClick={() => deleteDay(day._id)}
                            className="ml-auto mr-3 days__day--delete"
                        >
                            <AiOutlineDelete />
                        </span>
                    </div>
                ))}
            </aside>
            <main className="days__main">
                {did !== undefined && (
                    <Routines did={did} restDay={restDay.isRestDay} />
                )}
            </main>
        </div>
    );
};

export default ProgramDays;
