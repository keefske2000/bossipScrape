// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

//scrape articles from the New YorK Times
var scrape = function(callback) {

  var articlesArr = [];

  request("https://bossip.com/", function(error, response, html) {

      var $ = cheerio.load(html);


      $("h2").each(function(i, element) {

          var result = {};

          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this).children("a").text();
          result.link = $(this).children("a").attr("href");

          if (result.title !== "" && result.link !== "") {
              articlesArr.push(result);
          }
      });
      callback(articlesArr);
  });

};

module.exports = scrape;