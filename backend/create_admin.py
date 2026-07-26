from app import create_app, db
from app.models.user import User

app = create_app()

with app.app_context():
    # Check if admin already exists
    existing_admin = User.query.filter_by(
        email="admin@staynest.com"
    ).first()

    if existing_admin:
        print("❌ Admin already exists!")
    else:
        admin = User(
            first_name="Admin",
            last_name="User",
            email="admin@staynest.com",
            phone="0700000000",
            role="admin"
        )

        # Hash the password
        admin.set_password("admin123")

        db.session.add(admin)
        db.session.commit()

        print("✅ Admin created successfully!")
        print("--------------------------------")
        print("Email    : admin@staynest.com")
        print("Password : admin123")
        print("Role     : admin")