from app import create_app, db
import os

app = create_app(os.getenv("FLASK_ENV", "development"))

print("Database URI:", app.config["SQLALCHEMY_DATABASE_URI"])

with app.app_context():
    db.create_all()
    print("✅ Database tables created successfully")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)