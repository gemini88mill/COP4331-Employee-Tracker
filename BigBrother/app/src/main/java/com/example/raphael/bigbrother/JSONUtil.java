package com.example.raphael.bigbrother;

/**
 * Created by raphael on 11/6/17.
 */

import com.google.gson.*;

public class JSONUtil {

    

//---Quarantine---
    class LoginPackage{
        private String userName;
        private String password;

        public LoginPackage(String userName, String password) {
            this.userName = userName;
            this.password = password;
        }
    }

    class SignupPackage{
        private String username;
        private String password;
        private String firstName;
        private String lastName;
        private int adminRequestLevel;

        public SignupPackage(String username, String password, String firstName, String lastName, int adminRequestLevel) {
            this.username = username;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.adminRequestLevel = adminRequestLevel;
        }
    }

    class locationPackage{
        private double latitude;
        private double longitude;
        private int userID;

        public locationPackage(double latitude, double longitude, int userID) {
            this.latitude = latitude;
            this.longitude = longitude;
            this.userID = userID;
        }
    }

    class taskListPackage{
        private double taskLatitude;
        private double taskLongitude;
        private String taskName;
        private String teskDescription;

        public taskListPackage(double taskLatitude, double taskLongitude, String taskName, String teskDescription) {
            this.taskLatitude = taskLatitude;
            this.taskLongitude = taskLongitude;
            this.taskName = taskName;
            this.teskDescription = teskDescription;
        }
    }
//---Quarantine---

    public void buildJSON(){
        Gson gson = new Gson();


    }

    public void createJson(){
        Gson gson = new Gson();
    }

    public void debugJson(){

    }
}
