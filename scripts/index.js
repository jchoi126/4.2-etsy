// When you use 'require' the value is always in lower case.
var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=surf&includes=Images,Shop";
var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');

// Step 1 get the template and the convert to a js functin
// This source var has all the goods from index.html stamp
var source = $('#tile-list').html();
var template = handlebars.compile(source);

// This is not how it works. Use an object!
// var title1 = 'Album';
// var albumNUmber = '#1'
// var title2 = 'Album #2';

// Property name, and value. The property name
// will match the placeholder name!

// Step 2 Call the function with a context object

// // Got the Array?
// var context = {
//   'title': 'Cat Album',
//   'albumNumber': '11',
//   'image': 'http://unsplash.it/200/200',
//   // 'photos': [{'photoTitle': 'Fluffy'}, {'photoTitle': 'Brown'}, {'photoTitle': 'Black'}]
// };
// $('#product-container').append(template(context));

var albums = [
  {
    'title': 'Cat Album',
    'albumNumber': '12',
    'image': 'http://unsplash.it/200/200/?random',
    isFav: true,
    'photos': [{'photoTitle': 'Fluffy'}, {'photoTitle': 'Brown'}, {'photoTitle': 'Black'}]
  },{
    'title': 'Dog Album',
    'albumNumber': '234',
    'image': 'http://unsplash.it/201/201/?random',
    isFav: false,
    'photos': [{'photoTitle': 'Fluffy'}, {'photoTitle': 'Brown'}, {'photoTitle': 'Black'}]
  }
];

// Always call the template function with an object!

function run(data) {
  // console.log(data.results);
  var products = data.results;
  // console.log(products);
  displayProduct(products)
}

// function listProducts(listOfProducts){
//   listOfProducts.forEach(function(product){
//     displayProduct(product)
//     // console.log(listOfProducts);
//   })
// }

function displayProduct(products){
  // showProduct.forEach(function(product){
  // console.log(showProduct);
  // var Images = showProduct.Images[0].url_fullxfull;
  // var titleShow = showProduct.title
  // console.log(showProduct);

console.log(products);
  _.each(products, function(product){
    $('#product-container').append(template(product));
  });
  // console.log(showProduct.Images[0].url_fullxfull);
  // console.log(showProduct.Shop.shop_name);
  // console.log(showProduct.price);
  // console.log(showProduct);
// })
  // displayTitle(showTitle)
}

// function displayTitle(showTitle){
//   listOfTitles.forEach(function(title){
//     console.log(showTitle);
// })
// }

// function images(image){
//   console.log(image);
// }

fetchJSONP(url, run);




































/*
  (url: String, callback: Function) -> undefined

  Execute a callback function with the JSON results from the url specified.

  Examples
      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

      fetchJSONP(url, function(data) {
        // do something with data
      });

      // OR

      function logData(data) {
        console.log(data);
      }

      fetchJSONP(url, logData);
*/

function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
