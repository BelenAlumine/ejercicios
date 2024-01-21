const axios = require('axios')
const geolib = require('geolib');

async function distanciaAlObelisco(dirNorm) {
    const obeliscoLat = -34.603620439127866 
    const obeliscoLong = -58.381799188696064
    
    const [dir, dpto, prov] = dirNorm.split(',')

    try {
        const dirA = await axios.get("https://apis.datos.gob.ar/georef/api/direcciones?direccion=" + dir + "&departamento=" + dpto + "&provincia=" + prov)
    }
    catch {
        return 'error al conectar'
    }
    const latDir = dirA.data.direcciones[0].ubicacion.lat
    const lonDir = dirA.data.direcciones[0].ubicacion.lon

    let distance = geolib.getDistance({latitude: obeliscoLat, longitude: obeliscoLong},
                                        {latitude: latDir, longitude: lonDir})

                                        
    if (distance < 5000) {
        return 'Estas a menos de 5 Kilómetros del Obelisco'
    } else if (distance > 5000) {
        return 'Estas a lejos del Obelisco'
    } else {
        return 'No conozco esa direccion'
    }
}

//distanciaAlObelisco('AV CORRIENTES 100, Comuna 1, Ciudad Autónoma de Buenos Aires')
module.exports = { distanciaAlObelisco }