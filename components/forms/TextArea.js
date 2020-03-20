import PropTypes from "prop-types";

const TextArea = ({
    onInputChange,
    textAreaId,
    initialValue,
    maxLength,
    minLength,
}) => {
    const handleInputChange = e => {
        e.preventDefault();
        onInputChange(e.target.value);
    };

    return (
        <textarea
            className="form__reset form__input"
            id={textAreaId}
            value={initialValue}
            onChange={handleInputChange}
            maxLength={maxLength}
            minLength={minLength}
            rows="10"
        />
    );
};

TextArea.propTypes = {
    textAreaId: PropTypes.string.isRequired,
    initialValue: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
};

export default TextArea;
