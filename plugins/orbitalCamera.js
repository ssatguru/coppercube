// Author: Satguru P Srivastava
// Version: 1.0.0 (4/13/2022)
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

function orbitCameraH(angle) {
  //angle to rotate by
  let a = angle;
  //in radians
  let ra = (a * Math.PI) / 180;

  //find editor camera
  let cameraNode = findCamera("Perspective");

  let sn = editorGetSelectedSceneNode();
  let snp = ccbGetSceneNodeProperty(sn, "Position");
  if (snp) {
    ccbSetSceneNodeProperty(cameraNode, "Target", snp.x, snp.y, snp.z);
  }

  let t = ccbGetSceneNodeProperty(cameraNode, "Target");
  let p = ccbGetSceneNodeProperty(cameraNode, "Position");

  //rotate in horizontal plane around target (Y remains same)

  //radius around the vertical axis from the target
  let r = Math.sqrt((t.x - p.x) * (t.x - p.x) + (t.z - p.z) * (t.z - p.z));

  //position of camera relative to target
  let x1 = p.x - t.x;
  let z1 = p.z - t.z;

  //relative postion of camera after rotating it around target by ra radians
  let x2 = x1 * Math.cos(ra) - z1 * Math.sin(ra);
  let z2 = x1 * Math.sin(ra) + z1 * Math.cos(ra);

  //position of camera relative to world origin
  let x3 = t.x + x2;
  let z3 = t.z + z2;

  ccbSetSceneNodeProperty(cameraNode, "Position", x3, p.y, z3);
}

function orbitCameraV(angle) {
  //in radians
  let ra = (angle * Math.PI) / 180;

  //find editor camera
  //find editor camera
  let cameraNode = findCamera("Perspective");

  //focus on selected node
  let sn = editorGetSelectedSceneNode();
  let snp = ccbGetSceneNodeProperty(sn, "Position");
  if (snp) {
    ccbSetSceneNodeProperty(cameraNode, "Target", snp.x, snp.y, snp.z);
  }

  let t = ccbGetSceneNodeProperty(cameraNode, "Target");
  let c = ccbGetSceneNodeProperty(cameraNode, "Position");

  //distance between camera and target
  let r = Math.sqrt((t.x - c.x) * (t.x - c.x) + (t.y - c.y) * (t.y - c.y) + (t.z - c.z) * (t.z - c.z));

  //angle between xy plane and the camera-target vertical plane
  let b = Math.atan((t.z - c.z) / (c.x - t.x));

  //in camera-target vertical plane, angle between camera target line and horizontal plane
  let theta = Math.asin((c.y - t.y) / r);

  //find new position of camera in the camera-target vertical plane
  //and transform to the world
  let d = r * Math.cos(theta + ra);
  if (c.x > t.x) d = -d;
  let x3 = t.x - d * Math.cos(b);
  let z3 = t.z + d * Math.sin(b);
  let y3 = t.y + r * Math.sin(theta + ra);

  ccbSetSceneNodeProperty(cameraNode, "Position", x3, y3, z3);
}

editorRegisterMenuEntry("orbitCameraH(-10)", "orbit camera left\tShift+A");
editorRegisterMenuEntry("orbitCameraH(10)", "orbit camera right\tShift+D");
editorRegisterMenuEntry("orbitCameraV(10)", "orbit camera up\tShift+W");
editorRegisterMenuEntry("orbitCameraV(-10)", "orbit camera down\tShift+S");
