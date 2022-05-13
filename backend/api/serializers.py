from rest_framework.serializers import ModelSerializer
from .models import Product, Order, Favourite


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class FavouriteSerializer(ModelSerializer):
    class Meta:
        model = Favourite
        fields = '__all__'
