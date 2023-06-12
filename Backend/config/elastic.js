import { Client } from "@elastic/elasticsearch"
import dotenv from 'dotenv'
dotenv.config()


const ElasticClient = new Client({
    cloud: {
        id: process.env.ELASTICID,
    },
    auth: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    }
})


export default ElasticClient