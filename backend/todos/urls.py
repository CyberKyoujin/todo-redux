from django.urls import path
from .views import TasksListView, CreateTaskView, UpdateTaskView, DeleteTaskView


urlpatterns = [
    path('', TasksListView.as_view(), name='tasks'),
    path('create/', CreateTaskView.as_view(), name='create'),
    path('update/<int:pk>/', UpdateTaskView.as_view(), name='update'),
    path('delete/<int:pk>/', DeleteTaskView.as_view(), name='delete'),
]
