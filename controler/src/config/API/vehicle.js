import API from "./API.js"

const vehicleAPI = new API({
    port: 5002
})

const setThrottle = async (servo_name, throttle) => await vehicleAPI.fetch("set_throttle", {servo_name, throttle})

export {
    setThrottle
}