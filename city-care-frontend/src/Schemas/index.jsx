import * as yup from "yup";

const getPasswordValidationError = () => {
    return "Your password must be 8 Passwords or more and contain at least one lowercase letter, one uppercase letter, and one symbol.";
};

const ProblemReportSchema = yup.object().shape({
  area: yup.string().required("Area is required."),
  email: yup
    .string()
    .email("Enter a valid email.")
    .required("Email is required."),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters long.")
    .required("Description is required."),
 
});

const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Enter valid email.")
    .required("Enter email."),
  password: yup.string().required("Enter password"),
});

const AdminSignInSchema = yup.object().shape({
  id: yup.string().required("Enter id."),
  password: yup.string().required("Enter password"),
});

const SignUpSchema = yup.object().shape({
  firstName: yup.string().max(20).required("Enter firstname."),
  middleName: yup.string().max(20).required("Enter middlename."),
  lastName: yup.string().max(20).required("Enter lastname."),
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Enter valid email.")
    .required("Enter email."),
  contact: yup
    .string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Enter Phone number."),
  password: yup
    .string()
    .required("Enter password.")
    .min(8, getPasswordValidationError())
    .matches(/[a-z]/, getPasswordValidationError())
    .matches(/[A-Z]/, getPasswordValidationError())
    .matches(/[^a-zA-Z0-9]/, getPasswordValidationError()),
});



export {
  SignInSchema,
  SignUpSchema,
  AdminSignInSchema,
  ProblemReportSchema,
};
