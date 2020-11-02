from django.urls import path
from .import views

urlpatterns = [
    path('list/', views.letter_list),
    path('detail/<int:pk>/', views.letter_detail),
]