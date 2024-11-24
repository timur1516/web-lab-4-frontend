import PropTypes from "prop-types";
import Input from "./Input.jsx";

function NumberInput({ min, max, step, ...rest }) {
    return <Input type="number" min={min} max={max} step={step} {...rest} />;
}

NumberInput.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
};

export default NumberInput;
