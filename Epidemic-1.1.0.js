'use strict'

const Plugin={
    "name":"Epidemic",
    "nersion":"1.1.0",
    "depends":{
        "pluginLoader":">=3.5.0"
    },
    "Events":["messageCreate"],
    "Commands":[{
        "name":"show",
        "note":"顯示今日疫情"
    }],
    "author":["Lidia Li"],
    "link":"https://github.com/ExpTechTW/MPR-TimeNow",
    "resources":["AGPL-3.0"],
    "description":"Epidemic"
}

const pluginLoader=require('../Core/pluginLoader')
const fetch = require('node-fetch')

async function messageCreate(client, message){
    if (message.content =="show"){
        let res=await fetch("https://corona.lmao.ninja/v2/countries/tw")
        let Json=await res.json()
        let now = new Date(Json.updated)
        let Now = now.getFullYear() +
            "/" + (now.getMonth() + 1) +
            "/" + now.getDate() +
            " " + now.getHours() +
            ":" + now.getMinutes() +
            ":" + now.getSeconds()
        message.reply(await pluginLoader.embed("最新更新時間："+Now+"\n"+"國家："+Json.country+"\n"+"今日病例新增數："+Json.todayCases+"\n"+"今日病例死亡數："+Json.todayDeaths+"\n"+"總病例數："+Json.cases+"\n"+"總病例死亡數："+Json.deaths+"\n"))
    }
}

module.exports={
    Plugin,
    messageCreate
}