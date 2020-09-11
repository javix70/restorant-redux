import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  COMENZAR_DESCARGA_PRODUCTOS_EXITO,
  COMENZAR_DESCARGA_PRODUCTOS_ERROR

} from "../types"

//import axios
import clienteAxios from "../config/axios"

//import libreria de alertas
import Swal from 'sweetalert2'

//funcion que te utilizará en la vista.
//crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto())
    try {
      //insertar en la api
      await clienteAxios.post("/productos", producto)
      //si todo sale bien, actualizar el state
      dispatch(agregarProductoExito(producto))

      //alerta
      Swal.fire(
        'Correcto',
        'El producto se agregó correctamente',
        'success'
      )
    } catch (error) {
      console.log(error)
      // si hay un error, cambiar el state
      dispatch(agregarProductoError(true))

      Swal.fire({
        icon: 'error',
        title: 'El producto no se agregó correctamente',
        text: 'Hubo un error, intenta nuevamente',
      })
    }
  }
}
const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true
})
// si el producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
})
// si hubo un error
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
})

//descargar los productos de la API

export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos())

    try {
      const respuesta = await clienteAxios.get('/productos')
      dispatch(descargarProductoExito(respuesta.data))

    } catch (error) {
      console.log(error)
      dispatch(descargarProductoError(true))

    }
  }
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
})

const descargarProductoExito = (producto) => ({
  type: COMENZAR_DESCARGA_PRODUCTOS_EXITO,
  payload: producto
})
const descargarProductoError = (estado) => ({
  type: COMENZAR_DESCARGA_PRODUCTOS_ERROR,
  payload: estado
})