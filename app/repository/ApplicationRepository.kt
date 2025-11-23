package com.example.myapplication.repository

import com.example.myapplication.model.Application
import com.example.myapplication.model.VisitApplication
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ListenerRegistration
import com.google.firebase.firestore.Query

class ApplicationRepository {
    private val db = FirebaseFirestore.getInstance()

    // Коллекции
    private val applicationsCollection = db.collection("applications")
    private val visitApplicationsCollection = db.collection("visit_applications")

    // ========== ОСНОВНЫЕ ЗАЯВКИ (Application) ==========

    fun submitApplication(application: Application, onResult: (Boolean, String?) -> Unit) {
        applicationsCollection.add(application)
            .addOnSuccessListener { documentReference ->
                onResult(true, documentReference.id)
            }
            .addOnFailureListener { e ->
                onResult(false, e.message)
            }
    }

    fun getApplicationById(applicationId: String, onResult: (Application?) -> Unit) {
        applicationsCollection.document(applicationId).get()
            .addOnSuccessListener { document ->
                if (document.exists()) {
                    val application = document.toObject(Application::class.java)
                    onResult(application)
                } else {
                    onResult(null)
                }
            }
            .addOnFailureListener {
                onResult(null)
            }
    }

    fun getApplicationByUserId(userId: String, onResult: (Application?) -> Unit) {
        applicationsCollection.whereEqualTo("userId", userId)
            .get()
            .addOnSuccessListener { documents ->
                if (!documents.isEmpty) {
                    val application = documents.documents[0].toObject(Application::class.java)
                    onResult(application)
                } else {
                    onResult(null)
                }
            }
            .addOnFailureListener {
                onResult(null)
            }
    }

    fun getAllUserApplications(userId: String, onResult: (List<Application>) -> Unit) {
        applicationsCollection
            .whereEqualTo("userId", userId)
            .orderBy("createdAt", Query.Direction.DESCENDING)
            .get()
            .addOnSuccessListener { documents ->
                val applications = documents.toObjects(Application::class.java)
                onResult(applications)
            }
            .addOnFailureListener {
                onResult(emptyList())
            }
    }

    fun listenForApplicationChanges(applicationId: String, onStatusChange: (String) -> Unit): ListenerRegistration {
        return applicationsCollection.document(applicationId)
            .addSnapshotListener { snapshot, _ ->
                snapshot?.let { document ->
                    val application = document.toObject(Application::class.java)
                    application?.status?.let { status ->
                        onStatusChange(status)
                    }
                }
            }
    }

    fun updateApplicationStatus(applicationId: String, status: String, onResult: (Boolean) -> Unit) {
        applicationsCollection.document(applicationId)
            .update("status", status)
            .addOnSuccessListener {
                onResult(true)
            }
            .addOnFailureListener {
                onResult(false)
            }
    }

    // ========== ЗАЯВКИ НА ПОСЕЩЕНИЕ (VisitApplication) ==========

    fun submitVisitApplication(application: VisitApplication, onResult: (Boolean, String?) -> Unit) {
        visitApplicationsCollection.add(application)
            .addOnSuccessListener { documentReference ->
                onResult(true, documentReference.id)
            }
            .addOnFailureListener { e ->
                onResult(false, e.message)
            }
    }

    fun getVisitApplicationById(applicationId: String, onResult: (VisitApplication?) -> Unit) {
        visitApplicationsCollection.document(applicationId).get()
            .addOnSuccessListener { document ->
                if (document.exists()) {
                    val application = document.toObject(VisitApplication::class.java)
                    onResult(application)
                } else {
                    onResult(null)
                }
            }
            .addOnFailureListener {
                onResult(null)
            }
    }

    fun getAllUserVisitApplications(userId: String, onResult: (List<VisitApplication>) -> Unit) {
        visitApplicationsCollection
            .whereEqualTo("userId", userId)
            .orderBy("createdAt", Query.Direction.DESCENDING)
            .get()
            .addOnSuccessListener { documents ->
                val applications = documents.toObjects(VisitApplication::class.java)
                onResult(applications)
            }
            .addOnFailureListener {
                onResult(emptyList())
            }
    }

    fun getAllVisitApplications(onResult: (List<VisitApplication>) -> Unit) {
        visitApplicationsCollection
            .orderBy("createdAt", Query.Direction.DESCENDING)
            .get()
            .addOnSuccessListener { documents ->
                val applications = documents.toObjects(VisitApplication::class.java)
                onResult(applications)
            }
            .addOnFailureListener {
                onResult(emptyList())
            }
    }

    fun listenForVisitApplicationChanges(applicationId: String, onStatusChange: (String) -> Unit): ListenerRegistration {
        return visitApplicationsCollection.document(applicationId)
            .addSnapshotListener { snapshot, _ ->
                snapshot?.let { document ->
                    val application = document.toObject(VisitApplication::class.java)
                    application?.status?.let { status ->
                        onStatusChange(status)
                    }
                }
            }
    }

    fun updateVisitApplicationStatus(applicationId: String, status: String, onResult: (Boolean) -> Unit) {
        visitApplicationsCollection.document(applicationId)
            .update("status", status)
            .addOnSuccessListener {
                onResult(true)
            }
            .addOnFailureListener {
                onResult(false)
            }
    }

    fun deleteVisitApplication(applicationId: String, onResult: (Boolean) -> Unit) {
        visitApplicationsCollection.document(applicationId)
            .delete()
            .addOnSuccessListener {
                onResult(true)
            }
            .addOnFailureListener {
                onResult(false)
            }
    }

    // ========== ОБЩИЕ МЕТОДЫ ==========

    fun getUserApplicationsCount(userId: String, onResult: (Int) -> Unit) {
        applicationsCollection
            .whereEqualTo("userId", userId)
            .get()
            .addOnSuccessListener { documents ->
                onResult(documents.size())
            }
            .addOnFailureListener {
                onResult(0)
            }
    }

    fun getUserVisitApplicationsCount(userId: String, onResult: (Int) -> Unit) {
        visitApplicationsCollection
            .whereEqualTo("userId", userId)
            .get()
            .addOnSuccessListener { documents ->
                onResult(documents.size())
            }
            .addOnFailureListener {
                onResult(0)
            }
    }
}