const express = require("express");
const multer = require("multer");
const req = require("request");
const fs = require("fs");
const multiparty = require("multiparty");
const upload = multer({ dest: __dirname + "/uploads/images" });
const app = express();
const PORT = 3000;
app.use(express.static("public"));

app.post("/upload", upload.single("photo"), (req, res) => {
  if (req.file) {
    res.json(req.file);
  } else {
    throw "error";
  }
});

let form = new multiparty.Form();
form.on("file", function (name, file) {
  let formData = {
    file: {
      value: fs.createReadStream(req.file.path),
      options: {
        filename: req.file.originalname,
      },
    },
  };

  const postUrl = "http://example.com";
  req.post(
    { url: postUrl, formData: formData },
    function (err, httpResponse, body) {
      console.log(err);
      console.log(httpResponse);
      console.log(body);
    }
  );
  console.log(file.path);
});

app.listen(PORT, () => {
  console.log("Listening at " + PORT);
});
