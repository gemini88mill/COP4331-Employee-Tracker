package com.example.raphael.bigbrother;

import android.support.constraint.ConstraintLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
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
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tasks);

        // Get tasks
        tasks = new ArrayList<Task>();
        getTasks();

        // Populate view
        // TODO(timp): Employee-task route does not exist yet
        LinearLayout layout = (LinearLayout) findViewById(R.id.taskLayout);

        for (Task task : tasks) {
            TextView textLabel = new TextView(this);
            textLabel.setText(task.name);
            layout.addView(textLabel);
            TextView description = new TextView(this);
            description.setText(task.description);
            layout.addView(description);
            Button completeButton = new Button(this);
            completeButton.setText(task.done);
            layout.addView(completeButton);
            TextView dueDate = new TextView(this);
            dueDate.setText(task.due);
            layout.addView(dueDate);
        }
    }

    private void getTasks() {
        // Placeholder
        Task task = new Task("Task 1", "I'm a placeholder task", "2017-12-01", "false");
        tasks.add(task);

        // TODO(timp): Once route is created, update the URL
        String url = getResources().getString(R.string.tasksUrl);

        // Create body of JSON object to send to Web server
        final JSONObject body = new JSONObject();
        try {
            body.put("username", ConnectionHandler.username);
        } catch (JSONException e) {
            // TODO: Fallback if username or password cannot be used to create JSON Object
        }

        // Create a request
        JsonObjectRequest jsObjRequest = new JsonObjectRequest
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
        ConnectionHandler.getInstance(this).addToRequestQueue(jsObjRequest);
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

