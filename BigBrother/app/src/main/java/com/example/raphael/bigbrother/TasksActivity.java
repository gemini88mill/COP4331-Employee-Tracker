package com.example.raphael.bigbrother;

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
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.Date;

public class TasksActivity extends AppCompatActivity {
    private ArrayList<Task> tasks;
    JsonObjectRequest jsObjRequest;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tasks);

        // Get tasks
        tasks = new ArrayList<Task>();
        try {
            getTasks();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        System.out.println(tasks.toString());

        // Populate view
        LinearLayout layout = findViewById(R.id.taskLayout);

        for (Task task : tasks) {
            TextView textLabel = new TextView(this);
            textLabel.setText(task.name);
            layout.addView(textLabel);
            TextView description = new TextView(this);
            description.setText(task.description);
            layout.addView(description);
            Button completeButton = new Button(this);
            completeButton.setText(task.done);
//            completeButton.setOnClickListener(new View.OnClickListener() {
//                @Override
//                public void onClick(View v) {
//                    String url = getResources().getString(R.string.tasksUrl);
//                    // Create body of JSON object to send to Web server
//                    JSONObject body = new JSONObject();
//                    try {
//                        body.put("_id", "sfdsf");
//                    } catch (JSONException e) {
//                        e.printStackTrace();
//                    }
//
//                    // Create a request
//                    jsObjRequest = new JsonObjectRequest
//                            (Request.Method.POST, url, body, new Response.Listener<JSONObject>() {
//                                @Override
//                                public void onResponse(JSONObject response) {
//                                    // Successful update of task
//                                }
//                            }, new Response.ErrorListener() {
//                                @Override
//                                public void onErrorResponse(VolleyError error) {}
//                            });
//
//                    // Make the request (add it to the request queue)
//                    ConnectionHandler.getInstance(this).addToRequestQueue(jsObjRequest);
//                }
//            });
            layout.addView(completeButton);
            TextView dueDate = new TextView(this);
            dueDate.setText(task.due);
            layout.addView(dueDate);
        }
    }

    private void getTasks() throws JSONException{
        // Get all of the tasks associated with the user
        String url = getResources().getString(R.string.tasksUrl);
        final ArrayList<String> taskIds = new ArrayList<String>();

        // Create body of JSON object to send to Web server
        JSONObject body = new JSONObject();
        body.put("username", ConnectionHandler.user.username);

        // Create a request
        jsObjRequest = new JsonObjectRequest
                (Request.Method.POST, url, body, new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        // Successful fetch of tasks
                        try {
                            taskIds.add(response.getString("_id"));
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {}
                });

        // Make the request (add it to the request queue)
        ConnectionHandler.getInstance(this).addToRequestQueue(jsObjRequest);


        // Get information on the tasks
        for (String id : taskIds) {
            url = getResources().getString(R.string.tasksUrl) + "/" + id;
            jsObjRequest = new JsonObjectRequest
                    (Request.Method.POST, url, body, new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            // Successful fetch of tasks
                            String name = new String();
                            String description = new String();
                            String due = new String();
                            String done = new String();
                            try {
                                name = response.getString("name");
                                description = response.getString("description");
                                due = response.getString("due");
                                done = response.getString("done");
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                            Task tmpTask = new Task(name, description, due, done);
                            tasks.add(tmpTask);
                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {}
                    });

            // Make the request (add it to the request queue)
            ConnectionHandler.getInstance(this).addToRequestQueue(jsObjRequest);        }
    }

    class Task {
        String name;
        String description;
        String due;
        String done;

        public Task(String name, String description, String due, String done) {
            this.name = name;
            this.description = description;
            this.due = due;
            this.done = done;
        }
    }

}

