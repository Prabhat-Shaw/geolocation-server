# Geolocation Server

## Technology stack

- TypeScript, Node.js, Nest.js, RESTful API, TypeORM, PostgreSQL, Jest, Swagger, Docker

## Application specification

- It should be a RESTful API ✅
- You can use https://ipstack.com/ for the geolocation of IP addresses and URLs ✅
- The back-end part of the application can be built in any framework of your choice ✅
- The application should preferably be hosted and available online (for example on Heroku - https://www.heroku.com/free) ✅
- Heroku also provides some free DBs so you can use them ✅
- It is preferable that the API operates using JSON (for both input and output) ✅
- You can create a registration form but using hardcoded values for authorisation is also acceptable (just make sure that API is secured by JWT token) ✅
- Specs, serializers and docker are always welcome! ✅

## Installation

```bash
# 1. Clone the application repository
git clone https://github.com/pietrzakadrian/nestjs-sofomo

# 2. Enter the application directory
cd nestjs-sofomo

# 3. Install required npm packages
yarn

# 4. Edit the environment variables
cp .env.example .env

# 5. Build the required dependencies
docker-compose up

# 6. Run application
yarn start
```

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
