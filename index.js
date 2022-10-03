const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express();
dotenv.config({path:"./.env"});

require('./Db/Connection')
// const User = require('./Model/userSchema');
app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use(require('./Router/Auth'));
app.use(require('./Router/Product'));
app.use(require('./Router/Categories'))
app.use(require('./Router/Order'))

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`server is running on http://localhost:${port}`));
