export default function StartMenu({ startGame }) {
  return (
    <div className='menu-container'>
      <h1>Поймай меня, если сможешь!</h1>
      <p>Твоя задача поймать кнопку, прежде она сбежит!</p>
      <button onClick={startGame}>Начать игру</button>
    </div>
  )
}