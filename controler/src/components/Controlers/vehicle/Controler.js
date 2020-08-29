import React from "react"
import { Grid } from "@material-ui/core"

import Joystick from "../../Joystick/Joystick.js"

import { setThrottle } from "../../../config/API/vehicle.js"

const Controler = () => {
    const handleJoystickInput = (e) => {
        const throttleLeft = e.relativeX / 100
        const throttleRight = e.relativeY / 100
        setThrottle("left", throttleLeft)
        setThrottle("right", throttleRight)
    }

    return (
        <Grid
            container
            style={{minHeight: "100vh"}}
            alignItems="center"
            justify="center"
        >
            <Joystick
                smooth
                onInput={handleJoystickInput}
                size={300}
            />
        </Grid>
    )
}

export default Controler