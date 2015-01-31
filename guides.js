
// var Server = mongo.Server,
    // Db = mongo.Db,
    // BSON = mongo.BSONPure;
 
// var server = new Server('localhost', 27017, {auto_reconnect: true});
// db = new Db('guides', server, {safe:false});
/*
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'guides' database");
        db.collection('mods', {}, function(err, collection) {
            console.log("connected to 'mods' collection");
            var mods = [
            {
                modid: "minecraft",
                name: "Minecraft",
                modVersion: "1.7.10",
                guideVersion: "0.1.0"
            },
            {
                modid: "buildcraft",
                name: "BuildCraft",
                modVersion: "1.7.10",
                guideVersion: "0.0.1"
            }];
            collection.insert(mods, {}, function(err, result) {console.log("inserted, err is" + err)});
            
            if (err) {
                console.log("The 'mods' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
            // populateDB();
        });
    }
    db.close()
});

exports.init = function(req, res) {
    db.collection('guides', function(err, collection) {
        var mods = [
        {
            modid: "minecraft",
            name: "Minecraft",
            modVersion: "1.7.10",
            guideVersion: "0.1.0"
        },
        {
            modid: "buildcraft",
            name: "BuildCraft",
            modVersion: "1.7.10",
            guideVersion: "0.0.1"
        }];
 
        db.collection('mods', function(err, collection) {
            collection.insert(mods[0], {safe:true}, function(err, result) {});
            collection.insert(mods[1], {safe:true}, function(err, result) {});
            console.log("done inserting")
        });
        res.send("hello!")
    });
};

exports.modVersion = function(modid, version) {
    db.open(function(err, db) {
        db.collection('guides', function(err, collection) {
           collection.findOne({modid:modid, modVersion:version}, function(err, item) {
               return item.guideVersion;
           });
        });
        db.close()
    });
};

exports.getMods = function(req, res) {
    db.open(function(err, db) {
        db.collection('guides', function(err, collection) {
            collection.find().toArray(function(err, item) {
                res.send(item);
            });
        });
        db.close()
    });
};

var populateDB = function() {
 
    var mods = [
    {
        modid: "minecraft",
        name: "Minecraft",
        modVersion: "1.7.10",
        guideVersion: "0.1.0"
    }];
 
    db.collection('mods', function(err, collection) {
        collection.insert(mods, {safe:true}, function(err, result) {});
    });
 
};*/