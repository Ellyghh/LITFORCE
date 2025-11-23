package com.example.myapplication.manager

import android.content.Context
import android.content.SharedPreferences

class AppStatusManager(private val context: Context) {
    private val prefs: SharedPreferences = context.getSharedPreferences("app_status", Context.MODE_PRIVATE)

    fun saveApplicationId(applicationId: String) {
        prefs.edit().putString("application_id", applicationId).apply()
    }

    fun getApplicationId(): String? {
        return prefs.getString("application_id", null)
    }

    fun setUserApproved(isApproved: Boolean) {
        prefs.edit().putBoolean("user_approved", isApproved).apply()
    }

    fun isUserApproved(): Boolean {
        return prefs.getBoolean("user_approved", false)
    }

    fun setUserId(userId: String) {
        prefs.edit().putString("user_id", userId).apply()
    }

    fun getUserId(): String? {
        return prefs.getString("user_id", null)
    }
}