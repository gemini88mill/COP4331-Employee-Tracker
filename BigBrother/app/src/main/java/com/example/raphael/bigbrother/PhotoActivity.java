package com.example.raphael.bigbrother;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.provider.MediaStore;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import com.android.volley.NetworkResponse;
import com.android.volley.NoConnectionError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.TimeoutError;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Map;

import static com.example.raphael.bigbrother.R.id.image;
import static com.example.raphael.bigbrother.R.id.pictureCapture;

/**
 * Photo Activity Class - Everything from the photo Activity goes here.
 */
public class PhotoActivity extends AppCompatActivity {

    //globals
    static final int REQUEST_IMAGE_CAPTURE = 1;
    private ImageView mimageView;
    private String eImage;

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

        photoButton.setOnClickListener(new View.OnClickListener() {
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

            // Encode the image
            mimageView.setDrawingCacheEnabled(true);
            mimageView.measure(View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED),
                    View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED));
            mimageView.layout(0, 0, mimageView.getMeasuredWidth(), mimageView.getMeasuredHeight());

            mimageView.buildDrawingCache(true);
            Bitmap b = Bitmap.createBitmap(mimageView.getDrawingCache());
            mimageView.setDrawingCacheEnabled(false); // clear drawing cache

            eImage = getStringImage(b);

        }
    }

    public void sendpicJSON(View view){
        String url = "http://192.168.86.39:3000/api/user/upload";

     System.out.println(mimageView.getDrawingCache());
        JSONObject body = new JSONObject();
        try {
            body.put("username", "lknope");
            body.put("fileType", "jpg");
            body.put("file", eImage);
        } catch (JSONException e) {

        }

        // Create a request
        JsonObjectRequest jsObjRequest = new JsonObjectRequest
                (Request.Method.POST, url, body, new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        // Successful login
                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                    }
                });

        // Make the request (add it to the request queue)
        ConnectionHandler.getInstance(this).addToRequestQueue(jsObjRequest);


        Intent intent = new Intent(this, HomeActivity.class);
        startActivity(intent);
    }

    public String getStringImage(Bitmap bmp){
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bmp.compress(Bitmap.CompressFormat.JPEG, 100, baos);
        byte[] imageBytes = baos.toByteArray();
        return Base64.encodeToString(imageBytes, Base64.DEFAULT);
    }
}
