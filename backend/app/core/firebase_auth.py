import os
import json
import firebase_admin
from firebase_admin import credentials, auth
from fastapi import HTTPException, Depends, Header
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Firebase Admin SDK 
if not firebase_admin._apps:
    cred_data = os.getenv("FIREBASE_ADMIN_CREDENTIALS")

    if cred_data:
        cred_dict = json.loads(cred_data)
        cred = credentials.Certificate(cred_dict)
        print("Firebase initialized")
    else:
        cred_path = r"C:\Users\royna\VSC\CookBookAI\backend\cookbookai-99ac3-firebase-adminsdk-fbsvc-5377dbeebb.json"
        cred = credentials.Certificate(cred_path)
        print("Firebase initialized")

    firebase_admin.initialize_app(cred)


def verify_firebase_token(authorization: str = Header(...)):
    """
    Verify Firebase ID token from client header.
    """
    try:
        if not authorization.startswith("Bearer "):
            raise ValueError("Missing 'Bearer' prefix")

        id_token = authorization.split(" ")[1]
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {e}")
