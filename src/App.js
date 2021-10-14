import {useState} from 'react'
import './App.css';
import Logo from './components/logo'

function App() {
  const [
    mousePosition,
    setMousePosition
  ] = useState({
    ax: 0,
    ay: 0
  })

  const handleMouseMovement = (ev) => {
    const ax = -(window.innerWidth / 2 - ev.pageX) / 30
    const ay = (window.innerHeight / 2 - ev.pageY) / 30
    setMousePosition({
      ax,
      ay
    })
  }

  return (
    <div
      className="App"
      onMouseMove={(ev) => {
        handleMouseMovement(ev)
      }}
    >
      <div className="top-container">
        <header className="header">
          <div className="header__container">
            <h1 className="header__logo">
              <Logo />
              <span>Lucas Almeida</span>
            </h1>
          </div>
        </header>
        <section className="who block" id="who">
          <div className="who__wrapper">
            <section className="who__face" style={{ transform: `rotateY(${mousePosition.ax}deg) rotateX(${mousePosition.ay}deg)` }}>
              <div className="who__face--eye who__face--eye-left"></div>
              <div className="who__face--eye who__face--eye-right"></div>
              <div className="who__face--mouth"></div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
