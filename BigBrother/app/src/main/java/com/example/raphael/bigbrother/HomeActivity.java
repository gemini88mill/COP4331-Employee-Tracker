package com.example.raphael.bigbrother;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class HomeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
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
        //todo send JSON to clock in and out
    }

    public void onSignOutClick(View view){
        System.out.println("back to start");

        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);
    }
}
