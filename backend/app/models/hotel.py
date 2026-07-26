from app import db
from datetime import datetime
from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    DateTime,
    Text,
    ForeignKey,
)
from sqlalchemy.orm import relationship


class RoomType(db.Model):
    __tablename__ = "room_types"

    id = Column(Integer, primary_key=True)

    name = Column(String(100), nullable=False)

    description = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }


class Hotel(db.Model):
    __tablename__ = "hotels"

    id = Column(Integer, primary_key=True)

    name = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)

    address = Column(String(255), nullable=False)
    city = Column(String(100), nullable=False)
    county = Column(String(100), nullable=False)

    image = Column(String(255), nullable=True)

    amenities = Column(Text)

    price_per_night = Column(Float, nullable=False)

    rating = Column(Float, default=0.0)

    is_available = Column(Boolean, default=True)

    check_in_time = Column(String(10), default="14:00")
    check_out_time = Column(String(10), default="11:00")

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    owner = relationship("User", back_populates="hotels")

    bookings = relationship(
        "Booking",
        back_populates="hotel",
        cascade="all, delete-orphan",
    )

    reviews = relationship(
        "Review",
        back_populates="hotel",
        cascade="all, delete-orphan",
    )