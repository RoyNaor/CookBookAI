import os
import json
import firebase_admin
from firebase_admin import credentials, auth
from fastapi import HTTPException, Header
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Firebase Admin SDK
if not firebase_admin._apps:
    cred_data = os.getenv("FIREBASE_ADMIN_CREDENTIALS")

    if cred_data:
        # Parse the JSON string 
        cred_dict = json.loads(cred_data)

        # Fix PEM line breaks (this is the key to solving InvalidByte(0, 92))
        if "private_key" in cred_dict:
            cred_dict["private_key"] = cred_dict["private_key"].replace("\\n", "\n")

        cred = credentials.Certificate(cred_dict)
        print("Firebase initialized from .env")
    else:
        # Fallback to local JSON file for local dev
        cred_path = r"C:\Users\royna\VSC\CookBookAI\backend\cookbookai-99ac3-firebase-adminsdk-fbsvc-5377dbeebb.json"
        cred = credentials.Certificate(cred_path)
        print("Firebase initialized from local JSON file")

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
