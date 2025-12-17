import './App.css'
import { useState, useMemo } from 'react'
import StartMenu from './StartMenu'
import Game from './Game'
import FinishMenu from './FinishMenu'

function App() {
  const [gameState, setGameState] = useState('start')
  
  const isTouchDevice = useMemo(() => {
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    
    return hasTouchScreen && !hasFinePointer
  }, [])

  // Если это тачскрин без мыши, показываем подсказку
  if (isTouchDevice) {
    return (
      <div className='game' style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '24px', maxWidth: '600px' }}>
          <h2>Приложение не работает на сенсорных устройствах</h2>
          <p>У тебя же IQ больше, чем у кошки, чтобы ловить кнопку своей лапкой!</p>
        </div>
      </div>
    )
  }

  if(gameState === 'game') {
    return <Game finishGame={() => setGameState('finish')} />
  }
  if(gameState === 'finish') {
    return <FinishMenu/>
  }
  return <div className='game'>
    <StartMenu startGame={() => setGameState('game')} />
  </div>
}

export default App
