import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProviders, getEvents, orderByName, getReviews } from "../actions";
import NavbarProveedores from "./NavBarProveedores.jsx";
import "./Paquetes.css";
import CardProveedor from "./CardProveedor";
import Paginado from './Paginado'
// import { makeStyles } from '@material-ui/core/styles';
// import ImageList from '@material-ui/core/ImageList';
import { Link } from "react-router-dom";
//import CardReviews from "./CardReviews";
import './Comentarios.css'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     overflow: 'hidden',
//     backgroundColor: '#d9c2ba',
//     height: '300px',
//     borderRadius: '5px',
//   },
//   imageList: {
//     transform: 'translateZ(0)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     color: theme.palette.primary.light,
//   },
//   titleBar: {
//     background:
//     'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//   },
//   img: {
//     margin: '3px',
//   }
// }));

const Proveedores = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const allProviders = useSelector((state) => state.providers)
  const allEve = useSelector((state) => state.events)
  // const allReviews = useSelector((state) => state.reviews)
  const [order, setOrder] = useState('')
  // const eventos = useSelector((state) => state.events)

  const [currentPage, setCurrentPage] = useState(1) //pagina uno
  const [providersPerPage] = useState(5)// cantidad de cards x pagina
  const indexOfLastProvider = currentPage * providersPerPage //8
  const indexOfFirstProvider = indexOfLastProvider - providersPerPage //0

  const currentProviders = allProviders?.slice(indexOfFirstProvider, indexOfLastProvider)


  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {

  }, [order])

  useEffect(() => {
    dispatch(getProviders())
    dispatch(getEvents())
    dispatch(getReviews())
  }, [dispatch])

  function handleSort(e) {
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado.${e.target.value}`)
  }
  // const handleClick = (e) => {
  //   e.preventDefault() //preventivo
  //   dispatch(getProviders())
  // }

  return (
    <div>
      <NavbarProveedores />

      {/* <SearchBar setCurrentPage={setCurrentPage}/> */}
      <img className="png" src={'https://res.cloudinary.com/freevents/image/upload/v1664336909/Imagens/foterfoto_ngklm8.png'} alt="" />
      <div className="barra">
        <h1 className="Titulo-proveedores"> PROVEEDORES </h1>
      </div>

      <div className="row">
      {/* <button className="button" onClick={e => { handleClick(e) }}> ⇦ </button> */}
        <select onChange={e => handleSort(e)}>
          <option className="option" selected disabled>Ordenamiento</option>
          <option className="option" value="ascendente">A - Z</option>
          <option className="option" value="descendente">Z - A</option>
        </select>
      </div>

      <div className="grid">
        {currentProviders?.map((provider) => {
          return (
            <div key={provider.id} className='item'>
              <Link style={{ textDecoration: "none" }} to={`/detail/${provider.id}`}>
                <CardProveedor
                  background_image={provider.background_image}
                  name={provider.name}
                  address={provider.address}
                  email={provider.email}
                  phone_number={provider.phone_number}
                  eventos={allEve.map(e => { return (e.name) })}
                />
              </Link>
            </div>
          )
        })}
      </div>

      {/* <h1 className="titulo">COMENTARIOS DE NUESTROS CLIENTES</h1>

      <div className={classes.root}>
      <ImageList className={classes.imageList}>
        {allReviews?.map((reviews) => {
          return (
            <div className={classes.img}>
              <CardReviews
                comments={reviews.comments}
                rating={reviews.rating}
                events={reviews.events}
              /> 
            </div>
          )
        })}
        </ImageList>
      </div> */}


      <Paginado
        currentPage={currentPage}
        providersPerPage={providersPerPage}
        allProviders={allProviders?.length}
        paginado={paginado}
      />
    </div>
  );
};


export default Proveedores;

