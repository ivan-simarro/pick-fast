# Generated by Django 4.0.4 on 2022-05-07 20:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('firstName', models.CharField(max_length=100)),
                ('user', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=1000)),
            ],
        ),
    ]
