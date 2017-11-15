require('mongodb').MongoClient.connect('mongodb://localhost:27017/test', (err, db) => {
  db.createCollection('band-app', (er, col) => {
    col.insert({ a:1, b:2 }, null, () => {
      col.find({}).toArray(
        (e,r) => console.log(r)
      )
    })
  })
})
