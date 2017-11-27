package com.example.raphael.bigbrother;

import android.app.Activity;
import android.graphics.Color;
import android.os.AsyncTask;
import android.support.constraint.ConstraintLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.google.gson.JsonObject;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.Date;

public class TasksActivity extends AppCompatActivity {
    private Activity thisActivity;
    private LinearLayout layout;
    private ArrayList<Task> tasks;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tasks);
        thisActivity = this;
        layout = findViewById(R.id.taskLayout);
        new MyAsyncTask().execute();
    }

    class Task {
        public String id;
        public String name;
        public String description;
        public String due;
        public String done;

        public Task(String id, String name, String description, String due, String done) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.due = due;
            this.done = done;
        }

        public Task(JSONObject obj) throws JSONException {
            this.id = obj.getString("_id");
            this.name = obj.getString("name");
            this.description = obj.getString("description");
            this.due = obj.getString("due");
            this.done = obj.getString("done");
        }

        @Override
        public String toString() {
            return "Task<" + id + ", " + name + ", " + description + ", " + due + ", " + done + ">";
        }
    }


    private class MyAsyncTask extends AsyncTask<Void, Task, ArrayList<Task>> {

        //We can attach any object to the async class for result
        @Override
        protected ArrayList<Task> doInBackground(Void... params) {
            super.onPreExecute();

            // Get information on the tasks
            String url = getResources().getString(R.string.tasksUrl);
            JSONObject body = new JSONObject();
            try {
                body.put("username", ConnectionHandler.user.username);
            } catch (JSONException e) {
                e.printStackTrace();
            }

            tasks = new ArrayList<>();

            JsonObjectRequest jsObjRequest = new JsonObjectRequest
                    (Request.Method.POST, url, body, new Response.Listener<JSONObject>() {

                        @Override
                        public void onResponse(JSONObject response) {
                            // Successful fetch of tasks
                            // So I got back an JSON object with one field--list
                            // Get the array in the list field
                            try {
                                JSONArray list = response.getJSONArray("list");
                                // Loop through each of the objects in the list field
                                if (list != null) {
                                    int len = list.length();
                                    for (int i = 0; i < len; i++) {
                                        tasks.add(new Task(list.getJSONObject(i)));
                                        publishProgress(new Task(list.getJSONObject(i)));
                                    }

                                }
                                System.out.println("Why do I only exist here? " + tasks.toString());
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }

                        }
                    }, new Response.ErrorListener() {

                        @Override
                        public void onErrorResponse(VolleyError error) {
                        }
                    });

            // Make the request (add it to the request queue)
            ConnectionHandler.getInstance(thisActivity).addToRequestQueue(jsObjRequest);
            return tasks;
        }

        @Override
        protected void onProgressUpdate(Task... values) {
            final Task tsk = values[0];
            System.out.println("Create a task: " + tsk.toString());
            TextView textLabel = new TextView(thisActivity);
            textLabel.setTextAppearance(thisActivity, R.style.TextAppearance_AppCompat_Large);
            textLabel.setText("\n" + tsk.name);
            TextView description = new TextView(thisActivity);
            description.setText("Description: " + tsk.description);

                final Button completeButton = new Button(thisActivity);
                if (tsk.done.equals("true")) {
                    completeButton.setText("Task completed");
                    completeButton.setEnabled(false);
                } else {
                    completeButton.setText("Mark complete");
                    completeButton.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            String url = getResources().getString(R.string.tasksUrl) + "/" + tsk.id;
                            // Create body of JSON object to send to Web server
//                        JSONObject body = new JSONObject();
//                        try {
//                            body.put("_id", tsk.id);
//                        } catch (JSONException e) {
//                            e.printStackTrace();
//                        }

                            // Create a request
                            JsonObjectRequest jsObjRequest = new JsonObjectRequest
                                    (Request.Method.PUT, url, null, new Response.Listener<JSONObject>() {
                                        @Override
                                        public void onResponse(JSONObject response) {
                                            // Successful update of task
                                            completeButton.setText("Task completed");
                                            completeButton.setEnabled(false);
                                        }
                                    }, new Response.ErrorListener() {
                                        @Override
                                        public void onErrorResponse(VolleyError error) {
                                        }
                                    });

                            // Make the request (add it to the request queue)
                            ConnectionHandler.getInstance(thisActivity).addToRequestQueue(jsObjRequest);
                        }
                    });
                }


            String status = (tsk.due.equals("true")) ? new String("Completed") : new String("Incomplete");
            TextView statusLabel = new TextView(thisActivity);
            statusLabel.setText("Status: " + status);
            TextView dueDate = new TextView(thisActivity);
            dueDate.setText("Due date: " + tsk.due.substring(0,10));


            layout.addView(textLabel);
            layout.addView(dueDate);
//            layout.addView(statusLabel);
            layout.addView(description);
            layout.addView(completeButton);
        }

        @Override
        protected void onPostExecute(ArrayList<Task> list) {
            super.onPostExecute(list);

        }
    }
}


