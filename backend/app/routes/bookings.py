from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.booking import Booking
from app.models.hotel import Hotel

bookings_bp = Blueprint("bookings", __name__)


@bookings_bp.route("/", methods=["GET"])
@jwt_required()
def get_bookings():
    user_id = int(get_jwt_identity())

    bookings = Booking.query.filter_by(user_id=user_id).all()

    return jsonify({
        "success": True,
        "count": len(bookings),
        "data": [booking.to_dict() for booking in bookings]
    }), 200


@bookings_bp.route("/<int:booking_id>", methods=["GET"])
@jwt_required()
def get_booking(booking_id):
    user_id = int(get_jwt_identity())

    booking = Booking.query.filter_by(
        id=booking_id,
        user_id=user_id
    ).first()

    if not booking:
        return jsonify({
            "message": "Booking not found"
        }), 404

    return jsonify({
        "success": True,
        "data": booking.to_dict()
    }), 200


@bookings_bp.route("/", methods=["POST"])
@jwt_required()
def create_booking():
    user_id = int(get_jwt_identity())

    data = request.get_json()

    required_fields = [
        "hotel_id",
        "check_in",
        "check_out",
        "guests"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "message": f"{field} is required"
            }), 400

    hotel = Hotel.query.get(data["hotel_id"])

    if not hotel:
        return jsonify({
            "message": "Hotel not found"
        }), 404

    total_price = hotel.price_per_night

    booking = Booking(
        user_id=user_id,
        hotel_id=hotel.id,
        check_in=data["check_in"],
        check_out=data["check_out"],
        guests=data["guests"],
        total_price=total_price,
        payment_method=data.get("payment_method", "Card"),
        special_requests=data.get("special_requests", "")
    )

    db.session.add(booking)
    db.session.commit()

    return jsonify({
        "message": "Booking created successfully",
        "data": booking.to_dict()
    }), 201


@bookings_bp.route("/<int:booking_id>", methods=["PUT"])
@jwt_required()
def update_booking(booking_id):
    user_id = int(get_jwt_identity())

    booking = Booking.query.filter_by(
        id=booking_id,
        user_id=user_id
    ).first()

    if not booking:
        return jsonify({
            "message": "Booking not found"
        }), 404

    data = request.get_json()

    booking.booking_status = data.get(
        "booking_status",
        booking.booking_status
    )

    booking.payment_status = data.get(
        "payment_status",
        booking.payment_status
    )

    booking.special_requests = data.get(
        "special_requests",
        booking.special_requests
    )

    db.session.commit()

    return jsonify({
        "message": "Booking updated successfully",
        "data": booking.to_dict()
    }), 200


@bookings_bp.route("/<int:booking_id>", methods=["DELETE"])
@jwt_required()
def cancel_booking(booking_id):
    user_id = int(get_jwt_identity())

    booking = Booking.query.filter_by(
        id=booking_id,
        user_id=user_id
    ).first()

    if not booking:
        return jsonify({
            "message": "Booking not found"
        }), 404

    db.session.delete(booking)
    db.session.commit()

    return jsonify({
        "message": "Booking cancelled successfully"
    }), 200