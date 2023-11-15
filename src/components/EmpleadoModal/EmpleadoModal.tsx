import { EmpleadoService } from "../../services/EmpleadoService";
import { ModalType } from "../../types/ModalType";
import { Empleado } from "../../types/Empleado";
import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import {toast} from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";


type EmpleadoModalProps ={
    show: boolean;
    onHide: ()=> void;
    title: string;
    modalType: ModalType;
    emple: Empleado;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmpleadoModal = ({show, onHide, title, modalType, emple, refreshData}:EmpleadoModalProps ) => {

  const handleSaveUpdate= async (emp:Empleado) => {
    try {
      const isNew = emp.id===0;
      if (isNew) {
        await EmpleadoService.createEmpleado(emp);
      } else{
        await EmpleadoService.updateEmpleado(emp.id, emp);
      }
      toast.success(isNew ? "Empleado creado": "Empleado actualizado",{
        position: "top-center",
      });

      onHide();
      refreshData(prevState => !prevState);
    } catch (error) {
      console.error(error);
      toast.error("Ha ocurrido un error")
    }
  };

  const handleDelete=async () => {
    try {
      await EmpleadoService.deleteEmpleado(emple.id);
      toast.success("Empleado borrado",{
        position:"top-center",
      });

      onHide();
      refreshData(prevState => !prevState);
    } catch (error) {
      console.error(error);
      toast.error("Ha ocurrido un error")
    }
  }

  const validationSchema= () => {
    return Yup.object().shape({
      id: Yup.number().integer().min(0),
      apellido: Yup.string().required("El apellido es requerido"),
      nombre: Yup.string().required("El nombre es requerido"),
      email: Yup.string().required("El email es requerido"),
      telefono: Yup.number().min(0).required("El telefono es requerido"),
      rolEmpleado: Yup.string().required("El ROL es requerido"),
      fechaAlta: Yup.string().required("La fecha de registro es requerida"),
    });
  };

  const formik = useFormik({
    initialValues: emple,
    validationSchema: validationSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (obj: Empleado) => handleSaveUpdate(obj),
  });

  return (
    <>
    {modalType === ModalType.DELETE ? (
      <>
      <Modal show={show} onHide={onHide} centered backdrop="static">

        <Modal.Header closeButton>
          <Modal.Title> {title} </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>¿Está seguro que desea eliminar el empleado <br/>
          <strong> {emple.apellido} </strong>?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}> Cancelar </Button>
          <Button variant="danger" onClick={handleDelete}> Borrar </Button>
        </Modal.Footer>

      </Modal>
      </>
    ):(
      <>
        <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
          <Modal.Header>
            <Modal.Title> { title }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>

            {/* surname */}
              <Form.Group controlId='formApellido'>
                <FormLabel> Apellido </FormLabel>
                <Form.Control 
                name="apellido"
                type="text"
                value={formik.values.apellido || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={Boolean(formik.errors.apellido && formik.touched.apellido)}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.apellido}
                </Form.Control.Feedback>
              </Form.Group>

              {/* name */}
              <Form.Group controlId='formNombre'>
                <FormLabel> Nombre </FormLabel>
                <Form.Control 
                name="nombre"
                type="text"
                value={formik.values.nombre || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={Boolean(formik.errors.nombre && formik.touched.nombre)}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.nombre}
                </Form.Control.Feedback>
              </Form.Group>
            
            {/* email */}
            <Form.Group controlId='formEmail'>
                <FormLabel> Email </FormLabel>
                <Form.Control 
                name="email"
                type="text"
                value={formik.values.email || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={Boolean(formik.errors.email && formik.touched.email)}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>

             {/* telefono */}
             <Form.Group controlId='formTelefono'>
                <FormLabel> Telefono</FormLabel>
                <Form.Control 
                name="telefono"
                type="number"
                value={formik.values.telefono || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={Boolean(formik.errors.telefono && formik.touched.telefono)}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.telefono}
                </Form.Control.Feedback>
              </Form.Group>

              {/* rol */}
            <Form.Group controlId='formRolEmpleado'>
                <FormLabel> Rol </FormLabel>
                <Form.Control 
                name="rolEmpleado"
                type="text"
                value={formik.values.rolEmpleado || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={Boolean(formik.errors.rolEmpleado && formik.touched.rolEmpleado)}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.rolEmpleado}
                </Form.Control.Feedback>
              </Form.Group>

              {/* fechaAlta */}
            <Form.Group controlId='formfechaAlta'>
                <FormLabel> Fecha de Registro </FormLabel>
                <Form.Control 
                name="fechaAlta"
                type="text"
                value={formik.values.fechaAlta || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={Boolean(formik.errors.fechaAlta && formik.touched.fechaAlta)}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.fechaAlta}
                </Form.Control.Feedback>
              </Form.Group>

              <Modal.Footer className="mt-4">
                <Button variant="secondary" onClick={onHide}> Cancelar </Button>
                <Button variant="primary" type="submit" disabled={!formik.isValid}> Guardar </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    )}
    </>
  )
}

export default EmpleadoModal