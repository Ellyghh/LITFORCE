package com.example.myapplication3

import android.content.Intent
import android.os.Bundle
import android.util.Patterns
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.textfield.TextInputLayout
import com.google.firebase.auth.FirebaseAuth

class LoginActivitySimple : AppCompatActivity() {

    private lateinit var auth: FirebaseAuth
    private lateinit var emailInput: EditText
    private lateinit var passwordInput: EditText
    private lateinit var emailLayout: TextInputLayout
    private lateinit var passwordLayout: TextInputLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        auth = FirebaseAuth.getInstance()

        // Находим элементы по ID
        emailInput = findViewById(R.id.emailInput)
        passwordInput = findViewById(R.id.passwordInput)
        emailLayout = findViewById(R.id.emailLayout)
        passwordLayout = findViewById(R.id.passwordLayout)

        val loginButton: Button = findViewById(R.id.loginButton)
        val createAccountButton: Button = findViewById(R.id.createAccountButton)
        val gosuslugiButton: Button = findViewById(R.id.gosuslugiButton)

        loginButton.setOnClickListener {
            loginUser()
        }

        createAccountButton.setOnClickListener {
            startActivity(Intent(this, RegistrationActivity::class.java))
        }

        gosuslugiButton.setOnClickListener {
            Toast.makeText(this, "Функция в разработке", Toast.LENGTH_SHORT).show()
        }

        checkCurrentUser()
    }

    private fun checkCurrentUser() {
        val currentUser = auth.currentUser
        if (currentUser != null) {
            updateUI()
        }
    }

    private fun updateUI() {
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }

    private fun loginUser() {
        val email = emailInput.text.toString().trim()
        val password = passwordInput.text.toString().trim()

        if (!validateInput(email, password)) {
            return
        }

        auth.signInWithEmailAndPassword(email, password)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    Toast.makeText(this, "Вход выполнен успешно!", Toast.LENGTH_SHORT).show()
                    updateUI()
                } else {
                    Toast.makeText(
                        this,
                        "Ошибка входа: ${task.exception?.message}",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
    }

    private fun validateInput(email: String, password: String): Boolean {
        clearErrors()
        var isValid = true

        if (email.isEmpty()) {
            emailLayout.error = "Введите email"
            isValid = false
        } else if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            emailLayout.error = "Введите корректный email"
            isValid = false
        }

        if (password.isEmpty()) {
            passwordLayout.error = "Введите пароль"
            isValid = false
        } else if (password.length < 6) {
            passwordLayout.error = "Пароль должен содержать минимум 6 символов"
            isValid = false
        }

        return isValid
    }

    private fun clearErrors() {
        emailLayout.error = null
        passwordLayout.error = null
    }
}