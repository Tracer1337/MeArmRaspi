import React, { useState } from "react"
import { Slider, Container, withStyles } from "@material-ui/core"
import { DEFAULT_COLOR, SMOOTHEN_THROTTLE} from "../../config/constants.js"

const sliderThumbSize = 30
const railHeight = 5

const CustomSlider = withStyles({
    thumb: {
        height: sliderThumbSize,
        width: sliderThumbSize,
        marginTop: -sliderThumbSize / 2,
        marginLeft: -sliderThumbSize / 2,
        backgroundColor: DEFAULT_COLOR
    },

    track: {
        opacity: 0,
    },

    rail: {
        height: railHeight,
        marginTop: -railHeight / 2,
        backgroundColor: DEFAULT_COLOR
    }
})(Slider)

function _Slider({
    onChange,
    defaultValue,
    smooth
}) {
    let [value, setValue] = useState(defaultValue || 0)
    let [throttled, setThrottled] = useState(false)

    const handleChange = (e, newValue) => {
        if(!smooth || !throttled){
            setThrottled(true)
            onChange(newValue)
            setTimeout(() => setThrottled(false), SMOOTHEN_THROTTLE)
        }
        setValue(newValue)
    }

    return (
        <Container>
            <CustomSlider
                value={value}
                onChange={handleChange}
            />
        </Container>
    )
}

export default _Slider