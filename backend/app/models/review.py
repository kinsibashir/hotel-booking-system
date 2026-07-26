from app import db
from datetime import datetime
from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    Text,
    DateTime,
    ForeignKey,
)
from sqlalchemy.orm import relationship


class Review(db.Model):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True)

    rating = Column(Float, nullable=False)

    title = Column(String(100), nullable=False)

    comment = Column(Text, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    # Foreign Keys
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    hotel_id = Column(
        Integer,
        ForeignKey("hotels.id"),
        nullable=False,
    )

    booking_id = Column(
        Integer,
        ForeignKey("bookings.id"),
        unique=True,
        nullable=False,
    )

    # Relationships
    user = relationship(
        "User",
        back_populates="reviews",
    )

    hotel = relationship(
        "Hotel",
        back_populates="reviews",
    )

    booking = relationship(
        "Booking",
        back_populates="review",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "rating": self.rating,
            "title": self.title,
            "comment": self.comment,
            "user_id": self.user_id,
            "hotel_id": self.hotel_id,
            "booking_id": self.booking_id,
            "created_at": self.created_at.isoformat(),
        }

    def __repr__(self):
        return f"<Review {self.id}>"