from django.conf.urls import include, url
from rest_framework import routers

from .api import ListViewSet
from .api import ItemViewSet

router = routers.DefaultRouter()
router.register('lists', ListViewSet)
router.register('items', ItemViewSet)

urlpatterns = [
    url("^", include(router.urls)),
]
