var express = require('express'),
    app = express(),
    port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT;

app.get('/:date', (req, res) => {
  
  var date = req.params.date;
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  var ts;
  
  if(/^\d+$/.test(date)){
    ts = new Date(Number(date));
  }else{
    ts = new Date(Date.parse(date));
  }
  
  var ms = ts.getTime()/1000;
  
  res.json({ unix: ms, natural: Number.isNaN(ms) ? null : ts.toLocaleDateString('en-US', options) });
});

app.get("*", (req, res) =>{
  res.send("<p>Please pass a date parameter in the URL.</p>");
});

app.listen(port, function () {
  console.log('Example app listening on port 8080!')
})