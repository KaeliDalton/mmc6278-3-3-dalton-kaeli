require('dotenv').config()
const express = require('express')
const app = express()
const cityJobInfo = require('./util.js')

app.use(express.static('public'))

.get('/api/city/:city', async (req, res) => {
  const city = req.params.city
  const cityInfo = await cityJobInfo.getCityInfo(city)
  const jobs = await cityJobInfo.getJobs(city)
    if (cityInfo && jobs){
        res.status(200).json({cityInfo, jobs})
    } else if (cityInfo && !jobs){
        res.status(200).json({cityInfo: cityInfo, jobs: false})
    } else if (!cityInfo && jobs){
        res.status(200).json({cityInfo: false, jobs: jobs})
    }else{
    res.status(404).json({error:'Not found'})}
 })
module.exports = app

