from django.db import models


class TodoTask(models.Model):
    description = models.CharField(max_length=100, null=True, blank=True)
    completed = models.BooleanField(default=False)
