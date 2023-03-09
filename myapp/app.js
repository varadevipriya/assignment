const express = require("express");
const { open } = require("sqlite3");
const sqlite3 = require("sqlite3");
const path = require("path");
const bcrypt = require("bcrypt");

const databasePath = path.join(__dirname, inventory.db);

const app = express();
app.use(express.json());
let database=null;

const initializeDvAndServer=async()=>{
    try{
        database=await open({
            filename:databasePath,
            driver:sqlite3.Database,

        });

        app.listen(3000,()=>
         console.log("server is Running at http://localhost:3000/")
        );
    }catch (error){
        console.log(`DB Error:${error.message}`);
        process.exit(1);
    }
} initializeDvAndServer();

app.post("/inventory",(request,response)=>{
    const {payload}=request.body;
    for (let eachProduct of payload){
        let {productId,quantity,operation}=eachProduct;
        let previousDataQuery=`
        SELECT * FROM inventory WHERE productId=${productId};
        `;
        let previousData=await database.get(previousDataQuery);

        let updateQuantity=null;
        if (operation==="add"){
            updateQuantity=quantity+previousData.quantity
        }else if (operation==="subtract"){
            updateQuantity=quantity-previousData.quantity;
        }

        let productUpdateQuantityQuery=`
        UPDATE inventory SET 
        quantity=${updateQuantity}
        WHERE 
        productId=${productId};
        `;
        await database.run(productUpdateQuantityQuery);
    }
    response.send("The Products have been updated");
});