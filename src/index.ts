import express from 'express';
const app = express();

app.post('/hooks/catch/:userId/:zapId', (req, res) => {
   const { userId, zapId } = req.params;

   // store in  db

   // post it to queue

    res.send('Hello World!');
});


