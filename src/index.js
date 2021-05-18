const http = require('http');
const url = require('url');
const routes = require('./routes');

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);

  let id = null;
  let { pathname } = parsedUrl;
  const splitedEndpoint = pathname.split('/').filter(Boolean);

  console.log(`Request method: ${request.method} | Endpoint: ${pathname}`);

  if (splitedEndpoint.length > 1) {
    pathname = `/${splitedEndpoint[0]}/:id`;
    id = splitedEndpoint[1];
  }

  const route = routes.find(
    (routeObj) =>
      routeObj.endpoint === pathname && routeObj.method === request.method
  );

  if (route) {
    request.query = parsedUrl.query;
    request.params = { id };

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(body));
    };

    route.handler(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${pathname}`);
  }
});

server.listen(3000, () =>
  console.log('🔥 Server started at http://localhost:3000')
);
