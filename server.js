var   express  = require('express')
    , app      = require('express')()
    , http     = require('http').Server(app)
    , io       = require('socket.io')(http)
    , body     = require('body-parser')
    , path     = require('path')
    , methodOverride = require('method-override')
    , port  = (process.env.PORT || 3000)
    , env   = process.env.NODE_ENV || 'development';

app.use(express.static(__dirname + '/dist'))
app.use(body.json())
app.use(body.urlencoded({extended:true}))
app.use(methodOverride('X-HTTP-Method-Override'))

// routes ==================================================
app.use('/api', require('./server/routes')(io));

app.use((req, res) => {
  return res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});
http.listen(port, function(){
   console.log("Donor Pledge running on port:" + port);
});

module.exports = app;
