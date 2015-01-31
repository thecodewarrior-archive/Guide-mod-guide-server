var express = require('express' ),
    guides  = require('./guides'),
    fs = require('fs'),
    archiver = require('archiver'),
    passport = require('passport');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk(process.env['ENV_MONGODB_URI']);

var collectionName = "guides";
var prefix = '/guides/:modid/:version'
var app = express();
 
var modTaskComplete = function(task, modid, version, guideversion) {
    return "" +
    "<html><body>" +
        "<h1>" + task + "</h1>" +
        "<table>" +
            "<tr>" +
                "<td>Mod</td><td>" + modid + "</td>" +
            "</tr><tr>" +
                "<td>Mod Version</td><td>" + version + "</td>" +
            "</tr><tr>" +
                "<td>Guide Version</td><td>" + guideversion + "</td>" +
        "</table>" +
    "</body></html>";
}

app.get('/guides', function(req, res) {
    //var db = req.db;
    var collection = db.get(collectionName);
    collection.find({},{},function(e,docs){
        res.send(docs);
    });
});

var guideVersion = function(modid, version, callback) {
    var collection = db.get(collectionName)
    collection.findOne({modid:modid, modVersion:version}, {}, function(err, item) {
        if(item === null) {
            callback(undefined);
        } else {
            callback( item['guideVersion'] );
        }
    });
}

app.get(prefix + '/version', function(req, res) {
    guideVersion(req.params.modid, req.params.version, function(version) {
        if(typeof version === "undefined") {
            res.send("X")
        }
        res.send(version);
    });
})

app.get(prefix + '/dl', function(req, res){
    var modid = req.params['modid'],
        version = req.params['version'];
    guideVersion(modid, version, function( guide_version) {
        res.sendfile('guides/' + modid + '/' + version + '/' + guide_version + '.zip');
    });
});
/* unused
app.get('/ping', function(req, res) {
    res.send('PONG');
})
*/
app.get(prefix + '/update/version/:guideversion', function(req, res) {
    var modid      = req.params.modid,
        version    = req.params.version,
        newVersion = req.params.guideversion;
        
    var collection = db.get(collectionName);
    collection.findOne({modid:modid, modVersion:version}, function(err, oldItem){
        collection.update({modid:modid, modVersion:version}, {$set: {guideVersion:newVersion}}, function(err, item) {
            res.send(modTaskComplete("Updated guide version from " + oldItem.guideVersion, req.params.modid, req.params.version, req.params.guideversion));
        });
    });
});

app.get(prefix + '/update/rezip/:guideversion', function(req, res) {
    var guidePath = "guides/" + req.params.modid + "/" + req.params.version + "/" + req.params.guideversion;
    
    fs.unlink(guidePath + ".zip", function(err){
        var output = fs.createWriteStream(guidePath + ".zip");
        var zipArchive = archiver('zip');

        output.on('close', function() {
            console.log('done with the zip', guidePath + ".zip");
            res.send(modTaskComplete("Done Recompressing", req.params.modid, req.params.version, req.params.guideversion));
        });

        zipArchive.pipe(output);

        zipArchive.bulk([
            { src: [ '**/*' ], cwd: guidePath, expand: true }
        ]);

        zipArchive.finalize(function(err, bytes) {
            console.log('done:', bytes);

            if(err) {
              throw err;
            }

            console.log('done:', bytes);
        });
    });
});
/* writing
app.get(prefix + '/create', function(req, res) {
    var collection = db.get(collectionName);
    collection.insert({
        modid:req.params.modid,
        modVersion:req.params.version,
        modname: req.params.modid,
        guideVersion:"0.0.0"
    });
    res.send(modTaskComplete("Created mod", req.params.modid, req.params.version, "0.0.0"));
});

app.get(prefix + '/delete', function(req, res) {
    var collection = db.get(collectionName);
    collection.remove({
        modid:req.params.modid,
        modVersion:req.params.version,
        modname: req.params.modid,
        guideVersion:"0.0.0"
    });
});
*/
app.listen(3000);
console.log('Listening on port 3000...');