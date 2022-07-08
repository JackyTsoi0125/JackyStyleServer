//const db = require("../models");
//const Login = db.Login;
const db = require('../config/db');

const bcrypt = require("bcrypt");

exports.Login = (req, res) => {	
   
    const username = req.params.username;
    const password = req.params.password;   
  
    db.query('select * from login where UserName = ? or Email = ?' , [username, username],function(err, result) {
      if (err) throw err;
      if(result.length >= 1)     
      {
        if( bcrypt.compareSync(password,　result[0].Password))
        {
          console.log(username + " Login Success");
          res.send(result);
        }
        else
        {
          console.log("Wrong Password");
          res.send("Wrong Password"); 

        }
      }
      else
      {
        console.log("Did not have this user.");
        res.send(["Did not have this user."]);      
      }
     
        
    });
};

exports.GetUserData = (req, res) => {	
   
  const ID = req.params.ID; 
  db.query('select * from login where UserID = ?' , [ID] ,function(err, result) {
    if (err) throw err;
    if(result.length >= 1)     
    {
      res.send(result);
    }
    else
    {
      console.log("Did not have this user.");
      res.send(["Did not have this user."]);      
    }
   
      
  });
};

exports.GetUser = (req, res) => {	
   
  const ID = req.params.ID; 
  db.query('select UserID, UserName, Email, Role, verification from login' , [ID] ,function(err, result) {
    if (err) throw err;
    if(result.length >= 1)     
    {
      res.send(result);
    }
    else
    {
      console.log("Did not have this user.");
      res.send(["Did not have this user."]);      
    }   
      
  });
};

exports.VerifyCode = (req, res) => {	
   
    const ID = req.body.UserID; 
    const Code = req.body.Code; 
    db.query('select * from login where UserID = ?' , [ID] ,function(err, result) {
      if (err) throw err;
      if(result.length >= 1)     
      {
      if(result[0].Verificationcode == Code)
      {
          console.log("Verify Success");
          res.send(result);
      }
      else
      {
          console.log("Verify Fail");
          res.send(["Fail"]); 
      }
      // res.send(result);
      }
      else
      {
        console.log("Did not have this user.");
        res.send(["Did not have this user."]);      
      }
    
        
    });
};


exports.VerifyCodeForResetPassword = (req, res) => {	
   
  const ID = req.body.UserID; 
  const Code = req.body.Code; 
  db.query('select * from resetpasswordrecord where UserID = ? and PasswordReset = 0' , [ID] ,function(err, result) {
    if (err) throw err;
    if(result.length >= 1)     
    {
      if(result[0].Verificationcode == Code)
      {
          console.log("Verify Success");
          res.send(["Success"]);
      }
      else
      {
          console.log("Verify Fail");
          res.send(["Fail"]); 
      }
    // res.send(result);
    }
    else
    {
      console.log("Did not have this user.");
      res.send(["Did not have this user."]);      
    }
  
      
  });
};

exports.CreateAccount = (req, res) => {  

  db.query('select * from login',function(err, result) {
    if (err) throw err;    
   
    var values = [
      [result.length + 1, req.body.UserName,  bcrypt.hashSync(req.body.Password, 10), req.body.Email, 'user', '', 0]
    ];

    db.query("INSERT INTO login (UserID, UserName, Password, Email, Role, Verificationcode, verification) VALUES ?", [values], function (err3, result3) {
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
  });
};

exports.genetateVerificationcodeForResetPassword = (req, res) => {  

  var values = [
    req.body.UserID
  ];

  let stringcode= "1234567890";
  let code  = "";
  for(let i=0;i<8;i++)
  { 
    let number =  Math.floor((Math.random() * stringcode.length));
    code = code + stringcode.slice(number, number+1);
  }
  console.log(req.body)
  db.query('select * from resetpasswordrecord where UserID = ? and PasswordReset = 0', [values], function(err, result) {
      if (err) throw err;  
       
      if(result.length == 0)
      {
          values = [
            [req.body.UserID, code, 0]
          ]; 
          db.query("INSERT INTO resetpasswordrecord (UserID, Verificationcode, PasswordReset) VALUES ?", [values], function (err3, result3) {
            if (err3) {  
                console.log(err3.sqlMessage.split("for")[0].split(" '")[0] + " : " + err3.sqlMessage.split("for")[1].split(".")[1].split("_")[0]);
                res.send([err3.sqlMessage.split("for")[0].split(" '")[0] + " : " + err3.sqlMessage.split("for")[1].split(".")[1].split("_")[0]]);
            }
            else
            {
                console.log("Number of records inserted: " + result3.affectedRows);
                res.send(code); 
            }
            
          });
      }
      else
      {
          var values = [
            [code], [req.body.UserID]
          ];
        
          var sql = "UPDATE resetpasswordrecord SET Verificationcode = ? WHERE UserID = ?";
          db.query(sql,values,  function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            res.send(code); 
          });
      
      }
    
  });
};


exports.ResetSuccessUpdate = (req, res) => {  

  var values = [
    [req.body.UserID]
  ];

  var sql = "UPDATE resetpasswordrecord SET PasswordReset = 1 WHERE UserID = ?";
  db.query(sql,values,  function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    res.send(["Success"]); 
  });
};

exports.FindAccount = (req, res) => {  

  
    var values = [
      [req.body.email]
    ]; 
    db.query('select * from login where Email = ?' , [values] ,function(err, result) {
      if (err) throw err;
      if(result.length >= 1)     
      {
          res.send(result);      
      }
      else
      {
        console.log("Did not have this user.");
        res.send(["Did not have this user."]);      
      }
    
        
    });

};

exports.UpdateAccount2 = (req, res) => {
  var values =[];
  var sql = "UPDATE login SET UserName = ?, Password = ?WHERE UserID = ?"
  if(req.body.Password == "")
  { 
    sql = "UPDATE login SET UserName = ? WHERE UserID = ?"
    values = [
      [req.body.UserName],[req.body.UserID]
    ];
  }
  else
  {
    values = [
      [req.body.UserName], [bcrypt.hashSync(req.body.Password, 10)], [req.body.UserID]
    ];
  }
   
  db.query(sql,values,  function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    res.send(result); 
  });

};

exports.UpdateAccount = (req, res) => {
  var values = [
    [req.body.UserName], [req.body.Email], [req.body.Role] , [req.body.verification], [req.params.UserID]
  ];

  var sql = "UPDATE login SET UserName = ?, Email = ?, Role = ?, verification = ? WHERE UserID = ?";
  db.query(sql,values,  function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    res.send(result); 
  });

};

exports.UpdatePassword = (req, res) => {
  var values = [
    [bcrypt.hashSync(req.body.Password, 10)], [req.params.UserID]
  ];

  var sql = "UPDATE login SET Password = ? WHERE UserID = ?";
  db.query(sql,values,  function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    res.send(result); 
  });

};

exports.CheckPassword = (req, res) => {
  const UserID = req.body.UserID;
  const password = req.body.password;   
  console.log(password)
  db.query('select * from login where UserID = ?' , [UserID],function(err, result) {
    if (err) throw err;
    if(result.length >= 1)     
    {
      if( bcrypt.compareSync(password, result[0].Password))
      {
       
        res.send(["Same"]);
      }
      else
      {        
        res.send(["Wrong Password"]); 

      }
    }
    else
    {
      console.log("Did not have this user.");
      res.send(["Did not have this user."]);      
    }
   
      
  });

};

exports.RegenerateCode = (req, res) => {

  let stringcode= "1234567890";
  let code  = "";
  for(let i=0;i<8;i++)
  { 
    let number =  Math.floor((Math.random() * stringcode.length));
    code = code + stringcode.slice(number, number+1);
  }

  var values = [
    [code],[req.body.UserID]
  ];
  
  var sql = "UPDATE login SET Verificationcode = ? WHERE UserID = ?";
  db.query(sql,values,  function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    res.send(code); 
  });
   
};