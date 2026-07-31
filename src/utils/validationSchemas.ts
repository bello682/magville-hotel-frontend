import * as Yup from "yup";

export const reservationValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email address is required"),

  phone: Yup.string()
    .matches(
      /^(?:\+234|0)[789][01]\d{8}$/,
      "Please enter a valid phone number (e.g., 08012345678 or +2348012345678)",
    )
    .required("Phone number is required"),

  idType: Yup.string().required("Identification type is required"),

  idNumber: Yup.string().required("ID number/Passport number is required"),

  checkInDate: Yup.date()
    .required("Check-in date is required")
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Check-in cannot be in the past",
    ),

  checkOutDate: Yup.date()
    .required("Check-out date is required")
    .min(Yup.ref("checkInDate"), "Check-out must be after check-in date"),

  specialNotes: Yup.string().max(200, "Notes cannot exceed 200 characters"),
});
