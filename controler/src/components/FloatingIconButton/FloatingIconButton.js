import React from "react"
import { SvgIcon } from "@material-ui/core"

const offset = "5px"

function FloatingIconButton({
    Icon,
    onClick,
    position
}) {
    let style = {position: "absolute"}

    if(position === "bottomRight" || !position){
        style.bottom = offset
        style.right = offset
        style.marginBottom = "-5px"
    }else if(position === "topLeft"){
        style.top = offset
        style.left = offset
    }

    return (
        <div 
            className="floating-icon-button"
            style={style}
        >
            <SvgIcon
                color="action"
                onClick={onClick}
                fontSize="large"
            >
                <Icon/>    
            </SvgIcon>
        </div>
    )
}

export default FloatingIconButton