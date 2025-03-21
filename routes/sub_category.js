let connection = require("../connection");
let express = require("express");
let bodyParser = require("body-parser");
const router = express.Router();


// let app = express();
// app.use(bodyParser.json()); 

router.get("/", (req, resp) => {
    connection.query("SELECT * FROM sub_category", (err, res) => {
      if (err) {
        resp.status(404).json({ msg: err });
      } else {
        resp.status(200).json({ msg: res });
      }
    });
  });
  

  // router.get("/api/sub_category/:id", (req, resp) => {
  //   let sub_id = req.params.id;
  //   console.log(sub_id);
  //   connection.query(
  //     `SELECT * FROM sub_category WHERE id = ${sub_id}`,
  //     (err, res) => {
  //       if (err) {
  //         resp.status(404).json({ msg: err 
  //         });
  //       } else {
  //         resp.status(200).json({ msg: res });
  //       }
  //     }
  //   );
  // });

  router.post("/", (req, resp) => {
    let body = req.body;
    if(!body.sub_cate_name || !body.sub_cate_desc || !body.sub_is_enable || !body.sub_created_on || !body.sub_created_by){
      return resp.status(400).json({ msg: 'Mandatory field is missing' });
    }
    connection.query(
      `INSERT INTO sub_category(sub_cate_name, sub_cate_desc, sub_is_enable, sub_created_on, 
      sub_created_by) VALUES ('${body.sub_cate_name}','${body.sub_cate_desc}','${body.sub_is_enable}',
      '${body.sub_created_on}','${body.sub_created_by}')`,[body.sub_cate_name, body.sub_cate_desc, body.sub_is_enable, body.sub_created_on, body.sub_created_by],
      (err, result) => {
        if (err) {
          return resp.status(400).json({ msg: `Error in SQL:- ${err}` });
        } else {
          return resp.status(200).json({ msg: "One record inserted successfully!" });
        }
      }
    );
  });
  

module.exports = router;


