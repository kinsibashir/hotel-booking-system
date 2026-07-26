from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.review import Review
from app.models.booking import Booking
from app.models.hotel import Hotel

reviews_bp = Blueprint("reviews", __name__)


@reviews_bp.route("/hotel/<int:hotel_id>", methods=["GET"])
def get_hotel_reviews(hotel_id):
    hotel = Hotel.query.get(hotel_id)

    if not hotel:
        return jsonify({
            "message": "Hotel not found"
        }), 404

    reviews = Review.query.filter_by(hotel_id=hotel_id).all()

    return jsonify({
        "success": True,
        "count": len(reviews),
        "data": [review.to_dict() for review in reviews]
    }), 200


@reviews_bp.route("/", methods=["POST"])
@jwt_required()
def create_review():
    user_id = int(get_jwt_identity())

    data = request.get_json()

    required_fields = [
        "booking_id",
        "rating",
        "title",
        "comment"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "message": f"{field} is required"
            }), 400

    booking = Booking.query.filter_by(
        id=data["booking_id"],
        user_id=user_id
    ).first()

    if not booking:
        return jsonify({
            "message": "Booking not found"
        }), 404

    existing_review = Review.query.filter_by(
        booking_id=booking.id
    ).first()

    if existing_review:
        return jsonify({
            "message": "Review already exists for this booking"
        }), 400

    review = Review(
        rating=data["rating"],
        title=data["title"],
        comment=data["comment"],
        user_id=user_id,
        hotel_id=booking.hotel_id,
        booking_id=booking.id
    )

    db.session.add(review)
    db.session.commit()

    return jsonify({
        "message": "Review added successfully",
        "data": review.to_dict()
    }), 201


@reviews_bp.route("/<int:review_id>", methods=["PUT"])
@jwt_required()
def update_review(review_id):
    user_id = int(get_jwt_identity())

    review = Review.query.filter_by(
        id=review_id,
        user_id=user_id
    ).first()

    if not review:
        return jsonify({
            "message": "Review not found"
        }), 404

    data = request.get_json()

    review.rating = data.get("rating", review.rating)
    review.title = data.get("title", review.title)
    review.comment = data.get("comment", review.comment)

    db.session.commit()

    return jsonify({
        "message": "Review updated successfully",
        "data": review.to_dict()
    }), 200


@reviews_bp.route("/<int:review_id>", methods=["DELETE"])
@jwt_required()
def delete_review(review_id):
    user_id = int(get_jwt_identity())

    review = Review.query.filter_by(
        id=review_id,
        user_id=user_id
    ).first()

    if not review:
        return jsonify({
            "message": "Review not found"
        }), 404

    db.session.delete(review)
    db.session.commit()

    return jsonify({
        "message": "Review deleted successfully"
    }), 200