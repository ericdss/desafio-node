const mysql = require('mysql2/promise');

async function getConnection()
{
    const connection = await mysql.createConnection({
        host: 'db',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'nodedb'
    });
    
    console.log("Database Connected!");
    console.log("Using [nodedb] database!");
    
    await createTables(connection);

    return connection;
}

async function createTables(connection)
{
    const people = "CREATE TABLE IF NOT EXISTS people (ID INT auto_increment not null, NAME VARCHAR(255), primary key(id))";

    await connection.query(people);
    console.log("Table [people] created")

    await connection.query("INSERT INTO people(NAME) SELECT 'JOÃO' WHERE NOT EXISTS (SELECT * FROM people WHERE NAME = 'JOÃO')");
    await connection.query("INSERT INTO people(NAME) SELECT 'MARIA' WHERE NOT EXISTS (SELECT * FROM people WHERE NAME = 'MARIA')");
    await connection.query("INSERT INTO people(NAME) SELECT 'JOSÉ' WHERE NOT EXISTS (SELECT * FROM people WHERE NAME = 'JOSÉ')");
}

module.exports = getConnection();