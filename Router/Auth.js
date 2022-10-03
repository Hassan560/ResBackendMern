const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../Middleware/authenticate");

require("../Db/Connection");
const User = require("../Model/userSchema");

router.post("/contact" ,(req,res)=>{
  res.setHeader("Test", "hassan")
  console.log("contact page");
  res.send("contact page")
})


// register route
router.post("/register", async (req, res) => {
  const { userName, email, password, cpassword } = req.body;

  if (!userName || !email || !password || !cpassword) {
    return res.status(422).json({ error: "Please Fill All Field Properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email Already Exist" });
    }

    const user = new User({ userName, email, password, cpassword });
    
    // yaha pe hash karry hai pasword ko save krny sy phely
    await user.save();

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    console.log(err);
  }
});

// login Route
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please Fill The Data" });
    }
    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        token = await userLogin.generatAuthToken();
        console.log(token);

        // res.localStorage.setItems('jwtoken', token)
        res.cookie("jwtoken", token);

        console.log(` this is the cookie ${req.cookies.jwtoken}`);
        
        res.json({userLogin, message: "User SignIn Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// getdata
router.get("/getdata", authenticate, (req, res) => {
  console.log("logout page");
  res.send(req.rootUser);
});

// logout ka page
router.get("/logout", (req, res) => {
  console.log("logout page");
  // localStorage.clear("jwtoken", {path: "/"})
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User logout");
});

module.exports = router;
