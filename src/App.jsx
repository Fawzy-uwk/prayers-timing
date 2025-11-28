import Button from '@mui/material/Button';
import MainContainer from './components/MainContainer';
import Container from '@mui/material/Container';



function App() {


  return (
    <div className='flex items-center justify-center w-screen min-h-screen md:px-36 overflow-x-hidden' >
      <Container maxWidth="xl" >
        <MainContainer />
      </Container>
    </div>
  )
}

export default App
