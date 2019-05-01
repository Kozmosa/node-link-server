// (function () {
//     let toolClass

//     toolClass.add = function add(db, fd, trueUrl) {
//         // Add url to db
//         try {
//             db.urls[fd] = trueUrl
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     toolClass.delete = function (db, fd) {
//         // Delete url
//         try {
//             db.urls[fd] = undefined
//         } catch (e) {
//             console.log(`Exception: ${e}`)
//         }
//     }

//     toolClass.edit = function edit(db, fd, editToValue) {
//         // Edit Value
//         try {
//             db.urls[fd] = editToValue
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }), (toolClass)

module.exports.add = function add(db, fd, trueUrl) {
    // Add url to db
    try {
        db.urls[fd] = trueUrl
    } catch (error) {
        console.log(error)
    }
}

module.exports.delete = function (db, fd) {
    // Delete url
    try {
        db.urls[fd] = undefined
    } catch (e) {
        console.log(`Exception: ${e}`)
    }
}

module.exports.edit = function edit(db, fd, editToValue) {
    // Edit Value
    try {
        db.urls[fd] = editToValue
    } catch (error) {
        console.log(error)
    }
}