const button = document.querySelector(".submit-button")
const main = document.querySelector(".list")
let removeButtons = document.querySelectorAll(".remove-button")
let contactTable = []
let contactId = 0;

function contactObjCreate(name, number, id){
    const obj = {name: name, number: number, id: id}
    return obj
}

function listElementCreate(object){
    const contact = document.createElement("li")
    const paragraph = document.createElement("p")
    paragraph.innerHTML = `${object.name}: ${object.number}`
    const removeButton = document.createElement("button")
    removeButton.classList.add("remove-button")
    removeButton.setAttribute("id", object.id)
    removeButton.innerHTML = "&times;"
    contact.appendChild(paragraph)
    contact.appendChild(removeButton)
    return contact
}

function appendContactsToList(table){
    table.forEach(item => {
        console.log(item)
        main.appendChild(listElementCreate(item))
        console.log(item.id)
    })
}

function sendItemToBackend(item){
    return fetch("http://127.0.0.1:8888/contactlist", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            "Content-type": "application/json"
        }
    })
}

function getItemsFromBackend(){
    return fetch("http://127.0.0.1:8888/contactlist").then((res) => res.json())
}

const windowRefresh = ()=>{
        contactTable = []
        main.innerHTML = ""
        getItemsFromBackend().then(({contactList})=>{
            contactList.forEach(contact => {
                contactTable.push(contact)
                if (contactId<contact.id){
                contactId = contact.id
                contactId++}
            })
        }).then(()=>{
            appendContactsToList(contactTable)
        }).then(()=>{
            deleteListenerAdd()
        })
}

windowRefresh()

button.addEventListener("click", (ev)=>{
ev.preventDefault()
    const name = document.querySelector(".name").value
    const number = document.querySelector(".number").value
    const contactObj = contactObjCreate(name, number, contactId)
    contactId++;
    sendItemToBackend(contactObj).then(windowRefresh)
})

function deleteListenerAdd(){
    const deleteButtons = document.querySelectorAll(".remove-button")
    deleteButtons.forEach(delButton => {
        delButton.addEventListener("click", ()=>{
            let buttonId = delButton.getAttribute("id")
            fetch(`http://127.0.0.1:8888/contactList/${buttonId}`,{
                method: "DELETE"
            }).then(windowRefresh)
        })
    })
}

