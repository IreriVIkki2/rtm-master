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
            id={textAreaId}
            value={initialValue}
            onChange={handleInputChange}
            maxLength={maxLength}
            minLength={minLength}
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
