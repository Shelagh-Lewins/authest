import uuid 

from django.db import models
from django.utils.http import int_to_base36
from django.core.validators import MaxValueValidator, MinValueValidator

ID_LENGTH = 12

def pkgen():
    from base64 import b32encode
    from hashlib import sha1
    from random import random

    pk = int_to_base36(uuid.uuid4().int)[:ID_LENGTH]
    return pk

class List(models.Model):
    slug = models.CharField(max_length=ID_LENGTH, default=pkgen, editable=False)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    is_public = models.BooleanField(default=False)
    timer = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Item(models.Model):
    slug = models.CharField(max_length=ID_LENGTH, default=pkgen, editable=False)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name='items')
    order = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])

    class Meta:
        unique_together = ('list', 'order')
        ordering = ['order']

    def __unicode__(self):
        return '%d: %s' % (self.order, self.title)
