import { useEffect, useState } from "react"
import { Rubro } from "../../types/Rubro"
import { RubroService } from "../../services/RubroService";
import { Button, Table } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { ModalType } from "../../types/ModalType";
import RubroModal from "../RubroModal/RubroModal";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";





const RubroTable = () => {
    
    const[rubros, setRubros]= useState<Rubro[]>([]);

    const[isLoading, setIsLoading]=useState(true);
    
    const[refreshData, setRefreshData]=useState(false);


    //este hook se va a ejecutar cada vez que se renderice el componente
    useEffect(()=> {
        const fetchRubros= async () => {
            const rubros = await RubroService.getRubros();
            setRubros(rubros);
            setIsLoading(false);
        };

        fetchRubros();

    }, [refreshData]);

    //Test, este log esta modificado para que muestre los datos de una manera mas legible
    console.log(JSON.stringify(rubros, null, 2));
    //strigify es convertir un objeto javaScript en una cadena JSON
  
    //Const para inicializar un producto por defecto y evitar el "undefined"
    // vayamos a crear un rubro nuevo
    const initializableNewRubro = (): Rubro =>{
      return{
        id: 0,
        denominacion: "",
        rubroPadre: "",
        EstadoRubro: "",
        fechaAlta: "",
        fechaBaja: "",
        fechaModificacion: "",
      };
    };

    //producto selecionado que se va a pasar como prop al Modal
    const  [rubro, setRubro]= useState<Rubro>(initializableNewRubro);

    //const para manejar el estado del modal
    const[showModal, setShowModal]= useState(false);
    const[modalType, setModalType]= useState<ModalType>(ModalType.NONE);
    const[title, setTitle]= useState("");

    //Logica del Modal
    const handleClick= (newTitle: string, rub: Rubro, modal:ModalType)=> {
      setTitle(newTitle);
      setModalType(modal);
      setRubro(rub);
      setShowModal(true);
    };

  return (
    <>
    <Button onClick={()=> handleClick("Nuevo Rubro", initializableNewRubro(),
    ModalType.CREATE)}> Nuevo Rubro </Button>

      {isLoading ? <Loader/>: (
        <Table hover>
          <thead>
            <tr>
              <th>Nombre del Rubro</th>
              <th>Rubro Padre</th>
              <th>Estado de Rubro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rubros.map(rubro =>(
              <tr key={rubro.id}>
                <td>{rubro.denominacion}</td>
                <td>{rubro.rubroPadre}</td>
                <td>{rubro.EstadoRubro}</td>
                <td><EditButton onClick={() => handleClick("Editar Rubro", rubro, ModalType.UPDATE)}/></td>
                <td><DeleteButton onClick={() => handleClick("Borrar Rubro", rubro, ModalType.DELETE)}/></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {showModal && (
        <RubroModal
        show={showModal} 
        onHide={()=> setShowModal(false)}
        title={title}
        modalType={modalType}
        rub={rubro}
        refreshData={setRefreshData}
        />
      )}

    </>
  )
}

export default RubroTable