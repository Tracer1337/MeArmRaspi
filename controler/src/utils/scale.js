const scale = (x, xMin, xMax, ymin, yMax) => (((x - xMin) * (yMax - ymin)) / (xMax - xMin)) + ymin
export default scale