import fs from "fs"
// import client from "../config/database.js";
import ElasticClient from "../config/elastic.js"

// const myDB = client.db("news");
// const myColl = myDB.collection("news");

const seed = async () => {
    const data = fs.readFileSync('../Scrapper/DB.json');
    const stocks_list = JSON.parse(data)
    console.log(stocks_list.length);

    let count = 0
    console.log(stocks_list[3315])
    //     for (const artical of stocks_list) {
    //         // if (count > 3315) {
    //         //     try {

    //         //         const result = await myColl.insertOne(artical);
    //         //         console.log(
    //         //             `A document was inserted with the _id: ${result.insertedId}`,
    //         //         );
    //         //     } catch (e) {
    //         //         console.log('error')
    //         //     }
    //         // }

    //         const result = await ElasticClient.index({
    //             index: "news",
    //             document: artical,
    //         });
    //         count = count + 1
    //         console.log(count)
    //     }
}

export default seed


