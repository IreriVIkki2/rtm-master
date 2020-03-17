import PropTypes from "prop-types";

const Input = ({
    onInputChange,
    inputId,
    initialValue,
    maxLength,
    minLength,
    type,
    disabled,
    placeholder,
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
            type={type || "text"}
            maxLength={maxLength}
            minLength={minLength}
            disabled={disabled}
            className="form__input form__reset"
            placeholder={placeholder}
        />
    );
};

Input.propTypes = {
    inputId: PropTypes.string.isRequired,
    initialValue: PropTypes.any.isRequired,
    onInputChange: PropTypes.func.isRequired,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
};

export default Input;
