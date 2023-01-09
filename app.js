const express = require('express');
let app = express();

//routers
const userCreate = require("./routes/createRoute")
const userUpdate = require("./routes/updateRoute")
const userShow = require("./routes/showRoute")
const userDelete = require("./routes/deleteRoute")


app.use('/create',userCreate);
app.use('/update',userUpdate);
app.use('/show',userShow);
app.use('/delete',userDelete);

app.listen(3000, (err) => {
    if(err)
        throw err;
    console.log("Server running at port 3000");
});