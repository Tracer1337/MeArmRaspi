import React from "react"
import { Grid } from "@material-ui/core"

import Slider from "../../Slider/Slider.js"

import { moveToPercentage } from "../../../config/API/mearm.js"

function GridSlider({
    linkTo,
    defaultValue,
    onChange
}){
    const handleChange = (value) => {
        if(onChange){
            onChange(value)
        }
        moveToPercentage(linkTo, value)
    }

    return (
        <Grid item direction="column" container justify="center" style={{ minHeight: "50vh" }}>
            <Slider
                defaultValue={defaultValue || 0}
                onChange={handleChange}
                smooth
            />
        </Grid>
    )
}

export default GridSlider