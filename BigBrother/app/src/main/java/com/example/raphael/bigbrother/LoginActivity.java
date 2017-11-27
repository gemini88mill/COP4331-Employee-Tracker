package com.example.raphael.bigbrother;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONException;
import org.json.JSONObject;

public class LoginActivity extends AppCompatActivity {
    public static LocationHandler locationHandler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        locationHandler = new LocationHandler(this);
    }

    public void newUserSignIn(View view){
        //open new user activity on click event.

        System.out.println("clicked New user button, going to SignIn Activity");

        Intent intent = new Intent(this, SignUpActivity.class);
        startActivity(intent);
    }

    public void sendJSONRequest(View view) throws JSONException {
        System.out.println("Sending JSON...");
        String url = getResources().getString(R.string.loginUrl);

        //get EditText Values
        EditText usernameTextField = findViewById(R.id.usernameField);
        EditText passwordTextField = findViewById(R.id.passwordField);

        String username = usernameTextField.getText().toString().trim();
        String password = passwordTextField.getText().toString().trim();

        // Create body of JSON object to send to Web server
        final JSONObject body = new JSONObject();
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
                        try {
                            // Save the user's username for the session
                            ConnectionHandler.user.username = body.getString("username");
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
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
        // If the server could be access, but error code was returned
        if (error.networkResponse != null) {
            Toast.makeText(this, "Status Code (" + error.networkResponse.statusCode + "): Incorrect username or password.", Toast.LENGTH_LONG).show();
        }
        else {
            // In case no connection could be established at all (i.e., server is down)
            Toast.makeText(this, "Could not connect to server. Error: " + error.getMessage(), Toast.LENGTH_LONG).show();
        }
    }

    public void doLogin() {
        Intent intent = new Intent(this, PhotoActivity.class);
        startActivity(intent);
    }

    public void goRegister(View view) {
        Intent intent = new Intent(this, SignUpActivity.class);
        startActivity(intent);
    }
}
