# Generated by Django 4.0.4 on 2022-05-07 13:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_orders'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Orders',
            new_name='Order',
        ),
    ]
