const soap = require('soap')

async function getMoneda(country) {
    try {
        const client = await soap.createClientAsync('http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL')
    
        const countryRes = await client.CountryISOCodeAsync({ sCountryName: country }, { })
        const countryISOCode = countryRes[0].CountryISOCodeResult

        const currencyRes = await client.CountryCurrencyAsync({ sCountryISOCode: countryISOCode }, {})
        const countryCurrency = currencyRes[0].CountryCurrencyResult.sName

        return countryCurrency
    }
    catch {
        return 'Error al conectar'
    }
}

//getData('Argentina')
module.exports = { getMoneda }