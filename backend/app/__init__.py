from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from config import config
import os

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
bcrypt = Bcrypt()

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    
    # Update CORS to allow multiple origins
    CORS(app, 
         origins=['http://localhost:5173', 'http://127.0.0.1:5173'],
         supports_credentials=True,
         allow_headers=['Content-Type', 'Authorization'],
         methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    )
    
    from app.routes.auth import auth_bp
    from app.routes.hotels import hotels_bp
    from app.routes.bookings import bookings_bp
    from app.routes.reviews import reviews_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(hotels_bp, url_prefix='/api/hotels')
    app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
    app.register_blueprint(reviews_bp, url_prefix='/api/reviews')
    
    @jwt.unauthorized_loader
    def unauthorized_response(callback):
        return jsonify({'message': 'Missing or invalid token'}), 401
    
    @jwt.invalid_token_loader
    def invalid_token_response(callback):
        return jsonify({'message': 'Invalid token'}), 401
    
    @jwt.expired_token_loader
    def expired_token_response(callback):
        return jsonify({'message': 'Token has expired'}), 401
    
    @app.route('/')
    def home():
        return jsonify({
            'message': '🏨 Welcome to StayNest API',
            'version': '1.0.0',
            'endpoints': {
                'auth': '/api/auth',
                'hotels': '/api/hotels',
                'bookings': '/api/bookings',
                'reviews': '/api/reviews'
            }
        })
    
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'message': 'Resource not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'message': 'Internal server error'}), 500
    
    return app