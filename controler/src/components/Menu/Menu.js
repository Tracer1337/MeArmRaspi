import React from "react"
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core"

import { controlerNames } from "../Controlers/ControlerHandler.js"

const Menu = ({
    active,
    onClose,
    onControlerChange
}) => {
    return (
        <Drawer open={active} onClose={onClose}>
            <List>
                {controlerNames.map((name, index) => (
                    <ListItem button key={name} onClick={() => onControlerChange(index)}>
                        <ListItemText primary={name}/>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default Menu