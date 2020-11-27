const fsExtra = require('fs-extra')

// fsExtra.writeFile('docs/test.txt', 'Phạm Ngọc Anh', err => {
//     if (err) console.log(err) 

//     console.log('Lưu thành công')
// })

// Callback
// fsExtra.readFile('docs/test.txt', (err, data) => {
//     if (err) console.log(err) 

//     console.log(Buffer.from(data).toString())
// })


// Promise
// fsExtra.readFile('docs/test.txt')
// .then(data => console.log(Buffer.from(data).toString()))
// .catch(err => console.log(err)) 


// Async Await
const readTestFile = async () => {
    try {
        const data = await fsExtra.readFile('docs/test.txt')
        console.log(Buffer.from(data).toString())
    } catch (error) {
        console.log(error);
    }
}

readTestFile()