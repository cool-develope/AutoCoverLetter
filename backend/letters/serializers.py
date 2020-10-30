from rest_framework import serializers
from .models import CoverLetter

class LetterSerializer(serializers.ModelSerializer):
    
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = CoverLetter
        fields = ['id', 'user', 'username', 'title', 'message', 'is_public', 'created_at']
