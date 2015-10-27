/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var util = require('util');
var data = { results: [] };
var objectId = 1;
var indexFile = '.';
// var firstMessage = {
//   username: 'sam', 
//   text: 'i love potatoes',
//   roomname: 'lobby'
// };

// data.results.push(firstMessage);

var requestHandler = function(request, response) {
  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  
  headers['Content-Type'] = "text/plain";

  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  //if ( request.method === 'GET' ) {

    var filePath = '../client' + request.url;

  if (request.method === 'POST'){
      console.log('posting begins');
      statusCode = 201;
      var decodedBody;
      var fullBody = '';
      response.writeHead(statusCode, headers);
      request.on('data', function (chunk) {
        fullBody += chunk.toString();
      });  
      request.on('end', function () {
        var obj = JSON.parse(fullBody.toString());
        obj.objectId = objectId;
        objectId++;
        data.results.push(obj);
        console.log('post request this is our parsed obj', obj);
        console.log('wtf, shouldnt our data not be empty: ', data);
      });
        console.log('post request made, heres our data: ', data);
    } else if ( request.method === 'OPTIONS' ) {
      response.writeHead(statusCode, headers);
      response.end();
    } else if(filePath === '../client/') {
      filePath = '../client/index.html';
      fs.readFile(filePath, function(error, content) {
                  if (error) {
                    response.writeHead(500);
                    response.end();
                  } else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    contentCopy = content;
                    response.end(content, 'utf-8');
                  }
      });
    } else if (filePath === '../client/?order=-createdAt') {
      response.writeHead(statusCode, headers);
      console.log('in get request: ', JSON.stringify(data));
      response.end(JSON.stringify(data));
    }  else {
      var extname = path.extname(filePath);
      var contentType = 'text/html';
      switch (extname) {
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.css':
          contentType = 'text/css';
          break;
      }
      fs.readFile(filePath, function(error, content) {
                  if (error) {
                    response.writeHead(500);
                    response.end();
                    console.log('filepath:', filePath);
                  } else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    contentCopy = content;
                    console.log('do i get here?');
                    response.end(content, 'utf-8');
                  }
      });
    }
  //  }
  // if (  ) {
  //   statusCode = 201;
  //   var decodedBody;
  //   var fullBody = '';
  //   response.writeHead(statusCode, headers);
  //   request.on('data', function (chunk) {
  //     fullBody += chunk.toString();
  //   });  
  //   request.on('end', function () {
  //     var obj = JSON.parse(fullBody.toString());
  //     obj.objectID = objectID;
  //     objectID++;
  //     data.results.push(obj);
  //     console.log('post request this is our parsable string: ', fullBody.toString());
  //     console.log('wtf, shouldnt our data not be empty: ', data);
  //   });
  //   // response.end("post request success!");
  //   console.log('post request made, heres our data: ', data);
  // }
  // } else if ( request.method === 'OPTIONS' ) {
  //   response.writeHead(statusCode, headers);
  //   response.end();
  // }
    // }
    // else {
    //   response.writeHead(404);
    //   response.end();
    // }
  // });


  

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  // if ( request.method === 'GET' ) {
  //   console.log(request.url);
  //   if(request.url === '/'){
  //     response.writeHead(statusCode, headers);
  //     console.log('in get request: ', JSON.stringify(data));
  //     response.end(contentCopy, 'utf-8');
  //   } else {

  //   //capture info after URL
  //   //use that info to sort our data to be returned
    // response.writeHead(statusCode, headers);
    // console.log('in get request: ', JSON.stringify(data));
    // response.end(JSON.stringify(data));
  //   // if( request.url === '/classes/room1' ){
  //   //   response.writeHead(statusCode, headers);
  //   //   response.end(JSON.stringify(data));
  //   // } else if ( request.url === '/classes/messages' ) {
  //   //   response.end(JSON.stringify(data));
  //   // } else {
  //   //   statusCode = 404;
  //   //   response.writeHead(statusCode, headers);
  //   //   response.end();
  //   //}
  //   }
  // } else if ( request.method === 'POST' ) {
  //   statusCode = 201;
  //   var decodedBody;
  //   var fullBody = '';
  //   response.writeHead(statusCode, headers);
  //   request.on('data', function (chunk) {
  //     fullBody += chunk.toString();
  //   });  
  //   request.on('end', function () {
  //     var obj = JSON.parse(fullBody.toString());
  //     obj.objectID = objectID;
  //     objectID++;
  //     data.results.push(obj);
  //     console.log('post request this is our parsable string: ', fullBody.toString());
  //     console.log('wtf, shouldnt our data not be empty: ', data);
  //   });
  //   response.end("post request success!");
  //   console.log('post request made, heres our data: ', data);
  // } else if ( request.method === 'OPTIONS' ) {
  //   response.writeHead(statusCode, headers);
  //   response.end();
  // }

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports.requestHandler = requestHandler;

