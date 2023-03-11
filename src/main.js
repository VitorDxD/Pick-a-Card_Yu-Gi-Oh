import './assets/css/style.css'
import 'core-js/stable'
import 'regenerator-runtime'

$(document).ready(function(){
    const title = document.querySelector('#card-title')
    const img = document.querySelector('#cardImg')
    const description = document.querySelector('#card-description')
    const btnDraw = document.querySelector('#btnDraw')
    const btnSearch = document.querySelector('#search')
    const field = document.querySelector('#search-field')
    
    function generateRandom(){
        fetch('https://db.ygoprodeck.com/api/v7/randomcard.php')
        .then((response) => response.json())
        .then((json) => {
            title.innerText = json.name
            img.src = json.card_images[0].image_url
            description.innerText = json.desc
        })
    }
    
    function generate(dado){
        fetch(dado)
        .then((response) => response.json())
        .then((json) => {
            field.value = ''
            title.innerText = json.data[0].name
            img.src = json.data[0].card_images[0].image_url
            description.innerText = json.data[0].desc
        })
        .catch(() => {
            alert('A carta não existe no nosso banco de dados.')
        })
    }
    
    function hiddeShow(){
        field.classList.toggle('hidde')
        btnSearch.classList.toggle('hidde')
    }
    
    btnDraw.addEventListener('click', generateRandom)
    btnSearch.addEventListener('mouseover', hiddeShow)
    field.addEventListener('mouseout', hiddeShow)
    field.addEventListener('keypress', (e)=>{
        if (e.key === "Enter") {
            e.preventDefault()
    
            const dado = `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${field.value}`
            generate(dado)
        }
    })
 });
