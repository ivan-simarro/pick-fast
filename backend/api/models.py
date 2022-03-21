from distutils.command.upload import upload
from django.db import models
from django.forms import CharField


class Product(models.Model):
    name = models.CharField(max_length=100, null=False)
    image = models.ImageField(upload_to='products', null=True)
    description = models.TextField()
    price = models.FloatField()
    brand = models.CharField(max_length=75)
    stock = models.BooleanField(default=True, blank=False)
    type = models.CharField(max_length=50, default='any')
    quantity = models.CharField(max_length=10, default='N/A')

    def __str__(self):
        return self.name
