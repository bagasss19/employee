# employee
employee hierarchy app

# Tech Stack
- express
- node js
- typescript
- docker
- swagger
- jest
- grafana
- loki

# How to run
1. run docker compose up
2. Go to localhost:8000/docs to see API documentaion

# Test & Coverage
1. Run npm run test to do unit test
2. Run npm run coverage to check coverage test

# Monitoring
1. Go to localhost:3000 to access grafana
2. Go to connection -> data source, you will find loki as default data source, click it
3. Click test and explore view
4. at label filter, set dropdown to app and value employee
5. click run query, you will see logging there