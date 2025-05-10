import { ReactNode } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Modal } from './components/prueba/Modal';
import './App.css'

interface Props {
  children: ReactNode
}

function App({ children }: Props) {

  return (
    <>
      <Modal>
        <h3>Hola mundo</h3>
        <p>Veamos si esta mierda corre</p>
      </Modal>
      <div className="nav-container">
        <Navbar />
      </div>
      {children}
    </>
  );
}

export default App
