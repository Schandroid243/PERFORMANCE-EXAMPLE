const express = require("express");
const cluster = require("cluster");
const os = require("os");

const app = express();

const PORT = 7000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send(`Performance example: ${process.pid}`);
});

function delay(duration) {
  const startTime = Date.now();

  while (Date.now() - startTime < duration) {
    //Event loop is blocked
  }
}

app.get("/timer", (req, res) => {
  //delay the response
  delay(9000);
  res.send(`Ding ding ding !!!: ${process.pid}`);
});

if (cluster.isMaster) {
  const numCores = os.cpus().length;
  console.log(`Number of cores is: ${numCores}`);
  console.log(`Master cluster is running with pid: ${process.pid}`);
  for (let i = 0; i < numCores; i++) {
    cluster.fork(); // create worker process for each physical cores
  }
} else {
  console.log(`Worker started with pid: ${process.pid}`);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
