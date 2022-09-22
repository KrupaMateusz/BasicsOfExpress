const express = require("express")
const cors = require("cors")
const app = express()
const contactList = [{name: "Marcin", number: "795684321", id: 9}]

app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Działa!")
})

app.get("/contactlist", (req, res) => {
    res.json({contactList})
})

app.post("/contactlist", (req, res) => {
    console.log(req.body)
    contactList.push(req.body)
    res.status(200).end()
})

app.delete("/contactlist/:contactId", (req, res)=>{
    const contactToDelete = req.params.contactId

    const contactItemIndex = contactList.findIndex(e => e.id == contactToDelete)
    if (contactItemIndex !== undefined){
        contactList.splice(contactItemIndex, 1)
    }
    console.log(contactList)
    res.status(200).end()
})

app.listen(8888, ()=>{
    console.log("aplikacja wystartowała")
})