import express from 'express'
import { json } from 'body-parser'

const app = express();
app.use(json());

app.get('api/users/currentuser', (req, res) => {
  res.send("Hi There")
});

app.listen(3000, () => {
  console.log("Listnening on port 3000");
})