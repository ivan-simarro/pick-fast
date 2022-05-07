from django.db import models


class User(models.Model):
    name = models.CharField(max_length=100, null=False)
    lastName = models.CharField(max_length=100, null=False)
    user = models.EmailField(max_length = 254)
    password = models.CharField(max_length=1000)

    def __str__(self):
        return self.name