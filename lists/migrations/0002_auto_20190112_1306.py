# Generated by Django 2.0.10 on 2019-01-12 13:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('lists', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='list',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='list_created_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='list',
            name='modified_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='list_modified_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='item',
            name='list',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='lists.List'),
        ),
        migrations.AlterUniqueTogether(
            name='item',
            unique_together={('list', 'order')},
        ),
    ]
