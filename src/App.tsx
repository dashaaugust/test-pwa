import { useState } from 'react' 
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => { 
    setTimeout(() => {
      console.log('This is a message after 10 seconds!');
    }, 10000); // 10000 milliseconds = 10 seconds
  };

  return (
    <>
      <h1>Hello world!</h1>
      <h3>Test PWA</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> 
      </div> 
      <button onClick={handleClick}>Уведомление тест</button>
    </>
  )
}

export default App
