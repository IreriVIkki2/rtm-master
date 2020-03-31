import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { firebaseClient, firebase } from "../../utils/firebaseClient";

const FileUpload = ({ inputId, onUploadUrl, initialFileUrl }) => {
    const [uploadTask, setUploadTask] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleFileUpload = async e => {
        const file = e.target.files[0];

        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById(`img${inputId}`).src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        const metadata = {
            contentType: "image/jpeg",
            name: `${Date.now()}-${file.name}`,
        };

        var task = firebaseClient()
            .storage.ref()
            .child(metadata.name)
            .put(file, metadata);

        setUploadTask(task);

        const url = await new Promise(resolve => {
            task.on(
                "state_changed",
                function(snapshot) {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = Math.ceil(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                    );
                    setProgress(progress);
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            break;
                        case firebase.storage.TaskState.SUCCESS: // or 'running'
                            break;
                        case firebase.storage.TaskState.CANCELED: // or 'running'
                            break;
                        case firebase.storage.TaskState.ERROR: // or 'running'
                            break;
                    }
                },
                function(error) {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case "storage/unauthorized":
                            alert(
                                "User doesn't have permission to access the object",
                            );
                            break;

                        case "storage/canceled":
                            alert("User canceled the upload");
                            break;

                        case "storage/unknown":
                            alert(
                                "Unknown error occurred, inspect error.serverResponse",
                            );
                            break;
                    }
                },
                // on completion resolve the url
                function() {
                    task.snapshot.ref
                        .getDownloadURL()
                        .then(downloadURL => resolve(downloadURL));
                },
            );
        });

        onUploadUrl(url);
        setUploadTask(false);
    };

    return (
        <Fragment>
            <div className="form__file">
                <label className="form__file--img-box" htmlFor={inputId}>
                    <img
                        className="form__file--img"
                        src={initialFileUrl ? initialFileUrl : "/camera.jpg"}
                        alt=""
                        id={`img${inputId}`}
                    />
                </label>
                {uploadTask && (
                    <div className="form__file--meta">
                        <div className="form__file--progress">
                            <div
                                className="form__file--progress-bar"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="form__file--controls">
                            <span onClick={() => uploadTask.pause()}>
                                <img src="/pause.png" alt="" />
                            </span>
                            <span onClick={() => uploadTask.resume()}>
                                <img src="/play.png" alt="" />
                            </span>
                            <span
                                onClick={() => {
                                    uploadTask.cancel();
                                    setUploadTask(false);
                                }}
                            >
                                <img src="/stop.png" alt="" />
                            </span>
                        </div>
                    </div>
                )}
            </div>
            <input
                className="d-none"
                type="file"
                onChange={handleFileUpload}
                id={inputId}
            />
        </Fragment>
    );
};

FileUpload.propTypes = {
    inputId: PropTypes.string.isRequired,
    onUploadUrl: PropTypes.func.isRequired,
    showUploadControls: PropTypes.bool,
    initialFileUrl: PropTypes.string,
};

export default FileUpload;
