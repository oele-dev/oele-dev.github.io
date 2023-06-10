//Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 500;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0,0,10);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene.add(light);
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./house/logo.glb", function(gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0]
    house.position.x = 1
    house.rotation.set(0.1, 0, 10)
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  // house.rotation.x += 0.005;
  renderer.render(scene, camera);
}

init();

/* function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize); */

function getValue(start, end, progress) {
  if (start > end) {
    return start - ((progress - 1) / 99) * (start - end);
  } else {
    return start + ((progress - 1) / 99) * (end - start);
  }
}

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.create({
  /* markers: true, */
  once: true,
  trigger: "#section-a",
  start: "20% 10%",
  endTrigger: "#section-b",
  end: "-135px 50%",
  /* onToggle: self => console.log("toggled, isActive:", self.isActive), */
  onUpdate: self => {
    let progress = self.progress.toFixed(2) * 100;
    let x = getValue(0.1, 6.4, progress)
    house.rotation.x =  x
    /* console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity()); */
  }
});

ScrollTrigger.create({
  /* markers: true, */
  pin: true,
  once:true,
  trigger: "#section-b",
  start: "start center",
  endTrigger: "#section-b",
  end: "50% center",
  onUpdate: self => {
    let p = self.progress.toFixed(2) * 100
    let s = getValue(1, 0.6, p).toFixed(2)
    let x = getValue(1, -1, p)
    house.scale.set(s, s, 1)
    house.position.x = x
  }
});