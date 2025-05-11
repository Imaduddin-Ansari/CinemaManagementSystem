const axios = require('axios');
require('dotenv').config();

const TMDBKEY=process.env.TMDB_API_KEY;

const fetchFromTMDB=async(url)=>
{
    const options = {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDBKEY}`
        }
      };
    const response=await axios.get(url,options);
    if(response.status !==200)
    {
        throw new Error("Failed to fetch data from TMDB"+response.statusText)
    }
    return response.data;
}

module.exports = { fetchFromTMDB };