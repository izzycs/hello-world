const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.6, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

const room = new THREE.Mesh(
  new THREE.BoxGeometry(10, 5, 10),
  new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.BackSide })
);
scene.add(room);

const monitorGeometry = new THREE.PlaneGeometry(1.6, 0.9);

function createMonitor(project, position) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 48px sans-serif';
  ctx.fillText(project.title, 50, 100);
  ctx.font = '24px sans-serif';
  ctx.fillText(project.description, 50, 180);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.MeshBasicMaterial({ map: texture });

  const mesh = new THREE.Mesh(monitorGeometry, material);
  mesh.position.copy(position);
  scene.add(mesh);
}

const projects = [
  { title: 'Project One', description: 'First project' },
  { title: 'Project Two', description: 'Second project' }
];

createMonitor(projects[0], new THREE.Vector3(-1, 1.2, -3));
createMonitor(projects[1], new THREE.Vector3(1, 1.2, -3));

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
