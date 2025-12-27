import './tailwind.css'
import { ThemeProvider } from './context/ThemeContext'
import AppRoutes from './AppRoutes'

function App() {

  return (
    <>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </>
  )
}

export default App
