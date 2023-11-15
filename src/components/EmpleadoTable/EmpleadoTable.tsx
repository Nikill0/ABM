import { useEffect, useState } from "react"
import { Empleado } from "../../types/Empleado"
import { EmpleadoService } from "../../services/EmpleadoService";
import { Button, Table } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { ModalType } from "../../types/ModalType";
import EmpleadoModal from "../EmpleadoModal/EmpleadoModal";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";


const EmpleadoTable = () => {
    
    const[empleados, setEmpleados]= useState<Empleado[]>([]);

    const[isLoading, setIsLoading]=useState(true);
    
    const[refreshData, setRefreshData]=useState(false);

    useEffect(()=> {
        const fetchEmpleados=async () => {
            const empleados = await EmpleadoService.getEmpleados();
            setEmpleados(empleados);
            setIsLoading(false);
        };

        fetchEmpleados();
    }, [refreshData]);
    console.log(JSON.stringify(empleados, null, 2));
    
    const initializableNewEmpleado = (): Empleado =>{
      return{
        id: 0,
        apellido: "",
        email: "",
        nombre: "",
        telefono: 0,
        rolEmpleado: "",
        fechaAlta: "",
        fechaModificacion: "",
        fechaBaja: "",
      };
    };
    
    const  [empleado, setEmpleado]= useState<Empleado>(initializableNewEmpleado);
    
    const[showModal, setShowModal]= useState(false);
    const[modalType, setModalType]= useState<ModalType>(ModalType.NONE);
    const[title, setTitle]= useState("");

    
    const handleClick= (newTitle: string, emple: Empleado, modal:ModalType)=> {
      setTitle(newTitle);
      setModalType(modal);
      setEmpleado(emple);
      setShowModal(true);
    };

  return (
    <>
    <Button onClick={()=> handleClick("Nuevo empleado", initializableNewEmpleado(),
    ModalType.CREATE)}> Nuevo Empleado </Button>
      {isLoading ? <Loader/>: (
        <Table hover>
          <thead>
            <tr>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Rol</th>
              <th>Fecha Inicio</th>
              <th>Fecha Baja</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map(empleado =>(
              <tr key={empleado.id}>
                <td>{empleado.apellido}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.email}</td>
                <td>{empleado.telefono}</td>
                <td>{empleado.rolEmpleado}</td>
                <td>{empleado.fechaAlta}</td>
                <td>{empleado.fechaBaja}</td>
                <td><EditButton onClick={() => handleClick("Editar Empleado", empleado, ModalType.UPDATE)}/></td>
                <td><DeleteButton onClick={() => handleClick("Borrar Empleado", empleado, ModalType.DELETE)}/></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {showModal && (
        <EmpleadoModal
        show={showModal} 
        onHide={()=> setShowModal(false)}
        title={title}
        modalType={modalType}
        emple={empleado}
        refreshData={setRefreshData}
        />
      )}

    </>
  )
}

export default EmpleadoTable