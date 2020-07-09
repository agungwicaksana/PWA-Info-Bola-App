const dbPromised = idb.open("team-league", 1, upgradeDb => {  
    const teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamsObjectStore.createIndex("team_id", "team_id", {unique: true});
});

function saveForLater(team) {  
    dbPromised
        .then(db => {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            store.add(team);
            return tx.complete;
        })
        .then(() => {
            console.log("Team berhasil disimpan");
        })
}

function deleteSaved(team) {  
    dbPromised
        .then(db => {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            store.delete(team.id);
            return tx.complete;
        }).then(() => {
            console.log('Team dihapus');
        });
}

function getAll() {  
    return new Promise (resolve => {  
        dbPromised
            .then(db => {  
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(teams => {  
                resolve(teams)
            })
    })
}

function getById(team_id) {  
    return new Promise(resolve => {  
        dbPromised
            .then(db => {  
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.get(team_id);
            })
            .then(team => {  
                resolve(team)
            })
    })
}