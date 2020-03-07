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
            <option defaultValue={initialValue}>{initialValue}</option>
            {selectValues.map((item, index) => {
                return (
                    <option key={index} value={item}>
                        {item}
                    </option>
                );
            })}
        </select>
    );
};

Input.propTypes = {
    selectInputId: PropTypes.string.isRequired,
    initialValue: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    selectValues: PropTypes.array.isRequired,
};

export default Input;
