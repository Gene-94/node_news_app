const express = require('express');
const app = express();
var bodyParser = require('body-parser');


app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const chaveAPI = '0987f45feb39420d81d4550f1d5b3cd7';
var articles;

fetch(`https://newsapi.org/v2/everything?q=technology&apiKey=${chaveAPI}`)
  .then(response => response.json())
  .then(data => {
    articles = data.articles;
  })
  .catch(error => {
    console.error(error);
  });

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.render('pages/index', {
    articles
  });
})

app.post('/full_news', (req, res) => {
 
  const axios = require('axios');

  // and we need jsdom and Readability to parse the article HTML
  const { JSDOM } = require('jsdom');
  const { Readability } = require('@mozilla/readability');

  axios.get(req.body.link).then(function(r2) {

    // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
    let dom = new JSDOM(r2.data, {
      url: req.body.link
    });

    // now pass the DOM document into readability to parse
    let article = new Readability(dom.window.document).parse();

    // Done! The article content is in the textContent property
    res.status(200).send(article.textContent);

  })
  
})




app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});


