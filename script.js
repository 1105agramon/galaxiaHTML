import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader(); // Cargador de imágenes

// Configuración inicial de la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer: Asocia el motor 3D con el canvas en el HTML
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('galaxy-canvas'),
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Controles para la rotación (mouse) y zoom
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 10;
controls.maxDistance = 200;
controls.zoomSpeed = 0.8;

const panLimit = 40;
controls.target.set(0, 0, 0);

const galaxyGroup = new THREE.Group();
scene.add(galaxyGroup);

// --- 🛠️ FUNCIÓN PARA MEZCLAR (SHUFFLE) UN ARRAY ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 📋 Lista de frases a usar (PEGA AQUÍ TU LISTA COMPLETA DE 85 ELEMENTOS)
const phrases = [
    "Mi planeta favorita (TU).",
    "Hasta tu enojo es mi constelación.",
    "Te amo,aunque odies a los hombres",
    "Mi berrinche favorito: el tuyo.(ya parale :v)",
    "Tú eres la galaxia; yo soy tu astronauta.",
    "Eres más brillante que todas las estrellas juntas.",
    "¡Deja la guerra y ven a mi!",
    "Te elijo siempre, incluso con tus puños listos.",
    "Perla, mi contadora de amor.",
    "Deja de picarme la cola :v",
    "Tu mente es el agujero negro más fascinante",
    "Soy tu chico chillón.",
    "Eres mi tulipán en el jardín espacial.",
    "Mi dulce guerrera. Lucha menos, bésame más.",
    "Universo y tú: mi obsesión.",
    "Me encanta molestarte con Diego.(Te amo más)",
    "Contigo, hasta el polvo picante sabe a gloria.",
    "Mi destino está en tu órbita, Perla.",
    "Somos el 20 más importante del mes.",
    "Tu inteligencia me conquista más que la magia.",
    "La única pelea que vale es la de tus besos y abrazos. ",
    "Perla, eres la estrella que no necesito buscar.",
    "La galaxia no es nada sin ti.",
    "Tu 'odio' es mi amor más intenso.",
    "¡Diego te manda saludos! (Es broma, te amo xd).",
    "Por ti soy sensible y muy feliz.",
    "El 20 siempre llega rápido. ¿Será la velocidad de la luz?",
    "Mi contadora personal de sueños cumplidos.",
    "Eres tan dulce y picante como el Lucas.",
    "Hasta en la galaxia, eres la más inteligente.",
    "Me encanta cuando me demuestras que eres la jefa.",
    "Mi sensibilidad es tu superpoder.",
    "Mi chica de los números, mi mundo.",
    "Perla, siempre ganas las peleas, lo admito.",
    "En cada 20, un nuevo capítulo.",
    "Perla, eres la mejor parte de ser yo.",
    "🪐", "🚀", "🌌", "🌠", "✨", "🌟", "💫", "☀️", "🌕", "🌑", "☄️", "🌍", 
    "💖", "❤️", "🥰", "😍", "😘", "💋", "💘", "🔥", "💜", "♾️", "💍", "👩‍❤️‍💋‍👨", 
    "🌷", "📚", "🪄", "💰", "📈", "🔢", "👑", "😈", "🌶️", "🍬", "🎉", "🗓️", 
    "😂", "🥊", "😭", "😊", "🤫", "😜", "🙈", "👂", "💡", "🧠", "👸",
    "🖼️", "🎶", "🎁", "💯", "🥂", "🎂",
    // ⬅️ Agrega las rutas a tus imágenes aquí (Ejemplos):
    "imagenes/IM1.jpg", 
    "imagenes/IM2.jpg", 
    "imagenes/IM3.jpg", 
    "imagenes/IM4.jpg", 
    "imagenes/IM5.jpg", 
    "imagenes/IM6.jpg", 
    "imagenes/IM7.jpg", 
    "imagenes/IM8.jpg", 
    "imagenes/IM9.jpg"
];

// Aplicar la mezcla
shuffleArray(phrases); 

// Función Universal: Crea textura de texto/emoji (Canvas) o carga imagen (TextureLoader)
function createTexture(resource) {
    if (resource.length > 4 && resource.includes('/')) {
        // Es una Imagen (asume que recursos largos con '/' son URLs/rutas)
        return textureLoader.load(resource);
    } else {
        // Es Texto o Emoji (Crea textura con Canvas)
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const isEmoji = resource.length <= 2;
        const fontSize = isEmoji ? 100 : 48;
        canvas.width = isEmoji ? 128 : 1024;
        canvas.height = 128;
        context.font = `bold ${fontSize}px Arial`;
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(resource, canvas.width / 2, canvas.height / 2);
        return new THREE.CanvasTexture(canvas);
    }
}

// --- 4. IMAGEN CENTRAL DE PERLA ---
function createCentralImage(imageURL) {
    const geometry = new THREE.PlaneGeometry(1, 1);
    
    // Cargar la textura y ajustar la escala al cargar
    const texture = textureLoader.load(imageURL, (tex) => {
        const aspectRatio = tex.image.width / tex.image.height;
        plane.scale.set(15 * aspectRatio, 15, 1); 
    });

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, 0, 0); 
    plane.scale.set(15, 15, 1); // Escala inicial

    return plane;
}

//  URL de la imagen central (¡Asegúrate que exista en la carpeta 'images'!)
const centralImage = createCentralImage('imagenes/IM7.jpg'); 
galaxyGroup.add(centralImage); 
// --- FIN: IMAGEN CENTRAL ---

// Parámetros de la Galaxia
const phraseCount = 200;
const arms = 5; 
const radius = 80;
const maxPhraseHeight = 20;
const maxStarHeight = 40;


// --- 1. CREACIÓN DE FRASES, EMOJIS e IMÁGENES (SPRITES) ---
for (let i = 0; i < phraseCount; i++) {
    const phraseIndex = i % phrases.length;
    const resource = phrases[phraseIndex];
    
    const spriteTexture = createTexture(resource); 

    const material = new THREE.SpriteMaterial({
        map: spriteTexture, transparent: true, opacity: 0.8, depthWrite: false
    });

    const sprite = new THREE.Sprite(material);
    sprite.isPhrase = true; 

    // Posicionamiento en forma de espiral
    const angle = (i % (phraseCount / arms)) * (Math.PI * 2 / (phraseCount / arms));
    const armAngle = Math.floor(i / (phraseCount / arms)) * (Math.PI * 2 / arms);
    const distance = Math.pow(i / phraseCount, 0.7) * radius;

    const thicknessFactor = Math.pow(1 - (distance / radius), 2);

    const x = Math.cos(angle + armAngle) * distance;
    const z = Math.sin(angle + armAngle) * distance;

    const y = (Math.random() - 0.5) * maxPhraseHeight * thicknessFactor;

    sprite.position.set(x, y, z);
    
    // Ajuste de Escala Dinámico
    if (resource.length > 4 && resource.includes('/')) {
        sprite.scale.set(20, 20, 1); // Escala para imágenes
    } else if (resource.length <= 2) {
        sprite.scale.set(3, 3, 1); // Escala para emojis
    } else {
        sprite.scale.set(20, 2.5, 1); // Escala para frases largas
    }

    galaxyGroup.add(sprite);
}

// --- 2. CREACIÓN DE ESTRELLAS CERCANAS (Partículas Rosado y Blanco) ---
const starGeometry = new THREE.BufferGeometry();
const starCount = 10000;
const positions = new Float32Array(starCount * 3);
const colors = new Float32Array(starCount * 3); 

const colorWhite = new THREE.Color(0xffffff); 
const colorPink = new THREE.Color(0xFF82F5); 

for (let i = 0; i < starCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius * 1.2;
    const thicknessFactor = Math.pow(1 - (Math.min(distance, radius) / radius), 1.5);
    const y = (Math.random() - 0.5) * maxStarHeight * thicknessFactor;

    positions[i * 3] = Math.cos(angle) * distance;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(angle) * distance;

    // Asignar color aleatorio
    if (Math.random() < 0.5) {
        colorWhite.toArray(colors, i * 3);
    } else {
        colorPink.toArray(colors, i * 3);
    }
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const starMaterial = new THREE.PointsMaterial({
    size: 0.2, 
    transparent: true, 
    opacity: 0.7, 
    blending: THREE.AdditiveBlending,
    vertexColors: true 
});

const stars = new THREE.Points(starGeometry, starMaterial);
galaxyGroup.add(stars);

// --- 3. CREACIÓN DE ESTRELLAS DE FONDO (Para el centelleo) ---
const bgStarCount = 5000;
const bgStarGeometry = new THREE.BufferGeometry();
const bgPositions = new Float32Array(bgStarCount * 3);
const bgColors = new Float32Array(bgStarCount * 3);
const twinkleData = [];

for (let i = 0; i < bgStarCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = 400 + Math.random() * 100;

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    bgPositions.set([x, y, z], i * 3);

    const color = new THREE.Color(0xffffff);
    bgColors.set([color.r, color.g, color.b], i * 3);

    twinkleData.push({
        speed: Math.random() * 0.5 + 0.1, 
        offset: Math.random() * 10 
    });
}

bgStarGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));
bgStarGeometry.setAttribute('color', new THREE.BufferAttribute(bgColors, 3));

const bgStarMaterial = new THREE.PointsMaterial({
    size: 0.8,
    vertexColors: true, 
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false
});

const backgroundStars = new THREE.Points(bgStarGeometry, bgStarMaterial);
scene.add(backgroundStars);

// --- MANEJO DE REDIMENSIONAMIENTO ---
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    const isMobile = width < 768 || width < height;

    if (isMobile) {
        camera.fov = 90;
        camera.position.set(0, 30, 100);
        controls.zoomSpeed = 1.2;
    } else {
        camera.fov = 75;
        camera.position.set(0, 25, 65);
        controls.zoomSpeed = 0.8;
    }

    // Ajuste de escala de las frases para móviles
    galaxyGroup.children.forEach(child => {
        if (child.isPhrase) {
            if (isMobile) {
                child.scale.set(14, 1.75, 1);
            } else {
                child.scale.set(20, 2.5, 1);
            }
        }
    });

    camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize);
onWindowResize(); 

// --- BUCLE DE ANIMACIÓN ---
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Rotación lenta de la galaxia
    galaxyGroup.rotation.y = elapsedTime * 0.05;

    // Límite de movimiento lateral (Panning)
    const targetVector = new THREE.Vector2(controls.target.x, controls.target.z);
    if (targetVector.length() > panLimit) {
        targetVector.setLength(panLimit);
        controls.target.x = targetVector.x;
        controls.target.z = targetVector.y;
    }

    // Centelleo de las estrellas de fondo
    const colors = backgroundStars.geometry.attributes.color;
    for (let i = 0; i < bgStarCount; i++) {
        const data = twinkleData[i];
        const brightness = (Math.sin(elapsedTime * data.speed + data.offset) + 1) / 2 * 0.7 + 0.3;
        colors.setXYZ(i, brightness, brightness, brightness);
    }
    colors.needsUpdate = true; 

    controls.update(); 
    renderer.render(scene, camera);
}

animate();