import React, { useEffect, useState } from "react"
import { Grid } from "@material-ui/core"
import { RotateLeft } from "@material-ui/icons"

import Joystick from "../../Joystick/Joystick.js"
import GridSlider from "./GridSlider.js"
import FloatingIconButton from "../../FloatingIconButton/FloatingIconButton.js"
import FloatingSwitch from "../../FloatingSwitch/FloatingSwitch.js"

import { moveToPercentage } from "../../../config/API/mearm.js"
import scale from "../../../utils/scale.js"

const defaultState = 50

function Controler(){
    let [rightState, setRightState] = useState(defaultState)
    let [leftState, setLeftState] = useState(defaultState)
    let [resetKey, setResetKey] = useState(0)
    let [mode, setMode] = useState(0)

    const forceReload = () => setResetKey(++resetKey)

    const handleJoystick = (e) => {
        const xPercentage = scale(e.relativeX, -100, 100, 0, 100)
        const yPercentage = scale(e.relativeY, -100, 100, 100, 0)
        moveToPercentage("right", Math.round(xPercentage))
        moveToPercentage("left", Math.round(yPercentage))
        setRightState(xPercentage)
        setLeftState(yPercentage)
    }

    const reset = () => {
        moveToPercentage("right", defaultState)
        moveToPercentage("left", defaultState)
        moveToPercentage("base", 0, true)
        moveToPercentage("grapper", 0)
        setRightState(defaultState)
        setLeftState(defaultState)
        forceReload()
    }

    const handleSwitchChange = () => {
        if(mode === 0){
            setMode(1)
        }else{
            setMode(0)
        }
    }

    useEffect(reset, [])

    return (
        <Grid
            container
            alignItems="center"
            style={{ minHeight: "100vh" }}
            key={resetKey}
        >
            <Grid item xs={6} container justify="center">
                {mode === 0 ? (
                    <Joystick onInput={handleJoystick} size={300} smooth defaultValue={[rightState, leftState]}/>
                ) : mode === 1 ? (
                    <>
                        <GridSlider linkTo="right" defaultValue={rightState} onChange={setRightState}/>
                        <GridSlider linkTo="left" defaultValue={leftState} onChange={setLeftState}/>
                    </>
                ): null}
            </Grid>
            
            <Grid item xs={6} direction="column" container style={{ minHeight: "100vh" }}>
                <GridSlider linkTo="grapper"/>
                <GridSlider linkTo="base"/>
            </Grid>

            <FloatingIconButton Icon={RotateLeft} onClick={reset}/>
            <FloatingSwitch onChange={handleSwitchChange}/>
        </Grid>
    )
}

export default Controler