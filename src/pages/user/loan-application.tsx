import AppLayout from "@/layout/user";
import MenuItem from "@mui/material/MenuItem";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import { ErrorMessage, Form, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

const steps = ["Personal Details", "Contact Details", "Document Upload"];

const validationSchemas = [
  Yup.object({
    name: Yup.string().required("Name is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.date().required("Date of Birth is required").nullable(),
    pan: Yup.string().required("PAN Card is required"),
    aadhaar: Yup.string().required("Aadhaar Card is required"),
  }),
  Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  }),
  Yup.object({
    panCard: Yup.mixed<File>()
      .required("PAN Card is required")
      .test(
        "fileSize",
        "File too large",
        (value) => (value ? value.size <= 5242880 : true) // 5MB
      )
      .test("fileType", "Unsupported File Format", (value) =>
        value
          ? ["application/pdf", "image/jpeg", "image/png"].includes(value.type)
          : true
      ),
    aadhaarCard: Yup.mixed<File>()
      .required("Aadhaar Card is required")
      .test(
        "fileSize",
        "File too large",
        (value) => (value ? value.size <= 5242880 : true) // 5MB
      )
      .test("fileType", "Unsupported File Format", (value) =>
        value
          ? ["application/pdf", "image/jpeg", "image/png"].includes(value.type)
          : true
      ),
  }),
];

const LoanApplication = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [validationMessage, setValidationMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "",
      dob: "",
      pan: "",
      aadhaar: "",
      email: "",
      phone: "",
      address: "",
      panCard: null as File | null,
      aadhaarCard: null as File | null,
    },
    validationSchema: validationSchemas[activeStep],
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      Swal.fire({
        title: "Success!",
        text: "Application submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      resetForm(); // Reset form values
      setActiveStep(0);
    },
  });

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const file = event.currentTarget.files?.[0] || null;
    formik.setFieldValue(fieldName, file);
  };

  const handleStepChange = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        if (activeStep === steps.length - 1) {
          formik.handleSubmit(); // Submit the form if on the last step
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        setValidationMessage(""); // Clear any existing validation message
      } else {
        setValidationMessage("Please fill out all required fields.");
      }
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4 grid grid-cols-2 gap-5">
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              className="col-span-2"
              fullWidth
              margin="normal"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={<ErrorMessage name="name" />}
            />
            <TextField
              name="gender"
              label="Gender"
              variant="outlined"
              fullWidth
              margin="normal"
              select
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gender}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={<ErrorMessage name="gender" />}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="transgender">Transgender</MenuItem>
            </TextField>
            <TextField
              name="dob"
              label="Date of Birth"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dob}
              error={formik.touched.dob && Boolean(formik.errors.dob)}
              helperText={<ErrorMessage name="dob" />}
            />
            <TextField
              name="pan"
              label="PAN Number"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pan}
              error={formik.touched.pan && Boolean(formik.errors.pan)}
              helperText={<ErrorMessage name="pan" />}
            />
            <TextField
              name="aadhaar"
              label="Aadhaar Number"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.aadhaar}
              error={formik.touched.aadhaar && Boolean(formik.errors.aadhaar)}
              helperText={<ErrorMessage name="aadhaar" />}
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <TextField
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={<ErrorMessage name="email" />}
            />
            <TextField
              name="phone"
              label="Phone"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={<ErrorMessage name="phone" />}
            />
            <TextField
              name="address"
              label="Address"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={<ErrorMessage name="address" />}
            />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-5">
            <div className="space-y-2">
              <label
                htmlFor="panCard"
                className="block text-sm font-medium text-gray-700"
              >
                PAN Card
              </label>
              <input
                id="panCard"
                name="panCard"
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={(event) => handleFileChange(event, "panCard")}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md p-5 shadow-sm"
              />
              {formik.touched.panCard && formik.errors.panCard && (
                <div className="text-red-600 text-sm">
                  {formik.errors.panCard}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="aadhaarCard"
                className="block text-sm font-medium text-gray-700"
              >
                Aadhaar Card
              </label>
              <input
                id="aadhaarCard"
                name="aadhaarCard"
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={(event) => handleFileChange(event, "aadhaarCard")}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md p-5 shadow-sm"
              />
              {formik.touched.aadhaarCard && formik.errors.aadhaarCard && (
                <div className="text-red-600 text-sm">
                  {formik.errors.aadhaarCard}
                </div>
              )}
            </div>
          </div>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <AppLayout title="Loan Application">
      <div className="admin-container flex flex-col gap-5">
        <h2 className="text-3xl font-bold">Loan Application</h2>
        <div className="flex flex-col gap-5 admin-card p-10">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {validationMessage && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 rounded border border-red-300">
              {validationMessage}
            </div>
          )}
          <FormikProvider value={formik}>
            <Form>
              {getStepContent(activeStep)}
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={`px-5 py-2 rounded ${
                    activeStep === 0
                      ? "hidden"
                      : `${
                          activeStep === 1 ? "bg-gray-500" : "bg-blue-500"
                        } text-white`
                  }`}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleStepChange}
                  className={`px-5 py-2  text-white rounded ${
                    activeStep === steps.length - 1
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </AppLayout>
  );
};

export default LoanApplication;
