from rest_framework import viewsets, permissions

from .models import List, Item
from .serializers import ListSerializer, ItemSerializer


class ListViewSet(viewsets.ModelViewSet):
    queryset = List.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = ListSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = ItemSerializer

