import React from "react";
import PropTypes from "prop-types";

const CheckBoxForm = ({ defaultChecked, checkBoxId, onInputChange }) => {
    return (
        <input
            className="form__reset"
            type="checkbox"
            id={checkBoxId}
            defaultChecked={defaultChecked}
            onChange={e => onInputChange(e.target.checked)}
        />
    );
};

CheckBoxForm.propTypes = {
    checkBoxId: PropTypes.string.isRequired,
    defaultChecked: PropTypes.bool.isRequired,
    onInputChange: PropTypes.func.isRequired,
};

export default CheckBoxForm;
