/**
 * Three.js 3D Interactive Showroom for ABHI EV MOTORS & EV JAZZ
 * Features:
 * - 3D Electric Scooter with automotive lacquer paint shaders
 * - Real-time color customizer (Glacier White, Cyber Black, Blossom Pink, Racing Blue, Solar Red, Electric Green)
 * - 360 OrbitControls with smooth damping
 * - Interactive lighting (Headlight spotlight, Studio key lights, Floor neon ring)
 * - X-Ray / Tech Teardown mode (reveals internal Battery Pack, High-Torque Hub Motor, Disc Brakes)
 * - Clickable 3D Hotspots mapped to screen projection
 * - Camera position transitions (Studio 360, Front Fairing, Cockpit HUD, Battery Bay)
 */

(function () {
    let container, scene, camera, renderer, controls;
    let scooterGroup, paintMaterials = [], internalParts = [];
    let headlightBeam, headlightLight;
    let turntableRing;
    let animationFrameId;
    let isXrayMode = false;
    let isHeadlightOn = true;
    let targetCameraPos = null;
    let isTransitioningCam = false;

    // Available color palette for the 3D vehicle
    const COLOR_PRESETS = {
        white: { primary: 0xf5f7fb, accent: 0x10b981, name: 'Glacier Pearl White' },
        black: { primary: 0x121418, accent: 0xe11d48, name: 'Cyber Stealth Black' },
        pink: { primary: 0xf472b6, accent: 0x38bdf8, name: 'Blossom Pastel Pink' },
        blue: { primary: 0x1d4ed8, accent: 0x38bdf8, name: 'Electric Sonic Blue' },
        red: { primary: 0xdc2626, accent: 0xfacc15, name: 'Racing Crimson Red' },
        green: { primary: 0x059669, accent: 0x34d399, name: 'Eco Emerald Green' }
    };

    // Hotspots data
    const HOTSPOTS = [
        {
            id: 'hotspot-headlight',
            name: 'LED Projector Headlamp',
            desc: 'High-intensity 6000K dual LED projector with integrated DRLs for crystal clear night visibility.',
            pos: new THREE.Vector3(0, 2.2, 1.8),
            camPos: { x: 0, y: 2.3, z: 3.5 }
        },
        {
            id: 'hotspot-battery',
            name: 'Removable Smart Battery',
            desc: '60V Graphene / Lithium-ion pack with smart BMS, IP67 waterproof enclosure and 3-hour fast charging.',
            pos: new THREE.Vector3(0, 1.1, -0.1),
            camPos: { x: 2.8, y: 1.4, z: 0.5 }
        },
        {
            id: 'hotspot-motor',
            name: 'High-Torque Hub Motor',
            desc: '1500W Peak Waterproof BLDC Motor with regenerative braking and instant torque delivery on inclines.',
            pos: new THREE.Vector3(0, 0.6, -1.9),
            camPos: { x: -2.5, y: 0.9, z: -2.2 }
        },
        {
            id: 'hotspot-disc',
            name: 'Hydraulic Disc Brakes',
            desc: 'Front ventilated disc brake with Combi-Braking System (CBS) for responsive stopping within meters.',
            pos: new THREE.Vector3(0.2, 0.6, 1.9),
            camPos: { x: 2.2, y: 0.8, z: 2.4 }
        },
        {
            id: 'hotspot-cluster',
            name: 'Digital Smart Cluster',
            desc: 'Full-color LCD dashboard showing real-time speed, battery percentage, riding modes (Eco/Sport/City).',
            pos: new THREE.Vector3(0, 2.6, 1.05),
            camPos: { x: 0, y: 3.4, z: 1.8 }
        }
    ];

    function init3DStudio() {
        container = document.getElementById('three-canvas-container');
        if (!container) return;

        const width = container.clientWidth || 800;
        const height = container.clientHeight || 520;

        // 1. Scene
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0a0e17, 0.04);

        // 2. Camera
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(4.2, 2.5, 4.5);

        // 3. Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        container.appendChild(renderer.domElement);

        // 4. Controls
        if (typeof THREE.OrbitControls !== 'undefined') {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't go below floor
            controls.minDistance = 2.0;
            controls.maxDistance = 8.5;
            controls.target.set(0, 1.3, 0);
        }

        // 5. Lighting
        setupLighting();

        // 6. Environment & Turntable Floor
        setupEnvironment();

        // 7. Build Electric Scooter Model
        buildScooterModel();

        // 8. Event listeners
        window.addEventListener('resize', onWindowResize);
        setupUIControls();

        // 9. Start loop
        animate();
    }

    function setupLighting() {
        // Ambient soft light
        const ambient = new THREE.AmbientLight(0x223344, 1.2);
        scene.add(ambient);

        // Main Key Light
        const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
        keyLight.position.set(5, 7, 5);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 1024;
        keyLight.shadow.mapSize.height = 1024;
        keyLight.shadow.bias = -0.001;
        scene.add(keyLight);

        // Fill Light (Cyan/Electric Green tint)
        const fillLight = new THREE.DirectionalLight(0x00e676, 1.4);
        fillLight.position.set(-6, 4, -4);
        scene.add(fillLight);

        // Rim Light from back-top
        const rimLight = new THREE.DirectionalLight(0x00f0ff, 1.8);
        rimLight.position.set(0, 5, -6);
        scene.add(rimLight);

        // Ground glow point lights
        const groundGlow1 = new THREE.PointLight(0x00e676, 2.5, 6);
        groundGlow1.position.set(0, 0.2, 0);
        scene.add(groundGlow1);

        const groundGlow2 = new THREE.PointLight(0x00e5ff, 1.5, 8);
        groundGlow2.position.set(2, 0.4, 2);
        scene.add(groundGlow2);
    }

    function setupEnvironment() {
        // Grid floor
        const gridHelper = new THREE.GridHelper(16, 32, 0x00e676, 0x1f2937);
        gridHelper.position.y = 0.005;
        gridHelper.material.opacity = 0.35;
        gridHelper.material.transparent = true;
        scene.add(gridHelper);

        // Reflective dark floor disc
        const floorGeo = new THREE.CircleGeometry(4.8, 64);
        const floorMat = new THREE.MeshStandardMaterial({
            color: 0x0c101b,
            metalness: 0.9,
            roughness: 0.3
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

        // Glowing neon turntable ring
        const ringGeo = new THREE.RingGeometry(3.6, 3.75, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x00e676,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
        });
        turntableRing = new THREE.Mesh(ringGeo, ringMat);
        turntableRing.rotation.x = -Math.PI / 2;
        turntableRing.position.y = 0.01;
        scene.add(turntableRing);

        // Secondary cyan concentric ring
        const innerRingGeo = new THREE.RingGeometry(2.4, 2.45, 64);
        const innerRingMat = new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
        });
        const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
        innerRing.rotation.x = -Math.PI / 2;
        innerRing.position.y = 0.012;
        scene.add(innerRing);
    }

    // Material helper for automotive lacquer
    function createBodyMaterial(hexColor = 0xf5f7fb) {
        const mat = new THREE.MeshStandardMaterial({
            color: hexColor,
            metalness: 0.65,
            roughness: 0.22,
            envMapIntensity: 1.2
        });
        paintMaterials.push(mat);
        return mat;
    }

    function buildScooterModel() {
        scooterGroup = new THREE.Group();
        scooterGroup.position.set(0, 0, 0);

        // Materials
        const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x1e2430, metalness: 0.85, roughness: 0.3 });
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 });
        const rubberMat = new THREE.MeshStandardMaterial({ color: 0x181a1f, roughness: 0.85, metalness: 0.1 });
        const seatLeatherMat = new THREE.MeshStandardMaterial({ color: 0x1a1d24, roughness: 0.7, metalness: 0.05 });
        const glassMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transmission: 0.9,
            opacity: 1,
            transparent: true,
            roughness: 0.1,
            ior: 1.5
        });
        const neonGreenGlow = new THREE.MeshBasicMaterial({ color: 0x00e676 });
        const neonRedGlow = new THREE.MeshBasicMaterial({ color: 0xff1744 });

        // Default lacquer body material
        const bodyMat = createBodyMaterial(0xf5f7fb);

        // ------------------ 1. WHEELS & BRAKES ------------------
        function makeWheel(radius = 0.58, tube = 0.14) {
            const wheelGroup = new THREE.Group();

            // Tire
            const tireGeo = new THREE.TorusGeometry(radius, tube, 20, 36);
            const tire = new THREE.Mesh(tireGeo, rubberMat);
            tire.rotation.y = Math.PI / 2;
            tire.castShadow = true;
            wheelGroup.add(tire);

            // Alloy Rim
            const rimGeo = new THREE.CylinderGeometry(radius * 0.72, radius * 0.72, tube * 1.5, 24);
            const rim = new THREE.Mesh(rimGeo, darkMetalMat);
            rim.rotation.z = Math.PI / 2;
            wheelGroup.add(rim);

            // Spoke blades (Sport design)
            for (let i = 0; i < 5; i++) {
                const angle = (i * Math.PI * 2) / 5;
                const spokeGeo = new THREE.BoxGeometry(radius * 0.65, 0.04, 0.08);
                const spoke = new THREE.Mesh(spokeGeo, chromeMat);
                spoke.rotation.x = angle;
                wheelGroup.add(spoke);
            }

            // Disc Brake Rotor
            const discGeo = new THREE.CylinderGeometry(radius * 0.52, radius * 0.52, 0.02, 24);
            const disc = new THREE.Mesh(discGeo, chromeMat);
            disc.rotation.z = Math.PI / 2;
            disc.position.x = tube * 0.85;
            wheelGroup.add(disc);

            // Red Brake Caliper
            const caliperGeo = new THREE.BoxGeometry(0.08, 0.16, 0.14);
            const caliperMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.5, roughness: 0.3 });
            const caliper = new THREE.Mesh(caliperGeo, caliperMat);
            caliper.position.set(tube * 0.88, radius * 0.35, radius * 0.3);
            wheelGroup.add(caliper);

            return wheelGroup;
        }

        // Front Wheel Assembly
        const frontWheel = makeWheel(0.55, 0.13);
        frontWheel.position.set(0, 0.55, 1.95);
        scooterGroup.add(frontWheel);

        // Rear Wheel Assembly (Hub Motor)
        const rearWheel = makeWheel(0.55, 0.13);
        rearWheel.position.set(0, 0.55, -1.85);
        scooterGroup.add(rearWheel);

        // High Torque Hub Motor casing on rear wheel
        const motorHubGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.28, 32);
        const motorHubMat = new THREE.MeshStandardMaterial({
            color: 0x0284c7,
            metalness: 0.9,
            roughness: 0.25,
            wireframe: false
        });
        const motorHub = new THREE.Mesh(motorHubGeo, motorHubMat);
        motorHub.rotation.z = Math.PI / 2;
        motorHub.position.set(0, 0.55, -1.85);
        scooterGroup.add(motorHub);
        internalParts.push({ mesh: motorHub, defaultColor: 0x0284c7, highlightColor: 0x00f0ff });

        // ------------------ 2. FRONT SUSPENSION & FORK ------------------
        const forkGroup = new THREE.Group();
        const leftForkGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.4, 16);
        const leftFork = new THREE.Mesh(leftForkGeo, chromeMat);
        leftFork.position.set(0.18, 1.15, 1.7);
        leftFork.rotation.x = -0.32;
        leftFork.castShadow = true;

        const rightFork = leftFork.clone();
        rightFork.position.x = -0.18;

        forkGroup.add(leftFork);
        forkGroup.add(rightFork);
        scooterGroup.add(forkGroup);

        // Front Mudguard
        const frontMudGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.32, 24, 1, true, 0, Math.PI);
        const frontMud = new THREE.Mesh(frontMudGeo, bodyMat);
        frontMud.rotation.z = Math.PI / 2;
        frontMud.position.set(0, 0.68, 1.95);
        frontMud.castShadow = true;
        scooterGroup.add(frontMud);

        // ------------------ 3. MAIN CHASSIS / FLOORBOARD ------------------
        // Low slung flat battery floorboard (Signature Indian EV style)
        const floorGeo = new THREE.BoxGeometry(0.72, 0.16, 1.85);
        const floorMesh = new THREE.Mesh(floorGeo, darkMetalMat);
        floorMesh.position.set(0, 0.48, 0.05);
        floorMesh.castShadow = true;
        scooterGroup.add(floorMesh);

        // Rubber grip mat with green accent line
        const gripMatGeo = new THREE.BoxGeometry(0.64, 0.02, 1.65);
        const gripMat = new THREE.Mesh(gripMatGeo, rubberMat);
        gripMat.position.set(0, 0.57, 0.05);
        scooterGroup.add(gripMat);

        const stripGeo = new THREE.BoxGeometry(0.03, 0.025, 1.5);
        const stripMesh = new THREE.Mesh(stripGeo, neonGreenGlow);
        stripMesh.position.set(0, 0.58, 0.05);
        scooterGroup.add(stripMesh);

        // ------------------ 4. SMART BATTERY PACK (UNDER FLOOR/SEAT) ------------------
        // Transparent casing for X-Ray inspection
        const battCaseGeo = new THREE.BoxGeometry(0.58, 0.42, 0.95);
        const battCaseMat = new THREE.MeshPhysicalMaterial({
            color: 0x00e676,
            transmission: 0.85,
            opacity: 0.9,
            transparent: true,
            roughness: 0.2
        });
        const batteryCase = new THREE.Mesh(battCaseGeo, battCaseMat);
        batteryCase.position.set(0, 0.82, -0.15);
        scooterGroup.add(batteryCase);
        internalParts.push({ mesh: batteryCase, defaultColor: 0x00e676, highlightColor: 0x10b981 });

        // Battery cylindrical cells inside
        const cellsGroup = new THREE.Group();
        const cellGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.32, 12);
        const cellMat = new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8, roughness: 0.2 });
        for (let r = -2; r <= 2; r++) {
            for (let c = -3; c <= 3; c++) {
                const cell = new THREE.Mesh(cellGeo, cellMat);
                cell.position.set(r * 0.1, 0, c * 0.11);
                cellsGroup.add(cell);
            }
        }
        cellsGroup.position.set(0, 0.82, -0.15);
        scooterGroup.add(cellsGroup);

        // ------------------ 5. FRONT APRON & AERODYNAMIC SHIELD ------------------
        // Sculpted front shield
        const apronGeo = new THREE.CylinderGeometry(0.42, 0.58, 1.45, 16, 1, false, 0, Math.PI);
        const apron = new THREE.Mesh(apronGeo, bodyMat);
        apron.position.set(0, 1.45, 1.35);
        apron.rotation.y = -Math.PI / 2;
        apron.rotation.z = -0.28;
        apron.scale.set(1.1, 1, 0.7);
        apron.castShadow = true;
        scooterGroup.add(apron);

        // Central aerodynamic nose cone / grille
        const noseGeo = new THREE.ConeGeometry(0.36, 1.1, 8);
        const noseMat = createBodyMaterial(0x181e29);
        const nose = new THREE.Mesh(noseGeo, noseMat);
        nose.rotation.x = 0.32;
        nose.position.set(0, 1.48, 1.58);
        scooterGroup.add(nose);

        // Headlight fixture
        const headlightGeo = new THREE.BoxGeometry(0.44, 0.18, 0.12);
        const headlightHousing = new THREE.Mesh(headlightGeo, darkMetalMat);
        headlightHousing.position.set(0, 1.82, 1.62);
        headlightHousing.rotation.x = -0.25;
        scooterGroup.add(headlightHousing);

        // LED Headlamp Lens
        const lensGeo = new THREE.BoxGeometry(0.4, 0.14, 0.04);
        const lensMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const lens = new THREE.Mesh(lensGeo, lensMat);
        lens.position.set(0, 1.82, 1.68);
        lens.rotation.x = -0.25;
        scooterGroup.add(lens);

        // Glowing DRL Brow Strip
        const drlGeo = new THREE.BoxGeometry(0.46, 0.03, 0.05);
        const drl = new THREE.Mesh(drlGeo, neonGreenGlow);
        drl.position.set(0, 1.92, 1.65);
        drl.rotation.x = -0.25;
        scooterGroup.add(drl);

        // Headlight spotlight beam projecting onto floor
        headlightLight = new THREE.SpotLight(0xffffff, 4.5, 14, Math.PI / 6, 0.45, 1.2);
        headlightLight.position.set(0, 1.85, 1.7);
        headlightLight.target.position.set(0, 0, 7.5);
        scene.add(headlightLight);
        scene.add(headlightLight.target);

        // Volumetric light cone mesh
        const beamGeo = new THREE.ConeGeometry(1.6, 6, 24, 1, true);
        const beamMat = new THREE.MeshBasicMaterial({
            color: 0x80d8ff,
            transparent: true,
            opacity: 0.14,
            side: THREE.DoubleSide
        });
        headlightBeam = new THREE.Mesh(beamGeo, beamMat);
        headlightBeam.rotation.x = -Math.PI / 2 + 0.22;
        headlightBeam.position.set(0, 1.4, 4.5);
        scooterGroup.add(headlightBeam);

        // ------------------ 6. HANDLEBAR & DIGITAL COCKPIT ------------------
        const barStemGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.75, 16);
        const barStem = new THREE.Mesh(barStemGeo, darkMetalMat);
        barStem.position.set(0, 2.15, 1.22);
        barStem.rotation.x = -0.28;
        scooterGroup.add(barStem);

        // Horizontal handlebars
        const handleGeo = new THREE.CylinderGeometry(0.032, 0.032, 1.15, 16);
        const handle = new THREE.Mesh(handleGeo, darkMetalMat);
        handle.rotation.z = Math.PI / 2;
        handle.position.set(0, 2.52, 1.12);
        scooterGroup.add(handle);

        // Rubber Grips
        const gripLGeo = new THREE.CylinderGeometry(0.042, 0.042, 0.22, 16);
        const gripL = new THREE.Mesh(gripLGeo, rubberMat);
        gripL.rotation.z = Math.PI / 2;
        gripL.position.set(0.48, 2.52, 1.12);
        scooterGroup.add(gripL);

        const gripR = gripL.clone();
        gripR.position.x = -0.48;
        scooterGroup.add(gripR);

        // Brake levers (Chrome)
        const leverGeo = new THREE.BoxGeometry(0.22, 0.02, 0.04);
        const leverL = new THREE.Mesh(leverGeo, chromeMat);
        leverL.position.set(0.42, 2.5, 1.2);
        leverL.rotation.y = -0.25;
        scooterGroup.add(leverL);

        const leverR = leverL.clone();
        leverR.position.x = -0.42;
        leverR.rotation.y = 0.25;
        scooterGroup.add(leverR);

        // Side Mirrors
        function makeMirror(isRight = false) {
            const mirrorGroup = new THREE.Group();
            const stalkGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.35, 8);
            const stalk = new THREE.Mesh(stalkGeo, chromeMat);
            stalk.rotation.z = isRight ? -0.45 : 0.45;
            stalk.rotation.x = -0.2;
            mirrorGroup.add(stalk);

            const headGeo = new THREE.BoxGeometry(0.18, 0.12, 0.03);
            const head = new THREE.Mesh(headGeo, darkMetalMat);
            head.position.set(isRight ? -0.15 : 0.15, 0.28, 0.02);
            mirrorGroup.add(head);

            const glassFaceGeo = new THREE.PlaneGeometry(0.16, 0.1);
            const glassFace = new THREE.Mesh(glassFaceGeo, chromeMat);
            glassFace.position.set(isRight ? -0.15 : 0.15, 0.28, -0.005);
            glassFace.rotation.y = Math.PI;
            mirrorGroup.add(glassFace);

            return mirrorGroup;
        }
        const mirrorL = makeMirror(false);
        mirrorL.position.set(0.38, 2.54, 1.12);
        scooterGroup.add(mirrorL);

        const mirrorR = makeMirror(true);
        mirrorR.position.set(-0.38, 2.54, 1.12);
        scooterGroup.add(mirrorR);

        // Digital Dashboard HUD display
        const dashHousingGeo = new THREE.BoxGeometry(0.38, 0.22, 0.14);
        const dashHousing = new THREE.Mesh(dashHousingGeo, darkMetalMat);
        dashHousing.position.set(0, 2.55, 1.05);
        dashHousing.rotation.x = 0.55;
        scooterGroup.add(dashHousing);

        // Canvas texture for digital cluster
        const hudCanvas = document.createElement('canvas');
        hudCanvas.width = 256;
        hudCanvas.height = 128;
        const hudCtx = hudCanvas.getContext('2d');
        hudCtx.fillStyle = '#060d17';
        hudCtx.fillRect(0, 0, 256, 128);
        hudCtx.fillStyle = '#00e676';
        hudCtx.font = 'bold 44px sans-serif';
        hudCtx.fillText('48', 40, 68);
        hudCtx.font = '18px sans-serif';
        hudCtx.fillStyle = '#94a3b8';
        hudCtx.fillText('km/h', 105, 66);
        hudCtx.fillStyle = '#38bdf8';
        hudCtx.font = 'bold 20px sans-serif';
        hudCtx.fillText('SPORT • 89%', 40, 108);

        const hudTexture = new THREE.CanvasTexture(hudCanvas);
        const hudScreenGeo = new THREE.PlaneGeometry(0.32, 0.16);
        const hudScreenMat = new THREE.MeshBasicMaterial({ map: hudTexture });
        const hudScreen = new THREE.Mesh(hudScreenGeo, hudScreenMat);
        hudScreen.position.set(0, 2.57, 1.01);
        hudScreen.rotation.x = -Math.PI / 2 + 1.0;
        scooterGroup.add(hudScreen);

        // ------------------ 7. REAR BODYWORK & SEAT ------------------
        // Rear sculptured side panels
        const rearCowlGeo = new THREE.BoxGeometry(0.72, 0.65, 1.6);
        const rearCowl = new THREE.Mesh(rearCowlGeo, bodyMat);
        rearCowl.position.set(0, 1.02, -0.95);
        rearCowl.castShadow = true;
        scooterGroup.add(rearCowl);

        // Sleek comfort saddle seat
        const seatGeo = new THREE.BoxGeometry(0.64, 0.16, 1.4);
        const seat = new THREE.Mesh(seatGeo, seatLeatherMat);
        seat.position.set(0, 1.38, -0.92);
        seat.rotation.x = 0.08;
        seat.castShadow = true;
        scooterGroup.add(seat);

        // Rear grab handle (Chrome / Metal)
        const grabGeo = new THREE.TorusGeometry(0.28, 0.025, 12, 24, Math.PI);
        const grabRail = new THREE.Mesh(grabGeo, chromeMat);
        grabRail.position.set(0, 1.42, -1.68);
        grabRail.rotation.x = Math.PI / 2;
        scooterGroup.add(grabRail);

        // LED Taillight strip (Cyber red neon)
        const tailGeo = new THREE.BoxGeometry(0.48, 0.08, 0.05);
        const taillight = new THREE.Mesh(tailGeo, neonRedGlow);
        taillight.position.set(0, 1.18, -1.78);
        scooterGroup.add(taillight);

        // Rear License Plate Bracket
        const plateHolderGeo = new THREE.BoxGeometry(0.24, 0.18, 0.02);
        const plateHolder = new THREE.Mesh(plateHolderGeo, darkMetalMat);
        plateHolder.position.set(0, 0.88, -1.9);
        scooterGroup.add(plateHolder);

        // Center kickstand
        const standGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.55, 8);
        const stand = new THREE.Mesh(standGeo, chromeMat);
        stand.position.set(0.3, 0.32, -0.1);
        stand.rotation.z = -0.55;
        stand.rotation.x = 0.2;
        scooterGroup.add(stand);

        // Add to main scene
        scene.add(scooterGroup);
    }

    // Set body lacquer color
    function setVehicleColor(colorKey) {
        const preset = COLOR_PRESETS[colorKey] || COLOR_PRESETS.white;
        paintMaterials.forEach(mat => {
            mat.color.setHex(preset.primary);
        });

        // Update color label in DOM if present
        const label = document.getElementById('selected-color-label');
        if (label) {
            label.textContent = preset.name;
        }

        // Active button styling
        document.querySelectorAll('.color-dot-btn').forEach(btn => {
            if (btn.getAttribute('data-color') === colorKey) {
                btn.classList.add('ring-4', 'ring-emerald-400');
            } else {
                btn.classList.remove('ring-4', 'ring-emerald-400');
            }
        });
    }

    // Toggle X-Ray mode (reveals internal battery and motor)
    function toggleXray(enable) {
        isXrayMode = enable !== undefined ? enable : !isXrayMode;

        paintMaterials.forEach(mat => {
            mat.wireframe = isXrayMode;
            mat.opacity = isXrayMode ? 0.35 : 1.0;
            mat.transparent = isXrayMode;
        });

        internalParts.forEach(part => {
            part.mesh.material.color.setHex(isXrayMode ? part.highlightColor : part.defaultColor);
        });

        const btn = document.getElementById('btn-toggle-xray');
        if (btn) {
            btn.classList.toggle('active-mode', isXrayMode);
            btn.textContent = isXrayMode ? '⚡ Standard View' : '🔬 X-Ray / Tech View';
        }
    }

    // Toggle headlight
    function toggleHeadlight(state) {
        isHeadlightOn = state !== undefined ? state : !isHeadlightOn;
        if (headlightLight) headlightLight.intensity = isHeadlightOn ? 4.5 : 0;
        if (headlightBeam) headlightBeam.visible = isHeadlightOn;

        const btn = document.getElementById('btn-toggle-light');
        if (btn) {
            btn.classList.toggle('active-mode', isHeadlightOn);
            btn.textContent = isHeadlightOn ? '💡 Lights ON' : '💡 Lights OFF';
        }
    }

    // Camera preset transition
    function setCameraPreset(viewName) {
        if (!controls) return;
        const presets = {
            studio: { x: 4.2, y: 2.5, z: 4.5, target: { x: 0, y: 1.3, z: 0 } },
            front: { x: 0, y: 1.8, z: 4.6, target: { x: 0, y: 1.5, z: 1.2 } },
            side: { x: 5.2, y: 1.3, z: 0.1, target: { x: 0, y: 1.1, z: 0 } },
            battery: { x: 2.8, y: 1.4, z: 0.5, target: { x: 0, y: 0.9, z: -0.1 } },
            cockpit: { x: 0, y: 3.4, z: 1.8, target: { x: 0, y: 2.2, z: 0.8 } }
        };

        const config = presets[viewName] || presets.studio;
        targetCameraPos = config;
        isTransitioningCam = true;

        if (viewName === 'battery') {
            toggleXray(true);
        } else if (isXrayMode && viewName !== 'battery') {
            toggleXray(false);
        }
    }

    // Update screen 2D position for 3D hotspots
    function updateHotspots() {
        const hotspotElems = document.querySelectorAll('.scene-hotspot-pin');
        if (!hotspotElems.length || !camera || !renderer) return;

        const widthHalf = (container.clientWidth || 800) / 2;
        const heightHalf = (container.clientHeight || 520) / 2;

        HOTSPOTS.forEach(spot => {
            const elem = document.getElementById(spot.id);
            if (!elem) return;

            const wp = spot.pos.clone();
            wp.project(camera);

            // Is in front of camera?
            if (wp.z < 1) {
                const x = wp.x * widthHalf + widthHalf;
                const y = -(wp.y * heightHalf) + heightHalf;
                elem.style.transform = `translate(${x}px, ${y}px)`;
                elem.style.display = 'flex';
            } else {
                elem.style.display = 'none';
            }
        });
    }

    // Render loop
    function animate() {
        animationFrameId = requestAnimationFrame(animate);

        // Smooth camera transition if active
        if (isTransitioningCam && targetCameraPos) {
            camera.position.lerp(new THREE.Vector3(targetCameraPos.x, targetCameraPos.y, targetCameraPos.z), 0.08);
            controls.target.lerp(new THREE.Vector3(targetCameraPos.target.x, targetCameraPos.target.y, targetCameraPos.target.z), 0.08);

            if (camera.position.distanceTo(new THREE.Vector3(targetCameraPos.x, targetCameraPos.y, targetCameraPos.z)) < 0.05) {
                isTransitioningCam = false;
            }
        }

        // Slow turntable ring pulse
        if (turntableRing) {
            turntableRing.rotation.z += 0.003;
        }

        if (controls) controls.update();
        if (renderer && scene && camera) {
            renderer.render(scene, camera);
            updateHotspots();
        }
    }

    function onWindowResize() {
        if (!container || !camera || !renderer) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    function setupUIControls() {
        // Color selection
        document.querySelectorAll('.color-dot-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const color = btn.getAttribute('data-color');
                setVehicleColor(color);
            });
        });

        // X-ray toggle
        const xrayBtn = document.getElementById('btn-toggle-xray');
        if (xrayBtn) {
            xrayBtn.addEventListener('click', () => toggleXray());
        }

        // Headlight toggle
        const lightBtn = document.getElementById('btn-toggle-light');
        if (lightBtn) {
            lightBtn.addEventListener('click', () => toggleHeadlight());
        }

        // Camera presets
        document.querySelectorAll('.cam-preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.cam-preset-btn').forEach(b => b.classList.remove('active-preset'));
                btn.classList.add('active-preset');
                const preset = btn.getAttribute('data-preset');
                setCameraPreset(preset);
            });
        });

        // Hotspot pin clicks
        HOTSPOTS.forEach(spot => {
            const pin = document.getElementById(spot.id);
            if (pin) {
                pin.addEventListener('click', () => {
                    const infoCard = document.getElementById('hotspot-info-card');
                    const infoTitle = document.getElementById('hotspot-info-title');
                    const infoDesc = document.getElementById('hotspot-info-desc');
                    if (infoCard && infoTitle && infoDesc) {
                        infoTitle.textContent = spot.name;
                        infoDesc.textContent = spot.desc;
                        infoCard.classList.remove('hidden');
                    }
                    if (spot.camPos) {
                        setCameraPreset('studio');
                        targetCameraPos = {
                            x: spot.camPos.x,
                            y: spot.camPos.y,
                            z: spot.camPos.z,
                            target: { x: spot.pos.x, y: spot.pos.y, z: spot.pos.z }
                        };
                        isTransitioningCam = true;
                    }
                });
            }
        });

        // Close info card
        const closeInfoBtn = document.getElementById('close-hotspot-info');
        if (closeInfoBtn) {
            closeInfoBtn.addEventListener('click', () => {
                const infoCard = document.getElementById('hotspot-info-card');
                if (infoCard) infoCard.classList.add('hidden');
            });
        }
    }

    // Expose API globally
    window.EVStudio = {
        init: init3DStudio,
        setColor: setVehicleColor,
        toggleXray: toggleXray,
        toggleHeadlight: toggleHeadlight,
        setCamera: setCameraPreset
    };

    // Auto-init on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init3DStudio);
    } else {
        init3DStudio();
    }
})();
