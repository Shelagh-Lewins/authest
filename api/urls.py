# api/urls.py
from django.urls import include, path
from django.contrib.auth import views
from django.conf.urls import include, url
from django.views.generic.base import RedirectView
from .forms import SetPasswordFormCustom

urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('users/', include('users.urls')),
    path('reset/<uidb64>/<token>/',
    	views.PasswordResetConfirmView.as_view(template_name='account/password_reset_confirm.html', form_class=SetPasswordFormCustom),
    	name='password_reset_confirm'),
    path('reset/done/', views.PasswordResetCompleteView.as_view(template_name='account/password_reset_complete.html'),
    	name='password_reset_complete'),
    path('lists/', include('lists.endpoints')),
]
