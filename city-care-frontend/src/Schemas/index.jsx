import * as yup from "yup";

const getPasswordValidationError = () => {
    return "Your password must be 8 Passwords or more and contain at least one lowercase letter, one uppercase letter, and one symbol.";
};

const ProblemReportSchema = yup.object().shape({
    area: yup.string().required("Area is required."),
    email: yup.string()
      .email("Enter a valid email.")
      .required("Email is required."),
  });

const SignInSchema = yup.object().shape({
    email: yup.string().matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/,"Enter valid email.").required("Enter email."),
    password: yup.string()
        .required("Enter password")
        
});

const AdminSignInSchema = yup.object().shape({
    id: yup.string().required("Enter id."),
    password: yup.string()
        .required("Enter password")
        
});

const SignUpSchema = yup.object().shape({
    firstName: yup.string().max(20).required("Enter firstname."),
    middleName: yup.string().max(20).required("Enter middlename."),
    lastName: yup.string().max(20).required("Enter lastname."),
    email: yup.string().matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/,"Enter valid email.").required("Enter email."),
    contact: yup.string()
        .matches(/^\d{10}$/, "Invalid phone number")
        .required("Enter Phone number."),
    password: yup.string()
        .required("Enter password.")
        .min(8, getPasswordValidationError())
        .matches(/[a-z]/, getPasswordValidationError())
        .matches(/[A-Z]/, getPasswordValidationError())
        .matches(/[^a-zA-Z0-9]/, getPasswordValidationError())
});

const HosSignInSchema = yup.object().shape({
    Hospital_id: yup.string().required("Enter Hospital id."),
    password: yup.string()
        .required("Enter password")
        
});

const HosSignUpSchema = yup.object().shape({
    Hospital_name: yup.string().max(20).required("Enter Hospital name."),
    Hospital_id: yup.string().max(20).required("Enter Hospital id."),
    email: yup.string().matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/,"Enter valid email.").required("Enter email."),
    Hospital_address: yup.string().required("Enter Hospital address."),
    contact: yup.string()
        .matches(/^\d{10}$/, "Invalid phone number")
        .required("Enter phone number."),
    password: yup.string()
        .required("Enter password.")
        .min(8, getPasswordValidationError())
        .matches(/[a-z]/, getPasswordValidationError())
        .matches(/[A-Z]/, getPasswordValidationError())
        .matches(/[^a-zA-Z0-9]/, getPasswordValidationError())
});


const PatientSchema = yup.object().shape({
  patientName: yup.string().required("Patient name is required"),
  patientId: yup.string().required("Patient ID is required"),
  bloodType: yup.string().required("Blood type is required"),
  lastDate: yup.date().required("Last date is required"),
});

const CampSchema = yup.object().shape({
    CampAddress: yup.string().required("Enter Camp address."),
    CampDays: yup.string().required("Enter Camp Days"),
    CampDate:  yup.date().required("Camp date is required"),
    
  });

  const CampDataSchema = yup.object().shape({
    CampId: yup.string().required("Enter Camp Id."),
    Email: yup.string().matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/,"Enter valid email.").required("Enter email."),
    Liters:  yup.date().required("Amount is required"),
    
  });





export { SignInSchema, SignUpSchema,AdminSignInSchema,HosSignUpSchema,HosSignInSchema,PatientSchema,CampSchema,CampDataSchema,ProblemReportSchema };
