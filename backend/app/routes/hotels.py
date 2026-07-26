from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.hotel import Hotel
from app.models.user import User

hotels_bp = Blueprint("hotels", __name__)


@hotels_bp.route("/", methods=["GET"])
def get_hotels():
    hotels = Hotel.query.all()

    return jsonify({
        "success": True,
        "count": len(hotels),
        "data": [hotel.to_dict() for hotel in hotels]
    }), 200


@hotels_bp.route("/<int:hotel_id>", methods=["GET"])
def get_hotel(hotel_id):
    hotel = Hotel.query.get(hotel_id)

    if not hotel:
        return jsonify({
            "message": "Hotel not found"
        }), 404

    return jsonify({
        "success": True,
        "data": hotel.to_dict()
    }), 200


@hotels_bp.route("/", methods=["POST"])
@jwt_required()
def create_hotel():
    user_id = int(get_jwt_identity())

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    data = request.get_json()

    required_fields = [
        "name",
        "description",
        "address",
        "city",
        "county",
        "price_per_night"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "message": f"{field} is required"
            }), 400

    hotel = Hotel(
        name=data["name"],
        description=data["description"],
        address=data["address"],
        city=data["city"],
        county=data["county"],
        image=data.get("image"),
        amenities=",".join(data.get("amenities", [])),
        price_per_night=data["price_per_night"],
        owner_id=user.id
    )

    db.session.add(hotel)
    db.session.commit()

    return jsonify({
        "message": "Hotel created successfully",
        "data": hotel.to_dict()
    }), 201


@hotels_bp.route("/<int:hotel_id>", methods=["PUT"])
@jwt_required()
def update_hotel(hotel_id):
    hotel = Hotel.query.get(hotel_id)

    if not hotel:
        return jsonify({
            "message": "Hotel not found"
        }), 404

    data = request.get_json()

    hotel.name = data.get("name", hotel.name)
    hotel.description = data.get("description", hotel.description)
    hotel.address = data.get("address", hotel.address)
    hotel.city = data.get("city", hotel.city)
    hotel.county = data.get("county", hotel.county)
    hotel.image = data.get("image", hotel.image)
    hotel.price_per_night = data.get(
        "price_per_night",
        hotel.price_per_night
    )

    if "amenities" in data:
        hotel.amenities = ",".join(data["amenities"])

    db.session.commit()

    return jsonify({
        "message": "Hotel updated successfully",
        "data": hotel.to_dict()
    })


@hotels_bp.route("/<int:hotel_id>", methods=["DELETE"])
@jwt_required()
def delete_hotel(hotel_id):
    hotel = Hotel.query.get(hotel_id)

    if not hotel:
        return jsonify({
            "message": "Hotel not found"
        }), 404

    db.session.delete(hotel)
    db.session.commit()

    return jsonify({
        "message": "Hotel deleted successfully"
    }), 200