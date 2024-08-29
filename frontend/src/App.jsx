import './App.css'
import ChatPage from './components/ChatPage'

function App() {
  
  return (
    <>
      <div style={{fontFamily:'cursive', fontSize:'2rem', background:' hsla(358, 85%, 68%, 1)',
background: 'linear-gradient(90deg, hsla(358, 85%, 68%, 1) 0%, hsla(5, 86%, 67%, 1) 23%, hsla(41, 98%, 49%, 1) 53%)',
background: '-moz-linear-gradient(90deg, hsla(358, 85%, 68%, 1) 0%, hsla(5, 86%, 67%, 1) 23%, hsla(41, 98%, 49%, 1) 53%)',
background: '-webkit-linear-gradient(90deg, hsla(358, 85%, 68%, 1) 0%, hsla(5, 86%, 67%, 1) 23%, hsla(41, 98%, 49%, 1) 53%)',
filter: 'progid: DXImageTransform.Microsoft.gradient( startColorstr="#F3696E", endColorstr="#F36F64", GradientType=1) '}}>AI BASED CHAT IMPLEMENTATION</div>
      <ChatPage/>
    </>
  )
}

export default App
