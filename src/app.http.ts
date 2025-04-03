import fs from "fs";
import httl from "http";

const server = httl.createServer((req, res) => {
  console.log(req.url);

  /* res.writeHead(200, {
    "content-type": "text/html",
  });
  res.write("<h1>Hola Mundo!!</h1>");
  res.end(); */
  /* const data = { name: "John Doe", age: 30, city: "New York" };
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(data)); */

  if (req.url === "/") {
    const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
    res.writeHead(200, { "content-type": "text/html" });
    res.end(htmlFile);
    return;
  }

  if (req.url?.endsWith(".js")) {
    res.writeHead(200, { "content-type": "application/javascript" });
  } else if (req.url?.endsWith(".css")) {
    res.writeHead(200, { "content-type": "text/css" });
  }

  const responseContent = fs.readFileSync(`./public${req.url}`, "utf-8");
  res.end(responseContent);
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
