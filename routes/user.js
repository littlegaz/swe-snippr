const route = require("express").Router();
const basicAuth = require("../middleware/basicAuth");
const bcrypt = require("bcrypt");

const users = [];

route.get("/", async (req,res) => {
    res.send("Hello World");
});

route.post("/signup", async (req, res) => {
    const [authType, authString] = req.headers.authorization.split(" ");
    // console.log("authType", authType, "authString", authString);
    const[username, password] = Buffer.from(authString, "base64" )
    .toString("utf-8").split(":");
    const hashedPassword = await bcrypt.hash(password, 8);
    // console.log("username, password");

    users.push({username, password: hashedPassword});
    console.log(users);

    res.send("Account Created");
});


route.post("/login", async (req, res) => {
    const [authType, authString] = req.headers.authorization.split(" ");
    const[username, password] = Buffer.from(authString, "base64" )
    .toString("utf-8").split(":");
    const user = users.find((user) => user.username === username);
    if (user) {
        const authResult = await bcrypt.compare(password, user.password);
        if (authResult) {
            res.send("logged in");
        } else {
            res.send("Go Away");
        } 
    } else {
        res.send("Go Away!");
    }

});

// route.length("/", basicAuth, async (req, res) => {
//     const {email, password} = req.user;
//     const id = users.length + 1;

//     const saltRounds = 10;
//     const hashedPassword 
// })




module.exports = route;
