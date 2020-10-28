from rest_framework import serializers
from .models import CoverLetter

class LetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoverLetter
        fields = ('id', 'user', 'title', 'message', 'is_public', 'created_at')
