const database = require('./database.js');

async function getAllProducts() {
    const connection = await database.connectDB();
    const [rows] = await connection.execute('SELECT * FROM profile');
    await connection.end();
    return rows;
}
async function getUser(id) {

    const connection = await database.connectDB();
    const results = await connection.execute('SELECT * FROM profile WHERE id = ?', [id]);
    console.log('Results:', results); // Add this line to log the results
    if (results[0].length > 0) {
        return results[0][0];
    } else {
        return null; // Return null if no user found with the given id
    }
}
async function createUser(user) {
    const connection = await database.connectDB();
    const { firstname, lastname, nickname, email, age, phonenumber, bio } = user;
    await connection.execute('INSERT INTO profile (firstname, lastname, nickname, email, age, phonenumber, bio) VALUES (?, ?, ?, ?, ?, ?, ?)', [firstname, lastname, nickname, email, age, phonenumber, bio]);
}
async function updateUser(user) {
    const connection = await database.connectDB();
    const { id, firstname, lastname, nickname, email, age, phonenumber, bio } = user;
    // Provide default values if necessary
    if (id === undefined || firstname === undefined || lastname === undefined || nickname === undefined || email === undefined || age === undefined || phonenumber === undefined || bio === undefined) {
        throw new Error('All fields must be provided');
    }
    await connection.execute('UPDATE profile SET firstname = ?, lastname = ?, nickname = ?, email = ?, age = ?, phonenumber = ?, bio = ? WHERE id = ?', [firstname, lastname, nickname, email, age, phonenumber, bio, id]);
}
async function deleteUser(id) {
    const connection = await database.connectDB();
    await connection.execute('DELETE FROM profile WHERE id = ?', [id]);
}
module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };