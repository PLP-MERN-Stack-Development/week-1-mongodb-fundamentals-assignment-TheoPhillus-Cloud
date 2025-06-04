use plp_bookstore

db.books.find({ genre: "Fiction" })

db.books.find({ published_year: { $gt: 1951 } })
 
// task 3
db.books.find(
    { in_stock: true, published_year: { $gt: 2010 } }
)

db.books.find(
    { in_stock: true },
    { title: 1, author: 1, price: 1, _id: 0 }
)

db.books.find().sort({ price: 1 })

db.books.find().skip(0).limit(5)

db.books.find().skip(5).limit(5)

db.books.find().skip(10).limit(5)
 
//task 4

db.books.aggregate([
    { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } },
    { $sort: { avgPrice: -1 } } // Sort by price (descending)
])

db.books.aggregate([
    { $group: { _id: "$author", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
])

db.books.aggregate([
    { $project: { decade: { $floor: { $divide: ["$published_year", 10] } } } },
    { $group: { _id: "$decade", count: { $sum: 1 } } },
    { $sort: { _id: 1 } } // Sort by decade (ascending)
])

//task 5