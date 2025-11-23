package com.example.myapplication3

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.myapplication3.MessagesActivity
import com.example.myapplication3.SettingsActivity

class CamersActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_camers)

        setupNavigationListeners()
    }

    private fun setupNavigationListeners() {
        // Навигация - Камеры (уже на этой странице)
        findViewById<View>(R.id.navHome).setOnClickListener {
            // Уже на этой странице, ничего не делаем или можно обновить
        }

        // Навигация - Сообщения
        findViewById<View>(R.id.navProfile).setOnClickListener {
            val intent = Intent(this, MessagesActivity::class.java)
            startActivity(intent)
        }

        // Навигация - Настройки
        findViewById<View>(R.id.navSettings).setOnClickListener {
            val intent = Intent(this, SettingsActivity::class.java)
            startActivity(intent)
        }
    }
}