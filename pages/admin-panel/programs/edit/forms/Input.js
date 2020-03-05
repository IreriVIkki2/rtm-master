import PropTypes from "prop-types";

const Input = ({
    onInputChange,
    inputId,
    initialValue,
    maxLength,
    minLength,
}) => {
    const handleInputChange = e => {
        e.preventDefault();
        onInputChange(e.target.value);
    };

    return (
        <input
            id={inputId}
            value={initialValue}
            onChange={handleInputChange}
            type="text"
            maxLength={maxLength}
            minLength={minLength}
        />
    );
};

Input.propTypes = {
    inputId: PropTypes.string.isRequired,
    initialValue: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
};

export default Input;
