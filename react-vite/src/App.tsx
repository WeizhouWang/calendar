import Header from './header'
import Navigation from './navigation'

function App() {
  return (
    <>
      <div className='flex flex-col w-full'>
        <Header></Header>
        <div className='flex flex-row h-full w-full' >
          <Navigation></Navigation>
        </div>
      </div>
    </>
  )
}

export default App
