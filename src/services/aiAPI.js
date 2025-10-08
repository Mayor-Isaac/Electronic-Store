const getAIConversations = async () => {
    return [
        {
            question: "How do I connect an LED to Arduino Uno?",
            answer: "To connect an LED to Arduino Uno: 1) Connect the long leg (anode) of the LED to a digital pin (e.g., pin 13) through a 220Ω resistor. 2) Connect the short leg (cathode) to GND. 3) Use digitalWrite(13, HIGH) to turn it on and digitalWrite(13, LOW) to turn it off.",
            timestamp: "2025-10-08T10:30:00Z"
        },
        {
            question: "What's the difference between Arduino Uno and ESP32?",
            answer: "Arduino Uno uses ATmega328P microcontroller, operates at 5V, has 14 digital pins, and costs around $25. ESP32 has dual-core processor, built-in WiFi/Bluetooth, operates at 3.3V, has more GPIO pins, and costs around $12. ESP32 is more powerful and better for IoT projects.",
            timestamp: "2025-10-08T11:15:00Z"
        },
        {
            question: "How to read temperature from DHT22 sensor?",
            answer: "To read DHT22: 1) Install DHT sensor library. 2) Connect VCC to 3.3V/5V, GND to ground, DATA to digital pin (e.g., pin 2). 3) Use code: #include <DHT.h>, DHT dht(2, DHT22), then dht.readTemperature() and dht.readHumidity().",
            timestamp: "2025-10-08T12:00:00Z"
        },
        {
            question: "What resistor value should I use with LEDs?",
            answer: "For 5V Arduino with standard LEDs: Use 220Ω resistor for red LEDs, 150Ω for blue/white LEDs. Formula: R = (Vsupply - Vled) / Iled. For 3.3V systems, use smaller resistors (100-150Ω). Always check LED specifications for forward voltage and current.",
            timestamp: "2025-10-08T12:45:00Z"
        },
        {
            question: "How to use HC-SR04 ultrasonic sensor for distance measurement?",
            answer: "Connect VCC to 5V, GND to ground, Trig to digital pin 9, Echo to pin 10. Code: digitalWrite(trigPin, HIGH) for 10μs, then LOW. Measure pulseIn(echoPin, HIGH). Distance = duration * 0.034 / 2 (in cm).",
            timestamp: "2025-10-08T13:20:00Z"
        },
        {
            question: "Can I power Arduino with a 9V battery?",
            answer: "Yes, you can connect a 9V battery to the DC jack or Vin pin. Arduino's onboard regulator converts it to 5V. However, 9V batteries have low capacity (~500mAh) and won't last long. Consider using 4xAA batteries (6V) or a USB power bank for longer runtime.",
            timestamp: "2025-10-08T14:10:00Z"
        },
        {
            question: "What's the purpose of a breadboard in electronics?",
            answer: "A breadboard is a prototyping tool that allows you to build circuits without soldering. It has tie points connected internally in rows and columns. You can insert component leads and jumper wires to create temporary connections. Great for testing circuits before making permanent PCBs.",
            timestamp: "2025-10-08T14:55:00Z"
        },
        {
            question: "How do I control a servo motor with Arduino?",
            answer: "Include Servo library: #include <Servo.h>. Create servo object: Servo myServo. In setup(): myServo.attach(9). To control: myServo.write(angle) where angle is 0-180 degrees. Connect servo red wire to 5V, black to GND, signal wire to digital pin 9.",
            timestamp: "2025-10-08T15:30:00Z"
        }
    ];
};

export { getAIConversations };