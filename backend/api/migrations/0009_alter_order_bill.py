# Generated by Django 4.0.4 on 2022-05-07 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_order_date_alter_order_bill'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='bill',
            field=models.FloatField(),
        ),
    ]
