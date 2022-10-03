const bcrypt = require("bcrypt");

const users = [
    {
        name: "Admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    }
]

module.exports = users