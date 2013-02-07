// Generated by CoffeeScript 1.4.0
(function() {
  var app, bundle, crypto, fs, path;

  app = __meteor_bootstrap__.app;

  bundle = __meteor_bootstrap__.bundle;

  crypto = __meteor_bootstrap__.require('crypto');

  fs = __meteor_bootstrap__.require('fs');

  path = __meteor_bootstrap__.require('path');

  app.use(function(req, res, next) {
    var body, digest, hash, manifest, resource, _i, _j, _len, _len1, _ref, _ref1;
    if (req.url !== '/app.manifest') {
      return next();
    }
    hash = crypto.createHash('sha1');
    hash.update(JSON.stringify(__meteor_runtime_config__), 'utf8');
    hash.update(fs.readFileSync(path.join(bundle.root, 'app.html')));
    _ref = bundle.manifest;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      resource = _ref[_i];
      if (resource.where === 'client') {
        hash.update(resource.hash);
      }
    }
    digest = hash.digest('hex');
    manifest = "CACHE MANIFEST\n\n";
    manifest += '# ' + digest + "\n\n";
    manifest += "CACHE:" + "\n";
    manifest += "/" + "\n";
    _ref1 = bundle.manifest;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      resource = _ref1[_j];
      if (resource.where === 'client') {
        manifest += resource.url + "\n";
      }
    }
    manifest += "\n";
    manifest += "NETWORK:\n";
    manifest += "/sockjs" + "\n";
    body = new Buffer(manifest);
    res.setHeader('Content-Type', 'text/cache-manifest');
    res.setHeader('Content-Length', body.length);
    return res.end(body);
  });

}).call(this);
