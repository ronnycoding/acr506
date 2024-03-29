import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import client from "../../client";
import imageUrlBuilder from "@sanity/image-url";

import styles from "./FormcarrySection.module.css";
import SimpleBlockContent from "../SimpleBlockContent";
import { propTypes } from "@sanity/block-content-to-react";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const schema = yup.object().shape({
  fullname: yup.string().required("*Requerido."),
  email: yup.string().email("*Invalido.").required("*Requerido."),
  phoneNumber: yup.string().required("*Requerido."),
  contactMethod: yup.string().oneOf(["email", "phoneNumber", "whatsApp"], "*Requerido."),
  service: yup
    .string()
    .oneOf(["cobro_judicial", "derecho_penal", "derecho_laboral", "otro"], "*Requerido."),
  message: yup.string(),
});

const FormcarrySection = ({
  formcarryFormId = "",
  label = "",
  heading = "",
  backgroundImage = false,
}) => {
  const [contactMethod, setContactMethod] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmission = async ({
    contactMethod,
    message,
    service,
    phoneNumber,
    email,
    fullname,
  }) => {
    const contactMethods = {
      email: "Correo Electrónico",
      phoneNumber: "Número Teléfonico",
      whatsApp: "WhatsApp",
    };

    const services = {
      cobro_judicial: "Cobro Judicial",
      derecho_laboral: "Derecho Laboral",
      derecho_penal: "Derecho Penal",
      otro: "Otros",
    };
    const { status } = await axios.post(
      `https://formcarry.com/s/${formcarryFormId}`,
      {
        Nombre_Completo: fullname,
        Número_teléfonico: phoneNumber,
        Correo_Electrónico: email,
        Método_de_Contácto: contactMethods[contactMethod],
        Tipo_de_servicio_interesado: services[service],
        Mensaje: message,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    if (status === 200) {
      setSuccessMessage(true);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage(false);
        setContactMethod("");
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [successMessage]);

  const style = backgroundImage
    ? {
        backgroundImage: `url("${urlFor(backgroundImage).width(2000).auto("format").url()}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }
    : {};

  if (successMessage) {
    return (
      <div className={styles.messageSentSuccessContainer} role="alert">
        <svg
          className={styles.messageSentSuccessSvg}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
        </svg>
        <p>Mensaje enviado con éxito!.</p>
      </div>
    );
  }

  return (
    <div className={styles.root} style={style}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmission)}>
          <div className={styles.formHeadingContainer}>
            <h2 className={styles.formParagraph}>{label}</h2>
            {heading && <SimpleBlockContent blocks={heading} />}
          </div>
          <div className={styles.formContainerEmail}>
            <label className={styles.formLabelEmail} htmlFor="fullname">
              Nombre Completo
            </label>
            <input
              className={styles.formInputEmail}
              id="fullname"
              name="fullname"
              type="text"
              ref={register}
              placeholder="Escriba su nombre completo."
              aria-label="Nombre completo"
            />
            {errors.fullname && (
              <span className={styles.formRequiredField}>{errors.fullname.message}</span>
            )}
          </div>
          <div className={styles.sectionMediaLeft}>
            <label className={styles.sectionMediaLeftLabel} htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className={styles.sectionMediaLeftInput}
              id="email"
              name="email"
              type="email"
              ref={register}
              placeholder="ejemplo@micorreo.com"
              aria-label="Correo Electrónico"
            />
            {errors.email && (
              <span className={styles.formRequiredField}>{errors.email.message}</span>
            )}
          </div>
          <div className={styles.sectionMediaRight}>
            <label className={styles.sectionMediaRightLabel} htmlFor="phoneNumber">
              Número Teléfonico
            </label>
            <input
              className={styles.sectionMediaRightInput}
              id="phoneNumber"
              name="phoneNumber"
              pattern="[0-9]{8}"
              type="tel"
              ref={register}
              placeholder="88888888"
              aria-label="Número Teléfonico"
            />
            {errors.phoneNumber && (
              <span className={styles.formRequiredField}>{errors.phoneNumber.message}</span>
            )}
          </div>
          <div className={styles.formContainerEmail}>
            <label className={styles.formLabelEmail} htmlFor="phoneNumber">
              ¿Como prefiere ser contactado?
            </label>
            <label className={styles.grayCheckBoxLabel}>
              <div className={styles.grayCheckBoxContainer}>
                <input
                  type="checkbox"
                  name="contactMethod"
                  value="email"
                  ref={register}
                  className={styles.grayCheckBoxInput}
                  onChange={(e) => setContactMethod("email")}
                  checked={contactMethod === "email" ? true : null}
                />
                <svg className={styles.grayCheckBoxSvg} viewBox="0 0 20 20">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
              </div>
              <div className={styles.grayCheckBoxSpan}>Correo Electrónico</div>
            </label>
            <label className={styles.grayCheckBoxLabel}>
              <div className={styles.grayCheckBoxContainer}>
                <input
                  type="checkbox"
                  name="contactMethod"
                  value="phoneNumber"
                  ref={register}
                  className={styles.grayCheckBoxInput}
                  onChange={(e) => setContactMethod("phoneNumber")}
                  checked={contactMethod === "phoneNumber" ? true : null}
                />
                <svg className={styles.grayCheckBoxSvg} viewBox="0 0 20 20">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
              </div>
              <span className={styles.grayCheckBoxSpan}>Número Teléfonico</span>
            </label>
            <label className={styles.grayCheckBoxLabel}>
              <div className={styles.grayCheckBoxContainer}>
                <input
                  type="checkbox"
                  name="contactMethod"
                  value="whatsApp"
                  ref={register}
                  className={styles.grayCheckBoxInput}
                  onChange={(e) => setContactMethod("WhatsApp")}
                  checked={contactMethod === "WhatsApp" ? true : null}
                />
                <svg className={styles.grayCheckBoxSvg} viewBox="0 0 20 20">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
              </div>
              <span className={styles.grayCheckBoxSpan}>WhatsApp</span>
            </label>
            {errors.contactMethod && (
              <span className={styles.formRequiredField}>{errors.contactMethod.message}</span>
            )}
          </div>
          <div className={styles.dropdownContainer}>
            <svg
              className={styles.dropdownSvg}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 412 232"
            >
              <path
                d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                fill="#648299"
                fillRule="nonzero"
              />
            </svg>
            <select name="service" className={styles.dropdownSelect} ref={register}>
              <option value={null}>Tipo de Caso</option>
              <option value="cobro_judicial">Derecho Cobro Judicial</option>
              <option value="derecho_penal">Derecho Penal</option>
              <option value="derecho_laboral">Derecho Laboral</option>
              <option value="otro">Otros</option>
            </select>
          </div>
          <div className={styles.formContainerEmail}>
            {errors.service && (
              <span className={styles.formRequiredField}>{errors.service.message}</span>
            )}
          </div>
          <div className={styles.formContainerEmail}>
            <label className={styles.sectionMediaRightLabel} htmlFor="message">
              ¿Quiere agregar información adicional?
            </label>
            <textarea
              id="message"
              className={styles.formInputTextArea}
              name="message"
              placeholder="Mensaje"
              ref={register}
            />
          </div>
          <div className={styles.formContainerEmail}>
            <button
              className={styles.submitButton}
              type="submit"
              disabled={Boolean(Object.keys(errors).length)}
            >
              Consultar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

FormcarrySection.propTypes = {
  formcarryFormId: PropTypes.string,
  label: PropTypes.string,
  heading: PropTypes.arrayOf(PropTypes.object),
  backgroundImage: PropTypes.object,
};

export default FormcarrySection;
