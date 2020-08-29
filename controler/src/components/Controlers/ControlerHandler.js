import React, { useContext } from "react"

import { AppContext } from "../../App.js"

import MeArm from "./mearm/Controler.js"
import Vehicle from "./vehicle/Controler.js"

const controlers = [MeArm, Vehicle]

const ControlerHandler = ({
    active
}) => {
    const context = useContext(AppContext)
    return React.createElement(controlers[context.currentControler])
}

export default ControlerHandler
export const controlerNames = ["MeArm", "Vehicle"]
