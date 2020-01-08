import 'package:flutter/material.dart';
import 'dart:io';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';

void main() {
  runApp(new MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new MaterialApp(
      title: 'image to text',
      home: new UploadImage(),
    );
  }
}

class UploadImage extends StatefulWidget {
  UploadImage() : super();

  final String title = "Upload Image Demo";

  @override
  UploadImageState createState() => UploadImageState();
}

class UploadImageState extends State<UploadImage> {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return null;
  }
}