import { Header } from 'components/Header';
import { Button } from 'components/Button';
import * as Logo from 'assets/favicon.svg';

function App() {
  return (
    <div className="App">
      <Header title="hola" />
      <img src='Logo' height={100} width={100} />
      <Button onClick={() => alert('hola')}>Heyo</Button>
    </div>
  );
}

export default App;
