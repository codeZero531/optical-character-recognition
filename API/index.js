const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const createWorker = require('tesseract.js');
const fs = require('fs');


const app = express();

app.use(express.json({limit: '100mb', extended: true}));
app.use(express.urlencoded({limit: '100mb', extended: true}));
app.use(cors());

app.use(bodyParser.json({limit: '100mb', extended: true}));
app.use(bodyParser.urlencoded({extended: true, limit: '100mb'}));

const PORT = process.env.PORT || 3000;

app.post('/image', (req, res) => {
    fs.writeFile(`uploads/${req.body.name}`, req.body.image, {encoding: 'base64'}, function (err) {
        console.log('file saved');
    });

    var selectedLanguage;

    if (req.body.language) {
        selectedLanguage = req.body.language;
    } else {
        selectedLanguage = 'eng';
    }

    // ocr function
    const workerMobile = createWorker.createWorker({
        logger: m => console.log(((m.progress) * 100) + "%"), // Add logger here
    });

    (async () => {
        await workerMobile.load();
        await workerMobile.loadLanguage(selectedLanguage);
        await workerMobile.initialize(selectedLanguage);
        const {data: {text}} = await workerMobile.recognize(`./uploads/${req.body.name}`);
        // console.log(text);
        await workerMobile.terminate();
        await res.status(200).json({
            word: text
        });

    })();


});

app.use(morgan());

app.listen(PORT, () => console.log(`server running on ${PORT} ...`));
