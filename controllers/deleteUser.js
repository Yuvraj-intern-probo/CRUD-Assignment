const connection = require('../connect')


const deleteUser = (req,res) =>{
    
    const mobileno = req.query.mobileno;
    if(req.tokenUser.mobileno != mobileno)
    {
        res.status(403).json({message : 'Token does not match the mobileno'})
        return
    }   
    
    
    let qry = "select * from userInfo where mobileno = ?";
    connection.query(qry, [mobileno], (err,results)=>{
        if(err)
            res.status(500).json({message : "Something Went Wrong"});
        else
        {
            if(results.length > 0)
            {
                let insert_qry = "delete from userinfo where mobileno = ?";
                connection.query(insert_qry, [mobileno], (err,results) => {
                    if(err)
                        res.status(500).json({message : "Something Went Wrong"});

                    if(results.affectedRows>0)
                        res.status(200).json({message : 'Data deleted Succesfully'});
               });
                
            }
            else{
                res.send('Entry Does not exist');
            }
        }
    })
};

module.exports = deleteUser;