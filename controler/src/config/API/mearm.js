import API from "./API.js"

const mearmAPI = new API({
    port: "5001"
})

const getDevices = async () => await mearmAPI.fetchJSON("devices")

const moveToPercentage = async (name, percentage, throttled = false) => await mearmAPI.fetch("move_to_percentage", {servo_name: name, percentage, throttled: !!throttled})

const reset = async () => await mearmAPI.fetch("reset")

export {
    getDevices,
    moveToPercentage,
    reset
}