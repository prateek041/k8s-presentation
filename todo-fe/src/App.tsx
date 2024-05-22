import { useState } from "react"

function App() {

  const fetchTodos = -async()=> {
    // fetch todos from the backend using Axios
  }

  const [todos, setTodos] = useState([])

  const useEffect(() => {
    await fetchTodos()
  }, [])


  return (
    <div>Hello this is a new program</div>
  )
}

export default App
