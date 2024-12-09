import e from "express";

const app = e();
const port = 3000

app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}`)
})