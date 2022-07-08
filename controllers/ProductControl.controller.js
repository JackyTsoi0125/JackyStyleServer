const db = require('../config/db');
exports.GetAllProduct = (req, res) => {
	
    db.query('select * from product' ,function(err, result) {
        if (err) throw err;
        if(result.length >= 1)     
        {
            res.send(result);
        }
        else
        {         
          res.send(["NO Product"]);      
        }       
          
    });
   
};

exports.GetAllProductFromList = (req, res) => {
	
  var sql = "select * from product where ProductID IN (" + req.body.List + ")"
 
  db.query(sql,function(err, result) {
    if (err) throw err;
    if(result.length >= 1)     
    {
        res.send(result);
    }
    else
    {         
      res.send(["NO Product"]);      
    }       
      
});
};

exports.CreateProduct = (req, res) => {
	db.query('select * from product',function(err, result) {
    if (err) throw err;    
   
    var values = [
      [ req.body.Name, req.body.Type, req.body.Description, req.body.ProductionPlace, req.body.Brand, req.body.Price, req.body.XS, req.body.S, req.body.M, req.body.L, req.body.XL, req.body.XXL, req.body.ProductImage, req.body.status]
    ];

    db.query("INSERT INTO product ( Name, Type, Description, ProductionPlace, Brand, Price, XS, S, M, L, XL, XXL, ProductImage, status) VALUES ?", [values], function (err3, result3) {
      if (err3) 
      {          
          console.log(err3.sqlMessage);
         
      }
      else
      {
          console.log("Number of records inserted: " + result3.affectedRows);
          res.send(["Success"]); 
      }
       
    });
  });
   
};

exports.UpdateProduct = (req, res) => {
    var values = [
      [req.body.Name], [req.body.Type], [req.body.Description], [req.body.ProductionPlace], [req.body.Brand], [req.body.Price], [req.body.XS], [req.body.S], [req.body.M], [req.body.L], [req.body.XL], [req.body.XXL], [req.body.ProductImage], [req.body.status], [req.params.ProductID]
    ];
  
    var sql = "UPDATE product SET Name = ?, Type = ?, Description = ?, ProductionPlace = ? , Brand = ?, Price = ?, XS = ?, S = ?, M = ?, L = ?,  XL = ?, XXL = ?, ProductImage = ?, status = ? WHERE ProductID = ?";
    db.query(sql,values,  function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send(result); 
    });
   
};

exports.DeleteProduct = (req, res) => {
	
  var values = [
    [req.params.ProductID]
  ];

  var sql = "DELETE FROM product WHERE ProductID = ?;";
  db.query(sql, values, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) delete");
    res.send(result); 
  });
   
};