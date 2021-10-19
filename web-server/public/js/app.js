const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    console.log(location)
    if (location === '') {
        message1.textContent = 'Provide a location!'
    }
    message1.textContent = 'Searching...'
    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        return response.json()
    }).then(data => {
        if (data.error) {
            message1.textContent = data.error
            return console.log(data.error)
        }
        message1.textContent = data.location
        message2.textContent = data.forecastData
    })
})