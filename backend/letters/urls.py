from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.letter_list),
    path('detail/', views.letter_detail),
]