var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

router.post('/', (req, res) => {
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, '/..', '/public/uploads');
  form.on('file', function (field, file) {
    var newName = Date.now() + '_' + file.name;
    fs.rename(file.path, path.join(form.uploadDir, newName));
    console.log(file.path);
    res.json({
      status: 100,
      content: '/uploads/' + newName
    });
  });

  // log any errors that occur
  form.on('error', function (err) {
    console.log('An error has occured: \n' + err);
    res.json({status: 101});
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function () {
    console.log('done upload!');
  });

  // parse the incoming request containing the form data
  form.parse(req);
});
module.exports = router;