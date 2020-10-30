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
    if request.method == 'GET':
        letters = CoverLetter.objects.all()
        letters_serializer = LetterSerializer(letters, many=True)
        return JsonResponse(letters_serializer.data, safe=False)
    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return JsonResponse({'message': 'You need login'}, status=status.HTTP_400_BAD_REQUEST)
        letter_data = JSONParser().parse(request)
        letter_data['user'] = request.user.pk
        letter_serializer = LetterSerializer(data=letter_data)
        if letter_serializer.is_valid():
            letter_serializer.save()
            return JsonResponse(letter_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(letter_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def letter_detail(request, pk):
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'You need login'}, status=status.HTTP_400_BAD_REQUEST)
    try: 
        letter = CoverLetter.objects.get(pk=pk) 
    except Exception: 
        return JsonResponse({'message': 'The letter does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.user != letter.user:
        return JsonResponse({'message': 'This letter can\'t be updated'}, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'GET':
        return JsonResponse(LetterSerializer(letter).data)
    elif request.method == 'PUT':
        letter_data = JSONParser().parse(request)
        letter_serializer = LetterSerializer(letter, data=letter_data)
        if letter_serializer.is_valid():
            letter_serializer.save()
            return JsonResponse(letter_serializer.data)
        return JsonResponse(letter_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        letter.delete()
        return JsonResponse({'message': 'The letter was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT) 