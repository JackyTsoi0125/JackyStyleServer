module.exports = app => {
    const Login = require("../controllers/LoginControl.controller.js");
    const Product = require("../controllers/ProductControl.controller.js");
    const salehistory = require("../controllers/salehistory.controller.js");
    const salerecord = require("../controllers/salerecord.controller.js");
    const Email = require("../controllers/sendEmail.controller.js");
    const File = require("../controllers/File.controller.js");
    const FavList = require("../controllers/favlist.controller.js");
    var router = require("express").Router(); 

    const bodyParser = require('body-parser');
    var jsonParser = bodyParser.json();
    var urlencodedParser = bodyParser.urlencoded({ extended: false });

    //Login
    router.get("/Login/:username/:password", Login.Login);
    router.get("/GetAllAccount", Login.GetUser);
    router.get("/GetUserData/:ID", Login.GetUserData);
    router.post("/VerifyCode", jsonParser, Login.VerifyCode);
    router.post("/VerifyCodeForResetPassword", jsonParser, Login.VerifyCodeForResetPassword);
    router.post("/CreateAccount", jsonParser,  Login.CreateAccount);
    router.post("/genetateVerificationcodeForResetPassword", jsonParser,  Login.genetateVerificationcodeForResetPassword);
    router.post("/ResetSuccessUpdate", jsonParser,  Login.ResetSuccessUpdate);
    router.post("/FindAccount", jsonParser,  Login.FindAccount);
    router.put("/UpdateAccount/:UserID",jsonParser, Login.UpdateAccount);
    router.put("/UpdateAccount2",jsonParser, Login.UpdateAccount2);
    router.put("/UpdatePassword/:UserID",jsonParser, Login.UpdatePassword);  
    router.put("/CheckPassword",jsonParser, Login.CheckPassword);
    router.put("/RegenerateCode", jsonParser, Login.RegenerateCode); 
    //Product
    router.get("/GetAllProduct", Product.GetAllProduct); 
    router.post("/GetAllProductFromList", jsonParser, Product.GetAllProductFromList);
    router.post("/CreateProduct",jsonParser,  Product.CreateProduct);
    router.put("/UpdateProduct/:ProductID",jsonParser,  Product.UpdateProduct);
    router.delete("/DeleteProduct/:ProductID", Product.DeleteProduct);
    //salehistory
    router.post("/Sold", jsonParser, salehistory.Sold); 
    router.get("/GetOneHistoryByUser/:id", salehistory.GetOneHistoryByUser);
    router.get("/GetAllHistoryByUser/:id", salehistory.GetAllHistoryByUser);
    router.get("/GetOneHistoryByUserIDandHistoryID/:UserID/:SaleID", salehistory.GetOneHistoryByUserIDandHistoryID);
    router.post("/HistoryUpdate", jsonParser, salehistory.HistoryUpdate);
    router.put("/RemoveCartProductUpdate", jsonParser, salehistory.RemoveCartProductUpdate);
    router.put("/AddartProductUpdate", jsonParser, salehistory.AddartProductUpdate);
    
    //salerecord
    router.get("/GetAllRecordByID/:id/:saleID", salerecord.GetAllRecordByID); 
    router.post("/GetRecordIfExist", jsonParser, salerecord.GetOneRecordByUser);
    router.post("/CreateNewRecord", jsonParser, salerecord.CreateNewRecord);
    router.put("/UpdateRecord", jsonParser, salerecord.UpdateRecord);
    router.delete("/DeleteRecord/:id", salerecord.DeleteRecord);
    //SendEmail
    router.post("/sendVerificationcode", jsonParser, Email.sendVerificationcode); 
    router.post("/SendEmaiForPaymentRecord", jsonParser, Email.SendEmaiForPaymentRecord); 
    router.post("/SendEmailForResetPassword", jsonParser, Email.SendEmailForResetPassword); 
    //File
    router.post("/UploadImage", File.UploadImage);
    //FavList
    router.get("/GetAllFavList/:UserID", FavList.GetAllFavList);
    router.get("/GetFav/:UserID/:ProductID", FavList.GetFav);
    router.put("/AddToFavList/:UserID/:ProductID", FavList.AddToFavList);
    router.delete("/RemoveFavList/:UserID/:ProductID", FavList.RemoveFavList);

    app.use('/api', router);
};