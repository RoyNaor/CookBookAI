import os
import json
import firebase_admin
from firebase_admin import credentials, auth
from fastapi import HTTPException, Header
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Firebase Admin SDK (ENV ONLY)
if not firebase_admin._apps:
    cred_data = os.getenv("FIREBASE_ADMIN_CREDENTIALS")

    if not cred_data:
        raise RuntimeError(
            "FIREBASE_ADMIN_CREDENTIALS is missing in environment variables. "
            "Firebase cannot be initialized without it."
        )

    try:
        # Parse the JSON string (from .env)
        cred_dict = json.loads(cred_data)

        # Fix PEM formatting issue
        if "private_key" in cred_dict:
            cred_dict["private_key"] = cred_dict["private_key"].replace("\\n", "\n")

        # Initialize Firebase app
        cred = credentials.Certificate(cred_dict)
        firebase_admin.initialize_app(cred)

        print("🔥 Firebase Admin initialized from environment variables")

    except Exception as e:
        raise RuntimeError(f"Failed to initialize Firebase Admin: {e}")


def verify_firebase_token(authorization: str = Header(...)):
    """Verify Firebase ID token from client."""
    try:
        if not authorization.startswith("Bearer "):
            raise ValueError("Missing 'Bearer ' prefix")

        id_token = authorization.split(" ")[1]
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {e}")
