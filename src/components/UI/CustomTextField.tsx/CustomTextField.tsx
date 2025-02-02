import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

// props del componente (extender las props de TextField si es necesario...)
type CustomTextFieldProps = TextFieldProps;

const CustomTextField: React.FC<CustomTextFieldProps> = (props) => {
  return (
    <TextField
      {...props} // Pasa todas las props al TextField
      variant="outlined"
    />
  );
};

export default CustomTextField;