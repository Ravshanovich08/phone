const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extends: false }));
let phoneBase = [
    {
        id: 1,
        name: 'Xiaomi 10',
        company: 'xiaomi',
        price: 345,
    },
    {
        id: 2,
        name: 'Samsung J2 ',
        company: 'samsung',
        price: 231,
    },
    {
        id: 3,
        name: 'Nokia',
        company: 'nokia',
        price: 275,
    },
    {
        id: 4,
        name: 'Iphone 13 Pro',
        company: 'apple',
        price: 721,
    },
    {
        id: 5,
        name: 'Iphone 14 pro',
        company: 'apple',
        price: 255,
    },
    {
        id: 6,
        name: 'Redmi',
        company: 'redmi',
        price: 211,
    },
]
app.get('/', (req, res) => {
    res.json(phoneBase);
    console.log('Connected home page');
});
app.post('/create', (req, res) => {
    const length = phoneBase.length;
    if (!req.body.name) {
        res.send("The next step is not possible without entering the name, please fill it completely").statusCode(403);
        return;
    }else if (typeof req.body.name !== "string") {
        res.status(403).send("Error name validation is not true. must have string");
        return;
    }
    if (!req.body.company) {
        res.send("The next step is not possible without entering the company, please fill it completely").statusCode(403);
        return;
    }else if (typeof req.body.company !== "string") {
        res.status(403).send("Error company validation is not true. must have string");
        return;
    }
    if (!req.body.price) {
        res.send("The next step is not possible without entering the price, please fill it completely").statusCode(403);
        return;
    }else if (typeof req.body.price !== 'number') {
        res.status(403).send("Error price validation is not true. must have number");
        return;
    }
    const newPhone = {
        id: length + 1,
        name: req.body.name,
        company: req.body.company,
        price: req.body.price,
    }
    phoneBase.push(newPhone);
    res.json(phoneBase);
    console.log('Connected create page');
});
app.put('/update/:id', (req,res) => {
    let idx = phoneBase.findIndex((newPhone) => newPhone.id === +req.params.id);
    let newPhone = phoneBase[idx];
    newPhone.name = req.body.name || newPhone.name;
    newPhone.company = req.body.company || newPhone.company;
    newPhone.price = req.body.price || newPhone.price;
    phoneBase[idx] = newPhone;
    res.json(phoneBase);
    res.statusCode(200).send('Success');
})
app.delete('/delete/:id', (req,res) => {
    if(!req.body.id){
        res.send("Not deleted , there aren't that many id's");
    }
    phoneBase = phoneBase.filter((newPhone) => {
        return newPhone.id !== +req.params.id;
    });
    res.json(phoneBase).send('Removed sucsesfuly');
});
app.listen(port, () => { console.log('Server listening on port', port); })