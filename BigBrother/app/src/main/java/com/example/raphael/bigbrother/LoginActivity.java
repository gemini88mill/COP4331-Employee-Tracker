package com.example.raphael.bigbrother;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

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

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }

    public void sendJSONRequest(View view) throws JSONException {
        System.out.println("Sending JSON...");

        //get EditText Values
        EditText usernameTextField = (EditText) findViewById(R.id.usernameField);
        EditText passwordTextField = (EditText) findViewById(R.id.passwordField);

        String username = usernameTextField.getText().toString().trim();
        String password = passwordTextField.getText().toString().trim();


        RequestQueue mRequestQueue;

        // Instantiate the cache
        Cache cache = new DiskBasedCache(getCacheDir(), 1024 * 1024); // 1MB cap

        // Set up the network to use HttpURLConnection as the HTTP client.
        Network network = new BasicNetwork(new HurlStack());

        // Instantiate the RequestQueue with the cache and network.
        mRequestQueue = new RequestQueue(cache, network);

        // Start the queue
        mRequestQueue.start();

        String url ="http://192.168.86.39:3000/api/user/login/";
        JSONObject body = new JSONObject();
        body.put("username", username);
        body.put("password", password);

        // Formulate the request and handle the response.
        mRequestQueue.add(new JsonObjectRequest
                (Request.Method.POST, url, body, new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject response) {
                        // Successful login
                        System.out.println(response);
                        doLogin();
                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        System.out.println(error);

                    }
                }));

//        System.out.println(mRequestQueue.getCache());
    }

    public void doLogin() {
        // Proceed to HomeActivity
        // NOTE(timp): I changed this to the HomeActivity because someone
        //             should be able to log in before clocking in.
        Intent intent = new Intent(this, HomeActivity.class);
        startActivity(intent);
    }
}
