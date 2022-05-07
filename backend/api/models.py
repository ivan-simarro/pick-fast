from distutils.command.upload import upload
from django.db import models
from django.forms import CharField
from datetime import date


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

class Order(models.Model):
    date = models.DateField(blank=False, default=date.today)
    user = models.EmailField(max_length = 254)
    bill = models.DecimalField(decimal_places=2, max_digits=10, default=0)

    def __str__(self):
        return self.user
