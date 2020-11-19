import axios from 'axios';

export async function getAddress(cep: string) {
    const address = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);

    return address;

}
