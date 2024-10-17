import axios from 'axios';

export const getCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data.map(country => ({
      name: country.name.common,
      flag: country.flags.svg
    }));
  } catch (error) {
    throw error;
  }
};
