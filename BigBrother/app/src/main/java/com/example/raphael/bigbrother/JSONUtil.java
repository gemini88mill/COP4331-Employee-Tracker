package com.example.raphael.bigbrother;

/**
 * Created by raphael on 11/6/17.
 */

import android.os.AsyncTask;
import android.util.Pair;
import com.google.gson.*;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

public class JSONUtil{

    /**
     * Coordinates Class
     *
     * private class that allows for a packaged latitude, longitude set.
     */
    private class Coordinates{

        //private primitives
        private double latitude;
        private double longitude;

        /**
         * Constructor
         * @param latitude double
         * @param longitude double
         */
        public Coordinates(double latitude, double longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
        }
    }

    //primitives
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

    //URL variables and constants
    private static final String USER_AGENT = "Mozilla/5.0";
    private static final String URL_DEST = "http://192.168.86.39:3000/api/user";

    //Gson global
    private Gson gson;

    /**
     * Constructor for login activity
     * @param username String
     * @param password String
     */
    public JSONUtil(String username, String password) {
        this.username = username;
        this.password = password;
    }

    /**
     * Constructor for sign up activity
     * @param username String
     * @param password String
     * @param userFirstName String
     * @param userLastName String
     */
    public JSONUtil(String username, String password, String userFirstName, String userLastName) {
        this.username = username;
        this.password = password;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
    }

    /**
     * Constructor for Maps location
     * @param username String
     * @param userLocation Coordinates
     */
    public JSONUtil(String username, Coordinates userLocation) {
        this.username = username;
        this.userLocation = userLocation;
    }

    /**
     * Constructor for task map and list
     * @param userTaskLocation List
     * @param taskName String
     * @param taskDescription String
     */
    public JSONUtil(List<Coordinates> userTaskLocation, String taskName, String taskDescription) {
        this.userTaskLocation = userTaskLocation;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
    }

    public void buildJSON(JSONUtil info){
        gson = new Gson();
        gson.toJson(info);
    }

    public String sendJSON() {
        //send to server
        return "";
    }

    public void receiveJSON(Gson gson, String type){
        //receive from server

    }

    public void debugJson(){
        //print statements
    }
}
