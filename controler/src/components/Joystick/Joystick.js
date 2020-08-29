import React, { useEffect, useState, useRef } from "react"
import "./Joystick.css"

import { DEFAULT_COLOR, SMOOTHEN_THROTTLE } from "../../config/constants.js"
import scale from "../../utils/scale.js"
import constrain from "../../utils/constrain.js"

function Joystick({
    onInput,
    size,
    smooth,
    defaultValue
}){
    let [position, setPosition] = useState(
        defaultValue ? 
        [
            scale(defaultValue[0], 0, 100, -100, 100), 
            scale(defaultValue[1], 0, 100, -100, 100)
        ] : 
        [0, 0]
    )
    let container = useRef(null)
    let [containerRect, setContainerRect] = useState(null)
    let thumb = useRef(null)
    let [thumbRect, setThumbRect] = useState(null)
    let [isMouseDown, setIsMouseDown] = useState(false)
    let [xConstraint, setXConstraint] = useState([0, 0])
    let [yConstraint, setYConstraint] = useState([0, 0])
    let [throttled, setThrottled] = useState(false)

    const handleMouseDown = () => {
        setIsMouseDown(true)
    }

    const handleMouseUp = () => {
        setIsMouseDown(false)
    }

    const handleMouseMove = e => {
        if(isMouseDown){
            if(e.touches){
                e = e.touches[0]
            }
            
            const x = e.clientX - containerRect.left - containerRect.width / 2
            const y = e.clientY - containerRect.top - containerRect.height / 2

            const constrainedX = constrain(x, xConstraint[0], xConstraint[1])
            const constrainedY = constrain(y, yConstraint[0], yConstraint[1])

            if (onInput){
                const relativeX = scale(constrainedX, xConstraint[0], xConstraint[1], -100, 100)
                const relativeY = scale(constrainedY, yConstraint[0], yConstraint[1], 100, -100)
                if(!smooth || !throttled){
                    setThrottled(true)
                    onInput({ relativeX, relativeY })
                    setTimeout(() => setThrottled(false), SMOOTHEN_THROTTLE)
                }
            }

            setPosition([constrainedX, constrainedY])
        }
    }

    useEffect(() => {
        setContainerRect(container.current.getBoundingClientRect())
        setThumbRect(thumb.current.getBoundingClientRect())
    }, [container, thumb])

    useEffect(() => {
        if (!containerRect || !thumbRect) return

        const xConstraint = [
            -containerRect.width / 2 + thumbRect.width / 2,
            containerRect.width / 2 - thumbRect.width / 2
        ]
        setXConstraint(xConstraint)

        const yConstraint = [
            -containerRect.height / 2 + thumbRect.height / 2,
            containerRect.height / 2 - thumbRect.height / 2
        ]
        setYConstraint(yConstraint)
    }, [containerRect, thumbRect])

    useEffect(() => {
        const newX = container.current.clientWidth / 2 + position[0] - thumb.current.offsetWidth / 2
        const newY = container.current.clientHeight / 2 + position[1] - thumb.current.offsetWidth / 2
        thumb.current.style.transform = `translate(${newX}px, ${newY}px)`
    }, [position])

    return (
        <div className="joystick" style={{width: size, height: size}}>
            <div 
                className="inner-container" 
                ref={container} 
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                onTouchMove={handleMouseMove}
                style={{borderColor: DEFAULT_COLOR}}
            >
                <div className="thumb" ref={thumb} style={{backgroundColor: DEFAULT_COLOR}}></div>
            </div>
        </div>
    )
}

export default Joystick