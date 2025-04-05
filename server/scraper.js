const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the government website
const URL = "https://www.india.gov.in/people-groups/community/women";

// Function to scrape data
async function scrapeData() {
    try {
        // Fetch webpage content
        const { data } = await axios.get(URL, {
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
        });

        // Load HTML into cheerio
        const $ = cheerio.load(data);

        // Find and extract scheme names (modify selector as per site structure)
        let schemes = [];
        $("h3").each((index, element) => {
            schemes.push($(element).text().trim());
        });

        // Print the extracted schemes
        console.log("List of Women's Empowerment Schemes:");
        console.log(schemes);

        // Save data to a file
        fs.writeFileSync("women_schemes.json", JSON.stringify(schemes, null, 2));

        console.log("Scraped data saved to women_schemes.json");

    } catch (error) {
        console.error("Error scraping data:", error.message);
    }
}

// Run the scraper
scrapeData();
