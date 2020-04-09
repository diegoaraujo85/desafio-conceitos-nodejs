const express = require("express");
const { uuid } = require("uuidv4");

const routes = express.Router();

const repositories = [];

routes.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

routes.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const likes = 0;
  const id = uuid();

  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories.push(repository);

  return response.status(200).json(repository);
});

routes.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (!repositories[repoIndex]) {
    return response.status(400).json({ error: "Repository not found" });
  }

  const likes = repositories[repoIndex].likes;

  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[repoIndex] = repository;
  return response.status(200).json(repository);
});

routes.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (!repositories[repoIndex]) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

routes.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (!repositories[repoIndex]) {
    return response.status(400).json({ error: "Invalid Repository ID" });
  }

  const { title, url, techs } = repositories[repoIndex];

  const likes = repositories[repoIndex].likes + 1;

  const repository = {
    id,
    likes,
    title,
    url,
    techs,
  };

  repositories[repoIndex] = repository;
  return response.status(200).json(repository);
});

module.exports = routes;
