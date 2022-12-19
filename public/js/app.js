

console.log('client side javascript file is loaded');


// fetch('http://puzzle.mead.io/puzzle').then((Response)=>{
//     Response.json().then((data)=>{
//         console.log(data);
//     })
// })



// fetch('http://localhost:5000/weather?address=!').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error) {
//             console.log(data.error);
//         }else{
//             console.log(data.forecast);
//         }
//     })
// })

const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From javascript'

weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault()

    const location = search.value
    // console.log(location);

    messageOne.textContent = 'loadind.....'
    messageTwo.textContent = ''

    fetch(`http://localhost:5000/weather?address=${location}`).then((response)=>{
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