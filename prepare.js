const config = require('./config.json');
const fs = require('fs');
const template = fs.readFileSync('./template.test.js').toString('utf-8')
if(!fs.existsSync('tests')){
    fs.mkdirSync('tests',{recursive:true})
}
// Function to fetch and parse the sitemap using regex
(async () => {
    {
        try {
            const response = await fetch(config.sitemap);
            if(response.status !== 200){
                throw new Error("Sitemap url is invalid. Received invalid stats: " + response.status)
            }
            const sitemapXml = await response.text(); // Get the raw XML text

            // Regex to match <loc>...</loc> tags and extract URLs
            const regex = /<loc>(.*?)<\/loc>/g;
            let urls = config.additionalUrls || [];
            let match;
            while ((match = regex.exec(sitemapXml)) !== null) {
                urls.push(match[1]); // match[1] contains the URL
            }
            if (config.ignoreUrls) {
                urls = urls.filter((url) => !config.ignoreUrls?.includes(url))
            }
            return urls;
        } catch (error) {
            console.error('Error fetching or parsing sitemap:', error);
            return [];
        }
    }
})().then((urls) => {
    for(let url of urls){
        const testContent = template.replace("{WEBSITE}",url)
        fs.writeFileSync(`./tests/${new URL(url).pathname.replace('\/','_')}.test.js`,testContent)
    }
})