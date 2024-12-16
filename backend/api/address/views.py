from django.shortcuts import render
from django.http import JsonResponse
import json

def get_btc_addresses(request) -> JsonResponse:
    with open("C:\\Users\\User\\PycharmProjects\\CryptoSafe\\app\\backend\\src\\wallets\\btc-addresses.json", "r", encoding="utf-8") as file:
        data = json.load(file)
    return JsonResponse({"data": data})


def get_eth_addresses(request) -> JsonResponse:
    with open("C:\\Users\\User\\PycharmProjects\\CryptoSafe\\app\\backend\\src\\wallets\\eth-addresses.json", "r", encoding="utf-8") as file:
        data = json.load(file)
    return JsonResponse({"data": data})


def get_ton_addresses(request) -> JsonResponse:
    with open("C:\\Users\\User\\PycharmProjects\\CryptoSafe\\app\\backend\\src\\wallets\\ton-addresses.json", "r", encoding="utf-8") as file:
        data = json.load(file)
    return JsonResponse({"data": data})
