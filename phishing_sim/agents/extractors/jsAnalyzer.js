const axios = require('axios');

module.exports = async function extractJS(urls) {
    const results = [];
    for (let url of urls) {
        const { data } = await axios.get(url);
        const apis = data.match(/https?:\/\/[^\s"']+/g);
        results.push({ url, apis });
    }
    return results;
};
