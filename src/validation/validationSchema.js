// src/validation/validationSchema.js
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  firstName: yup.string()
    .required('Imię jest wymagane')
    .min(2, 'Imię musi mieć co najmniej 2 znaki')
    .matches(/^[A-Za-z]+$/, 'Imię może zawierać tylko litery'),
  lastName: yup.string()
    .required('Nazwisko jest wymagane')
    .min(2, 'Nazwisko musi mieć co najmniej 2 znaki')
    .matches(/^[A-Za-z]+$/, 'Nazwisko może zawierać tylko litery'),
  email: yup.string()
    .required('Email jest wymagany')
    .email('Email musi być poprawnym adresem email'),
  password: yup.string()
    .required('Hasło jest wymagane')
    .min(8, 'Hasło musi mieć co najmniej 8 znaków')
    .matches(/\d{2}/, 'Hasło musi zawierać co najmniej dwie cyfry')
    .matches(/[!@#$%^&*(),.?":{}|<>]{3}/, 'Hasło musi zawierać co najmniej trzy znaki specjalne'),
  confirmPassword: yup.string()
    .required('Potwierdzenie hasła jest wymagane')
    .oneOf([yup.ref('password'), null], 'Hasła muszą być takie same'),
  age: yup.number()
    .required('Wiek jest wymagany')
    .min(18, 'Minimalny wiek to 18 lat')
    .max(99, 'Maksymalny wiek to 99 lat'),
  birthDate: yup.date()
    .required('Data urodzenia jest wymagana')
    .test('age-match', 'Data urodzenia musi być zgodna z wiekiem', function(value) {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18 && age <= 99;
    }),
  country: yup.string().required('Kraj jest wymagany'),
  gender: yup.string().nullable(),
  terms: yup.boolean()
    .oneOf([true], 'Musisz zaakceptować regulamin'),
  marketing: yup.boolean().nullable(),
});
