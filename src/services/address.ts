import axios from 'axios';

export default {
  getAddressByCep(cepInput: string) {
    return axios.get(`https://viacep.com.br/ws/${cepInput}/json/`);
  },

  getAddressByStreetName(uf: string, cidade: string, logradouro: string) {
    return axios.get(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`);
  },

}