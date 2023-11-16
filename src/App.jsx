import { useEffect } from "react"
import { useCallback } from "react"
import { useState } from "react"
import { motion } from "framer-motion"

function App() {

  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numAllowed) {
      str += '012345678901234567890123456789'
    }
    if (charAllowed) {
      str += '!@#$%^&*!@#$%^&*'
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  const randomizeHandler = () => {
    passwordGenerator()
  }

  useEffect(() => {
    passwordGenerator()
  }, [length, charAllowed, numAllowed, passwordGenerator])

  const copyHandler = () => {
    navigator.clipboard.writeText(password);
    alert("Copied the text: " + password);

  }

  return (
    <>
      <div className="main-container">

        <motion.button className="title-button" onClick={randomizeHandler} initial={{ x: 260 }} animate={{ x: 0 }} transition={{ delay: 1 }}>Password Generator</motion.button>

        <motion.div className="container" >

          <div className="password-container">

            <input className="password-field" type="text" value={password} readOnly />
            <button onClick={copyHandler}> Copy  </button>
          </div>

          <div className="options-container">

            <div className="range-container">
              <input type="range" min={5} max={20} value={length}
                onChange={e => setLength(e.target.value)} />
              <label>Strength: {length}</label>
            </div>

            <div className="numallowed-container">
              <input type="checkbox"
                defaultChecked={numAllowed}
                id="numCheckbox"
                onChange={() => setNumAllowed(prev => !prev)} />
              <label htmlFor="numCheckbox">Numbers</label>
            </div>

            <div className="charallowed-container">
              <input type="checkbox"
                defaultChecked={charAllowed}
                id="charCheckbox"
                onChange={() => setCharAllowed(prev => !prev)} />
              <label htmlFor="charCheckbox">Special Characters</label>
            </div>

          </div>
        </motion.div>
      </div >
    </>
  )
}


export default App
