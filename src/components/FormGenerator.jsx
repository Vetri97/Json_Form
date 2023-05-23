import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  FormGroup,
} from "@mui/material";
import formStructure from "../Json/formStructure.json";
import FormDataDialog from "./FormDataDialog";

const FormStepperGenerator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setFormData({});
    setActiveStep(0);
  };

  const steps = formStructure.steps;
  const currentStep = steps[activeStep];

  useEffect(() => {
    setFormErrors({});
  }, [activeStep]);

  const handleNext = () => {
    const fields = currentStep.fields;
    const errors = {};

    fields.forEach((field) => {
      const fieldValue = formData[field.id];

      // Perform validation based on field configuration
      if (field.required) {
        if (field.type === "checkbox") {
          if (!fieldValue || fieldValue.length === 0) {
            errors[field.id] = `Please select at least one ${field.label}`;
          }
        } else if (!fieldValue || fieldValue.trim() === "") {
          errors[field.id] = `${field.label} is required`;
        }
      }

      if (
        field.validationRegex &&
        !new RegExp(field.validationRegex).test(fieldValue)
      ) {
        errors[field.id] = field.validationMessage || "Invalid value";
      }
    });

    if (Object.keys(errors).length === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    setFormErrors(errors);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setFormErrors({});
  };

  const handleChange = (fieldId) => (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldId]: event.target.value,
    }));
  };

  const renderFields = () => {
    return currentStep.fields.map((field) => (
      <div key={field.id}>
        {(field.type === "text" ||
          field.type === "number" ||
          field.type === "email") && (
          <TextField
            name={field.id}
            label={field.label}
            type={field.type}
            required={field.required}
            margin="normal"
            fullWidth
            value={formData[field.id] || ""}
            onChange={handleChange(field.id)}
            error={Boolean(formErrors[field.id])}
            helperText={formErrors[field.id]}
            inputProps={{
              pattern: field.validationRegex || "",
              title: field.validationMessage || "",
            }}
          />
        )}

        {field.type === "select" && (
          <TextField
            name={field.id}
            label={field.label}
            select
            required={field.required}
            margin="normal"
            fullWidth
            value={formData[field.id] || ""}
            onChange={handleChange(field.id)}
            error={Boolean(formErrors[field.id])}
            helperText={formErrors[field.id]}
          >
            <MenuItem value="" disabled>
              Select {field.label}
            </MenuItem>
            {field.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
        {field.type === "radio" && (
          <FormControl component="fieldset">
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
              name={field.id}
              value={formData[field.id] || ""}
              onChange={handleChange(field.id)}
            >
              {field.options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
        {field.type === "checkbox" && (
          <FormControl component="fieldset" required={field.required}>
            <FormLabel component="legend">{field.label}</FormLabel>
            <FormGroup style={{ flexDirection: "row" }}>
              {field.options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      name={field.id}
                      value={option.value}
                      checked={(formData[field.id] || []).includes(
                        option.value
                      )}
                      onChange={handleChange(field.id)}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
          </FormControl>
        )}
      </div>
    ));
  };

  return (
    <div style={{ width: "650px" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ width: "650px" }}>
        <form>
          {renderFields()}

          <div>
            {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
            <Button
              type="button"
              onClick={() => {
                if (activeStep !== steps.length - 1) {
                  handleNext();
                } else {
                  handleOpenDialog();
                }
              }}
              //   disabled={Object.keys(formErrors).length > 0}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </form>
        <FormDataDialog
          formData={formData}
          open={isDialogOpen}
          onClose={handleCloseDialog}
        />
      </div>
    </div>
  );
};

export default FormStepperGenerator;
