package com.example.myapplication3


import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.myapplication3.AttachmentActivity
import com.example.myapplication3.CamersActivity

class SettingsActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)

        setupSettingsClickListeners()
        setupNavigationListeners()
    }

    private fun setupSettingsClickListeners() {
        findViewById<android.view.View>(R.id.attachComplex).setOnClickListener {
            val intent = Intent(this, AttachmentActivity::class.java)
            startActivity(intent)
        }

        findViewById<android.view.View>(R.id.confirmEmail).setOnClickListener {
            Toast.makeText(this, "Подтверждение почты - функция в разработке", Toast.LENGTH_SHORT).show()
            // TODO: Добавить переход на активность подтверждения почты
        }

        findViewById<android.view.View>(R.id.changePhone).setOnClickListener {
            Toast.makeText(this, "Смена номера телефона - функция в разработке", Toast.LENGTH_SHORT).show()
            // TODO: Добавить переход на активность смены номера телефона
        }

        findViewById<android.view.View>(R.id.changePassword).setOnClickListener {
            Toast.makeText(this, "Смена пароля - функция в разработке", Toast.LENGTH_SHORT).show()
            // TODO: Добавить переход на активность смены пароля
        }

        findViewById<android.view.View>(R.id.addVehicle).setOnClickListener {
            Toast.makeText(this, "Добавление транспорта - функция в разработке", Toast.LENGTH_SHORT).show()
            // TODO: Добавить переход на активность добавления транспорта
        }
    }

    private fun setupNavigationListeners() {
        findViewById<android.view.View>(R.id.navHome).setOnClickListener {
            val intent = Intent(this, CamersActivity::class.java)
            startActivity(intent)
        }
        findViewById<android.view.View>(R.id.navProfile).setOnClickListener {
            val intent = Intent(this, MessagesActivity::class.java)
            startActivity(intent)
        }

        findViewById<android.view.View>(R.id.navSettings).setOnClickListener {
        }
    }
}