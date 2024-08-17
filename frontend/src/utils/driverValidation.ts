// validationSchema.js
import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Ism majburiy"),
  lastName: Yup.string().required("Familiya majburiy"),
  phoneNumber: Yup.string()
    .matches(/^\+998\d{9}$/, "Telefon raqami +998 formatida bo'lishi kerak")
    .required("Telefon raqam majburiy"),
  passportImage: Yup.mixed().required("Passport rasm majburiy"),
  licenseImage: Yup.mixed().required("Guvohnoma rasm majburiy"),
});
