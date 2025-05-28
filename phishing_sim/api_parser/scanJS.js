const acorn = require("acorn");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function extractAPIsFromJS(url) {
    const res = await axios.get(url);
    const code = res.data;

    const ast = acorn.parse(code, { ecmaVersion: 2020 });
    let apis = [];

    acorn.walk.simple(ast, {
        CallExpression(node) {
            if (node.callee.name === 'fetch' || (node.callee.object && node.callee.property.name === 'fetch')) {
                apis.push({ type: 'fetch', value: node.arguments[0].value });
            }
            if (node.callee.name === 'axios' || (node.callee.object && node.callee.property.name === 'axios')) {
                apis.push({ type: 'axios', value: node.arguments[0].value });
            }
            if (node.callee.name === 'gql' || (node.callee.object && node.callee.property.name === 'gql')) {
                apis.push({ type: 'gql', value: node.arguments[0].value });
            }
        },
        NewExpression(node) {
            if (node.callee.name === 'XMLHttpRequest') {
                apis.push({ type: 'xhr', value: 'new XMLHttpRequest()' });
            }
        },
        Literal(node) {
            if (typeof node.value === 'string' && node.value.startsWith('wss://')) {
                apis.push({ type: 'websocket', value: node.value });
            }
            if (typeof node.value === 'string' && node.value.includes('/graphql')) {
                apis.push({ type: 'graphql', value: node.value });
            }
        }
    });

    return apis;
}

async function scanScriptsFromJSON(filePath) {
    const scriptUrls = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const apis = {};

    for (const url of scriptUrls) {
        const apiList = await extractAPIsFromJS(url);
        apis[url] = apiList;
    }

    return apis;
}

const scriptUrlsFilePath = path.join(__dirname, 'script_urls.json');
scanScriptsFromJSON(scriptUrlsFilePath).then(apis => {
    console.log('APIs Found:', apis);
    process.exit(0);
});
