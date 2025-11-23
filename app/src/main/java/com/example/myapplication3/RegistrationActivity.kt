package com.example.myapplication3

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.myapplication.databinding.ActivityRegistrationBinding
import com.example.myapplication.manager.AppStatusManager
import com.example.myapplication.model.Application
import com.example.myapplication.repository.ApplicationRepository
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.UserProfileChangeRequest

class RegistrationActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegistrationBinding
    private lateinit var appStatusManager: AppStatusManager
    private lateinit var applicationRepository: ApplicationRepository
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegistrationBinding.inflate(layoutInflater)
        setContentView(binding.root)

        appStatusManager = AppStatusManager(this)
        applicationRepository = ApplicationRepository()
        auth = FirebaseAuth.getInstance()

        setupButtonListeners()
    }

    private fun setupButtonListeners() {
        // Кнопка "Создать через Госуслуги" - ничего не делает
        binding.gosuslugiButton.setOnClickListener {
            Toast.makeText(this, "Функция в разработке", Toast.LENGTH_SHORT).show()
        }

        // Кнопка "Войти в аккаунт" - это РЕГИСТРАЦИЯ (вся логика здесь)
        binding.registrationButton.setOnClickListener {
            registerUser()
        }
    }

    private fun registerUser() {
        val name = binding.firstNameInput.text.toString().trim()
        val phoneEmail = binding.phoneEmailInput.text.toString().trim()
        val password = binding.passwordInput.text.toString().trim()
        val confirmPassword = binding.confirmPasswordInput.text.toString().trim()
        val complexCode = binding.codeInput.text.toString().trim()
        val universalPassword = binding.universalPasswordInput.text.toString().trim()
        val carNumber = binding.carNumberInput.text.toString().trim()

        // Валидация полей
        if (!validateInput(name, phoneEmail, password, confirmPassword, complexCode, universalPassword, carNumber)) {
            return
        }

        // Создаем пользователя в Firebase Auth
        auth.createUserWithEmailAndPassword(phoneEmail, password)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    // Обновляем профиль пользователя с именем
                    val user = auth.currentUser
                    val profileUpdates = UserProfileChangeRequest.Builder()
                        .setDisplayName(name)
                        .build()

                    user?.updateProfile(profileUpdates)?.addOnCompleteListener { profileTask ->
                        if (profileTask.isSuccessful) {
                            // Сохраняем заявку в Firestore
                            submitApplication(
                                name = name,
                                phoneEmail = phoneEmail,
                                password = password,
                                complexCode = complexCode,
                                universalPassword = universalPassword,
                                carNumber = carNumber,
                                userId = user.uid
                            )
                        } else {
                            Toast.makeText(
                                this,
                                "Ошибка обновления профиля",
                                Toast.LENGTH_SHORT
                            ).show()
                        }
                    }
                } else {
                    Toast.makeText(
                        this,
                        "Ошибка регистрации: ${task.exception?.message}",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
    }

    private fun validateInput(
        name: String,
        phoneEmail: String,
        password: String,
        confirmPassword: String,
        complexCode: String,
        universalPassword: String,
        carNumber: String
    ): Boolean {
        // Очищаем предыдущие ошибки
        clearErrors()

        var isValid = true

        if (name.isEmpty()) {
            binding.firstNameLayout.error = "Введите имя"
            isValid = false
        }

        if (phoneEmail.isEmpty()) {
            binding.phoneEmailLayout.error = "Введите email"
            isValid = false
        } else if (!android.util.Patterns.EMAIL_ADDRESS.matcher(phoneEmail).matches()) {
            binding.phoneEmailLayout.error = "Введите корректный email"
            isValid = false
        }

        if (password.isEmpty()) {
            binding.passwordLayout.error = "Введите пароль"
            isValid = false
        } else if (password.length < 6) {
            binding.passwordLayout.error = "Пароль должен содержать минимум 6 символов"
            isValid = false
        }

        if (confirmPassword.isEmpty()) {
            binding.confirmPasswordLayout.error = "Подтвердите пароль"
            isValid = false
        } else if (password != confirmPassword) {
            binding.confirmPasswordLayout.error = "Пароли не совпадают"
            isValid = false
        }

        if (complexCode.isEmpty()) {
            binding.codeLayout.error = "Введите код ЖК"
            isValid = false
        }

        if (universalPassword.isEmpty()) {
            binding.universalPasswordLayout.error = "Введите универсальный пароль"
            isValid = false
        }

        if (carNumber.isEmpty()) {
            binding.carNumberLayout.error = "Введите номер автомобиля"
            isValid = false
        }

        return isValid
    }

    private fun clearErrors() {
        binding.firstNameLayout.error = null
        binding.phoneEmailLayout.error = null
        binding.passwordLayout.error = null
        binding.confirmPasswordLayout.error = null
        binding.codeLayout.error = null
        binding.universalPasswordLayout.error = null
        binding.carNumberLayout.error = null
    }

    private fun submitApplication(
        name: String,
        phoneEmail: String,
        password: String,
        complexCode: String,
        universalPassword: String,
        carNumber: String,
        userId: String
    ) {
        val application = Application(
            userId = userId,
            name = name,
            phone = phoneEmail,
            email = phoneEmail,
            password = password,
            complexCode = complexCode,
            carNumber = carNumber,
            status = "pending"
        )

        applicationRepository.submitApplication(application) { success, applicationId ->
            if (success && applicationId != null) {
                // Сохраняем ID заявки для отслеживания статуса
                appStatusManager.saveApplicationId(applicationId)
                appStatusManager.setUserId(userId)

                Toast.makeText(
                    this,
                    "Заявка отправлена на модерацию! Ожидайте одобрения.",
                    Toast.LENGTH_LONG
                ).show()

                // Переходим на главный экран
                startActivity(Intent(this, MainActivity::class.java))
                finish()
            } else {
                Toast.makeText(
                    this,
                    "Ошибка отправки заявки. Попробуйте снова.",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }
}