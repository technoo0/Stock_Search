import axios from "axios";
import fs from "fs"
import dotenv from 'dotenv'
dotenv.config()
const data = fs.readFileSync('./list.json');
const stocks_list = JSON.parse(data)
console.log(stocks_list.length);


const WriteNewsFile = (company_name, data) => {
    const path = `./TodayData/${company_name}.json`
    fs.writeFile(path, JSON.stringify(data, null, 2), (error) => {
        if (error) {
            console.log('An error has occurred ', error);
            return;
        }
        console.log('Data written successfully to disk');
    });
}


const getNews = async (company_name, Symbol) => {

    const url = `https://newsapi.org/v2/everything?q=${company_name}&language=en&apiKey=${process.env.NEWS_API}`;
    const response = await fetch(url)
    console.log(response)
    const data = await response.json()

    return data.articles
};
let totalnews = []

const AddData = (news, CompanyName, Symbol) => {
    let newNews = []
    for (const article of news) {
        newNews.push([...article, CompanyName, Symbol])
    }
    return newNews
}

const run = async () => {
    for (const stock of stocks_list) {
        // console.log(stock)
        const news = await getNews(stock.CompanyName, stock.Symbol)
        totalnews = totalnews.concat(news)
        WriteNewsFile(stock.Symbol, news)
    }
    WriteNewsFile('totalnewa', totalnews)
}

run()