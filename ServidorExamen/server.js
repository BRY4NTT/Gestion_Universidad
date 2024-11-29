var express = require("express"),
  bodyParser = require("body-parser");
  const cors = require("cors");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(bodyParser.json());

app.use("/profesor", require("./routes/profesor"));
app.use("/alumno", require("./routes/alumno"));
app.use("/curso", require("./routes/curso"));

const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);