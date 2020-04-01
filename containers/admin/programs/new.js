import React, { useContext } from "react";
import crud from "../../../utils/crud";
import AppContext from "../../../context/AppContext";
import { useRouter } from "next/router";

export default () => {
    const { showEvent, closeEvent } = useContext(AppContext);
    const router = useRouter();

    const createProgram = () => {
        showEvent(<p>Creating new program</p>, true);
        crud.createNewProgram()
            .then(pid => {
                closeEvent();
                showEvent(
                    <p>
                        New Program created{" "}
                        <a
                            onClick={() =>
                                router.push(`/admin-panel/programs/edit/${pid}`)
                            }
                        >
                            Edit now
                        </a>
                    </p>, 
                );
            })
            .catch(err => {
                showEvent(<p>Failed! Could not create a new program</p>);
            });
    };
    return (
        <button onClick={createProgram} className="btn btn--secondary">
            New Program
        </button>
    );
};
