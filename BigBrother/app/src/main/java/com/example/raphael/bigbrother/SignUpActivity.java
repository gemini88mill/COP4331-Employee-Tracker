package com.example.raphael.bigbrother;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class SignUpActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
    }

    public void signIn(View view){

        EditText nameField = (EditText) findViewById(R.id.nameTextArea);
        EditText usernameField = (EditText) findViewById(R.id.usernameField);
        EditText passwordField = (EditText) findViewById(R.id.passwordField);
        EditText workGroupField = (EditText) findViewById(R.id.workGroup);



        //starts the photo activity
        Intent intent = new Intent(this, PhotoActivity.class);
        startActivity(intent);
    }
}
