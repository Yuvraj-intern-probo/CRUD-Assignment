const connection = require('../connect')

const updateUser = (req,res) => {
    const {fname,lname,email,mobileno,image} = req.body;
    if(req.tokenUser.mobileno !== mobileno)
        res.status(403).json({message : 'Token does not match the mobileno'})
    let qry = "select * from userInfo where mobileno = ?";
    connection.query(qry, [mobileno], (err,results)=>{
        if(err)
            res.status(500).json({message:err});
        else
        {
            if(results.length > 0)
            {
                let insert_qry = "update userInfo set fname = ?,lname = ?,email = ?,image = ? where mobileno = ?";
                connection.query(insert_qry, [fname,lname,email,image,mobileno], (err,results) => {
                    if(err)
                        res.status(500).json({message:err});

                    if(results.affectedRows>0)
                        res.status(200).json({message : 'Data updated Succesfully',
                    userPhone : req.tokenUser.mobileno});
               });
                
            }
            else{
                res.status(500).json({message : 'Data does not exist'});
            }
        }
    })
};


module.exports = updateUser;