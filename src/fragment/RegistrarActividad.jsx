import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, GuardarActivity } from '../hooks/Conexion';
import mensajes from '../utilidades/Mensajes';
import { useForm } from 'react-hook-form';

function RegistrarActividad() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navegation = useNavigate();
    const [nro, setNro] = useState(0);
    const [llActivity, setLlActivity] = useState(false);
    
    if (!llActivity) {
    Activity().then((info) => {
        var datos = info;
        if (info.error == true) {
          mensajes(info.mensajes);
        } else {
          setNro(datos.length);
        }
      });
      setLlActivity(true);
    } 
    const onSubmit = (data) => {
        var datos = {
            "id": nro+1,
            "title": data.title,
            "dueDate": data.dueDate,
            "completed": data.completed === "true"
        };
        GuardarActivity(datos).then((info) => {
            if (info.error === true) {
              mensajes(info.message, 'error', 'Error');          
            } else {
              mensajes(info.message);
            }
        });
        setLlActivity(false);
    };

    return (
        <div className="wrapper">
            <div className="d-flex flex-column">
                <div className="content">

                    <div className='container-fluid'>
                        <div className="col-lg-10">
                            <div className="p-5">

                                <form className="user" onSubmit={handleSubmit(onSubmit)}>

                                    {/** INGRESAR TITLE */}
                                    <div className="form-group">
                                        <input type="text" {...register('title', { required: true })} className="form-control form-control-user" placeholder="Ingrese el título" />
                                        {errors.title && errors.title.type === 'required' && <div className='alert alert-danger'>Ingrese el título</div>}
                                    </div>

                                    {/** INGRESAR DUE DATE */}
                                    <div className="form-group">
                                        <input type="datetime-local" className="form-control form-control-user" placeholder="Ingrese la fecha de vencimiento"
                                            {...register('dueDate', { required: true })} />
                                        {errors.dueDate && errors.dueDate.type === 'required' && (<div className='alert alert-danger'>Ingrese una fecha de vencimiento</div>)}
                                    </div>

                                    {/** INGRESAR COMPLETED */}
                                    <div className="form-group">
                                        <label htmlFor="completed">Completado:</label>
                                        <select className="form-control" {...register('completed', { required: true })}>
                                            <option value={true}>Sí</option>
                                            <option value={false}>No</option>
                                        </select>
                                        {errors.completed && errors.completed.type === 'required' && (
                                            <div className='alert alert-danger'>Seleccione una opción</div>
                                        )}
                                    </div>

                                    <hr />

                                    {/** BOTÓN CANCELAR */}
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <a href="/PresentarActividades" className="btn btn-danger btn-rounded">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                            <span style={{ marginLeft: '5px' }}>Cancelar</span>
                                        </a>

                                        {/** BOTÓN REGISTRAR */}
                                        <input className="btn btn-success btn-rounded" type='submit' value='Registrar'></input>
                                    </div>

                                </form>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RegistrarActividad;