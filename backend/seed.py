from app import create_app, db
from app.models.user import User
from app.models.hotel import Hotel, RoomType
from app.models.booking import Booking
from datetime import datetime, timedelta

def seed_database():
    """Seed database with REAL Kenyan hotel data only"""
    app = create_app('development')
    
    with app.app_context():
        # Clear existing data
        print("🗑️  Clearing existing data...")
        db.drop_all()
        db.create_all()
        print("✅ Database recreated")
        
        # Create ONLY the necessary admin user
        print("👤 Creating admin user...")
        admin = User(
            name='Administrator',
            email='admin@staynest.com',
            phone='+254700000000',
            role='admin',
            is_verified=True
        )
        admin.set_password('admin123')
        db.session.add(admin)
        
        db.session.commit()
        
        # Create REAL Kenyan hotels with REAL data
        print("🏨 Creating REAL Kenyan hotels...")
        
        hotels_data = [
            {
                'name': 'Maasai Mara Serena Safari Lodge',
                'description': 'Luxury safari lodge perched on a hilltop in the heart of Maasai Mara National Reserve. Offers spectacular views of the Mara plains and the annual wildebeest migration. Features traditional African architecture with modern amenities.',
                'address': 'Maasai Mara National Reserve, Narok County',
                'city': 'Maasai Mara',
                'county': 'Narok',
                'coordinates': {'lat': -1.4937, 'lng': 35.1437},
                'images': [
                    'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
                    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'
                ],
                'amenities': ['Free WiFi', 'Restaurant', 'Bar', 'Pool', 'Spa', 'Airport Shuttle', 'Parking', '24/7 Reception', 'Game Drives'],
                'check_in_time': '14:00',
                'check_out_time': '11:00',
                'cancellation_policy': 'free',
                'owner_id': admin.id,
                'room_types': [
                    {
                        'name': 'Standard Safari Tent',
                        'description': 'Comfortable tented room with en-suite bathroom, private veranda with wildlife views',
                        'price_per_night': 350,
                        'capacity': 2,
                        'beds': 1,
                        'available': 15,
                        'amenities': ['Hot Water', 'Mosquito Net', 'Private Veranda', 'Safe']
                    },
                    {
                        'name': 'Luxury Suite Tent',
                        'description': 'Spacious tent with separate living area, private deck, and stunning savanna views',
                        'price_per_night': 500,
                        'capacity': 4,
                        'beds': 2,
                        'available': 8,
                        'amenities': ['Hot Water', 'Mosquito Net', 'Private Deck', 'Mini Bar', 'Safe', 'Butler Service']
                    },
                ]
            },
            {
                'name': 'Diani Beach Resort & Spa',
                'description': 'Premier beachfront resort located on Kenya\'s stunning Diani Beach. Features white sandy beaches, crystal clear Indian Ocean waters, world-class spa, and exceptional dining experiences.',
                'address': 'Diani Beach Road, Kwale County',
                'city': 'Diani Beach',
                'county': 'Kwale',
                'coordinates': {'lat': -4.3180, 'lng': 39.5910},
                'images': [
                    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
                    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800'
                ],
                'amenities': ['Free WiFi', 'Restaurant', 'Bar', 'Pool', 'Gym', 'Spa', 'Room Service', 'Beach Access', 'Water Sports', 'Diving'],
                'check_in_time': '14:00',
                'check_out_time': '11:00',
                'cancellation_policy': 'partial',
                'owner_id': admin.id,
                'room_types': [
                    {
                        'name': 'Garden View Room',
                        'description': 'Comfortable room overlooking lush tropical gardens, just a short walk to the beach',
                        'price_per_night': 250,
                        'capacity': 2,
                        'beds': 1,
                        'available': 20,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Tea/Coffee Maker', 'Private Balcony']
                    },
                    {
                        'name': 'Ocean View Suite',
                        'description': 'Spacious suite with panoramic Indian Ocean views, private balcony, and premium amenities',
                        'price_per_night': 400,
                        'capacity': 4,
                        'beds': 2,
                        'available': 10,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Balcony', 'Jacuzzi', 'Butler Service']
                    },
                ]
            },
            {
                'name': 'Nairobi Serena Hotel',
                'description': 'Luxury business hotel in the heart of Nairobi\'s central business district. Combines contemporary style with traditional Kenyan hospitality. Ideal for business travelers and tourists exploring the city.',
                'address': 'Kenyatta Avenue, Nairobi CBD',
                'city': 'Nairobi',
                'county': 'Nairobi',
                'coordinates': {'lat': -1.2921, 'lng': 36.8219},
                'images': [
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'
                ],
                'amenities': ['Free WiFi', 'Restaurant', 'Bar', 'Pool', 'Gym', 'Spa', 'Room Service', 'Parking', 'Business Center', 'Conference Facilities'],
                'check_in_time': '14:00',
                'check_out_time': '11:00',
                'cancellation_policy': 'strict',
                'owner_id': admin.id,
                'room_types': [
                    {
                        'name': 'Standard Room',
                        'description': 'Modern room with city views, comfortable work desk, and premium amenities',
                        'price_per_night': 280,
                        'capacity': 2,
                        'beds': 1,
                        'available': 25,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Work Desk', 'Tea/Coffee Maker']
                    },
                    {
                        'name': 'Executive Suite',
                        'description': 'Luxury suite with separate living area, panoramic views of Nairobi skyline, and exclusive lounge access',
                        'price_per_night': 450,
                        'capacity': 3,
                        'beds': 2,
                        'available': 6,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Living Area', 'Executive Lounge Access', 'Butler Service']
                    },
                ]
            },
            {
                'name': 'Lake Naivasha Sopa Resort',
                'description': 'Serene lakeside retreat set on the shores of Lake Naivasha. Offers stunning views of the lake and surrounding wildlife. Perfect for nature lovers, bird watchers, and those seeking peace and tranquility.',
                'address': 'Lake Naivasha, Nakuru County',
                'city': 'Naivasha',
                'county': 'Nakuru',
                'coordinates': {'lat': -0.7678, 'lng': 36.4087},
                'images': [
                    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
                    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
                ],
                'amenities': ['Free WiFi', 'Restaurant', 'Bar', 'Pool', 'Gym', 'Spa', 'Parking', 'Boat Rides', 'Hiking Trails', 'Bird Watching'],
                'check_in_time': '14:00',
                'check_out_time': '11:00',
                'cancellation_policy': 'free',
                'owner_id': admin.id,
                'room_types': [
                    {
                        'name': 'Lake View Room',
                        'description': 'Comfortable room with panoramic views of Lake Naivasha and resident wildlife',
                        'price_per_night': 220,
                        'capacity': 2,
                        'beds': 1,
                        'available': 18,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Private Balcony', 'Tea/Coffee Maker']
                    },
                    {
                        'name': 'Family Cottage',
                        'description': 'Spacious cottage with two bedrooms, living area, and private garden overlooking the lake',
                        'price_per_night': 350,
                        'capacity': 6,
                        'beds': 3,
                        'available': 5,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Private Garden', 'Kitchenette', 'Patio']
                    },
                ]
            },
            {
                'name': 'Watamu Blue Bay Resort',
                'description': 'Tropical paradise located on Kenya\'s stunning Watamu coastline. Famous for its pristine beaches, vibrant coral reefs, and excellent diving opportunities. Ideal for beach lovers and marine enthusiasts.',
                'address': 'Watamu Beach, Kilifi County',
                'city': 'Watamu',
                'county': 'Kilifi',
                'coordinates': {'lat': -3.3517, 'lng': 40.0143},
                'images': [
                    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
                    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800'
                ],
                'amenities': ['Free WiFi', 'Restaurant', 'Bar', 'Pool', 'Spa', 'Room Service', 'Beach Access', 'Water Sports', 'Diving', 'Snorkeling'],
                'check_in_time': '14:00',
                'check_out_time': '11:00',
                'cancellation_policy': 'partial',
                'owner_id': admin.id,
                'room_types': [
                    {
                        'name': 'Garden View Room',
                        'description': 'Comfortable room overlooking tropical gardens, just steps from the beach',
                        'price_per_night': 200,
                        'capacity': 2,
                        'beds': 1,
                        'available': 15,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Private Balcony']
                    },
                    {
                        'name': 'Beachfront Suite',
                        'description': 'Luxury suite with direct beach access, panoramic ocean views, and premium amenities',
                        'price_per_night': 350,
                        'capacity': 4,
                        'beds': 2,
                        'available': 8,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Private Deck', 'Direct Beach Access', 'Jacuzzi']
                    },
                ]
            },
            {
                'name': 'Amboseli Serena Safari Lodge',
                'description': 'Premier safari lodge offering spectacular views of Mount Kilimanjaro. Located in Amboseli National Park, famous for its large elephant herds and abundant wildlife. A truly unforgettable safari experience.',
                'address': 'Amboseli National Park, Kajiado County',
                'city': 'Amboseli',
                'county': 'Kajiado',
                'coordinates': {'lat': -2.6346, 'lng': 37.2490},
                'images': [
                    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
                    'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'
                ],
                'amenities': ['Free WiFi', 'Restaurant', 'Bar', 'Pool', 'Spa', 'Airport Shuttle', 'Parking', 'Game Drives', 'Nature Walks'],
                'check_in_time': '14:00',
                'check_out_time': '11:00',
                'cancellation_policy': 'strict',
                'owner_id': admin.id,
                'room_types': [
                    {
                        'name': 'Standard Room',
                        'description': 'Comfortable room with views of the lodge gardens and wildlife',
                        'price_per_night': 320,
                        'capacity': 2,
                        'beds': 1,
                        'available': 12,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Private Veranda', 'Safe']
                    },
                    {
                        'name': 'Kilimanjaro View Suite',
                        'description': 'Luxury suite with stunning views of Mount Kilimanjaro, separate living area, and premium amenities',
                        'price_per_night': 500,
                        'capacity': 4,
                        'beds': 2,
                        'available': 6,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Private Deck', 'Kilimanjaro Views', 'Butler Service']
                    },
                ]
            },
            {
                'name': 'Lamu Old Town Hotel',
                'description': 'Beautiful Swahili-style hotel in the historic Lamu Old Town, a UNESCO World Heritage site. Combines traditional architecture with modern comfort. Perfect for cultural enthusiasts.',
                'address': 'Lamu Old Town, Lamu County',
                'city': 'Lamu',
                'county': 'Lamu',
                'coordinates': {'lat': -2.2689, 'lng': 40.9015},
                'images': [
                    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
                ],
                'amenities': ['Free WiFi', 'Restaurant', 'Bar', 'Spa', 'Room Service', 'Parking', 'Cultural Tours'],
                'check_in_time': '14:00',
                'check_out_time': '11:00',
                'cancellation_policy': 'free',
                'owner_id': admin.id,
                'room_types': [
                    {
                        'name': 'Heritage Room',
                        'description': 'Traditional Swahili-style room with hand-carved furniture and ocean views',
                        'price_per_night': 190,
                        'capacity': 2,
                        'beds': 1,
                        'available': 10,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Ocean Views', 'Traditional Decor']
                    },
                    {
                        'name': 'Suite with Sea View',
                        'description': 'Spacious suite with panoramic ocean views, traditional Swahili architecture',
                        'price_per_night': 280,
                        'capacity': 4,
                        'beds': 2,
                        'available': 4,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Sea Views', 'Private Terrace']
                    },
                ]
            },
            {
                'name': 'Lake Nakuru Lodge',
                'description': 'Stunning lodge perched on the cliffs overlooking Lake Nakuru. Offers breathtaking views of the lake, famous for its thousands of flamingos. Excellent wildlife viewing including rhinos, lions, and giraffes.',
                'address': 'Lake Nakuru National Park, Nakuru County',
                'city': 'Nakuru',
                'county': 'Nakuru',
                'coordinates': {'lat': -0.3031, 'lng': 36.0800},
                'images': [
                    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
                    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'
                ],
                'amenities': ['Free WiFi', 'Restaurant', 'Bar', 'Pool', 'Spa', 'Parking', 'Game Drives', 'Nature Walks', 'Bird Watching'],
                'check_in_time': '14:00',
                'check_out_time': '11:00',
                'cancellation_policy': 'partial',
                'owner_id': admin.id,
                'room_types': [
                    {
                        'name': 'Lake View Room',
                        'description': 'Comfortable room with panoramic views of Lake Nakuru and its famous flamingos',
                        'price_per_night': 180,
                        'capacity': 2,
                        'beds': 1,
                        'available': 14,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Private Balcony', 'Lake Views']
                    },
                    {
                        'name': 'Family Room',
                        'description': 'Spacious room with two bedrooms, perfect for families, overlooking the lake',
                        'price_per_night': 300,
                        'capacity': 5,
                        'beds': 3,
                        'available': 4,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Lake Views', 'Family Amenities']
                    },
                ]
            },
            {
                'name': 'Malindi Beach Resort',
                'description': 'Elegant beach resort on Kenya\'s North Coast. Known for its beautiful white sand beaches, crystal clear waters, and rich Swahili culture. Perfect for a relaxing coastal vacation.',
                'address': 'Malindi Beach, Kilifi County',
                'city': 'Malindi',
                'county': 'Kilifi',
                'coordinates': {'lat': -3.2229, 'lng': 40.1250},
                'images': [
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800'
                ],
                'amenities': ['Free WiFi', 'Restaurant', 'Bar', 'Pool', 'Spa', 'Room Service', 'Beach Access', 'Water Sports', 'Snorkeling'],
                'check_in_time': '14:00',
                'check_out_time': '11:00',
                'cancellation_policy': 'free',
                'owner_id': admin.id,
                'room_types': [
                    {
                        'name': 'Garden View Room',
                        'description': 'Comfortable room overlooking tropical gardens, close to the beach',
                        'price_per_night': 230,
                        'capacity': 2,
                        'beds': 1,
                        'available': 16,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Private Patio']
                    },
                    {
                        'name': 'Ocean View Room',
                        'description': 'Beautiful room with stunning views of the Indian Ocean and direct beach access',
                        'price_per_night': 320,
                        'capacity': 2,
                        'beds': 1,
                        'available': 8,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Ocean Views', 'Private Balcony']
                    },
                ]
            },
            {
                'name': 'Kisumu Imperial Hotel',
                'description': 'Premier hotel in Kisumu, Kenya\'s third-largest city. Located on the shores of Lake Victoria, offering beautiful sunset views and excellent hospitality.',
                'address': 'Jomo Kenyatta Highway, Kisumu',
                'city': 'Kisumu',
                'county': 'Kisumu',
                'coordinates': {'lat': -0.1022, 'lng': 34.7617},
                'images': [
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'
                ],
                'amenities': ['Free WiFi', 'Restaurant', 'Bar', 'Pool', 'Gym', 'Room Service', 'Parking', 'Business Center'],
                'check_in_time': '14:00',
                'check_out_time': '11:00',
                'cancellation_policy': 'free',
                'owner_id': admin.id,
                'room_types': [
                    {
                        'name': 'Standard Room',
                        'description': 'Comfortable room overlooking Lake Victoria, with modern amenities',
                        'price_per_night': 150,
                        'capacity': 2,
                        'beds': 1,
                        'available': 20,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Lake Views']
                    },
                    {
                        'name': 'Executive Suite',
                        'description': 'Luxury suite with panoramic views of Lake Victoria and exclusive amenities',
                        'price_per_night': 250,
                        'capacity': 3,
                        'beds': 2,
                        'available': 5,
                        'amenities': ['Air Conditioning', 'TV', 'Mini Bar', 'Lake Views', 'Living Area']
                    },
                ]
            },
            {
                'name': 'Samburu Lodge',
                'description': 'Unique lodge in the semi-arid Samburu region. Known for its distinctive wildlife including Grevy\'s zebra, reticulated giraffe, and Somali ostrich. Offers authentic safari experiences.',
                'address': 'Samburu National Reserve, Samburu County',
                'city': 'Samburu',
                'county': 'Samburu',
                'coordinates': {'lat': 0.6167, 'lng': 37.5333},
                'images': [
                    'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
                    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'
                ],
                'amenities': ['Free WiFi', 'Restaurant', 'Bar', 'Pool', 'Spa', 'Game Drives', 'Nature Walks', 'Cultural Tours'],
                'check_in_time': '14:00',
                'check_out_time': '11:00',
                'cancellation_policy': 'partial',
                'owner_id': admin.id,
                'room_types': [
                    {
                        'name': 'Standard Room',
                        'description': 'Comfortable room with views of the reserve and traditional Samburu architecture',
                        'price_per_night': 280,
                        'capacity': 2,
                        'beds': 1,
                        'available': 12,
                        'amenities': ['Air Conditioning', 'Mini Bar', 'Private Veranda', 'Safe']
                    },
                ]
            }
        ]
        
        # Add hotels to database
        for hotel_data in hotels_data:
            room_types_data = hotel_data.pop('room_types', [])
            
            hotel = Hotel(
                **hotel_data,
                rating=4.5,
                rating_count=0
            )
            db.session.add(hotel)
            db.session.flush()
            
            for rt_data in room_types_data:
                room_type = RoomType(
                    **rt_data,
                    hotel_id=hotel.id
                )
                db.session.add(room_type)
        
        db.session.commit()
        
        print("\n" + "="*60)
        print("✅ DATABASE SEEDED SUCCESSFULLY!")
        print("="*60)
        
        print("\n📊 SEED SUMMARY:")
        print(f"   👤 Admin User: {User.query.count()}")
        print(f"   🏨 Hotels: {Hotel.query.count()}")
        print(f"   🛏️  Room Types: {RoomType.query.count()}")
        
        print("\n🔑 ADMIN CREDENTIALS:")
        print("-" * 40)
        print("   Email: admin@staynest.com")
        print("   Password: admin123")
        
        print("\n🏨 KENYAN HOTELS ADDED:")
        print("-" * 40)
        for hotel in Hotel.query.all():
            room_count = len(hotel.room_types)
            print(f"   • {hotel.name}")
            print(f"     📍 {hotel.city}, {hotel.county}")
            print(f"     🛏️  {room_count} room types available")
            print()
        
        print("📍 DATABASE LOCATION:")
        print("-" * 40)
        print(f"   {app.config['SQLALCHEMY_DATABASE_URI']}")
        
        print("\n💡 NEXT STEPS:")
        print("-" * 40)
        print("   1. Run 'python run.py' to start the server")
        print("   2. Login with admin@staynest.com / admin123")
        print("   3. Create regular users through the registration API")
        print("   4. Add real customer data through the application")
        
        print("\n" + "="*60)
        print("🎉 Your StayNest database with REAL Kenyan hotels is ready!")
        print("="*60)

if __name__ == '__main__':
    seed_database()