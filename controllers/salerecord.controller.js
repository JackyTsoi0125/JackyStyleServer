const db = require('../config/db');
exports.GetAllRecordByID = (req, res) => {
	
    const ID = req.params.id; 
    const saleID = req.params.saleID;
    db.query('select * from salerecord where UserID = ? and SaleID = ?' , [ID, saleID] , function(err, result) {
      if (err) throw err;
      if(result.length >= 1)     
      {
        res.send(result);
      }
      else
      {
        console.log("No Record");
        res.send([]);      
      }   
        
    });
};

exports.GetOneRecordByUser = (req, res) => {
  const ID = req.body.UserID; 
  const saleID = req.body.SaleID;
  const ProductID = req.body.ProductID;
  const Size = req.body.Size;

  console.log(Size)
  db.query('select * from salerecord where UserID = ? and SaleID = ? and ProductID = ? and Size = ?' , [ID, saleID, ProductID, Size] , function(err, result) {
    if (err) throw err;
    console.log(result)
    if(result.length >= 1)     
    {
      res.send(result);
    }
    else
    {
      console.log("No Record");
      res.send(["No Record"]);      
    }   
      
  });
   
};

exports.CreateNewRecord = (req, res) => {

    var values = [
        [ req.body.SaleID, req.body.UserID, req.body.ProductID, req.body.Name, req.body.ProductImage, req.body.Size, req.body.Quantity, req.body.Price]
    ];
   
    db.query("INSERT INTO salerecord ( SaleID, UserID, ProductID, ProductName, ProductImage, Size, Quantity, Price) VALUES ?", [values], function (err3, result3) {

        if (err3) 
        {          
            console.log(err3.sqlMessage);                    
        }
        else
        {                    
            res.send(["Success"]); 
        }
        
    });
   
};

exports.UpdateRecord = (req, res) => {
	

  var values = [
    [req.body.Price], [req.body.Quantity],  [req.body.ID],  [req.body.SaleID]
  ];

  console.log(values)
  var sql = "UPDATE salerecord SET Price = ?, Quantity = ? WHERE ID = ? and SaleID = ?";
  db.query(sql, values, function (err, result) {
      if (err) throw err;            
      
      res.send(["success"]);  
  });    
   
};

exports.DeleteRecord = (req, res) => {
	
  var values = [
    [req.params.id]
  ];

  var sql = "DELETE FROM salerecord WHERE ID = ?;";
  db.query(sql, values, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) delete");
    res.send(result); 
  });
};