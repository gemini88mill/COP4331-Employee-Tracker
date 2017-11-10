package com.example.raphael.bigbrother;

/**
 * Created by raphael on 11/6/17.
 */

import android.util.Pair;

import com.google.gson.*;

import java.util.List;

public class JSONUtil {

    private class Coordinates{
        private double latitude;
        private double longitude;

        public Coordinates(double latitude, double longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
        }
    }

    private String username;
    private String password; //should be hashed***
    private String userFirstName;
    private String userLastName;
    private String userPosition;
    private int userPermissionLevel;
    private Coordinates userLocation;
    private List<Coordinates> userTaskLocation;
    private String taskName;
    private String taskDescription;

    //possible datatypes
    private List<Pair<String, String>> users;

    public JSONUtil(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public JSONUtil(String username, String password, String userFirstName, String userLastName) {
        this.username = username;
        this.password = password;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
    }

    public JSONUtil(String username, Coordinates userLocation) {
        this.username = username;
        this.userLocation = userLocation;
    }

    public JSONUtil(List<Coordinates> userTaskLocation, String taskName, String taskDescription) {
        this.userTaskLocation = userTaskLocation;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
    }

    ////---Quarantine---
//    class LoginPackage{
//        private String userName;
//        private String password;
//
//        public LoginPackage(String userName, String password) {
//            this.userName = userName;
//            this.password = password;
//        }
//    }
//
//    class SignupPackage{
//        private String username;
//        private String password;
//        private String firstName;
//        private String lastName;
//        private int adminRequestLevel;
//
//        public SignupPackage(String username, String password, String firstName, String lastName, int adminRequestLevel) {
//            this.username = username;
//            this.password = password;
//            this.firstName = firstName;
//            this.lastName = lastName;
//            this.adminRequestLevel = adminRequestLevel;
//        }
//    }
//
//    class locationPackage{
//        private double latitude;
//        private double longitude;
//        private int userID;
//
//        public locationPackage(double latitude, double longitude, int userID) {
//            this.latitude = latitude;
//            this.longitude = longitude;
//            this.userID = userID;
//        }
//    }
//
//    class taskListPackage{
//        private double taskLatitude;
//        private double taskLongitude;
//        private String taskName;
//        private String teskDescription;
//
//        public taskListPackage(double taskLatitude, double taskLongitude, String taskName, String teskDescription) {
//            this.taskLatitude = taskLatitude;
//            this.taskLongitude = taskLongitude;
//            this.taskName = taskName;
//            this.teskDescription = teskDescription;
//        }
//    }
////---Quarantine---

    public void buildJSON(JSONUtil info){
        Gson gson = new Gson();
        gson.toJson(info);
    }

    public void sendJSON(){
        //send to server
    }

    public void receiveJSON(){
        //receive from server
    }

    public void debugJson(){
        //print statements
    }
}
