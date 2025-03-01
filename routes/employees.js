let connection = require("../connection");
let express = require("express");
let bodyParser = require("body-parser");
const router = express.Router();



router.get("/", (req, resp) => {
    connection.query("SELECT * FROM employees", (err, res) => {
      if (err) {
        resp.status(404).json({ msg: err });
      } else {
        resp.status(200).json({ msg: res });
      }
    });
  });
  

  router.get("/", (req, resp) => {
    let product_id = req.params.id;
    console.log(product_id);
    connection.query(
      `SELECT * FROM employees WHERE id = ${employee_id}`,
      (err, res) => {
        if (err) {
          resp.status(404).json({ msg: err });
        } else {
          resp.status(200).json({ msg: res });
        }
      }
    );
  });


  router.post("/", (req, resp) => {
    let body = req.body;
    if(!body.employ_name || !body.employ_phone){
      return resp.status(400).json({ msg: 'Mandatory field is missing' });
    }

    let sql = `INSERT INTO employees (employ_name,employ_phone) VALUES ('${body.employ_name}','${body.employ_phone}')`

    connection.query(
        sql,
      [body.emloy_name, body.employ_phone],
      (err, result) => {
        if (err) {
          return resp.status(400).json({ msg: `Error in SQL:- ${err}` });
        } else {
          return resp.status(200).json({ msg: "One record inserted successfully!" });
        }
      }
    );
  });


// app.delete("/api/m_product",(err,resp)=>{

//   let sql = `DELETE m_product`
//   connection.query(
//     sql,
//     [body.product_name, body_desc,body.price,body.discount,body.quantity, body.product_created_on,body.created_by],
//     (err,result) =>{
//       if(err){
//         return resp.status(400).json({"msg" : "problem in mysql"});
//       }else{
//         return resp.status(200).json({"msg" : "successfully inserted"})
//       }
//     }
//   )
// })

module.exports = router;


