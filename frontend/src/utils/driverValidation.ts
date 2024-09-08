// validationSchema.js
import * as Yup from "Yup";
export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Ism majburiy"),
  lastName: Yup.string().required("Familiya majburiy"),
  phoneNumber: Yup.string().length(9,"9ta raqal bo'lishi shart").matches(/^[0-9]+$/, "Faqat raqamlar").required("Telefon raqam majburiy"),
  passportImage: Yup.mixed().required("Passport rasm majburiy"),
  licenseImage: Yup.mixed().required("Guvohnoma rasm majburiy"),
});


export const sendUser = Yup.object().shape({
  where: Yup.string().required("Viloyatni tanlang"),
  tuman: Yup.string().required("Tumanni tanlang"),
  to: Yup.string().required("Viloyatni tanlang"),
  to_tuman: Yup.string().required("Tumanni tanlang"),
  request_type:Yup.string(),
  yolovchiSoni: Yup
    .number()
    .required("Yo'lovchilar sonini kiriting")
    .positive("Yo'lovchilar soni musbat bo'lishi kerak")
    .integer("Yo'lovchilar soni butun son bo'lishi kerak"),
  cost: Yup
    .number()
    .required("Narxni kiriting")
    .positive("Narx musbat bo'lishi kerak"),
  phone_number: Yup
    .string()
    .required("Telefon raqamini kiriting")
    .matches(/^\+998\d{9}$/, "Noto'g'ri telefon raqami formati"),
  gender: Yup.string().required("Jinsingizni tanlang"),
});