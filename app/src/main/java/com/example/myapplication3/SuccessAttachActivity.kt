package com.example.myapplication3


import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.myapplication3.CamersActivity

class SuccessAttachmentActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_success_attach)

        setupClickListeners()
        setupNavigationListeners()
    }

    private fun setupClickListeners() {
        // Кнопка возврата на главный экран
        findViewById<android.view.View>(R.id.backToMain).setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish()
        }
    }

    private fun setupNavigationListeners() {
        // Навигация - Камеры
        findViewById<android.view.View>(R.id.navHome).setOnClickListener {
            val intent = Intent(this, CamersActivity::class.java)
            startActivity(intent)
        }

        // Навигация - Сообщения
        findViewById<android.view.View>(R.id.navProfile).setOnClickListener {
            val intent = Intent(this, MessagesActivity::class.java)
            startActivity(intent)
        }

        // Навигация - Настройки
        findViewById<android.view.View>(R.id.navSettings).setOnClickListener {
            val intent = Intent(this, SettingsActivity::class.java)
            startActivity(intent)
        }
    }
}