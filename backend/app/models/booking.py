from app import db
from datetime import datetime
from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    Date,
    DateTime,
    Text,
    ForeignKey,
)
from sqlalchemy.orm import relationship


class Booking(db.Model):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True)

    check_in = Column(Date, nullable=False)
    check_out = Column(Date, nullable=False)

    guests = Column(Integer, default=1)

    total_price = Column(Float, nullable=False)

    booking_status = Column(
        String(20),
        default="Pending"
    )

    payment_status = Column(
        String(20),
        default="Pending"
    )

    payment_method = Column(
        String(50),
        default="Card"
    )

    special_requests = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    # Foreign Keys
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    hotel_id = Column(
        Integer,
        ForeignKey("hotels.id"),
        nullable=False
    )

    # Relationships
    user = relationship(
        "User",
        back_populates="bookings"
    )

    hotel = relationship(
        "Hotel",
        back_populates="bookings"
    )

    review = relationship(
        "Review",
        back_populates="booking",
        uselist=False,
        cascade="all, delete-orphan"
    )

    @property
    def nights(self):
        return (self.check_out - self.check_in).days

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "hotel_id": self.hotel_id,
            "check_in": self.check_in.isoformat(),
            "check_out": self.check_out.isoformat(),
            "nights": self.nights,
            "guests": self.guests,
            "total_price": self.total_price,
            "booking_status": self.booking_status,
            "payment_status": self.payment_status,
            "payment_method": self.payment_method,
            "special_requests": self.special_requests,
            "created_at": self.created_at.isoformat()
        }

    def __repr__(self):
        return f"<Booking {self.id}>"