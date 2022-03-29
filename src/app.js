const letoltGomb = document.querySelector("#letoltGomb")
const adGomb = document.querySelector("#adGomb")
const dolgozokTabla = document.querySelector("#dolgozokTabla")
const nevElem = document.querySelector("#nev")
const telepulesElem = document.querySelector("#telepules")
const fizetesElem = document.querySelector("#fizetes")
const url = 'http://localhost:3000/dolgozok'


letoltGomb.addEventListener('click', () => {
    console.log('le működik')
    fetch(url)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.forEach( dolgozo => {
            let tr = document.createElement('tr')
            let tdId = document.createElement('td')
            let tdNev = document.createElement('td')
            let tdTel = document.createElement('td')
            let tdFiz = document.createElement('td')
            tdId.textContent = dolgozo.id
            tdNev.textContent = dolgozo.nev
            tdTel.textContent = dolgozo.telepules
            tdFiz.textContent = dolgozo.fizetes
            tr.appendChild(tdId)
            tr.appendChild(tdNev)
            tr.appendChild(tdTel)
            tr.appendChild(tdFiz)
            dolgozokTabla.appendChild(tr)
    
        })
        

    })
    .catch(err => {
        console.log(err)
    })
})
adGomb.addEventListener('click', () => {
    console.log(nevElem.value)
    console.log(telepulesElem.value)
    console.log(fizetesElem.value)
    let dolgozo = {
        nev: nevElem.value,
        telepules: telepulesElem.value,
        fizetes: fizetesElem.value
    }
    fetch(url, {        
        method: 'post',
        body: JSON.stringify( dolgozo),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then( response => response.json())
    .then(result => {
        console.log(result)
    })
    .catch( err => {
        console.log(err)
    })

    nevElem.value = ''
    telepulesElem.value = ''
    fizetesElem.value = ''
})

