from django.urls import path
from . import views

urlpatterns = [
    path('users/<str:pk>/', views.getUser, name="user"),
    path('users/', views.getPostUser, name="user")
]
