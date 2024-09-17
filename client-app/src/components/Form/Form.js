import React, { useState, useEffect } from 'react';
import './Form.css'; // Importer le fichier CSS pour le style

const Form = ({ onSubmit, fields, buttonText }) => {
  const [formValues, setFormValues] = useState(() => {
    const initialValues = {};
    fields.forEach((field) => {
      initialValues[field.name] = '';
    });
    return initialValues;
  });

  useEffect(() => {
    const updatedValues = {};
    fields.forEach((field) => {
      setFormValues((prevValues) => {
        if (!(field.name in prevValues)) {
          updatedValues[field.name] = '';
        }
        return { ...prevValues, ...updatedValues };
      });
    });
  }, [fields]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          <label htmlFor={field.name} className="form-label" >{field.label}</label>
          <input
            className="form-input"
            type={field.type || 'text'}
            id={field.name}
            name={field.name}
            value={formValues[field.name] || ''}
            onChange={handleChange}
            required={field.required}
          />
        </div>
      ))}
      <button  className="form-button" type="submit">{buttonText}</button>
    </form>
  );
};

export default Form;
