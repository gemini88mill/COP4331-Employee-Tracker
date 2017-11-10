package com.example.raphael.bigbrother;

/**
 * Created by raphael on 11/6/17.
 */

import com.google.gson.*;

public class JSONUtil {

    class LoginPackage{
        private String userName;
        private String password;
    }

    class SignupPackage{
        private String username;
        private String password;
        private String firstName;
        private String lastName;
        private int adminRequestLevel;
    }

    class locationPackage{
        private double latitude;
        private double longitude;
        private int userID;
    }

    class taskListPackage{
        private double taskLatitude;
        private double taskLongitude;
        private String taskName;
        private String teskDescription;
    }

    public void buildJSON(){
        Gson gson = new Gson();
    }

    public void collectJSON(){

    }

    public void receiveJSON(){

    }
}
