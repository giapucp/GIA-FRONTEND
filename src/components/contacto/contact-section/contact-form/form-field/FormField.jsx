import "./FormField.css";

const FormField = ({ label, type, id, name, placeholder, rows, required }) => {
  return (
    <div className="form-field-container">
      <label htmlFor={id} className="form-field-label">
        {label} {required && <span className="required-asterisk">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          rows={rows}
          className="form-field-textarea"
          required={required}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className="form-field-input"
          required={required}
        />
      )}
    </div>
  );
};

export default FormField;
