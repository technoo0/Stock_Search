import fs from "fs"
const data = fs.readFileSync('./DB.json');
const stocks_list = JSON.parse(data)
console.log(stocks_list.length);

let newNews = []

const AddData = (news, CompanyName, Symbol) => {
    let newNews = []
    for (const article of news) {
        newNews.push({ ...article, source: article.source.name, CompanyName, Symbol })
    }
    return newNews
}
const FormateToDatabase = async () => {

    const files = await fs.readdirSync('./TodayData')

    for (const file of files) {
        console.log('hello')
        const Symbol = file.split('.')[0]
        let obj = stocks_list.filter(item => item.Symbol === Symbol);
        const CompanyName = obj[0].CompanyName
        const filedata = await fs.readFileSync(`./TodayData/${file}`);
        const filedatajson = JSON.parse(filedata)
        // console.log(filedatajson)
        const NewFileData = AddData(filedatajson, CompanyName, Symbol)
        // console.log(newNews)
        newNews = newNews.concat(NewFileData)
    }



    const path = `./DB2.json`
    await fs.writeFile(path, JSON.stringify(newNews, null, 2), (error) => {
        if (error) {
            console.log('An error has occurred ', error);
            return;
        }
        console.log('Data written successfully to disk');
    })
}



FormateToDatabase()