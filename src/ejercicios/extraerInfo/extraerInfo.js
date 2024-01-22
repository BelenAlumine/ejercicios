const axios = require('axios')

async function extraerInfo() {
    try {
        const data = await axios.get("https://627303496b04786a09002b27.mockapi.io/mock/sucursales")

        const paises = []
        let femeninas = 0
        let masculinas = 0

        for (sucursal of data.data) {
            if (!paises.includes(sucursal.pais)) {
                paises.push(sucursal.pais)
            }
            if (sucursal.genero === 'female') {
                femeninas += 1
            } else {
                masculinas += 1
            }
        }
        return { femeninas, masculinas, paises: paises.length }
    }
    catch (error) {
        return 'Error al conectar'
    }
}

module.exports = { extraerInfo }