// When you use 'require' the value is always in lower case.
var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');

// Step 1 get the template and the convert to a js functin
// This source var has all the goods from index.html stamp
var source = $('#photo-album').html();
var template = handlebars.compile(source);

// This is not how it works. Use an object!
// var title1 = 'Album';
// var albumNUmber = '#1'
// var title2 = 'Album #2';

// Property name, and value. The property name
// will match the placeholder name!

// Step 2 Call the function with a context object

// Got the Array?
var context = {
  'title': 'Cat Album',
  'album': '11'
}

// Always call the template function with an object!
$('#albums-container').append(template(context));
$('#albums-container').append(template());

_.each(album, function(placeHolder){
  $('#albums-container').append(template(placeHolder));
})
