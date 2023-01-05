
const express = require('express');
const bodyParser = require('body-parser');
const connection = require("./connect");
const { fileURLToPath } = require('url');

let app = express();
app.use(bodyParser.json());




// app.set("view engine", "hbs");
// app.set("views","./view");






// app.get("/", (req,res) =>{
//     res.render("index");
// });


// app.get("/create", (req,res) =>{
//     res.render("create");
// });



app.get("/show", (req,res) =>{
    let qry = "select * from userInfo";
    connection.query(qry, (err,results) => {
        if(err)
            throw err;
        else
        {
            res.send(results);
        }
    })
});


app.put("/update/:mobileno", (req,res) =>{
    const {fname,lname,email,image} = req.body;

    const {mobileno} = req.params;

    let qry = "select * from userInfo where mobileno = ?";
    connection.query(qry, [mobileno], (err,results)=>{
        if(err)
            throw err;
        else
        {
            if(results.length > 0)
            {
                let insert_qry = "update userInfo set fname = ?,lname = ?,email = ?,image = ? where mobileno = ?";
                connection.query(insert_qry, [fname,lname,email,image,mobileno], (err,results) => {
                    if(err)
                        throw err;

                    if(results.affectedRows>0)
                        res.send('Data updated Succesfully');
               });
                
            }
            else{
                res.send('Entry Does not exist');
            }
        }
    })
});



app.delete("/delete/:mobileno", (req,res) =>{
    const {fname,lname,email,image} = req.body;

    const {mobileno} = req.params;

    let qry = "select * from userInfo where mobileno = ?";
    connection.query(qry, [mobileno], (err,results)=>{
        if(err)
            throw err;
        else
        {
            if(results.length > 0)
            {
                let insert_qry = "delete from userinfo where mobileno = ?";
                connection.query(insert_qry, [mobileno], (err,results) => {
                    if(err)
                        throw err;

                    if(results.affectedRows>0)
                        res.send('Data deleted Succesfully');
               });
                
            }
            else{
                res.send('Entry Does not exist');
            }
        }
    })
});


app.post("/createUser", (req,res) => {
    const {fname,lname,email,mobileno,image} = req.body;


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
               let insert_qry = "insert into userInfo values(?,?,?,?,?)";
               connection.query(insert_qry, [fname,lname,email,mobileno,image], (err,results) => {
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