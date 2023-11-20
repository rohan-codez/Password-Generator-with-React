import { useEffect } from "react"
import { useCallback } from "react"
import { useState } from "react"
import { motion } from "framer-motion"

function App() {

  const [length, setLength] = useState(8)
  const [lowerAllowed, setLowerAllowed] = useState(true)
  const [upperAllowed, setUpperAllowed] = useState(true)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = ''
    let strUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let strLower = 'abcdefghijklmnopqrstuvwxyz'
    let strNum = '012345678901234567890123456789'
    let strChar = '!@#$%^&*!@#$%^&*'

    if (numAllowed) {
      str += strNum
    }
    if (charAllowed) {
      str += strChar
    }
    if (lowerAllowed) {
      str += strLower
    }
    if (upperAllowed) {
      str += strUpper
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);

    }
    setPassword(pass)

  }, [length, lowerAllowed, upperAllowed, numAllowed, charAllowed, setPassword])

  const randomizeHandler = () => {
    passwordGenerator()
  }

  useEffect(() => {
    passwordGenerator()
  }, [length, lowerAllowed, upperAllowed, charAllowed, numAllowed, passwordGenerator])

  const copyHandler = () => {
    navigator.clipboard.writeText(password);
    alert("Copied the text: " + password);
  }

  return (
    <>
      <div className="main-container">

        <motion.button className="title-button" onClick={randomizeHandler} initial={{ y: -300, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }} >GENERATE</motion.button>

        <motion.div className="container" initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 1 }}>

          <div className="password-container">

            <input className="password-field" type="text" value={password} readOnly />
            <button onClick={copyHandler}> Copy  </button>
          </div>

          <div className="options-container">

            <div className="range-container">
              <input type="range" min={5} max={25} value={length}
                onChange={e => setLength(e.target.value)} />
              <label>Strength: <span>{length}</span></label>
            </div>

            <div className="options-column-one">
              <div className="lowerallowed-container">
                <input type="checkbox"
                  defaultChecked={lowerAllowed}
                  id="lowerCheckbox"
                  onChange={() => setLowerAllowed(prev => !prev)} />
                <label htmlFor="lowerCheckbox">Lowercase</label>
              </div>

              <div className="upperallowed-container">
                <input type="checkbox"
                  defaultChecked={upperAllowed}
                  id="upperCheckbox"
                  onChange={() => setUpperAllowed(prev => !prev)} />
                <label htmlFor="upperCheckbox">Uppercase</label>
              </div>
            </div>

            <div className="options-column-two">
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

          </div>
        </motion.div>
      </div >
    </>
  )
}


export default App
