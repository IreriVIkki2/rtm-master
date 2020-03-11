import PropTypes from "prop-types";

const Input = ({
    onInputChange,
    selectInputId,
    initialValue,
    selectValues,
}) => {
    const handleInputChange = e => {
        e.preventDefault();
        onInputChange(e.target.value);
    };

    return (
        <select id={selectInputId} onChange={handleInputChange}>
            <option value={initialValue.value}>{initialValue.label}</option>
            {selectValues.map((item, index) => {
                return (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                );
            })}
        </select>
    );
};

Input.propTypes = {
    selectInputId: PropTypes.string.isRequired,
    initialValue: PropTypes.object.isRequired,
    onInputChange: PropTypes.func.isRequired,
    selectValues: PropTypes.array.isRequired,
};

export default Input;
