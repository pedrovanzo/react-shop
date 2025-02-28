import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  const toggleTheme = () => {
    console.log('BEFORE', theme)
    console.log(theme)
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }
  return (
    <>
      <nav className='mb-4'>
        <ul className='flex flex-row gap-4 text-default'>
          <li>home</li>
          <li>authentication</li>
          <li>dashboard</li>
          <li>products</li>
          <li>product</li>
          <li>cart</li>
          <li>checkout</li>
          <li>options</li>
        </ul>
      </nav>
      <button className='text-contrast bg-default p-2 rounded-md' onClick={toggleTheme}>
        {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </>
  )
}

export default App
