const connection = require('../connect');


const createUser = (req,res) => {
    const {fname,lname,email,mobileno,image} = req.body;
    let qry = "select * from userInfo where mobileno=?";
    connection.query(qry, [mobileno], (err,results)=>{
        if(err)
            res.status(500).json({message : "Something went wrong"});
        else
        {
            if(results.length > 0)
            {
                res.status(500).json({message:'Data already exists'});
                return
            }
            else{
               let insert_qry = "insert into userInfo values(?,?,?,?,?)";
               connection.query(insert_qry, [fname,lname,email,mobileno,image], (err,results) => {
                    if(err)
                        res.status(500).json({message : "Something went wrong",
                    err : err});
                        

                    if(results.affectedRows>0)
                        res.status(200).json({message:'Data Inserted Succesfully. Please Save the accessToken for accessing your data.',
                    accessToken : req.accessToken});
               })
            }
        }
    })
}

module.exports = createUser;
