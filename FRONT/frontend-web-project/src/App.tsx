import { ReactNode } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Modal } from './components/prueba/Modal';
import './App.css'
import { Login } from './pages/Login';

interface Props {
  children: ReactNode
}

function App({ children }: Props) {

  return (
    <>
      <Modal>
        <Login/>
      </Modal>
      <div className="nav-container">
        <Navbar />
      </div>
      {children}
    </>
  );
}

export default App
