import { useState } from 'react' 
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello world!</h1>
      <h3>Test PWA</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> 
      </div> 
    </>
  )
}

export default App
