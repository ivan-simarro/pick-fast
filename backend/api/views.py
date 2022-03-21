from tkinter.messagebox import NO
from django.shortcuts import render
from numpy import product
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product
from .serializers import ProductSerializer
from rest_framework import serializers
from rest_framework import status

# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': 'products',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of products'
        }
    ]
    return Response(routes)


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    products = Product.objects.get(id=pk)
    serializer = ProductSerializer(products, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createProduct(request):
    product = ProductSerializer(data=request.data)

    # validating for already existing data
    if Product.objects.filter(**request.data).exists():
        raise serializers.ValidationError('This data already exists')

    if product.is_valid():
        product.save()
        return Response(product.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
