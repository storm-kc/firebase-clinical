# ThunderCats Clinicial Project
Building out the base for future clincial projects utilizing firebase functions and pub/sub triggers.

# defaults.env -- contains all environment configuration variables, should be directly replaced with production values based on a secrets file stored off repo.

### Required for function deployment and local testing
firebase.json needs the value 'source' to be updated to the desired function route folder, the default will be books, please reset to default='functions/books' after performing operations.