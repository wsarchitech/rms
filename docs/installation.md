*Install mongodb
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

sudo rm -rf /tmp/mongodb-27017.sock
sudo service mongod start

npm install mongoose


db.tenants.insertMany([
  { name: "tuv" },
  // Add more documents as needed
]