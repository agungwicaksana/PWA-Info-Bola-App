var dbPromised = idb.open("team-league", 1, function (upgradeDb) {  
    var teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamsObjectStore.createIndex("team_id", "team_id", {unique: false});
});

function saveForLater(team) {  
    dbPromised
        .then(function(db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            store.add(team);
            return tx.complete;
        })
        .then(function() {
            console.log("Team berhasil disimpan");
        })
}

function deleteSaved(team) {  
    dbPromised
        .then(function(db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            store.delete(team.id);
            return tx.complete;
        }).then(function() {
            console.log('Team dihapus');
        });
}

function getAll() {  
    return new Promise (function (resolve, reject) {  
        dbPromised
            .then(function(db) {  
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function (teams) {  
                resolve(teams)
            })
    })
}

function getById(team_id) {  
    return new Promise(function (resolve, reject) {  
        dbPromised
            .then(function (db) {  
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.get(team_id);
            })
            .then(function (team) {  
                resolve(team)
            })
    })
}