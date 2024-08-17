// validationSchema.js
import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Ism majburiy"),
  lastName: Yup.string().required("Familiya majburiy"),
  phoneNumber: Yup.string().length(9,"9ta raqal bo'lishi shart").matches(/^[0-9]+$/, "Faqat raqamlar").required("Telefon raqam majburiy"),
  passportImage: Yup.mixed().required("Passport rasm majburiy"),
  licenseImage: Yup.mixed().required("Guvohnoma rasm majburiy"),
});
