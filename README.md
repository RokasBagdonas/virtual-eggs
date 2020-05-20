# virtual-eggs
Dissertation project for recreating diverse Guillemot egg patterns in a web application. Users are able to change the parameters that influence the way patterns are made.
Using THREE.js for a 3D view and spatial statistics, kriging for texture generation. 

## To run
While in the project's root directory
```bash
npm install && node app.js.
```

Access the application via localhost:3000/dissertation.

To toggle certain patterns, go to /public/javascripts/dissertation/EggTexture.js drawAllTextures() and comment/comment 
out the desired ones. 
