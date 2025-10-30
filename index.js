const http = require("http");
const url = require("url");

const port = 3000;

const dictionary = [
  "naturaleza",
  "campo",
  "bosque",
  "sol",
  "luna",
  "estrella",
  "mar",
  "viento",
  "montaña",
  "nube",
  "fuego",
  "agua",
  "tierra",
  "cielo",
  "flor",
  "nieve",
  "río",
  "arena",
  "desierto",
  "animal",
  "perro",
  "gato",
  "luz",
  "sombra",
  "piedra",
  "hoja",
  "lago",
  "planta",
  "planeta",
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  let numWords = parseInt(query.x);

  if (isNaN(numWords) || numWords < 1) {
    numWords = 3;
  }

  let passwordWords = [];

  for (let i = 0; i < numWords; i++) {
    const random = Math.floor(Math.random() * dictionary.length);
    passwordWords.push(dictionary[random]);
  }

  const password = passwordWords.join("-");

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`
    <html>
      <head>
        <title>Contraseña aleatoria</title>
        <style>
          body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: 'Roboto', sans-serif;
            text-align: center;
            margin-top: 50px;
            color: #457b9d;
          }

          h1 {
            color: #f05454;
          }

          h2 {
            margin-top: 30px;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;            
            padding: 2rem 3rem;
            border-radius: 20px;
          }

          p {
            font-size: 0.9rem;
          }
        </style>
      </head>
      <body>        
        <h1>Contraseña aleatoria generada</h1>
        <h3>Modifica el url para cambiar la longitud de la contraseña.</h3>
        <h4>Ejemplo: http://localhost:3000/?x=5</h4>
        <h2>${password}</h2>
        <p>(Generada con ${numWords} palabras)</p>
      </body>
    </html>
  `);
});

server.listen(port, () => {
  console.log(`Servidor: http://localhost:${port}`);
  // Ejemplo de query con 5 palabras: http://localhost:3000/?x=5
});
