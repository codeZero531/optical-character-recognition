const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const createWorker = require('tesseract.js');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


const PORT = process.env.PORT ||  3000


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
    console.log(file.filename);
    var text = test();

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
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
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

app.use(morgan());

app.listen(PORT, () => console.log(`server running on ${PORT} ...`));
