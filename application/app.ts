import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('hola');
});

app.listen(process.env.PORT_APP, () => console.log('Server runing'));