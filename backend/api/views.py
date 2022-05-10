from tkinter.messagebox import NO
from django.shortcuts import render
from numpy import product
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Order, Product
from .serializers import OrderSerializer, ProductSerializer
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


@api_view(['GET','POST'])
def getPostOrder(request):
    if request.method == 'GET':
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)