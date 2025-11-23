package com.example.myapplication.model

import com.google.firebase.firestore.PropertyName

/**
 * Модель данных для заявки на посещение ЖК
 *
 * @property id Уникальный идентификатор заявки (генерируется автоматически в Firestore)
 * @property userId ID пользователя, который оставил заявку
 * @property complexAddress Адрес жилого комплекса
 * @property comment Комментарий к заявке
 * @property visitDate Дата посещения в формате "dd.MM.yyyy"
 * @property visitTime Время посещения в формате "HH:mm"
 * @property status Статус заявки: "pending", "approved", "rejected"
 * @property createdAt Временная метка создания заявки
 */
data class VisitApplication(
    val id: String = "",

    @PropertyName("user_id")
    val userId: String = "",

    @PropertyName("complex_address")
    val complexAddress: String = "",

    val comment: String = "",

    @PropertyName("visit_date")
    val visitDate: String = "",


    @PropertyName("visit_time")
    val visitTime: String = "",

    val status: String = "pending",


    @PropertyName("created_at")
    val createdAt: Long = System.currentTimeMillis()
) {

    fun isNew(): Boolean = id.isEmpty()

    fun isApproved(): Boolean = status == "approved"

    /**
     * Проверяет, отклонена ли заявка
     */
    fun isRejected(): Boolean = status == "rejected"

    /**
     * Проверяет, находится ли заявка на рассмотрении
     */
    fun isPending(): Boolean = status == "pending"
}