package com.example.myapplication3

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.text.SpannableString
import android.text.method.LinkMovementMethod
import android.text.style.ClickableSpan
import android.text.style.ForegroundColorSpan
import android.view.View
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        setupClickableText()
        setupButtonListeners()
        setupNavigationListeners()
    }

    private fun setupClickableText() {
        val textView = findViewById<TextView>(R.id.welcomeText)
        val fullText = getString(R.string.welcome_text)
        val spannable = SpannableString(fullText)

        val linkText = "прикрепиться к ЖК"
        val startIndex = fullText.indexOf(linkText)

        if (startIndex != -1) {
            spannable.setSpan(
                ForegroundColorSpan(ContextCompat.getColor(this, R.color.blue)),
                startIndex,
                startIndex + linkText.length,
                SpannableString.SPAN_EXCLUSIVE_EXCLUSIVE
            )

            val clickableSpan = object : ClickableSpan() {
                override fun onClick(widget: View) {
                    val intent = Intent(this@MainActivity, AttachmentActivity::class.java)
                    startActivity(intent)
                }

                override fun updateDrawState(ds: android.text.TextPaint) {
                    ds.isUnderlineText = false
                }
            }

            spannable.setSpan(
                clickableSpan,
                startIndex,
                startIndex + linkText.length,
                SpannableString.SPAN_EXCLUSIVE_EXCLUSIVE
            )
        }

        textView.text = spannable
        textView.movementMethod = LinkMovementMethod.getInstance()
        textView.highlightColor = Color.TRANSPARENT
    }

    private fun setupButtonListeners() {
        findViewById<View>(R.id.btnApplication).setOnClickListener {
            val intent = Intent(this, ApplicationActivity::class.java)
            startActivity(intent)
        }

        findViewById<View>(R.id.btnHistory).setOnClickListener {
            val intent = Intent(this, HistoryActivity::class.java)
            startActivity(intent)
        }

        findViewById<View>(R.id.btnPasses).setOnClickListener {
            val intent = Intent(this, PassesActivity::class.java)
            startActivity(intent)
        }
    }

    private fun setupNavigationListeners() {
        findViewById<View>(R.id.navHome).setOnClickListener {
            val intent = Intent(this, CamersActivity::class.java)
            startActivity(intent)
        }

        findViewById<View>(R.id.navProfile).setOnClickListener {
            val intent = Intent(this, MessagesActivity::class.java)
            startActivity(intent)
        }

        findViewById<View>(R.id.navSettings).setOnClickListener {
            val intent = Intent(this, SettingsActivity::class.java)
            startActivity(intent)
        }
    }
}