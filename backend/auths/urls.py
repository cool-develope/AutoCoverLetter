from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from . import views

urlpatterns = [
    path('login/', views.login_view),
    path('logout/', LogoutView.as_view()),
    path('signup/', views.signup),
]