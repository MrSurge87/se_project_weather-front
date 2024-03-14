import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "",
  title,
  onClose,
  name,
  handleSubmit,
  isOpen, 
  onSubmit
}) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <h3 className="add__garment-header">
          {title}
          <button className="close" type="button" onClick={onClose}></button>
        </h3>
        <form onSubmit={onSubmit} className="modal-form">
          {children}
          <button className="modal-form-submit" type="submit">
            {" "}
            {buttonText}{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
