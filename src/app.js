const letoltGomb = document.querySelector("#letoltGomb")
const adGomb = document.querySelector("#adGomb")
const dolgozokTabla = document.querySelector("#dolgozokTabla")
const nevElem = document.querySelector("#nev")
const telepulesElem = document.querySelector("#telepules")
const fizetesElem = document.querySelector("#fizetes")

const eidElem = document.querySelector('#eid')
const enevElem = document.querySelector('#enev')
const etelepulesElem = document.querySelector('#etelepules')
const efizetesElem = document.querySelector('#efizetes')

const saveButton = document.querySelector('#saveButton')

const url = 'http://localhost:3000/dolgozok'

var aktualTr = null

letoltGomb.addEventListener('click', () => {
    console.log('le működik')
    fetch(url)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        renderTable(result);
    })
    .catch(err => {
        console.log(err)
    })
})

var renderTable = (result) => {
    result.forEach( dolgozo => {
        let tr = document.createElement('tr')
        let tdId = document.createElement('td')
        let tdNev = document.createElement('td')
        let tdTel = document.createElement('td')
        let tdFiz = document.createElement('td')
        let tdButton = document.createElement('td')
        let editBtn = document.createElement('button')
        setEditBtn(editBtn, dolgozo)

        tdId.textContent = dolgozo.id
        tdNev.textContent = dolgozo.nev
        tdTel.textContent = dolgozo.telepules
        tdFiz.textContent = dolgozo.fizetes
        tdButton.appendChild(editBtn)
        tr.appendChild(tdId)
        tr.appendChild(tdNev)
        tr.appendChild(tdTel)
        tr.appendChild(tdFiz)
        tr.appendChild(tdButton)
        dolgozokTabla.appendChild(tr)    
    })
};

var setEditBtn = (editBtn, dolgozo) => {
    editBtn.classList.add('btn')
    editBtn.innerHTML = '<i class="bi-pencil-square"></i>'
    editBtn.setAttribute('data-bs-toggle', 'modal')
    editBtn.setAttribute('data-bs-target', '#editModal')
    editBtn.setAttribute('data-empid', dolgozo.id)
    editBtn.setAttribute('data-empnev', dolgozo.nev)
    editBtn.setAttribute('data-emptel', dolgozo.telepules)
    editBtn.setAttribute('data-empfiz', dolgozo.fizetes)
    editBtn.addEventListener('click', () => {
        eidElem.value = editBtn.dataset.empid
        enevElem.value = editBtn.dataset.empnev
        etelepulesElem.value = editBtn.dataset.emptel
        efizetesElem.value = editBtn.dataset.empfiz

        aktualTr = editBtn.parentNode.parentNode
    })

};


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

saveButton.addEventListener('click', () => {
    aktualTr.childNodes[1].textContent = enevElem.value
    aktualTr.childNodes[2].textContent = etelepulesElem.value
    aktualTr.childNodes[3].textContent = efizetesElem.value
    updateEmployee(eidElem.value)
})

var updateEmployee = (id) => {
    console.log(id)
}