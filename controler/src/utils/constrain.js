const constrain = (value, min, max) => value < min ? min : value > max ? max : value
export default constrain