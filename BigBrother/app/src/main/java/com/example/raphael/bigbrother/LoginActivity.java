package com.example.raphael.bigbrother;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import java.io.IOException;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }

    public void sendJSONRequest(View view){
        System.out.println("Sending JSON...");

        //get EditText Values
        EditText usernameTextField = (EditText) findViewById(R.id.usernameField);
        EditText passwordTextField = (EditText) findViewById(R.id.passwordField);

        String username = usernameTextField.getText().toString().trim();
        String password = passwordTextField.getText().toString().trim();

        JSONUtil loginJSON = new JSONUtil(username, password);
        loginJSON.buildJSON(loginJSON);

        String response = loginJSON.sendJSON();

            //todo set up get response


        //for debug
        System.out.println("Values Collected: " + username + " " + password + response);

        //if system verifies that user exists
        Intent intent = new Intent(this, PhotoActivity.class);
        startActivity(intent);

    }
}
