const express = require("express");
const cors = require("cors");
const { isUuid } = require("uuidv4");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(logRequests);
app.use("/repositories/:id", validateRepositoryId);
app.use(routes);

/**middlewares */
function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

function validateRepositoryId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid repository ID" });
  }

  return next();
}

module.exports = app;
