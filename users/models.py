# users/models.py
import uuid 

from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.utils.http import int_to_base36

class CustomUserManager(UserManager):
    def get_by_natural_key(self, username):
        case_insensitive_username_field = '{}__iexact'.format(self.model.USERNAME_FIELD)
        return self.get(**{case_insensitive_username_field: username})

ID_LENGTH = 12

def pkgen():
    from base64 import b32encode
    from hashlib import sha1
    from random import random

    pk = int_to_base36(uuid.uuid4().int)[:ID_LENGTH]
    return pk

class CustomUser(AbstractUser):
    objects = CustomUserManager()
    slug = models.CharField(max_length=ID_LENGTH, default=pkgen, editable=False)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    #name = models.CharField(blank=True, max_length=255)

    def __str__(self):
        return self.email