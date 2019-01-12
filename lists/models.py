"""Models for lists, items
    """
import uuid

from django.db import models
from django.utils.http import int_to_base36
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth import get_user_model

ID_LENGTH = 12
USER = get_user_model()

def slug_gen():
    """Generates a probably unique string that can be used as a slug when routing

    Starts with a uuid, encodes it to base 36 and shortens it
    """

    #from base64 import b32encode
    #from hashlib import sha1
    #from random import random

    slug = int_to_base36(uuid.uuid4().int)[:ID_LENGTH]
    return slug

class List(models.Model):
    """Models for lists
    """
    slug = models.CharField(max_length=ID_LENGTH, default=slug_gen, editable=False)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_by = models.ForeignKey(USER, on_delete=models.CASCADE, related_name='list_created_by')
    created_at = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(USER, on_delete=models.SET_NULL,null=True,
        related_name='list_modified_by')
    modified_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, default='')
    is_public = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Item(models.Model):
    """Models for list items
    """
    slug = models.CharField(max_length=ID_LENGTH, default=slug_gen, editable=False)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    modified_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, default='')
    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name='items')
    order = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])

    class Meta:
        unique_together = ('list', 'order')
        ordering = ['order']

    def __unicode__(self):
        return '%d: %s' % (self.order, self.title)
