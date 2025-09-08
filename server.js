const express = require("express");

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
  delay(4000);
  res.send(`Beep beep beep !!!: ${process.pid}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// We don't want to use clustering in javascript directly because pm2 does it for us in development and production
// if (cluster.isMaster) {
//   const numOfCores = os.cpus().length;
//   console.log(`Master process is ${process.pid}`);
//   console.log(`Forking for ${numOfCores} cores`);

//   for (let i = 0; i < numOfCores; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//     console.log("Forking another worker!");
//     cluster.fork();
//   });
// } else {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT} and process id is ${process.pid}`);
//   });
// }
