import { useState } from 'react'
import './App.css'
import { Thing } from '@7nohe/react-realtime-cursor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Thing />
    </div>
  )
}

export default App
