from rest_framework import viewsets, permissions
from .models import List, Item
from .serializers import ListSerializer, ItemSerializer
from django.db.models import Q


class ListViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny, ]
    model = List
    serializer_class = ListSerializer

    def get_queryset(self):
        if not self.request.user.is_authenticated:
          return List.objects.filter(is_public__exact=True)

        return List.objects.filter(Q(created_by=self.request.user) | Q(is_public__exact=True))
    def pre_save(self, obj):
        obj.created_by = self.request.user


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = ItemSerializer
