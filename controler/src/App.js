import React, { useState } from "react"
import { Menu as MenuIcon } from "@material-ui/icons"

import ControlerHandler from "./components/Controlers/ControlerHandler.js"
import Menu from "./components/Menu/Menu.js"

import FloatingIconButton from "./components/FloatingIconButton/FloatingIconButton.js"

import "./App.css"

const AppContext = React.createContext()
const defaultContextValue = { 
  currentControler: 0,
  menu: false
}

function App() {
  let [contextValue, setContextValue] = useState(defaultContextValue)
  let [menuActive, setMenuActive] = useState(false)

  const handleClick = () => {
    setMenuActive(true)
  }
  
  const handleMenuClose = () => {
    setMenuActive(false)
  }

  const handleControlerChange = (index) => {
    setContextValue({
      ...contextValue,
      currentControler: index
    })
    setMenuActive(false)
  }
  
  return (
    <div className="App">
      <FloatingIconButton position="topLeft" onClick={handleClick} Icon={MenuIcon}/>
      <AppContext.Provider value={contextValue}>
        <Menu active={menuActive} onClose={handleMenuClose} onControlerChange={handleControlerChange}/>
        <ControlerHandler/>
      </AppContext.Provider>
    </div>
  )
}

export default App

export {
  AppContext
}