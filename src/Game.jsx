import { useState, useEffect } from 'react'

export default function Game({finishGame}) {
  const [level, setLevel] = useState(null)
  const [buttonPosition, setButtonPosition] = useState({ x: 50, y: 50 })
  const [hintVisible, setHintVisible] = useState(false)
  const [hintAnimation, setHintAnimation] = useState(false)
  const [easyHintVisible, setEasyHintVisible] = useState(false)
  const [levelBtnPicked, setLevelBtnPicked] = useState(false)
  const [easyLevelWon, setEasyLevelWon] = useState(false)
  const [easyWonHint, setEasyWonHint] = useState(false)

  const handleFinishEasyLevel = () => {
    setLevel(null)
    setEasyLevelWon(true)
    setEasyWonHint(true)
  }

  const handleStartEasyLevel = () => {
    setEasyHintVisible(false)
    if(easyLevelWon) {
        return;
    }
    setLevel(null);
    if(levelBtnPicked) {
        setLevel('easy')
        return;
    }
    setLevelBtnPicked(true)
    setLevel(null)
    setHintVisible(true)
    setTimeout(() => {
        setHintAnimation(true)
    }, 500)
  }

  const handleStartHardLevel = () => {
    setEasyWonHint(false)
    setLevel(null);
    if(easyLevelWon) {
        setEasyHintVisible(false)
        setLevel('hard')
        return;
    }
    setEasyHintVisible(true)
    setLevelBtnPicked(true)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setButtonPosition({ x: Math.random() * 70 + 20, y: Math.random() * 70 + 20 })
    }, level === 'easy' ? 650 : 300)
    return () => clearInterval(interval)
  }, [level])

  useEffect(() => {
    if (hintAnimation) {
      setTimeout(() => {
        setLevel('easy')
        setHintVisible(false)
        setHintAnimation(false)
      }, 2000)
    }
  }, [hintAnimation])

  return (
    <div className='game-container'>
        <h1>Игра началась!</h1>
        <p>Твоя задача поймать кнопку, прежде она сбежит!</p>
        <div className="level-switch">
            <button 
                onClick={handleStartEasyLevel}
                className={level === 'easy' ? 'active' : ''}
            >
                Легкий
            </button>
            <button 
                onClick={handleStartHardLevel}
                className={level === 'hard' ? 'active' : ''}
            >
                Сложный
            </button>
        </div>
        {
            level && <button 
                    className='catch-button'
                    onClick={level === 'hard' ? finishGame : handleFinishEasyLevel}
                    onKeyDown={(event) => {
                        if(event.key === 'Enter') {
                            event.preventDefault()
                            event.stopPropagation()
                            return;
                        }
                    }}
                    style={{ left: `${buttonPosition.x}%`, top: `${buttonPosition.y}%` }}
                >
                    Поймать кнопку
                </button>
        }
        {
            !level && !hintVisible && !easyHintVisible && !easyWonHint && <p className='center-text'>
                Выбери уровень сложности!
            </p>
        }
        {
            hintVisible && <p className='center-text hint' style={{ opacity: hintAnimation ? 0 : 1 }}>
                Ну ты и слабость!
            </p>
        }
        {
            easyHintVisible && !hintVisible && <p className='center-text hint' style={{fontSize: '40px'}}>
                Ты бы легкий для начала прошёл!
            </p>
        }
        {
            easyWonHint && easyLevelWon && <p className='center-text hint' style={{fontSize: '40px'}}>
                Хуй те а не приз! Играй сложный уровень.
            </p>
        }
    </div>
  )
}