from rest_framework import viewsets, permissions

from .models import List, Item
from .serializers import ListSerializer, ItemSerializer


class ListViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny, ]
    # permission_classes = [permissions.IsAuthenticated, ]
    model = List
    serializer_class = ListSerializer

    def get_queryset(self):
        if not self.request.user.is_authenticated:
          return List.objects.none()

        return List.objects.filter(created_by=self.request.user)

    def pre_save(self, obj):
        obj.created_by = self.request.user


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = ItemSerializer
