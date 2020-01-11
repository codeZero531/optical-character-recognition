import 'package:flutter/material.dart';
import 'dart:io';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:image_picker/image_picker.dart';


void main() {
  runApp(new MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    
    return new MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'image to text',
      color: Colors.deepPurple,
      home: new UploadImage(),
    );
  }
}


class UploadImage extends StatefulWidget {
  UploadImage() : super();

  final String title = "Upload Image ";

  @override
  UploadImageState createState() => UploadImageState();
}

class UploadImageState extends State<UploadImage> {
  static final String uploadEndPoint = 'http://localhost:3000/image';
  
  Future<File> file;
  String status = '';
  String base64Image;
  File tmpFile,_imageFile;
  String errMessage = 'Error Uploading Image';

  chooseImage() {
    setState(() {
      file = ImagePicker.pickImage(source: ImageSource.gallery);
    });
    setStatus('');
  }
  //get camera
  Future getImage (bool isCamera) async{

   File image;

   if(isCamera){
     image=await ImagePicker.pickImage(source: ImageSource.camera);
   }
   setState(() {
     _imageFile=image;
   });
 }

  setStatus(String message) {
    setState(() {
      status = message;
    });
  }

  startUpload() {
    setStatus('Uploading Image...');
    if (null == tmpFile) {
      setStatus(errMessage);
      return;
    }
    String fileName = tmpFile.path.split('/').last;
    upload(fileName);
  }
  // get the camera
   

  upload(String fileName) async {
    // set up POST request
    String url = 'http://10.0.2.2:3000/image';
    Map<String, String> headers = {"Content-type": "application/json"};

    // make POST request
    Response response = await post(url, body: {
      "image": base64Image,
      "name": fileName,
    });

    String text = response.body;
    setStatus(text);
  }


  Widget showImage() {
    return FutureBuilder<File>(
      future: file,
      builder: (BuildContext context, AsyncSnapshot<File> snapshot) {
        if (snapshot.connectionState == ConnectionState.done &&
            null != snapshot.data) {
          tmpFile = snapshot.data;
          base64Image = base64Encode(snapshot.data.readAsBytesSync());
           

          return Flexible(
             
            child: Image.file(
              snapshot.data,
              
              fit: BoxFit.fill,
            ),
          );
        } else if (null != snapshot.error) {
          return const Text(
            'Error Picking Image',
            textAlign: TextAlign.center,
          );
        } else {
          return const Text(
            'No Image Selected',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 14.0),
          );
        }
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Image to Text"),
        centerTitle: true,
        backgroundColor: Colors.black45,
      ),
       backgroundColor: Colors.blue,
              
       
             body: Container(
               padding: EdgeInsets.all(30.0),
               decoration: BoxDecoration(
                gradient: LinearGradient(
              begin: Alignment.topRight,
              end: Alignment.bottomLeft,
              colors: [Colors.yellow[300], Colors.pink[100]])),
               child: Column(
                 
                 crossAxisAlignment: CrossAxisAlignment.stretch,
                 children: <Widget>[
                   
                   OutlineButton(
                     onPressed: (){
                       getImage(true);
                     }, 
                     child: Text('Take Camera',style: TextStyle(fontSize: 16.0),),
                     shape: new RoundedRectangleBorder(borderRadius: new BorderRadius.circular(30.0)),
                     borderSide: BorderSide(color: Colors.blue),
                   ),
                   new Padding(padding: const EdgeInsets.all(5.0),),
                   OutlineButton(
                     onPressed: chooseImage,
                     child: Text('Choose Image',style: TextStyle(fontSize: 16.0),),
                     shape: new RoundedRectangleBorder(borderRadius: new BorderRadius.circular(30.0)),
                     borderSide: BorderSide(color: Colors.blue),
                   ),
                   SizedBox(
                     height: 20.0,
                   ),
                 
                   showImage(),
       
                   
                   // _imageFile==null ? Container() :Image.file(_imageFile,width:250.0,height: 250.0,color: Colors.grey,),
       
               
                  
                  
                   
                   
                   SizedBox(
                     height: 20.0,
                   ),
                   OutlineButton(
                     onPressed: startUpload,
                     child: Text('Upload Image',style: TextStyle(fontSize: 16.0),),
                     shape: new RoundedRectangleBorder(borderRadius: new BorderRadius.circular(30.0),),
                     borderSide: BorderSide(color: Colors.blue),
                   ),
                   SizedBox(
                     height: 20.0,
                   ),
                   Expanded(
                     flex: 1,
                     child: Text(
                       status,
                       textAlign: TextAlign.center,
                       style: TextStyle(
                         color: Colors.black,
                         fontWeight: FontWeight.w400,
                         fontSize: 13.0,
                       ),
                     ),
                   ),
                   SizedBox(
                     height: 20.0,
                   ),
                 ],
               ),
             ),
           );
         }
       }
       
       