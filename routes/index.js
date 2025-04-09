var express = require('express');
var router = express.Router();
var path = require('path'); // Thêm dòng này

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Badminton Booking' });
});

// Route để hiển thị layout
router.get('/layout', (req, res) => {
  res.render('layout', { 
    title: 'Badminton Booking System',
    // Thêm các biến khác nếu cần
  });
});
module.exports = router;