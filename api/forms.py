# forms.py

from django import forms
from django.contrib.auth.forms import SetPasswordForm
from django.utils.translation import gettext, gettext_lazy as _
from django.contrib.auth import password_validation

class SetPasswordFormCustom(SetPasswordForm):
    new_password1 = forms.CharField(
        label=_("New password"),
        widget=forms.PasswordInput(attrs={'class':'form-control','placeholder':'Password'}),
        strip=False,
    )
    new_password2 = forms.CharField(
        label=_("Confirm new password"),
        strip=False,
        widget=forms.PasswordInput(attrs={'class':'form-control','placeholder':'Confirm password'}),
        help_text=password_validation.password_validators_help_text_html(),
    )
