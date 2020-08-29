import React, { useState } from "react"
import { Switch } from "@material-ui/core"

import "./FloatingSwitch.css"

function FloatingSwitch({
    onChange
}){
    let [checked, setChecked] = useState(false)

    const handleChange = () => {
        setChecked(!checked)
        onChange(!checked)
    }

    return (
        <div className="floating-switch-container">
            <Switch
                checked={checked}
                onChange={handleChange}
                color="default"
            />
        </div>
    )
}

export default FloatingSwitch