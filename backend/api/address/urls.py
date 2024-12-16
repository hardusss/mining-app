from django.urls import path
from .views import *
urlpatterns = [
    path("get-btc-addresses/", get_btc_addresses, name="get-btc"),
    path("get-eth-addresses/", get_eth_addresses, name="get-eth"),
    path("get-ton-addresses/", get_ton_addresses, name="get-ton"),
]
