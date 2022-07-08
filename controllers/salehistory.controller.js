const db = require('../config/db');

exports.Sold = (req, res) => {
	
    var values = [
        [req.body.UserID]
    ];
    var sql = "UPDATE salehistory SET status = 'Sold' WHERE UserID = ? and status = 'Hold' ";
    db.query(sql,values,  function (err, result) {
        if (err) throw err;            
        
        res.send(["Success"]);  
    });

};

exports.GetOneHistoryByUser = (req, res) => {	

    db.query('select * from salehistory where status = "Hold" and UserID = ?', [req.params.id],function(err, result) {
        if (err) throw err;      
        if(result.length == 0)
        {
            res.send(["0"]);        
        }
        else
        {               
            res.send([result[0]]); 
        }
    });

};

exports.GetAllHistoryByUser = (req, res) => {	

    db.query('select * from salehistory where UserID = ? ORDER BY status ASC, SaleID ASC;', [req.params.id],function(err, result) {
        if (err) throw err;      
        if(result.length == 0)
        {
            res.send(["0"]);        
        }
        else
        {               
            res.send(result); 
        }
    });

};

exports.GetOneHistoryByUserIDandHistoryID = (req, res) => {
	
    var values = [
        [req.params.UserID], [req.params.SaleID]
    ]
    db.query('select * from salehistory where UserID = ? and SaleID = ?' , values, function(err, result) {
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

exports.HistoryUpdate = (req, res) => {
	
    db.query('select * from salehistory where status = "Hold" and UserID = ?', [req.body.UserID],function(err, result) {
        if (err) throw err;      
        if(result.length == 0)
        {
            var values = [
                [ req.body.UserID, req.body.Price, "Hold"]
            ];
          
            db.query("INSERT INTO salehistory ( UserID, Price, status) VALUES ?", [values], function (err3, result3) {
                if (err3) 
                {          
                    console.log(err3.sqlMessage);                    
                }
                else
                {                     
                    
                    res.send([result3.insertId]); 
                }
                
            });
        }
        else
        {   
            
            var values = [
                [ result[0].Price + req.body.Price], [req.body.UserID]
            ];
            var sql = "UPDATE salehistory SET Price = ? WHERE UserID = ? and status = 'Hold' ";
            db.query(sql,values,  function (err, result2) {
                if (err) throw err;            
                
                res.send([result[0].SaleID]);  
            });
        }
    });
};

exports.RemoveCartProductUpdate = (req, res) => {	

    db.query('select * from salehistory where status = "Hold" and UserID = ?', [req.body.UserID],function(err, result) {
        if (err) throw err;      
        var values = [  
            [result[0].Price - req.body.Price],  [req.body.UserID]
        ];
        var sql = "UPDATE salehistory SET Price = ? WHERE UserID = ? and status = 'Hold'";
        db.query(sql,values,  function (err, result2) {
            if (err) throw err;            
            
            res.send(["success"]);  
        });
    });
   
};

exports.AddartProductUpdate = (req, res) => {	

    db.query('select * from salehistory where status = "Hold" and UserID = ?', [req.body.UserID],function(err, result) {
        if (err) throw err;      
        var values = [
            [result[0].Price + req.body.Price],  [req.body.UserID]
        ];
        var sql = "UPDATE salehistory SET Price = ? WHERE UserID = ? and status = 'Hold'";
        db.query(sql,values,  function (err, result2) {
            if (err) throw err;            
            
            res.send(["success"]);  
        });
    });
   
};

