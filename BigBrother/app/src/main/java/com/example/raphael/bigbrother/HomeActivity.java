package com.example.raphael.bigbrother;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONException;
import org.json.JSONObject;

public class HomeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        String user = getNameFromDB();

        TextView mainText = (TextView) this.findViewById(R.id.textView);
        mainText.setText(user);
    }

    private String getNameFromDB() {
        return "Welcome default";
    }

    public void onTaskListClick(View view){
        System.out.println("to taskList");

        Intent intent = new Intent(this, TasksActivity.class);
        startActivity(intent);
    }

    public void onMapViewClick(View view){
        System.out.println("to mapView");

        Intent intent = new Intent(this, LocationActivity.class);
        startActivity(intent);
    }

    public void onClockInOutClick(View view){
        System.out.println("to photoView");

        Intent intent = new Intent(this, PhotoActivity.class);
        startActivity(intent);
    }

    public void onSignOutClick(View view){
        System.out.println("back to start");
        sendClockOutStatus();
        LocationHandler.locationManager.removeUpdates(LoginActivity.locationHandler); // TODO(timp): stop listening for changes in position after logging off
        LocationHandler.locationManager = null;
        LoginActivity.locationHandler = null;


        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);
    }

    public void sendClockOutStatus(){
        String url = getResources().getString(R.string.clockUrl);
        // pushing to the database
        JSONObject body = new JSONObject();
        try {
            body.put("username", ConnectionHandler.user.username);
            body.put("clockStatus", "false");
            body.put("location", LocationHandler.getCoordinates());
        } catch (JSONException e) {

        }

        // Create a request
        JsonObjectRequest jsObjRequest = new JsonObjectRequest
                (Request.Method.PUT, url, body, new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        // Successful update location
                        ConnectionHandler.user.clockStatus = false;
                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                    }
                });

        // Make the request (add it to the request queue)
        ConnectionHandler.getInstance(this).addToRequestQueue(jsObjRequest);
    }
}
