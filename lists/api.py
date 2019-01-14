from rest_framework import viewsets, permissions

from .models import List, Item
from .serializers import ListSerializer, ItemSerializer


class ListViewSet(viewsets.ModelViewSet):
    # queryset = List.objects.all()
    # permission_classes = [permissions.AllowAny, ]
    # permission_classes = [permissions.IsAuthenticated, ]
    model = List
    serializer_class = ListSerializer

    def get_queryset(self):
        print('*****')
        print(self.request.user)
        return List.objects.filter(created_by=self.request.user)

    def pre_save(self, obj):
        obj.created_by = self.request.user


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = ItemSerializer
