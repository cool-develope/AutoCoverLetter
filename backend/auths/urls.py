from django.urls import path
from django.contrib.auth.views import LoginView
from . import views

urlpatterns = [
    path('login/', LoginView.as_view(
        template_name='admin/login.html',
    )),
    path('signup/', views.signup),
]