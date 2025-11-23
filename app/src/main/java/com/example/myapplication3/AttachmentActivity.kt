package com.example.myapplication3

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.ScrollView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout
import java.util.regex.Pattern

class AttachmentActivity : AppCompatActivity() {

    private lateinit var codeInput: TextInputEditText
    private lateinit var passwordInput: TextInputEditText
    private lateinit var carNumberInput: TextInputEditText
    private lateinit var codeLayout: TextInputLayout
    private lateinit var passwordLayout: TextInputLayout
    private lateinit var carNumberLayout: TextInputLayout
    private lateinit var confirmButton: Button
    private lateinit var scrollView: ScrollView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_attachment)

        initializeViews()
        setupButtonListeners()
        setupNavigationListeners()
        setupAutoScroll()
    }

    private fun initializeViews() {
        codeInput = findViewById(R.id.codeInput)
        passwordInput = findViewById(R.id.passwordInput)
        carNumberInput = findViewById(R.id.carNumberInput)
        codeLayout = findViewById(R.id.codeLayout)
        passwordLayout = findViewById(R.id.passwordLayout)
        carNumberLayout = findViewById(R.id.carNumberLayout)
        confirmButton = findViewById(R.id.confirmButton)
        scrollView = findViewById(R.id.scrollView)
    }

    private fun setupAutoScroll() {
        val fields = listOf(codeInput, passwordInput, carNumberInput)

        fields.forEach { field ->
            field.setOnFocusChangeListener { _, hasFocus ->
                if (hasFocus) {
                    scrollView.postDelayed({
                        val location = IntArray(2)
                        field.getLocationOnScreen(location)
                        val scrollY = location[1] - 200
                        scrollView.smoothScrollTo(0, scrollY)
                    }, 200)
                }
            }
        }
    }

    private fun setupButtonListeners() {
        confirmButton.setOnClickListener {
            if (validateForm()) {
                processAttachment()
            }
        }
    }

    private fun validateForm(): Boolean {
        var isValid = true

        // Валидация кода
        val code = codeInput.text.toString().trim()
        if (code.isEmpty()) {
            codeLayout.error = "Введите код ЖК"
            isValid = false
        } else if (code.length != 6) {
            codeLayout.error = "Код должен содержать 6 цифр"
            isValid = false
        } else {
            codeLayout.error = null
        }

        // Валидация пароля
        val password = passwordInput.text.toString().trim()
        if (password.isEmpty()) {
            passwordLayout.error = "Введите пароль ЖК"
            isValid = false
        } else if (password.length < 4) {
            passwordLayout.error = "Пароль должен содержать минимум 4 символа"
            isValid = false
        } else {
            passwordLayout.error = null
        }

        // Валидация номера автомобиля
        val carNumber = carNumberInput.text.toString().trim()
        if (carNumber.isEmpty()) {
            carNumberLayout.error = "Введите номер автомобиля"
            isValid = false
        } else if (!isValidCarNumber(carNumber)) {
            carNumberLayout.error = "Неверный формат номера (пример: А123БВ77)"
            isValid = false
        } else {
            carNumberLayout.error = null
        }

        return isValid
    }

    private fun isValidCarNumber(carNumber: String): Boolean {
        val pattern = Pattern.compile("^[АВЕКМНОРСТУХ]\\d{3}[АВЕКМНОРСТУХ]{2}\\d{2,3}$")
        return pattern.matcher(carNumber).matches()
    }

    private fun processAttachment() {
        // УБРАЛ НЕНУЖНЫЕ ПЕРЕМЕННЫЕ - они уже проверены в validateForm()
        Toast.makeText(this, "Данные отправлены на проверку", Toast.LENGTH_SHORT).show()

        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
        finish()
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