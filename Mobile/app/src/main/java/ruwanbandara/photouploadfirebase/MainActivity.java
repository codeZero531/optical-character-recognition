package ruwanbandara.photouploadfirebase;

import android.content.ContentResolver;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.webkit.MimeTypeMap;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;


import com.google.android.gms.tasks.Continuation;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.squareup.picasso.Picasso;

public class MainActivity extends AppCompatActivity {

    private static final int PICK_IMAGE_REQUEST = 1;
    private Button mButtonChooserImage;
    private Button mButtonUpload;
    private TextView mTetViewShowUpload;
    private EditText mEditTextFileName;
    private ImageView mImageView;
    private ProgressBar mProgressBar;

    private Uri mImageUri;

    private StorageReference mStorageRef;
    private DatabaseReference mDatabaseRef;

    private static final String TAG = "MainActivity";

    // Post requst dat




    @Override
    protected void onCreate(Bundle savedInstanceState) {


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mButtonChooserImage = findViewById(R.id.button_choose_image);
        mButtonUpload = findViewById(R.id.button_upload);
        mTetViewShowUpload = findViewById(R.id.text_view_show_uploads);
        mEditTextFileName = findViewById(R.id.edit_text_file_name);
        mImageView = findViewById(R.id.image_view);
        mProgressBar = findViewById(R.id.progress_bar);

        mStorageRef = FirebaseStorage.getInstance().getReference("uploads");
        mDatabaseRef = FirebaseDatabase.getInstance().getReference("uploads");




        mButtonChooserImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openFileChooser();


            }
        });

        mButtonUpload.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                uploadFile();




            }
        });

        mTetViewShowUpload.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });



    }
    private void openFileChooser(){
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(intent, PICK_IMAGE_REQUEST);

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData()!= null){

            mImageUri = data.getData();

            Picasso.with(this).load(mImageUri).into(mImageView);

        }
    }

    private String getFileExtension(Uri uri){
        ContentResolver cR = getContentResolver();
        MimeTypeMap mime = MimeTypeMap.getSingleton();
        return mime.getExtensionFromMimeType(cR.getType(uri));
    }
    private void uploadFile() {
//        if (mImageUri != null){
//            final StorageReference fileReference = mStorageRef.child(System.currentTimeMillis() + "."+ getFileExtension(mImageUri));
//
//
//            fileReference.putFile(mImageUri)
//                    .addOnSuccessListener(new OnSuccessListener <UploadTask.TaskSnapshot>() {
//
//                        @Override
//                        public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
//
//////                            System.out.println("ssssssssssssssssssssssss");
////                                file
//                            Handler handler = new Handler();
//                            handler.postDelayed(new Runnable() {
//                                @Override
//                                public void run() {
//
//                                    mProgressBar.setProgress(0);
//                                }
//                            }, 500);
//
//
//
//                            Toast.makeText(MainActivity.this,"Upload Successfull",  Toast.LENGTH_LONG).show();
//                            Upload upload = new Upload(mEditTextFileName.getText().toString().trim(),
//                                    taskSnapshot.toString());
//
//                            String uploadId = mDatabaseRef.push().getKey();
//
//
//
//                            mDatabaseRef.child(uploadId).setValue(upload);
//                        }
//                    })
//                    .addOnFailureListener(new OnFailureListener() {
//                        @Override
//                        public void onFailure(@NonNull Exception e) {
//                            Toast.makeText(MainActivity.this,e.getMessage(),Toast.LENGTH_SHORT).show();
//
//                        }
//                    })
//                    .addOnProgressListener(new OnProgressListener<UploadTask.TaskSnapshot>() {
//                        @Override
//                        public void onProgress(UploadTask.TaskSnapshot taskSnapshot) {
//                            double progress = (100.0 * taskSnapshot.getBytesTransferred() / taskSnapshot.getTotalByteCount());
//                            mProgressBar.setProgress((int) progress);
//                        }
//                    });
//
//
//
//
//
//        }else{
//            Toast.makeText(this,"No File Selected",Toast.LENGTH_SHORT).show();
//        }

        if (mImageUri != null) {
            mStorageRef.putFile(mImageUri).continueWithTask(new Continuation<UploadTask.TaskSnapshot, Task<Uri>>() {
                @Override
                public Task<Uri> then(@NonNull Task<UploadTask.TaskSnapshot> task) throws Exception {
                    if (!task.isSuccessful()) {
                        throw task.getException();
                    }
                    return mStorageRef.getDownloadUrl();
                }
            }).addOnCompleteListener(new OnCompleteListener<Uri>() {
                @Override
                public void onComplete(@NonNull Task<Uri> task) {

                    Handler handler = new Handler();
                    handler.postDelayed(new Runnable() {
                        @Override
                        public void run() {

                            mProgressBar.setProgress(0);
                        }
                    }, 500);

                    if (task.isSuccessful()) {
                        Uri downloadUri = task.getResult();
                        Log.d(TAG, "then: " + downloadUri.toString());


                        Upload upload = new Upload(mEditTextFileName.getText().toString().trim(),
                                downloadUri.toString());


//                        imageLink = downloadUri.toString();
//
//
//                        String data = "{"+ "\"name\"" + "\"" + imageLink + "\","+ "}";
//
//




                        mDatabaseRef.push().setValue(upload);
                    } else {
                        Toast.makeText(MainActivity.this, "upload failed: " + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                    }
                }
            }).addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception e) {
                    Toast.makeText(MainActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                }

            });
//                    .addOnProgressListener(new OnProgressListener<UploadTask.TaskSnapshot>() {
//                @Override
//                public void onProgress(UploadTask.TaskSnapshot taskSnapshot) {
//                    double progress = (100.0 * taskSnapshot.getBytesTransferred() / taskSnapshot.getTotalByteCount());
//                    mProgressBar.setProgress((int) progress);
//                }
//            });
        } else {
            Toast.makeText(this, "No File Selected", Toast.LENGTH_SHORT).show();

        }


    }
}
