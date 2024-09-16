from oauth2client import client
from django.contrib.auth.models import User

def get_id_token_with_code(code):
    
        credentials = client.credentials_from_clientsecrets_and_code(
            'client_secret.json',
            ['email','profile'],
            code
        )
        
        print(credentials.id_token)
        
        return credentials.id_token
    

