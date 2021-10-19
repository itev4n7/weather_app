const request = require('postman-request')
const fs = require('fs')
const path = require('path')

const secretPath = path.join(__dirname, '../../../secrets.json')
const secretFile = fs.readFileSync(secretPath, 'utf8')

const forecast = (latitude, longitude, callback) => {
    const key = JSON.parse(secretFile).key
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${latitude},${longitude}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const temperature = body.current.temperature
            const feelsLike = body.current.feelslike
            callback(undefined, `It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out`)
        }
    })
}

module.exports = forecast