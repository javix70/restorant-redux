import React, { useState } from "react"
//dispacth -> nos sirve para mandar a ejecutar las acciones que tengamos
//useSelector forma de acceder al state dentro del componente
import { useDispatch, useSelector } from "react-redux"

//actions de Redux
import { crearNuevoProductoAction } from "../actions/productosActions"

const NuevoProducto = ({ history }) => {
  //state del componente
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState(0)

  // utilizar use dispatch y crea una función
  const dispatch = useDispatch()
  //acceder al state del store
  const cargando = useSelector((state) => state.productos.loading)
  const error = useSelector((state) => state.productos.error)

  const agregarProductos = (producto) =>
    dispatch(crearNuevoProductoAction(producto))

  //cuando el usuario haga submit
  const submitNuevoProducto = (e) => {
    e.preventDefault()

    //validar formulario
    if (nombre.trim() === "" || precio <= 0) {
      return
    }
    //si no hay errores

    // crear el nuevo producto
    agregarProductos({
      nombre,
      precio
    })
    //redireccionar
    history.push('/')
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-d font-weight-bold'>
              Agregar Nuevo Producto
            </h2>

            <form onSubmit={submitNuevoProducto}>
              <div className='form-group'>
                <label>Nombre Producto</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Nombre Producto'
                  name='nombre'
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>Precio Producto</label>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Precio Producto'
                  name='precio'
                  value={precio}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
              >
                Agregar
              </button>
            </form>
            {cargando ? <p>Cargando...</p> : null}
            {error ? <p className="alert alert-danger mx-auto width-100 text-center mt-3">Hubo un error</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NuevoProducto
