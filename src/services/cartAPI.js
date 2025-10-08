const getCartItems = async () => {

    return [
        { 
            id: 1, 
            name: 'Arduino Uno R3', 
            price: 25, 
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=300&h=300&fit=crop'
        },
        { 
            id: 2, 
            name: 'ESP32 Development Board', 
            price: 12, 
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=100&h=100&fit=crop'
        },
        { 
            id: 3, 
            name: 'HC-SR04 Ultrasonic Sensor', 
            price: 5, 
            quantity: 3,
            image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=100&h=100&fit=crop'
        },
        { 
            id: 4, 
            name: 'Raspberry Pi 4 Model B', 
            price: 75, 
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=100&h=100&fit=crop'
        },
        { 
            id: 5, 
            name: 'Breadboard 830 Points', 
            price: 8, 
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=100&h=100&fit=crop'
        },
        { 
            id: 6, 
            name: 'DHT22 Temperature Humidity Sensor', 
            price: 15, 
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=100&h=100&fit=crop'
        }
    ]
 };

export { getCartItems };