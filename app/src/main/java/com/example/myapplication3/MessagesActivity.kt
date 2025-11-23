package com.example.myapplication3

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.myapplication3.AttachmentActivity
import com.example.myapplication3.CamersActivity

class MessagesActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_messages)

        setupClickListeners()
        setupNavigationListeners()
    }

    private fun setupClickListeners() {
        val attachText = findViewById<android.widget.TextView>(R.id.attachText)
        attachText.setOnClickListener {
            val intent = Intent(this, AttachmentActivity::class.java)
            startActivity(intent)
        }
    }

    private fun setupNavigationListeners() {
        findViewById<android.view.View>(R.id.navHome).setOnClickListener {
            val intent = Intent(this, CamersActivity::class.java)
            startActivity(intent)
        }

        findViewById<android.view.View>(R.id.navProfile).setOnClickListener {
        }

        findViewById<android.view.View>(R.id.navSettings).setOnClickListener {
            val intent = Intent(this, SettingsActivity::class.java)
            startActivity(intent)
        }
    }
}