import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { validationSchema } from '../validation/validationSchema';
import { getCountries } from '../services/countryService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegistrationForm.css';

function RegistrationForm() {
  const { register, handleSubmit, formState: { errors, isValid }, control, reset } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries()
      .then(response => {
        setCountries(response);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania krajów:', error);
      });
  }, []);

  const onSubmit = (data) => {
    const birthDate = new Date(data.birthDate);
    const formattedBirthDate = `${birthDate.getFullYear()}-${String(birthDate.getMonth() + 1).padStart(2, '0')}-${String(birthDate.getDate()).padStart(2, '0')}`;

    const formattedData = {
      ...data,
      birthDate: formattedBirthDate,
    };

    console.log('Dane formularza:', JSON.stringify(formattedData, null, 2));

    reset();
  };

  const countryOptions = countries.map(country => ({
    value: country.name,
    label: (
      <div>
        <img
          src={country.flag}
          alt={`Flaga ${country.name}`}
          style={{ width: 20, marginRight: 10, verticalAlign: 'middle' }}
        />
        {country.name}
      </div>
    )
  }));

  return (
    <div className="container mt-5">
      <h2>Formularz rejestracyjny</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
        <div className="form-group">
          <label>Imię</label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
            {...register('firstName')}
          />
          <div className="invalid-feedback">{errors.firstName?.message}</div>
        </div>

        <div className="form-group">
          <label>Nazwisko</label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            {...register('lastName')}
          />
          <div className="invalid-feedback">{errors.lastName?.message}</div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email')}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="form-group">
          <label>Hasło</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password')}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>

        <div className="form-group">
          <label>Potwierdź hasło</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            {...register('confirmPassword')}
          />
          <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
        </div>

        <div className="form-group">
          <label>Wiek</label>
          <input
            type="number"
            className={`form-control ${errors.age ? 'is-invalid' : ''}`}
            {...register('age')}
          />
          <div className="invalid-feedback">{errors.age?.message}</div>
        </div>

        <div className="form-group">
          <label>Data urodzenia</label>
          <input
            type="date"
            className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
            {...register('birthDate')}
          />
          <div className="invalid-feedback">{errors.birthDate?.message}</div>
        </div>

        <div className="form-group">
          <label>Kraj</label>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Select
                {...field}
                options={countryOptions}
                classNamePrefix="react-select"
                placeholder="Wybierz kraj"
                isClearable
                onChange={(selectedOption) => {
                  field.onChange(selectedOption ? selectedOption.value : '');
                }}
                value={countryOptions.find(option => option.value === field.value) || null}
                className={`react-select-container ${errors.country ? 'is-invalid' : ''}`}
              />
            )}
          />
          <div className="invalid-feedback">{errors.country?.message}</div>
        </div>

        <div className="form-group">
          <label>Płeć</label>
          <select className="form-control" {...register('gender')}>
            <option value="">Nie wybrano</option>
            <option value="male">Mężczyzna</option>
            <option value="female">Kobieta</option>
            <option value="other">Inna</option>
          </select>
        </div>

        <div className="form-group form-check">
          <input
            type="checkbox"
            className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
            {...register('terms')}
          />
          <label className="form-check-label">Akceptuję regulamin</label>
          <div className="invalid-feedback">{errors.terms?.message}</div>
        </div>

        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            {...register('marketing')}
          />
          <label className="form-check-label">Zgody marketingowe</label>
        </div>

        <button type="submit" className="btn btn-primary" disabled={!isValid}>
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
