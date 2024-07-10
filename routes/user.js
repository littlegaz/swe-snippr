const route = require('express').Router();
const bcrypt = require("bcrypt");

const users = [{ username: "Animal", password:"woop!"}]

route.get('/', async (req, res) => {
    res.send('Welcome to the user route');
});

route.post('/signup', async (req, res) => {
    const [authType, authString] = req.headers.authorization.split(" ");   
        const [username, password] = Buffer.from(authString, "base64")
    .toString("utf-8")
    .split(":");

    const hashedPassword = await bcrypt.hash(password, 8);
    users.push({username, password: hashedPassword})
    console.log(users)
   

    res.send("account created!")
});


route.post("/login", async (req,res)=> {
    const [authType, authString] = req.headers.authorization.split(" ");  
    const [username, password] = Buffer.from(authString, "base64")
    .toString("utf-8")
    .split(":");

    const user = (users.find(user => user.username === username)); 
    // && user.password === password));

    if (user){
        const authResult = await bcrypt.compare(password, user.password);
        if(authResult){
        res.send("logged in")
        }else {
            res.send(" Username or Password is incorrect!")
        }
        // console.log(user)
    } else {
        res.send(" Username or Password is incorrect!")
    }

    // res.send("logged in")

})
module.exports = route;