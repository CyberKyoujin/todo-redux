from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import TodoTaskSerializer
from .models import TodoTask
from rest_framework.parsers import JSONParser

class TasksListView(APIView):
    def get(self, request):
        tasks = TodoTask.objects.all()
        serializer = TodoTaskSerializer(tasks, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    
class CreateTaskView(APIView):
    def post(self, request):
        data = request.data
        serializer = TodoTaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateTaskView(APIView):
    def post(self, request, pk):
        task = TodoTask.objects.get(id=pk)
        task.completed = True
        task.save()
        return Response(status= status.HTTP_200_OK)
    
class DeleteTaskView(APIView):
    def delete(self, request, pk):
        task = TodoTask.objects.get(id=pk)
        task.delete()
        return Response(status=status.HTTP_200_OK)
    
    

