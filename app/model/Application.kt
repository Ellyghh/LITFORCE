package com.example.myapplication.model

data class Application(
    val id: String = "",
    val userId: String = "",
    val name: String = "",
    val phone: String = "",
    val email: String = "",
    val password: String = "",
    val complexCode: String = "",
    val carNumber: String = "",
    val status: String = "pending", // pending, approved, rejected
    val createdAt: Long = System.currentTimeMillis()
)