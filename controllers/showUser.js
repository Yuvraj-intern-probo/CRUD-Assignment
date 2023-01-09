const connection = require('../connect')


const showUser = (req,res) => {
    let qry = "select * from userInfo";
    connection.query(qry, (err,results) => {
        if(err)
            res.status(500).json({message:err});
        else
        {
            for(let row of results)
            {
                if(req.tokenUser.mobileno == row.mobileno)
                {
                    res.status(200).json(results);
                    return
                }
            }
            res.status(401).json({message : 'Token does not exist'})
            return
        }
    })
};

module.exports = showUser
