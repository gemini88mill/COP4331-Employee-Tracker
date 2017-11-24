package com.example.raphael.bigbrother;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.provider.MediaStore;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

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
public class PhotoActivity extends AppCompatActivity implements LocationListener {

    //globals
    static final int REQUEST_IMAGE_CAPTURE = 1;
    private ImageView mimageView;
    private String eImage;
    private LocationManager locationManager;
    private LocationListener locationListener;
    private double lat = 0.0;
    private double lng = 0.0;

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
        mimageView = (ImageView) findViewById(R.id.imageView);

        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.

            ActivityCompat.requestPermissions(this,new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 1);

            return;
        }
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, this);

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

        url = "http://192.168.86.39:3000/api/user/clock";

        // TODO(timp): guarantee that the GPS coordinates have been collected and assigned before
        // pushing to the database
        body = new JSONObject();
        try {
            body.put("username", "lknope");
            body.put("clockStatus", "true");
            JSONObject locationObj = new JSONObject();
            locationObj.put("lat", lat);
            locationObj.put("lng", lng);
            body.put("location", locationObj);
        } catch (JSONException e) {

        }

        // Create a request
        jsObjRequest = new JsonObjectRequest
                (Request.Method.PUT, url, body, new Response.Listener<JSONObject>() {
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

    @Override
    public void onLocationChanged(Location location) {
//        Toast.makeText(this, "(" + location.getLatitude() + ", " + location.getLongitude() + ")", Toast.LENGTH_LONG).show();
        lat = location.getLatitude();
        lng = location.getLongitude();
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {

    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
        switch (requestCode) {
            case 1: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                } else {
                    // permission denied, boo! Disable the
                    // functionality that depends on this permission.
                }
                return;
            }
            // other 'case' lines to check for other
            // permissions this app might request
        }
    }
}
