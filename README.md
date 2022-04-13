# CopperCubeStuff

## Plugins
### orbitalCamera  
An editor plugin to orbit (horizontally or vertically) the editor's perspective camera around a selected object.  
  
Keys  
"a" - orbit left  
"d" - orbit right  
"w" - oribit up  
"s" - orbit down  

Pressing on of the above key, focuses the camera on the selected object and orbits the camera by 10 degree around it.  
If no object is selected  the camera orbits around its target point.  
  
To change the keys or the amount by which the camera oribits, edit the following lines in the "orbitalCamera.js" file.  
  
    editorRegisterMenuEntry("orbitCameraH(-10)", "orbit camera left\tShift+A");  
    editorRegisterMenuEntry("orbitCameraH(10)", "orbit camera right\tShift+D");  
    editorRegisterMenuEntry("orbitCameraV(10)", "orbit camera up\tShift+W");  
    editorRegisterMenuEntry("orbitCameraV(-10)", "orbit camera down\tShift+S");  

To install the plugin 
- download "Source Code (zip or tar.gz)" from https://github.com/ssatguru/CopperCubeStuff/releases
- extract "orbitalCamera.js" file and copy it to  
   your Documents\CopperCube\plugins on Windows  
   or  
   ~/Documents/CopperCube/plugins on macOS 
- restart CopperCube



