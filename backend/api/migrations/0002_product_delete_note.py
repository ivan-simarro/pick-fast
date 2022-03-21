# Generated by Django 4.0.3 on 2022-03-21 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('image', models.ImageField(upload_to='')),
                ('description', models.TextField()),
                ('price', models.FloatField()),
                ('brand', models.TextField()),
                ('stock', models.BooleanField(default=True)),
            ],
        ),
        migrations.DeleteModel(
            name='Note',
        ),
    ]
