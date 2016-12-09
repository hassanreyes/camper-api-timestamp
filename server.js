var express = require('express'),
    app = express();

app.get('/:date', (req, res) => {
  
  var date = req.params.date;
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  var ts;
  
  if(/^\d+$/.test(date)){
    ts = new Date(Number(date));
  }else{
    ts = new Date(Date.parse(date));
  }
  
  var ms = ts.getTime();
  
  res.json({ unix: ms, natural: Number.isNaN(ms) ? null : ts.toLocaleDateString('en-US', options) });
});

app.get("*", (req, res) =>{
  res.send("<p>Please pass a date parameter in the URL.</p>");
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})