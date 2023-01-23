import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({})

  const params = useParams();
  const { id } = params;

  useEffect(()=>{
    const confirmarCuenta = async ()=>{
      try {
        
        const url = `http://localhost:4000/api/veterinarios/confirmar/${id}` 
        const { data } = await axios(url); 
        
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg
        })

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }

      setCargando(false);
    }
    confirmarCuenta();
  }, [])

    return (
      <>
        <div>
          <h1 className="text-emerald-600 font-black text-6xl">
              Confirma tu cuenta y comienza a Administrar <span className="text-black">tus Pacientes</span>
          </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 bg-white rounded-xl">
          {!cargando && <Alerta
              alerta={alerta}
            />}

          {cuentaConfirmada && (
            <Link className="block text-gray-500 text-center my-5 hover:text-black" to="/">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </>
    )
  }
  
  export default ConfirmarCuenta;