# api/urls.py
from django.urls import include, path
from django.contrib.auth import views
from django.conf.urls import include, url
from django.views.generic.base import RedirectView
from .forms import SetPasswordFormCustom
from .forms import PasswordResetFormCustom

urlpatterns = [
    path('password/reset/', views.PasswordResetView.as_view(form_class=PasswordResetFormCustom),
        name='rest_password_reset'),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('users/', include('users.urls')),
    path('reset/<uidb64>/<token>/',
    	views.PasswordResetConfirmView.as_view(template_name='account/password_reset_confirm.html', form_class=SetPasswordFormCustom),
    	name='password_reset_confirm'),
    path('reset/done/', views.PasswordResetCompleteView.as_view(template_name='account/password_reset_complete.html'),
    	name='password_reset_complete'),
    path('content/', include('lists.endpoints')),
    # content is a path for lists, items etc found in the lists app
]
