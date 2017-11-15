package com.example.raphael.bigbrother;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }

    public void sendJSONRequest(View view){
        //System.out.println("Sending JSON...");

        //get EditText Values
        EditText usernameTextField = (EditText) findViewById(R.id.usernameField);
        EditText passwordTextField = (EditText) findViewById(R.id.passwordField);

        //for debug
        System.out.println("Values Collected: " + usernameTextField + " " + passwordTextField);


        Intent intent = new Intent(this, photoActivity.class);
        startActivity(intent);

        //todo set up sign in if statement
    }
}
