const axios = require('axios')

async function normalizar(calle, altura, provincia, departamento) {
    try {
        const response = await axios.get(`https://apis.datos.gob.ar/georef/api/direcciones?direccion=${calle} ${altura}&provincia=${provincia}${departamento ? `&departamento=${departamento}`: ''}`)
        if (response.data.total === 1) {
            return response.data.direcciones[0].nomenclatura
        }
        else {
                const localidades = new Set(response.data.direcciones.map(d => d.localidad_censal.nombre))
            return [...localidades]
        }
    }
    catch (error) {
        return 'error al conectar'
    }
}

//normalizar('Av Mitre', '1189', 'Buenos Aires')
module.exports = { normalizar }
