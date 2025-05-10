import { ReactNode } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Modal } from './components/prueba/Modal';
import { RoomCard } from './components/RoomCard/RoomCard';
import { ServiceCard } from './components/ServiceCard/ServiceCard';
import './App.css'

interface Props {
  children: ReactNode
}

function App({ children }: Props) {

  const services = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Gimnasio"
    },{
      id: 2,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Room Service 24h"
    },{
      id: 3,
      image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Estacionamiento"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Traslado al Aeropuerto"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1551751299-1b51cab2694c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Barra de Cocteles"
    }
  ];

  return (
    <div className='app-container'>
      <Modal>
        <h3>Hola mundo</h3>
        <p>Veamos si esto medio corre</p>
      </Modal>
      <Navbar />
      {children}
      <RoomCard
        image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        roomType="Deluxe"
        description="Amplia suite con vista al mar, cama king-size, jacuzzi privado y balcón."
        pricePerNight={120}
        capacity={2}
      />
{/*       <div className="grid-container">
        {services.map((service, index) => (
          <ServiceCard key={index} image={service.image} title={service.title} id={service.id}/>
        ))}
      </div> */}
        
    </div>
  );
}

export default App
