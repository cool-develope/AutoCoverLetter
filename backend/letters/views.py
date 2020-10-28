from .models import CoverLetter
from .serializers import LetterSerializer
from rest_framework import generics
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from rest_framework.decorators import api_view
# Create your views here.

def index(request):
    return render(request, 'index.html')

@api_view(['GET', 'POST'])
def letter_list(request):
    pass

@api_view(['GET', 'PUT', 'DELETE'])
def letter_detail(request):
    pass