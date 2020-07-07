export default function savedTeams() {  
    console.log('saveddom js')
    getAll().then(team => {
        console.log('team',team)
    })
    
}