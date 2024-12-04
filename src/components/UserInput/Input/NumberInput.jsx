import PropTypes from "prop-types";
import Input from "./Input.jsx";

function NumberInput({ min, max, step, ...rest }) {
    return <Input type="number" min={min} max={max} step={step} {...rest} />;
}

NumberInput.propTypes = {
    min: PropTypes.string,
    max: PropTypes.string,
    step: PropTypes.string
};

export default NumberInput;
