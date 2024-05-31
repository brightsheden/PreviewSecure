from rest_framework import  serializers
from rest_framework_simplejwt.tokens import RefreshToken
from base.models import User, ImageLink




class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User 
        fields = ['id','username', 'email','number']



    
    def get_isAdmin(self,obj):
        return obj.is_staff



class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','username', 'email','number', 'token']

    def get_token(self, obj):
        token =RefreshToken.for_user(obj)
        return str(token.access_token)
    


class ImageLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model=ImageLink
        fields = "__all__"

