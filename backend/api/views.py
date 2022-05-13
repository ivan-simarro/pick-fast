from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Order, Product, Favourite
from .serializers import OrderSerializer, ProductSerializer, FavouriteSerializer
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

@api_view(['GET', 'POST'])
def getPostFavourites(request):
    if request.method == 'GET':
        favourites = Favourite.objects.all()
        serializer = FavouriteSerializer(favourites, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = FavouriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT'])
def getPutFavourite(request, pk):
    if request.method == 'GET':
        favourite = Favourite.objects.get(user=pk)
        serializer = FavouriteSerializer(favourite, many=False)
        return Response(serializer.data)

    elif request.method == 'PUT': 
        favourite = Favourite.objects.get(user=pk)
        serializer = FavouriteSerializer(favourite, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 