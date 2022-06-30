import React, { useCallback, useEffect, useState } from "react"
import Canvas from "./components/Canvas"

export default function App(): JSX.Element {

  const [pixColor, setPixColor] = useState("#e66465")
  return (
    <div className="container">
      <header className="">
        <h1>Pixel Art</h1>
      </header>
      <main>
      <div  style={{"marginBottom": "10px"}}>
      <label htmlFor="pixColor">Color </label>
          <input type="color" id="head" value={pixColor} onChange={(e) => setPixColor(e.currentTarget.value)} name="pixColor" />
      </div>
        <Canvas id={"canvas"} pixelColor={pixColor} />
      </main>
    </div>
  )
}
