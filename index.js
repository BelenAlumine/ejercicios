const axios = require('axios')
const express = require('express')
const { extraerInfo } = require('./src/ejercicios/extraerInfo/extraerInfo')
const { normalizar } = require('./src/ejercicios/normalizador/normalizacion')
const { distanciaAlObelisco } = require('./src/ejercicios/distancia/distancia')

const app = express()
app.disable('x-powered-by')
app.use(express.json())

app.get('/', (req, res) => {
    res.json('A continuación, los ejercicios 1, 2 y 3, que consumen dos apis distintas y exponen su información en distintos formatos')
})

app.get('/info', async (req, res) => {
    const data = await extraerInfo() 
    res.json(data)
})
////////////////////////////////////////////////////////////////////////////////////////////
//async function normalizarDireccion(calle, altura, prov) {
//    const { data } = await axios.get("https://apis.datos.gob.ar/georef/api/direcciones?direccion=" + calle + "%20" + altura
//                                        + "&provincia=" + prov) 
//    return data.nomeclatura
//}

//async function controladorNormalizacion(req, res) {
//    const { calle, altura, prov } = req.query
//    const resultado = await normalizarDireccion(calle, altura, prov)
//    
//    res.json(resultado)
//}
//

app.get('/normalizador', async (req, res) => {
    const { calle, altura, provincia, departamento } = req.query

    if (!(altura >= 1)) {
        res.json({error: 'La altura ingresada no es válida'})
    }
    const resultado = await normalizar(calle, altura, provincia, departamento)
    
    res.json(resultado)
})

//////////////////////////////////////////////////////////////////////////////////////////////
app.get('/distancia', async (req, res) => {
    const { dir } = req.query
    
    const resultado = await distanciaAlObelisco(dir)
    
    res.json(resultado)
})
//////////////////////////////////////////////////////////////////////////////////////////////

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
