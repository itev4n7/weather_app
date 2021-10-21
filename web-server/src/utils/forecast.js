const request = require('postman-request')
const fs = require('fs')
const path = require('path')

let key = process.env.KEY_APP
if (!key) {
    const secretPath = path.join(__dirname, '../../../secrets.json')
    const secretFile = fs.readFileSync(secretPath, 'utf8')
    key = JSON.parse(secretFile).key
}

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${latitude},${longitude}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const temperature = body.current.temperature
            const feelsLike = body.current.feelslike
            const humidity = body.current.humidity
            const weatherSting = `It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out, the humidity is ${humidity}%.`
            callback(undefined, weatherSting)
        }
    })
}

module.exports = forecast