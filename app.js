
const express = require('express');
const bodyParser = require('body-parser');
const connection = require("./connect");

let app = express();
app.use(bodyParser.json());




app.set("view engine", "hbs");
app.set("views","./view");






app.get("/", (req,res) =>{
    res.render("index");
});
app.get("/create", (req,res) =>{
    res.render("create");
});

app.get("/show", (req,res) =>{
    res.render("delete");
});
app.get("/update", (req,res) =>{
    res.render("update");
});
app.get("/delete", (req,res) =>{
    res.render("delete");
});


app.get("/createUser", (req,res) => {
    const {fname,lname,email,mobileno} = req.query;


    let qry = "select * from userInfo where Email=? or Phone=?";
    connection.query(qry, [email, mobileno], (err,results)=>{
        if(err)
            throw err;
        else
        {
            if(results.length > 0)
            {
                res.send('Data already exists');
            }
            else{
               let insert_qry = "insert into userInfo values(?,?,?,?)";
               connection.query(insert_qry, [fname,lname,email,mobileno], (err,results) => {
                    if(err)
                        throw err;

                    if(results.affectedRows>0)
                        res.send('Data Inserted Succesfully');
               })
            }
        }
    })
})



app.listen(3000, (err) => {
    if(err)
        throw err;
    console.log("Server running at port 3000");
});