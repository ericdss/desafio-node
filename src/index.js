const express = require('express');
const app = express();
const port = 3000;

const db = require('./db');

app.listen(port, ()=> {
    console.log('Listening on port...................: ' + port);
});

app.get('/', async (req,res,next) => {
    
    const people = await getPeople();

    let listItems = "";

    people.forEach(person => {
        listItems += `<li>${person.NAME}</li>`;
    });

    let resp = '<h1>Full Cycle Rocks!</h1>' +
                '<br><ul>' + listItems + '</ul>';

    res.send(resp);
});

async function getPeople()
{
    const connection = await db;
    const result = await connection.query("SELECT NAME FROM people");
    return result ? result[0] : [];
}