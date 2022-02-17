# ThunderCats Clinicial Project
Building out the base for future clincial projects utilizing firebase functions and pub/sub triggers.

# defaults.env -- contains all environment configuration variables, should be directly replaced with production values based on a secrets file stored off repo.

### project set up (before operations)
Run npm install in root, root of the function group ie: books/clinicians/patients, and change the source value of the firebase.json to relfect desired function group.

### project clean up (before pr back to main)
in firebase.json reset source value to be 'functions/books' and then commit code to reset the source value