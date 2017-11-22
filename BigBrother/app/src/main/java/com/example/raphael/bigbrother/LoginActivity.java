package com.example.raphael.bigbrother;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Cache;
import com.android.volley.Network;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.BasicNetwork;
import com.android.volley.toolbox.DiskBasedCache;
import com.android.volley.toolbox.HurlStack;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

public class LoginActivity extends AppCompatActivity {
    private String url = "http://192.168.86.39:3000/api/user/login";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }

    public void sendJSONRequest(View view) {
        // Get EditText Values
        final EditText usernameTextField = (EditText) findViewById(R.id.usernameField);
        EditText passwordTextField = (EditText) findViewById(R.id.passwordField);
        String username = usernameTextField.getText().toString().trim();
        String password = passwordTextField.getText().toString().trim();

        // Create body of JSON object to send to Web server
        JSONObject body = new JSONObject();
        try {
            body.put("username", username);
            body.put("password", password);
        } catch (JSONException e) {
            // TODO: Fallback if username or password cannot be used to create JSON Object
        }

        // Create a request
        JsonObjectRequest jsObjRequest = new JsonObjectRequest
                (Request.Method.POST, url, body, new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        // Successful login
                        doLogin();
                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        showHttpResponseError(error);

                    }
                });

        // Make the request (add it to the request queue)
        ConnectionHandler.getInstance(this).addToRequestQueue(jsObjRequest);
    }

    public void showHttpResponseError(VolleyError error) {
        Toast.makeText(this, "Status Code (" + error.networkResponse.statusCode + "): Incorrect username or password.", Toast.LENGTH_LONG).show();
    }

    public void doLogin() {
        // Proceed to HomeActivity
        // NOTE(timp): I changed this to the HomeActivity because someone
        //             should be able to log in before clocking in.
        Intent intent = new Intent(this, HomeActivity.class);
        startActivity(intent);
    }
}