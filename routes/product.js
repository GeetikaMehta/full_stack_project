let connection = require("../connection");
let express = require("express");
let bodyParser = require("body-parser");
const router = express.Router();


let app = express();
app.use(bodyParser.json());


app.get("/api/m_product", (req, resp) => {
    connection.query("SELECT * FROM products", (err, res) => {
      if (err) {
        resp.status(404).json({ msg: err });
      } else {
        resp.status(200).json({ msg: res });
      }
    });
  });
  

  app.get("/api/m_product/:id", (req, resp) => {
    let product_id = req.params.id;
    console.log(product_id);
    connection.query(
      `SELECT * FROM products WHERE id = ${product_id}`,
      (err, res) => {
        if (err) {
          resp.status(404).json({ msg: err });
        } else {
          resp.status(200).json({ msg: res });
        }
      }
    );
  });

  app.delete("/api/m_product/:id")

  app.post("/api/m_product", (req, resp) => {
    let body = req.body;
    if(!body.product_name || !body.product_desc || !body.price || !body.discount || !body.quantity || !body.product_created_on || !body.product_created_by){
      return resp.status(400).json({ msg: 'Mandatory field is missing' });
    }

    let sql = `INSERT INTO products (product_name, product_desc,price,discount,quantity, product_created_on, 
        product_created_by) VALUES ('${body.product_name}','${body.product_desc}','${body.price}', '${body.discount}','${body.quantity}',
        '${body.product_created_on}','${body.product_created_by}')`


    connection.query(
        sql,
      [body.product_name, body.product_desc, body.price,body.discount,body.quantity, body.product_created_on, body.product_created_by],
      (err, result) => {
        if (err) {
          return resp.status(400).json({ msg: `Error in SQL:- ${err}` });
        } else {
          return resp.status(200).json({ msg: "One record inserted successfully!" });
        }
      }
    );
  });


app.delete("/api/m_product",(err,resp)=>{

  let sql = `DELETE m_product`
  connection.query(
    sql,
    [body.product_name, body_desc,body.price,body.discount,body.quantity, body.product_created_on,body.created_by],
    (err,result) =>{
      if(err){
        return resp.status(400).json({"msg" : "problem in mysql"});
      }else{
        return resp.status(200).json({"msg" : "successfully inserted"})
      }
    }
  )
})


app.listen(5000,()=>{
    console.log("App is running on port 5000");
});


