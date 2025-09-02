import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import FormField from "./form-field/FormField";
import SubmitButton from "./submit-button/SubmitButton";
import "./ContactForm.css";

const ContactForm = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), 5000); // 5 segundos
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const errors = [];
    const formElements = form.current.elements;

    // Verificar campos requeridos
    Array.from(formElements).forEach((element) => {
      if (element.required && !element.value.trim()) {
        errors.push(
          `El campo "${element.labels[0]?.textContent || element.name}" es requerido`,
        );
      } else if (
        element.name === "correo" &&
        element.value &&
        !/^\S+@\S+\.\S+$/.test(element.value)
      ) {
        errors.push("Por favor ingresa un correo electrónico válido");
      } else if (
        element.name === "telefono" &&
        element.value &&
        !/^\+?\d{9,15}$/.test(element.value)
      ) {
        errors.push("Por favor ingresa un teléfono válido (ej: +51912345678)");
      }
    });

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.honeypot.value) {
      console.log("Bot detectado");
      return; // Silenciosamente bloquea el envío
    }

    if (!validateForm()) {
      return; // Detener el envío si hay errores
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    emailjs
      .sendForm(
        "service_n2sli0i",
        "template_9s7cntp",
        form.current,
        "BX3wy0liG39SIQCZG",
      )
      .then(() => {
        setSubmitStatus("success");
        form.current.reset();
        setFormErrors([]);
      })
      .catch(() => {
        setSubmitStatus("error");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <h2 className="contact-form-title font-display">
        Formulario de Contacto
      </h2>
      <p className="contact-form-description font-primary">
        Puedes comunicarte con nosotros mediante este formulario
      </p>

      {/* Mensaje de éxito */}
      {submitStatus === "success" && (
        <div className="success-message">
          ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
        </div>
      )}

      {/* Mensaje de error general */}
      {submitStatus === "error" && (
        <div className="error-message">
          Hubo un error al enviar el mensaje. Por favor intenta nuevamente.
        </div>
      )}

      {/* Errores de validación */}
      {formErrors.length > 0 && (
        <div className="error-message">
          <h4>
            No se rellenó correctamente el mensaje. Por favor intenta
            nuevamente.
          </h4>
        </div>
      )}

      <form
        ref={form}
        onSubmit={handleSubmit}
        className="contact-form-container"
        noValidate // Desactiva la validación HTML nativa
      >
        <div className="form-fields-grid">
          <FormField
            label="Nombre"
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            required
          />
          <FormField
            label="Apellido"
            type="text"
            id="apellido"
            name="apellido"
            placeholder="Apellido"
            required
          />
        </div>

        <div className="form-fields-grid">
          <FormField
            label="Correo"
            type="email"
            id="correo"
            name="correo"
            placeholder="Ej. ejemplo@dominio.com"
            required
          />
          <FormField
            label="Teléfono"
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="Ej: +51 123456789"
          />
        </div>

        <FormField
          label="Mensaje"
          type="textarea"
          id="mensaje"
          name="mensaje"
          placeholder="Dejanos tu mensaje aquí..."
          rows="5"
          required
        />
        <input
          type="text"
          name="honeypot"
          className="honey-pot"
          tabIndex="-1"
          autoComplete="off"
        />
        <div className="submit-button-wrapper">
          <SubmitButton
            text={isSubmitting ? "Enviando..." : "Enviar"}
            disabled={isSubmitting || !minTimePassed}
          />
        </div>
      </form>
    </>
  );
};

export default ContactForm;
