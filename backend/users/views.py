import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from .serializers import UserSerializer

# Create your views here.

@api_view(['GET'])
def getUser(request, pk):
    user = User.objects.get(user=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def postUser(request):
    user = json.dumps(request)
    serializer = UserSerializer(data=user)
    return Response(serializer.data)
    