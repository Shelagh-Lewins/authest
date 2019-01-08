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
    items = DynamicRelationField('ItemSerializer', embed=True,many=True)

    class Meta:
        model = List
        fields = ('id', 'title', 'description', 'is_public', 'slug', 'created_at', 'timer', 'items')

class ItemSerializer(DynamicModelSerializer):
		class Meta:
				model = Item
				fields = ('id', 'title', 'description', 'slug', 'created_at', 'list', 'order')
