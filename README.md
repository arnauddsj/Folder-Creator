# Folder-Creator
Create folders and move files accordingly to references in a JSON array with nodejs.

Create folder accordingly to pictures in directory. Script will match picture name with reference in JSON array, will catch a name in the array, and create folder accordingly.

This script is used to classify huge amount of pictures by folders.

To make it work, be sure you've updated list.json given as example.

ATTENTION :
As it's done for now do not:
- Use non alphabetical name in Style (folder can't be created otherwise)
- Put picture or other files in /images that are not referenced in the json
- Use combo Ref - Style if there is one of those 2 missing
