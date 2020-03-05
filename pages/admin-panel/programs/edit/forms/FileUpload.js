import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { firebaseClient, firebase } from "../../../../../utils/firebaseClient";

const FileUpload = ({ inputId, onUploadUrl, showUploadControls }) => {
    const [fileUploading, setFileUploading] = useState(false);
    const [uploadTask, setUploadTask] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleFileUpload = async e => {
        setFileUploading(true);

        const file = e.target.files[0];
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
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log("Upload is paused");
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log("Upload is running");
                            break;
                        case firebase.storage.TaskState.SUCCESS: // or 'running'
                            console.log("Upload is successful");
                            break;
                        case firebase.storage.TaskState.CANCELED: // or 'running'
                            console.log("Upload is canceled");
                            break;
                        case firebase.storage.TaskState.ERROR: // or 'running'
                            console.log("Error uploading file");
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
        console.log("MainInfo -> url", typeof url);

        onUploadUrl(url);
        setUploadTask(false);
        setFileUploading(false);
    };

    return (
        <Fragment>
            <div>
                <small>show progress inside the upload button</small>
                <input type="file" onChange={handleFileUpload} id={inputId} />
            </div>
            {fileUploading && uploadTask && showUploadControls && (
                <div>
                    <div>
                        <small>{progress}</small>
                    </div>
                    <button onClick={() => uploadTask.pause()}>pause</button>
                    <button onClick={() => uploadTask.resume()}>resume</button>
                    <button onClick={() => uploadTask.cancel()}>cancel</button>
                </div>
            )}
        </Fragment>
    );
};

FileUpload.propTypes = {
    inputId: PropTypes.string.isRequired,
    onUploadUrl: PropTypes.func.isRequired,
    showUploadControls: PropTypes.bool,
};

export default FileUpload;
