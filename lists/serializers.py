from rest_framework import serializers

# dynamic rest extension enables nested data for lists, see chapter 8
from dynamic_rest.serializers import DynamicModelSerializer

from .models import List, Item

from dynamic_rest.fields import (
    CountField,
    DynamicField,
    DynamicGenericRelationField,
    DynamicMethodField,
    DynamicRelationField
)

class ListSerializer(DynamicModelSerializer):
    items = DynamicRelationField('ItemSerializer', embed=True, many=True)

    # automatically set created_by as the current user
    created_by = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = List
        fields = ('id', 'title', 'description', 'is_public',
            'slug', 'created_by', 'created_at',
            'modified_by', 'modified_at', 'items')

class ItemSerializer(DynamicModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'title', 'description', 'slug', 'modified_at', 'list', 'order')
