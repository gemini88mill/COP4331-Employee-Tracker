package com.example.raphael.bigbrother;

import android.content.Intent;
import android.graphics.Bitmap;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import static com.example.raphael.bigbrother.R.id.image;
import static com.example.raphael.bigbrother.R.id.pictureCapture;

/**
 * Photo Activity Class - Everything from the photo Activity goes here.
 */
public class PhotoActivity extends AppCompatActivity {

    //globals
    static final int REQUEST_IMAGE_CAPTURE = 1;
    private ImageView mimageView;

    /**
     * onCreate - method to invoke the creation of the new activity
     *
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_photo);

        Button photoButton = (Button) this.findViewById(R.id.pictureCapture);
        mimageView = (ImageView)findViewById(R.id.imageView);

        photoButton.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View view) {
                Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                if(cameraIntent.resolveActivity(getPackageManager()) != null){
                    startActivityForResult(cameraIntent, REQUEST_IMAGE_CAPTURE);
                }
            }
        });
    }

    private void dispatchTakePictureIntent(View v){
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if(takePictureIntent.resolveActivity(getPackageManager()) != null){
            startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            Bundle extras = data.getExtras();
            assert extras != null;
            Bitmap imageBitmap = (Bitmap) extras.get("data");
            mimageView.setImageBitmap(imageBitmap);
        }
    }

    public void sendpicJSON(View view){
        System.out.println("Sending picture");

        Intent intent = new Intent(this, HomeActivity.class);
        startActivity(intent);
    }
}
