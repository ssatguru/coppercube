// Author: Satguru P Srivastava
// Version: 1.0.0 (1/5/2023)
// license: CopperCube extension script License

function findCamera(name) {
  //find editor camera
  let root = ccbGetRootSceneNode();
  let count = ccbGetSceneNodeChildCount(root);
  for (let i = 0; i < count; ++i) {
    let child = ccbGetChildSceneNode(root, i);
    let nn = ccbGetSceneNodeProperty(child, "Name");
    let typ = ccbGetSceneNodeProperty(child, "Type");

    if (typ == "camera" && nn == name) {
      return child;
    }
  }
}

function moveCamera(d, s) {
  //find editor camera
  let cameraNode = findCamera("Perspective");

  let t = ccbGetSceneNodeProperty(cameraNode, "Target");
  let p = ccbGetSceneNodeProperty(cameraNode, "Position");

  //target vector - camera to target
  let tx = t.x - p.x;
  let ty = t.y - p.y;
  let tz = t.z - p.z;

  let sx = 0,
    sy = 0,
    sz = 0;

  if (d == "fb") {
    //distance between postion and target
    let dt = Math.sqrt(tx * tx + ty * ty + tz * tz);
    //ratio by which we are moving towards target
    let r = s / dt;

    sx = r * tx;
    sy = r * ty;
    sz = r * tz;
  } else if (d == "lr") {
    let u = ccbGetSceneNodeProperty(cameraNode, "UpVector");

    //take cross product of up and target vector
    let cx = ty * u.z - tz * u.y;
    let cy = tz * u.x - tx * u.z;
    let cz = tx * u.y - ty * u.x;

    let cl = Math.sqrt(cx * cx + cy * cy + cz * cz);
    //ratio by which we are moving towards target
    let r = s / cl;

    sx = r * cx;
    sy = r * cy;
    sz = r * cz;
  }

  let xp, yp, zp, xt, yt, zt;

  //new camera  position
  xp = p.x - sx;
  yp = p.y - sy;
  zp = p.z - sz;

  //new target position
  xt = t.x - sx;
  yt = t.y - sy;
  zt = t.z - sz;

  ccbSetSceneNodeProperty(cameraNode, "Position", xp, yp, zp);
  ccbSetSceneNodeProperty(cameraNode, "Target", xt, yt, zt);
}

editorRegisterMenuEntry("moveCamera('lr',-5)", "move camera left\tA");
editorRegisterMenuEntry("moveCamera('lr', 5)", "move camera right\tD");
editorRegisterMenuEntry("moveCamera('fb',-5)", "move camera forward\tW");
editorRegisterMenuEntry("moveCamera('fb', 5)", "move camera backward\tS");
