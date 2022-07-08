const db = require('../config/db');

exports.GetAllFavList = (req, res) => {
	var userid = req.params.UserID
    db.query('select * from favlist where UserID = ?' , [userid], function(err, result) {
        if (err) throw err;
        if(result.length >= 1)     
        {
            res.send(result);
        }
        else
        {         
          res.send(["NO FavList"]);      
        }       
          
    });
   
};



exports.GetFav = (req, res) => {
	var values = [
        [req.params.UserID],[req.params.ProductID] 
    ]
   
    db.query('select * from favlist where UserID = ? and ProductID = ?' , values, function(err, result) {
        if (err) throw err;
        if(result.length >= 1)     
        {
            res.send(result);
        }
        else
        {         
          res.send(["NO FavList"]);      
        }       
          
    });
   
};

exports.AddToFavList = (req, res) => {  

    var values = [
        [req.params.UserID, req.params.ProductID]
    ];

    db.query("INSERT INTO favlist (UserID, ProductID) VALUES ?", [values], function (err3, result3) {
    if (err3) {  
        console.log(err3.sqlMessage.split("for")[0].split(" '")[0] + " : " + err3.sqlMessage.split("for")[1].split(".")[1].split("_")[0]);
        res.send([err3.sqlMessage.split("for")[0].split(" '")[0] + " : " + err3.sqlMessage.split("for")[1].split(".")[1].split("_")[0]]);
    }
    else
    {
        console.log("Number of records inserted: " + result3.affectedRows);
        res.send(["Success"]); 
    }
        
    });
};

exports.RemoveFavList = (req, res) => {  

    var values = [
        [req.params.ProductID], [req.params.UserID]
    ];
  
    var sql = "DELETE FROM favlist WHERE ProductID = ? and UserID = ?";
    db.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) delete");
        res.send(result); 
    });
};