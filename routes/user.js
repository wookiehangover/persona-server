var request = require('request');

/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(req, res){
  res.header('Access-Control-Allow-Credentials', 'true');

  var data = {
    assertion: req.body.assertion,
    audience: process.env.audience || 'http://localhost:8000'
  };

  var params = {
    url: 'https://verifier.login.persona.org/verify',
    json: data
  };

  request.post(params, function(err, resp, body){
    if(err){
      return res.json({ error: 'Forbidden' }, 403);
    }

    if(body.status === 'okay'){
      res.json({
        email: body.email
      }, 200);
    } else {
      res.json(body, 403);
    }
  });
};
