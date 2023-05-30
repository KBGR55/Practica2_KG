import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Input } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import React, { useState } from 'react';
import mensajes from "../utilidades/Mensajes";
import { useNavigate } from "react-router";
import { Activity, ObtenerDatos, DeleteActividad } from "../hooks/Conexion";
import RegistrarActividad from "./RegistrarActividad";
import EditarActividad from "./EditarActividad";
import Footer from "./Footer";


const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

export const PresentarActividades = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    const navegation = useNavigate();
    const [llActivity, setLlActivity] = useState(false);
    const [llObtenerDatos, setLlObtenerDatos] = useState(false);
    const [searchValue, setSearchValue] = useState('');//PARA LA BUSQUEDA POR ID
    const [selectedId, setSelectedId] = useState(null);//PARA SACAR EL ID DE LA TABLA
    const handleSearchChange = (event) => {setSearchValue(event.target.value);};//PARA LA BUSQUEDA POR ID
    const [show2, setShow2] = useState(false);//Model Box2
    const handleeClose = () => setShow2(false);//Model Box2
    const handleeShow = () => setShow2(true);//Model Box2
    const handleEditarActividad = async (id) => { 
        setSelectedId(id);//Guarda el id en la variable selectedId
        handleeShow();//Llama a el model de editar
    };//PARA SACAR EL ID DE LA TABLA
    //COLUMNAS DE LA TABLA
    const columns = [
        {
            name: 'id',
            selector: row => row.id,
        },
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'DueDate',
            selector: row => row.dueDate,
        },
        {
            name: 'Completed',
            selector: row => row.completed ? 'true' : 'false',
        },
        {
            name: 'Acciones',
            selector: row => (<>
    
                <div style={{ display: 'flex', gap: '10px' }}>
                    <a href="#" class="btn btn-outline-info btn-rounded" value={selectedId} onClick={() => handleEditarActividad(row.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                    </a>
                </div>
    
            </>),
        },
    
    ];

    if (!llActivity) {
        Activity().then((info) => {
            var aux = info;
            if (info.error == true) {
                mensajes(info.mensajes);
                console.log('Error: Cargando tabla...');
            } else {
                setData(aux);
                console.log('Exito: Cargando tabla...');
            }
        });
        setLlActivity(true);
    }
    if (!(searchValue == '')) {
        console.log('Buscando por id...');
        if (!llObtenerDatos) {
            ObtenerDatos(searchValue).then((info) => {
                var aux = info;
                if (info.error == true) {
                    mensajes(info.mensajes);
                    console.log('Error: Buscando por id');
                } else {
                    setData([aux]);
                    console.log('Exito: Actividad encontrada');
                }
            });
            setLlObtenerDatos(true);
        }
    }

    return (

        <div className="container">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">

                    <div className="col-sm-3 mt-5 mb-4 text-gred">
                        <div className="search">
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Buscar actividad por id" aria-label="Search" value={searchValue}
                                    onChange={handleSearchChange} />
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "blue" }}><h2><b>Detalles Actividades</b></h2></div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            <span style={{ marginLeft: '5px' }}>Agregar Actividad</span>
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <DataTable
                        columns={columns}
                        data={data}
                    />
                </div>
                
                    <Footer></Footer>
              
                {/* <!--- Model Box ---> */}
                <div className="model_box">
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Agregar actividad</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <RegistrarActividad />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>

                {/* <!--- Model Box2 ---> */}
                <div className="model_box">
                    <Modal
                        show={show2}
                        onHide={handleeClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Editar actividad</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditarActividad nro={selectedId} ></EditarActividad>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleeClose}>
                                Cerrar
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}


export default PresentarActividades;