const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const createWorker = require('tesseract.js');
const fs = require('fs');


const app = express();

app.use(express.json({limit:'100mb',  extended: true }));
app.use(express.urlencoded({limit:'100mb',  extended: true }));
app.use(cors());

app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));



const PORT = process.env.PORT ||  3000 ;


const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    } ,
    filename: (Req, file, callBack) => {
        callBack(null, `${file.originalname}`);
    }
});

var upload = multer({storage: storage});

app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    const language = req.body.language;

    console.log(req.body.language);
    // var text = test();

    if (!file) {
        const  error = new Error('Please upload the file');
        error.statusCode = 400;
        return next(error);
    }

    // ocr function

    const worker = createWorker.createWorker({
        logger: m => console.log((m.progress)*100 + "%"), // Add logger here
    });
    (async () => {
        await worker.load();
        await worker.loadLanguage(language);
        await worker.initialize(language);
        const { data: { text } } = await worker.recognize(`./uploads/${file.originalname}`);
        console.log(text);
        await worker.terminate();
        await res.json({
            text: text,
        });

    })();

});

//multiple files
app.post('/multipleFiles', upload.array('files'), (req, res, next) => {
    const files = req.files;
    console.log(files);
    if (!files) {
        const  error = new Error('Please upload the file');
        error.statusCode = 400;
        return next(error);
    }
    res.send({status: 'ok'});
});

//api test
app.get('/test', (req, res) => {
   res.status(200).json({
       message: 'test work!'
   });
});

app.post('/ruwan', (req, res) => {
   console.log(req.body);
   res.json({
      message: 'done'
   });
});

app.post('/image' , (req, res) => {
    console.log('done');

    fs.writeFile('uploads/image.png', req.body.image, {encoding: 'base64'}, function(err) {
        console.log('File created');
    });

    res.status(200).json({
        message : 'hello'
    });

});

app.use(morgan());

app.listen(PORT, () => console.log(`server running on ${PORT} ...`));
