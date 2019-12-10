const express = require('express');
const app = express();

app.listen(1904,()=> console.log("listening at 1904"));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));


const { spawn } = require('child_process')
const logOutput = (name) => (message) => console.log(`[${name}] ${message}`)
//below function taken from "https://codewithhugo.com/integrate-python-ruby-php-shell-with-node-js/" Thank you!
function run(TrainLine, StartStation, EndStation,ArrivalTime,ArrivalDate) {
  return new Promise((resolve, reject) => {
    var process = spawn('python3',["./python/main.py", 
                            TrainLine,
                            StartStation, 
                            EndStation,
                            ArrivalTime,
                            ArrivalDate
                            ] ); 

    const out = []
    process.stdout.on(
      'data',
      (data) => {
        out.push(data.toString());
        logOutput('stdout')(data);
      }
    );

    const err = []
    process.stderr.on(
      'data',
      (data) => {
        err.push(data.toString());
        logOutput('stderr')(data);
      }
    );

    process.on('exit', (code, signal) => {
      logOutput('exit')(`${code} (${signal})`)
      if (code !== 0) {
        reject(new Error(err.join('\n')))
        return
      }
      try {
        resolve(JSON.parse(out[0]));
      } catch(e) {
        reject(e);
      }
    });
  });
}


app.post('/commuterequest',async function(request,response){
    console.log(request.body);

    const outputjson =await run(request.body.TrainLine,request.body.StartStation, request.body.EndStation, request.body.ArrivalTime, request.body.ArrivalDate);

    console.log(outputjson);

    response.json(outputjson);
});



app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


