@echo off
echo Installing dependencies for Financial Advisor project...

echo.
echo Installing server dependencies...
cd server
npm install
cd ..

echo.
echo Installing client dependencies...
cd client
npm install
cd ..

echo.
echo Dependencies installation complete!
echo.
echo To start the server, run: cd server && npm start
echo To start the client, run: cd client && npm start
pause 