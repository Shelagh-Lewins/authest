# forms.py

from django import forms
from django.contrib.auth.forms import SetPasswordForm
from django.contrib.auth import (
    authenticate, get_user_model, password_validation,
)
from django.utils.translation import gettext, gettext_lazy as _
#from django.contrib.auth import password_validation

from django.contrib.auth.forms import PasswordResetForm
UserModel = get_user_model()

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

class PasswordResetFormCustom(PasswordResetForm):
    def get_users(self, email):
        print('using custom form');
        """Given an email, return matching user(s) who should receive a reset.

        This allows subclasses to more easily customize the default policies
        that prevent inactive users and users with unusable passwords from
        resetting their password.
        """
        active_users = UserModel._default_manager.filter(**{
            '%s__iexact' % UserModel.get_email_field_name(): email,
            'is_active': True,
        })

        if not active_users:
            raise forms.ValidationError(_("The e-mail address is not assigned to any user account"),
                code='invalid')
        return (u for u in active_users if u.has_usable_password())