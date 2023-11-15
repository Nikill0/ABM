import { RubroService } from "../../services/RubroService";
import { ModalType } from "../../types/ModalType";
import { Rubro } from "../../types/Rubro";
import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Display } from "react-bootstrap-icons";

type RubroModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: ModalType;
  rub: Rubro;
  refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const RubroModal = ({ show, onHide, title, modalType, rub, refreshData }: RubroModalProps) => {


  //CREATE - UPDATE
  const handleSaveUpdate = async (rub: Rubro) => {
    try {
      const isNew = rub.id === 0;


      if (isNew) {
        await RubroService.createRubro(rub);
      } else {
        await RubroService.updateRubro(rub.id, rub);
      }
      toast.success(isNew ? "Rubro creado" : "Rubro actualizado", {
        position: "top-center",
      });

      onHide();
      refreshData(prevState => !prevState);
    } catch (error) {
      console.error(error);
      toast.error("Ha ocurrido un error")
    }
  };

  const handleDelete = async () => {
    try {
      await RubroService.deleteRubro(rub.id);
      toast.success("Rubro borrado", {
        position: "top-center",
      });

      onHide();
      refreshData(prevState => !prevState);
    } catch (error) {
      console.error(error);
      toast.error("Ha ocurrido un error")
    }
  }


  //Yup
  const validationSchema = () => {
    return Yup.object().shape({
      id: Yup.number().integer().min(0),
      denominacion: Yup.string().required("El dato es requerido"),
      rubroPadre: Yup.string().min(0).required("El dato es requerido"),
      EstadoRubro: Yup.string().min(0).required("El dato es requerido"),
      fechaAlta: Yup.string().min(0).required("El dato es requerido"),
      fechaBaja: Yup.string().min(0).required("El dato es requerido"),
    });
  };

  //Formik
  const formik = useFormik({
    initialValues: rub,
    validationSchema: validationSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (obj: Rubro) => handleSaveUpdate(obj),
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
              <p>¿Está seguro que desea eliminar el Rubro <br />
                <strong> {rub.denominacion} </strong>?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}> Cancelar </Button>
              <Button variant="danger" onClick={handleDelete}> Borrar </Button>
            </Modal.Footer>

          </Modal>
        </>
      ) : (
        < >
          <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl" >
            <Modal.Header style={{backgroundColor:'#A52326', color:'white', justifyContent:'center'}}>
              <Modal.Title> {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={formik.handleSubmit}>

                {/* Nombre Rubro */}
                <Form.Group controlId='denominacion'>
                  <FormLabel> Nombre del Rubro </FormLabel>
                  <Form.Control
                    name="denominacion"
                    type="text"
                    value={formik.values.denominacion || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(formik.errors.denominacion && formik.touched.denominacion)}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.denominacion}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Rubro Padre */}
                <Form.Group controlId='rubroPadre'>
                  <FormLabel> Rubro Padre</FormLabel>
                  <Form.Control
                    name="rubroPadre"
                    type="string"
                    value={formik.values.rubroPadre || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(formik.errors.rubroPadre && formik.touched.rubroPadre)}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.rubroPadre}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Rubro Estado */}
                <Form.Group controlId='formEstadoRubro'>
                  <FormLabel> Estado Rubro</FormLabel>
                  <Form.Control
                    name="EstadoRubro"
                    type="string"
                    value={formik.values.EstadoRubro || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(formik.errors.EstadoRubro && formik.touched.EstadoRubro)}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.EstadoRubro}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Fecha Alta */}
                <Form.Group controlId='formfechaAlta'>
                  <FormLabel> Fecha Alta</FormLabel>
                  <Form.Control
                    name="fechaAlta"
                    type="number"
                    value={formik.values.fechaAlta || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(formik.errors.fechaAlta && formik.touched.fechaAlta)}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.fechaAlta}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Fecha Baja */}
                <Form.Group controlId='formfechaBaja'>
                  <FormLabel> Fecha Baja</FormLabel>
                  <Form.Control
                    name="fechaBaja"
                    type="number"
                    value={formik.values.fechaBaja || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(formik.errors.fechaBaja && formik.touched.fechaBaja)}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.fechaBaja}
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

export default RubroModal