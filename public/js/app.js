
const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault()

    const location = search.value
    // console.log(location);

    messageOne.textContent = 'loadind.....'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error) {
            // console.log(data.error);
            messageOne.textContent = data.error
        }else{
            // console.log(data.forecast);
            messageOne.textContent = data.Location
            messageTwo.textContent = data.Forecast
        }
    })
})
})