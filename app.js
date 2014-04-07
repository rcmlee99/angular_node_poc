var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');

// Create the express server
var app = express();

// Now build the express stack. Note that order is important here as the stack
// basically acts as a filter.



// all environments
app.set('port', process.env.PORT || 7001);

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.cookieParser());
app.use(express.session({secret: "This is a secret"}));



app.get('/getPageSection/:pageId', function(req,res) {

    var pageId = req.param('pageId',null);
    var data = {
                        "page" : {
                            "pageId" : "1",
                                "pageName": "TestPage",
                                "pageHeader" : "Integrate Angular and Node",
                                "sections" : [
                                {
                                    "sectionId" : 1,
                                    "sectionTabHeading" : "Angular/Node.js inegration",
                                    "sectionWidth" : "large",
                                    "sectionTitle" : "Angular/Node.js inegration",
                                    "sectionLayoutName" : "show_one_paragraph",
                                    "sectionHeading" : ["Test Data From Server 1"],
                                    "text" : ["This is a test data to check the integration of Angular.js and Node.js"],
                                    "text_css": ["display:block"],
                                    "priceText": ["Only A$1,239"],
                                    "links": [{"caption" : "Read more", "url": "some url"}]
                                },
                                {
                                    "sectionId" : 2,
                                    "sectionTabHeading" : "",
                                    "sectionWidth" : "large",
                                    "sectionTitle" : "Angular/Node.js inegration",
                                    "sectionLayoutName" : "split_paragraph",
                                    "sectionHeading" : ["Test Data From Server 2"],
                                    "text" : ["This is a test data to check the integration of Angular.js and Node.js"],
                                    "text_css": ["display:block"],
                                    "priceText": ["Only A$2,475"],
                                    "links": [{"caption" : "Read more", "url": "some url"}]

                                }
                            ]
                        }
                    };

    res.json(data);

});

// development only
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));

});