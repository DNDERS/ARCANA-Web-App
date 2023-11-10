from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

app = FastAPI()

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['Arcana']  # Replace 'Arcana' with your actual database name
collection = db['user_initials']  # Replace 'user_initials' with your actual collection name

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend's URL during production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Example route to insert data
@app.post("/insert_initials")
def insert_initials(initials: dict):
    # Insert user initials into MongoDB
    result = collection.insert_one(initials)
    
    # Check if the insertion was successful
    if result.inserted_id:
        return {"message": "User initials inserted successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to insert user initials")

# Example route to retrieve data
@app.get("/get_initials")
def get_initials():
    # Retrieve all user initials from MongoDB
    initials_list = list(collection.find({}, {"_id": 0, "initials": 1}))

    return {"user_initials": initials_list}