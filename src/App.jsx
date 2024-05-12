import './App.css'
import logoPokemon from './assets/img/International_Pokémon_logo.svg.png'
import MiApi from './components/MiApi'

function App() {


  return (
    <>
      <div className='container d-flex justify-content-center text-center'>
        <div className='w-50 p-5'>
        <img src={logoPokemon} style={{width:"250px", height:"100px"}}/>
          <MiApi />
        </div>
      </div>
    </>
  )
}

export default App