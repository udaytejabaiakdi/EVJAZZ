/**
 * EV JAZZ — Pure White Minimalist Modern Application Logic
 * Authorized Showroom: ABHI EV MOTORS • Kukatpally & IDA Nacharam, Hyderabad
 * Transparent Cutout Studio Photography Edition with Glassmorphism Slider
 */

const VEHICLES = [
    {
        id: 'pro',
        name: 'EV JAZZ PRO',
        category: 'Daily Commuter',
        tagline: 'Ultra-economical, nimble and engineered for effortless city navigation.',
        imageCutout: 'assets/models/pro_cutout.png',
        topSpeed: '45-50 km/h',
        motor: '1200W Waterproof BLDC',
        chargingTime: '3.5 - 5 Hours',
        bootSpace: '18 Litres',
        brakes: 'Front Disc / Rear Drum (CBS)',
        startingPrice: 43000,
        startingMRP: 49000,
        highlights: [
            'Ultra low running cost: ~₹6 - 8 per 100 km',
            'Lightweight featherlight handling through tight city traffic',
            'USB phone charging socket & digital meter cluster',
            'Combi-Braking System (CBS) for responsive, confident stops'
        ],
        variants: [
            { type: 'Graphene 60V 32AH', range: '60+ km', oldPrice: 49000, offerPrice: 43000, desc: 'Heavy duty graphene chemistry, maximum budget value.' },
            { type: 'Lithium 60V 27AH', range: '75+ km', oldPrice: 64000, offerPrice: 58000, desc: 'Fast charging lightweight lithium battery.' },
            { type: 'Lithium 60V 32AH', range: '90+ km', oldPrice: 71000, offerPrice: 65000, desc: 'Extended city range with smart BMS protection.' }
        ]
    },
    {
        id: 'promax',
        name: 'EV JAZZ PRO MAX',
        category: 'Sport Performance',
        tagline: 'High-torque acceleration with aggressive racing DNA and dual projector headlamps.',
        imageCutout: 'assets/models/promax_cutout.png',
        topSpeed: '55-60 km/h',
        motor: '1500W High Torque Sport Motor',
        chargingTime: '3 - 4.5 Hours',
        bootSpace: '22 Litres',
        brakes: 'Dual Disc with CBS & Regenerative',
        startingPrice: 46000,
        startingMRP: 52000,
        highlights: [
            'Dual projector headlamps with aggressive aerodynamic cowl',
            'Full digital cockpit with Reverse Assist mode for tight parking',
            '1500W instant torque for steep flyovers and double riding',
            'Anti-theft remote security system with siren'
        ],
        variants: [
            { type: 'Graphene 60V 32AH', range: '60+ km', oldPrice: 52000, offerPrice: 46000, desc: 'Sport look with rugged graphene pack.' },
            { type: 'Lithium 60V 27AH', range: '75+ km', oldPrice: 68000, offerPrice: 62000, desc: 'Punchy throttle response with lithium power.' },
            { type: 'Lithium 60V 32AH', range: '90+ km', oldPrice: 74000, offerPrice: 68000, desc: 'Long-distance spirited daily commuter.' },
            { type: 'Lithium 60V 41AH', range: '100+ km', oldPrice: 84000, offerPrice: 78000, desc: 'Top tier endurance with 100+ km real-world range.' }
        ]
    },
    {
        id: 'aura',
        name: 'EV JAZZ AURA',
        category: 'Family & Comfort',
        tagline: 'Sophisticated pearl aerodynamics with maximum boot space and plush ergonomic seating.',
        imageCutout: 'assets/models/aura_cutout.png',
        topSpeed: '50 km/h',
        motor: '1200W Whisper-Silent Motor',
        chargingTime: '3 - 4 Hours',
        bootSpace: '24 Litres',
        brakes: 'Front Disc & Rear Drum with CBS',
        startingPrice: 54000,
        startingMRP: 60000,
        highlights: [
            'Extra cushioned ergonomic seat with wide pillion backrest space',
            'Generous 24L under-seat storage for full-face helmets & groceries',
            'Smooth whisper-silent ride ideal for family errands',
            'Front apron utility hooks and wide flat footboard'
        ],
        variants: [
            { type: 'Graphene 60V 32AH', range: '60+ km', oldPrice: 60000, offerPrice: 54000, desc: 'Family comfort at an unbeatable festive price.' },
            { type: 'Lithium 60V 27AH', range: '75+ km', oldPrice: 76000, offerPrice: 70000, desc: 'Silky smooth power delivery for weekly commutes.' },
            { type: 'Lithium 60V 32AH', range: '90+ km', oldPrice: 82000, offerPrice: 76000, desc: 'Extended battery life with 1500+ charge cycles.' },
            { type: 'Lithium 60V 41AH', range: '100+ km', oldPrice: 94000, offerPrice: 88000, desc: 'Flagship range package for hassle-free riding.' }
        ]
    },
    {
        id: 'nova',
        name: 'EV JAZZ NOVA',
        category: 'Retro Lifestyle',
        tagline: 'Chic Blossom Pastel styling and vintage curves paired with cutting-edge LED halo optics.',
        imageCutout: 'assets/models/nova_cutout.png',
        topSpeed: '50 km/h',
        motor: '1200W Smooth Pulse BLDC',
        chargingTime: '3 - 4 Hours',
        bootSpace: '20 Litres',
        brakes: 'Front Hydraulic Disc / Rear Drum',
        startingPrice: 56000,
        startingMRP: 62000,
        highlights: [
            'Signature round LED halo headlamp with vintage chrome bezel',
            'Pastel Blossom Pink finish with custom stylized decals',
            'Featherlight steering geometry for effortless parking & handling',
            'Classic chrome round mirrors and comfortable saddle'
        ],
        variants: [
            { type: 'Graphene 60V 32AH', range: '60+ km', oldPrice: 62000, offerPrice: 56000, desc: 'Retro styling with robust everyday graphene battery.' },
            { type: 'Lithium 60V 27AH', range: '75+ km', oldPrice: 80000, offerPrice: 74000, desc: 'Lightweight lithium pack for easy recharging.' },
            { type: 'Lithium 60V 32AH', range: '90+ km', oldPrice: 84000, offerPrice: 78000, desc: 'High capacity battery for extended city trips.' },
            { type: 'Lithium 60V 41AH', range: '100+ km', oldPrice: 96000, offerPrice: 90000, desc: '100+ km touring range in iconic vintage style.' }
        ]
    },
    {
        id: 'sparx',
        name: 'EV JAZZ SPARX',
        category: 'Retro-Modern Sport',
        tagline: 'Iconic round LED projector headlamp with chrome ring, dual-tone aerodynamic apron, and 180mm ground clearance.',
        imageCutout: 'assets/models/sparx_cutout.png',
        topSpeed: '55 km/h',
        motor: '1500W High Efficiency Motor',
        chargingTime: '3.5 - 4.5 Hours',
        bootSpace: '22 Litres',
        brakes: 'Ventilated Disc Front & Heavy Duty Rear',
        startingPrice: 58000,
        startingMRP: 64000,
        highlights: [
            'Retro-modern round LED projector headlamp with chrome ring & horizontal cowl light bars',
            'Aerodynamic dual-tone front apron with integrated diamond turn indicators and vertical DRL strips',
            'High 180mm ground clearance with heavy-duty telescopic front forks & front disc brake',
            'Sporty star-graphic lower skirt and ergonomic pillion grab rail with high payload capacity'
        ],
        variants: [
            { type: 'Graphene 60V 32AH', range: '60+ km', oldPrice: 64000, offerPrice: 58000, desc: 'Sturdy geometric build with durable graphene cells.' },
            { type: 'Lithium 60V 27AH', range: '75+ km', oldPrice: 82000, offerPrice: 76000, desc: 'Quick acceleration with lightweight lithium-ion.' },
            { type: 'Lithium 60V 32AH', range: '90+ km', oldPrice: 90000, offerPrice: 84000, desc: 'High endurance for long daily business commuting.' },
            { type: 'Lithium 60V 41AH', range: '100+ km', oldPrice: 101000, offerPrice: 95000, desc: 'Top-tier 100+ km package with heavy-duty alloy rims.' }
        ]
    }
];

// State for Calculator
let calcModel = VEHICLES[1]; // default to EV JAZZ PRO MAX
let calcVariant = VEHICLES[1].variants[0];
let calcDownPayment = 10000;
let calcTenureMonths = 24;
const annualInterestRate = 0.0899; // 8.99% Bajaj Finserv Special

// Hero Slider State
let heroCurrentIdx = 1; // Default to index 1 (EV JAZZ PRO MAX)
let isAnimating = false;

document.addEventListener('DOMContentLoaded', () => {
    initHeroInteractiveSlider();
    initPriceCalculator();
    initSavingsCalculator();
    initContactForm();
    initCountdownTimer();
});

// ------------------ 1. HERO INTERACTIVE SLIDER (CLICK / SWIPE / SCROLL) ------------------
function initHeroInteractiveSlider() {
    const prevBtn = document.getElementById('hero-prev-btn');
    const nextBtn = document.getElementById('hero-next-btn');
    const stage = document.querySelector('.hero-corner-stage');
    const pills = document.querySelectorAll('.hero-tab-pill');
    const dots = document.querySelectorAll('.hero-slider-dot');

    // Right Click / Next
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            navigateHero(1, 'next');
        });
    }

    // Left Click / Prev
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            navigateHero(-1, 'prev');
        });
    }

    // Tab Pills Click
    pills.forEach((pill) => {
        pill.addEventListener('click', () => {
            const idx = parseInt(pill.getAttribute('data-index'), 10);
            if (!isNaN(idx) && idx !== heroCurrentIdx) {
                const dir = idx > heroCurrentIdx ? 'next' : 'prev';
                setHeroModelByIndex(idx, dir);
            }
        });
    });

    // Slider Dots Click
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.getAttribute('data-index'), 10);
            if (!isNaN(idx) && idx !== heroCurrentIdx) {
                const dir = idx > heroCurrentIdx ? 'next' : 'prev';
                setHeroModelByIndex(idx, dir);
            }
        });
    });

    // Touch Swipe Gestures on Scooter Stage
    if (stage) {
        let touchStartX = 0;
        let touchEndX = 0;

        stage.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        stage.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const diff = touchEndX - touchStartX;
            if (Math.abs(diff) > 45) {
                if (diff < 0) {
                    // Swiped Left -> show next model
                    navigateHero(1, 'next');
                } else {
                    // Swiped Right -> show prev model
                    navigateHero(-1, 'prev');
                }
            }
        }
    }

    // Keyboard Arrow Keys (Left / Right)
    window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key === 'ArrowRight') {
            navigateHero(1, 'next');
        } else if (e.key === 'ArrowLeft') {
            navigateHero(-1, 'prev');
        }
    });

    // Initial render of active model index
    setHeroModelByIndex(heroCurrentIdx, 'none');
}

function navigateHero(step, dir) {
    if (isAnimating) return;
    const newIdx = (heroCurrentIdx + step + VEHICLES.length) % VEHICLES.length;
    setHeroModelByIndex(newIdx, dir);
}

function setHeroModelByIndex(newIndex, direction = 'next') {
    heroCurrentIdx = newIndex;
    const found = VEHICLES[heroCurrentIdx];
    if (!found) return;

    const heroImg = document.getElementById('hero-scooter-display-img');
    const heroTitle = document.getElementById('hero-active-title');
    const heroCategory = document.getElementById('hero-active-category');
    const heroPriceNow = document.getElementById('hero-active-price-now');
    const heroPriceMrp = document.getElementById('hero-active-price-mrp');
    const heroSpecSpeed = document.getElementById('hero-spec-speed');
    const heroSpecRange = document.getElementById('hero-spec-range');
    const heroSpecMotor = document.getElementById('hero-spec-motor');
    const heroCounter = document.getElementById('hero-slide-counter');
    const heroExploreBtn = document.getElementById('hero-explore-btn');

    // Update active state on tab buttons
    document.querySelectorAll('.hero-tab-pill').forEach((pill, i) => {
        pill.classList.toggle('active-tab', i === heroCurrentIdx);
    });

    // Update active state on dots
    document.querySelectorAll('.hero-slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active-dot', i === heroCurrentIdx);
    });

    // Smooth direction-aware transition on the scooter image
    if (heroImg && direction !== 'none') {
        isAnimating = true;
        const outOffset = direction === 'next' ? -50 : 50;
        const inOffset = direction === 'next' ? 50 : -50;

        heroImg.style.transition = 'opacity 0.18s ease-out, transform 0.18s ease-out';
        heroImg.style.opacity = '0';
        heroImg.style.transform = `translateX(${outOffset}px) scale(0.96)`;

        setTimeout(() => {
            heroImg.src = found.imageCutout;
            heroImg.alt = found.name;

            // Update texts in sync
            if (heroTitle) heroTitle.textContent = found.name;
            if (heroCategory) heroCategory.textContent = found.category;
            if (heroPriceNow) heroPriceNow.textContent = `₹${found.startingPrice.toLocaleString('en-IN')}*`;
            if (heroPriceMrp) heroPriceMrp.textContent = `MRP ₹${found.startingMRP.toLocaleString('en-IN')}`;
            if (heroSpecSpeed) heroSpecSpeed.textContent = `⚡ Top Speed: ${found.topSpeed}`;
            if (heroSpecRange) heroSpecRange.textContent = `🔋 Range: Up to ${found.variants[found.variants.length - 1].range}`;
            if (heroSpecMotor) heroSpecMotor.textContent = `🛡️ ${found.motor}`;
            if (heroCounter) heroCounter.textContent = `0${heroCurrentIdx + 1} / 05`;
            if (heroExploreBtn) heroExploreBtn.setAttribute('href', `#section-${found.id}`);

            // Prepare for slide-in
            heroImg.style.transition = 'none';
            heroImg.style.transform = `translateX(${inOffset}px) scale(0.96)`;

            // Trigger reflow
            void heroImg.offsetWidth;

            // Slide in
            heroImg.style.transition = 'opacity 0.26s cubic-bezier(0.16, 1, 0.3, 1), transform 0.26s cubic-bezier(0.16, 1, 0.3, 1)';
            heroImg.style.opacity = '1';
            heroImg.style.transform = 'translateX(0) scale(1)';

            setTimeout(() => {
                isAnimating = false;
            }, 270);
        }, 180);
    } else if (heroImg) {
        // Instant set
        heroImg.src = found.imageCutout;
        heroImg.alt = found.name;
        if (heroTitle) heroTitle.textContent = found.name;
        if (heroCategory) heroCategory.textContent = found.category;
        if (heroPriceNow) heroPriceNow.textContent = `₹${found.startingPrice.toLocaleString('en-IN')}*`;
        if (heroPriceMrp) heroPriceMrp.textContent = `MRP ₹${found.startingMRP.toLocaleString('en-IN')}`;
        if (heroSpecSpeed) heroSpecSpeed.textContent = `⚡ Top Speed: ${found.topSpeed}`;
        if (heroSpecRange) heroSpecRange.textContent = `🔋 Range: Up to ${found.variants[found.variants.length - 1].range}`;
        if (heroSpecMotor) heroSpecMotor.textContent = `🛡️ ${found.motor}`;
        if (heroCounter) heroCounter.textContent = `0${heroCurrentIdx + 1} / 05`;
        if (heroExploreBtn) heroExploreBtn.setAttribute('href', `#section-${found.id}`);
    }
}

// ------------------ 2. PRICE & EMI CALCULATOR ------------------
function initPriceCalculator() {
    renderCalcModelButtons();
    updateCalcDisplay();

    const slider = document.getElementById('calc-downpayment-slider');
    const tenureSelect = document.getElementById('calc-tenure-select');

    if (slider) {
        slider.addEventListener('input', (e) => {
            calcDownPayment = parseInt(e.target.value, 10);
            const valLabel = document.getElementById('calc-downpayment-label');
            if (valLabel) valLabel.textContent = `₹${calcDownPayment.toLocaleString('en-IN')}`;
            calculateEMI();
        });
    }

    if (tenureSelect) {
        tenureSelect.addEventListener('change', (e) => {
            calcTenureMonths = parseInt(e.target.value, 10);
            calculateEMI();
        });
    }
}

function renderCalcModelButtons() {
    const container = document.getElementById('calc-model-pills');
    if (!container) return;

    container.innerHTML = VEHICLES.map(v => `
        <button type="button" class="calc-btn-pill ${v.id === calcModel.id ? 'active-pill' : ''}" onclick="selectCalcModel('${v.id}')">
            ${v.name}
        </button>
    `).join('');
}

window.selectCalcModel = function (modelId) {
    const found = VEHICLES.find(v => v.id === modelId);
    if (!found) return;

    calcModel = found;
    calcVariant = found.variants[0];

    renderCalcModelButtons();
    updateCalcDisplay();
};

function updateCalcDisplay() {
    const model = calcModel;
    const variantGrid = document.getElementById('calc-variants-grid');
    const previewImg = document.getElementById('calc-scooter-photo');
    const previewName = document.getElementById('calc-model-heading');
    const previewCategory = document.getElementById('calc-model-cat');

    if (previewImg) previewImg.src = model.imageCutout;
    if (previewName) previewName.textContent = model.name;
    if (previewCategory) previewCategory.textContent = `${model.category} • Top Speed ${model.topSpeed}`;

    if (variantGrid) {
        variantGrid.innerHTML = model.variants.map((v, idx) => `
            <div class="battery-variant-card ${v.type === calcVariant.type ? 'active-choice' : ''}" onclick="selectCalcVariant(${idx})">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <strong style="color: #0F172A; font-size: 0.92rem;">${v.type}</strong>
                    <span style="font-size: 0.75rem; color: #047857; font-weight: 700; background: #ECFDF5; padding: 2px 8px; border-radius: 99px;">${v.range}</span>
                </div>
                <div style="font-size: 0.78rem; color: #64748B; margin-bottom: 8px;">${v.desc}</div>
                <div style="display: flex; align-items: baseline; gap: 8px;">
                    <span style="font-size: 1.15rem; font-weight: 800; color: #0F172A; font-family: var(--font-heading);">₹${v.offerPrice.toLocaleString('en-IN')}*</span>
                    <span style="font-size: 0.8rem; color: #94A3B8; text-decoration: line-through;">₹${v.oldPrice.toLocaleString('en-IN')}</span>
                </div>
            </div>
        `).join('');
    }

    const priceMRP = document.getElementById('calc-display-mrp');
    const priceOffer = document.getElementById('calc-display-offer');
    if (priceMRP) priceMRP.textContent = `₹${calcVariant.oldPrice.toLocaleString('en-IN')}`;
    if (priceOffer) priceOffer.textContent = `₹${calcVariant.offerPrice.toLocaleString('en-IN')}*`;

    // Adjust down payment slider bounds
    const slider = document.getElementById('calc-downpayment-slider');
    if (slider) {
        slider.max = Math.max(20000, calcVariant.offerPrice - 10000);
        if (calcDownPayment > calcVariant.offerPrice - 10000) {
            calcDownPayment = 10000;
            slider.value = calcDownPayment;
            const valLabel = document.getElementById('calc-downpayment-label');
            if (valLabel) valLabel.textContent = `₹${calcDownPayment.toLocaleString('en-IN')}`;
        }
    }

    calculateEMI();
}

window.selectCalcVariant = function (idx) {
    if (calcModel.variants[idx]) {
        calcVariant = calcModel.variants[idx];
        updateCalcDisplay();
    }
};

function calculateEMI() {
    const price = calcVariant.offerPrice;
    const loan = Math.max(0, price - calcDownPayment);
    const months = calcTenureMonths;
    const r = annualInterestRate / 12;

    let emi = 0;
    if (loan > 0 && r > 0) {
        emi = Math.round((loan * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1));
    }

    const emiElem = document.getElementById('calc-emi-monthly-val');
    const loanElem = document.getElementById('calc-loan-principal');

    if (emiElem) emiElem.textContent = `₹${emi.toLocaleString('en-IN')} / mo*`;
    if (loanElem) loanElem.textContent = `₹${loan.toLocaleString('en-IN')}`;
}

// ------------------ 3. EV VS PETROL SAVINGS CALCULATOR ------------------
function initSavingsCalculator() {
    const slider = document.getElementById('commute-km-slider');
    const kmLabel = document.getElementById('commute-km-label');

    function computeSavings(km) {
        if (kmLabel) kmLabel.textContent = `${km} KM / Day`;

        const monthlyKm = km * 30;
        // Petrol: ₹110/litre @ 40 km/l -> ₹2.75/km + ₹300 monthly maintenance
        const petrolMonthly = Math.round((monthlyKm * 2.75) + 300);
        // EV: 1.5 - 2 kWh per 100 km @ ₹8/unit -> ₹0.15/km + ₹50 maintenance
        const evMonthly = Math.round((monthlyKm * 0.15) + 50);
        const monthlySave = petrolMonthly - evMonthly;
        const annualSave = monthlySave * 12;
        const threeYearSave = annualSave * 3;

        const pEl = document.getElementById('val-petrol-monthly');
        const evEl = document.getElementById('val-ev-monthly');
        const sYearEl = document.getElementById('val-annual-savings');
        const s3YearEl = document.getElementById('val-3year-savings');

        if (pEl) pEl.textContent = `₹${petrolMonthly.toLocaleString('en-IN')}`;
        if (evEl) evEl.textContent = `₹${evMonthly.toLocaleString('en-IN')}`;
        if (sYearEl) sYearEl.textContent = `₹${annualSave.toLocaleString('en-IN')}`;
        if (s3YearEl) s3YearEl.textContent = `₹${threeYearSave.toLocaleString('en-IN')}`;
    }

    if (slider) {
        slider.addEventListener('input', (e) => computeSavings(parseInt(e.target.value, 10)));
        computeSavings(35);
    }
}

// ------------------ 4. CONTACT US & WHATSAPP GENERATOR ------------------
function initContactForm() {
    const form = document.getElementById('store-inquiry-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('field-first-name')?.value.trim() || '';
        const lastName = document.getElementById('field-last-name')?.value.trim() || '';
        const name = `${firstName} ${lastName}`.trim() || 'Customer';
        const phone = document.getElementById('field-customer-phone')?.value.trim();
        const model = document.getElementById('field-preferred-model')?.value || 'EV JAZZ PRO MAX';
        const battery = document.getElementById('field-preferred-battery')?.value || 'Lithium 60V 32AH';
        const purpose = document.getElementById('field-inquiry-purpose')?.value || 'Price Quotation & Test Ride';

        if (!phone) {
            alert('Please enter your mobile phone number.');
            return;
        }

        const bookingRef = 'EVJAZZ-' + Math.floor(100000 + Math.random() * 900000);

        // Open Success Modal
        const modal = document.getElementById('booking-modal');
        if (modal) {
            const refEl = document.getElementById('modal-ref-code');
            const nameEl = document.getElementById('modal-user-name');
            const choiceEl = document.getElementById('modal-model-choice');
            if (refEl) refEl.textContent = bookingRef;
            if (nameEl) nameEl.textContent = name;
            if (choiceEl) choiceEl.textContent = `${model} (${battery})`;
            modal.classList.remove('hidden');
        }

        form.reset();
    });
}

window.openStoreBooking = function (modelName, batteryType = '') {
    const modelSelect = document.getElementById('field-preferred-model');
    if (modelSelect && modelName) modelSelect.value = modelName;

    const batterySelect = document.getElementById('field-preferred-battery');
    if (batterySelect && batteryType) batterySelect.value = batteryType;

    const contactSection = document.getElementById('get-in-touch');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    const firstInput = document.getElementById('field-first-name');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 500);
    }
};

window.sendDirectWhatsApp = function () {
    const firstName = document.getElementById('field-first-name')?.value.trim() || '';
    const lastName = document.getElementById('field-last-name')?.value.trim() || '';
    const fullName = `${firstName} ${lastName}`.trim() || 'Customer';
    const phone = document.getElementById('field-customer-phone')?.value.trim() || '';
    const model = document.getElementById('field-preferred-model')?.value || 'EV JAZZ PRO MAX';
    const battery = document.getElementById('field-preferred-battery')?.value || 'Lithium 60V 32AH';
    const purpose = document.getElementById('field-inquiry-purpose')?.value || 'Price Quotation & Test Ride';

    const msg = encodeURIComponent(
        `⚡ *Customer Enquiry — EV JAZZ Mobility*\n` +
        `-----------------------------------------\n` +
        `👤 *Name:* ${fullName}\n` +
        `📱 *Contact:* ${phone || 'Available in chat'}\n` +
        `🛵 *Scooter Model:* ${model}\n` +
        `🔋 *Battery Choice:* ${battery}\n` +
        `🎯 *Requirement:* ${purpose}\n` +
        `🎁 *Claim Offer:* Dussehra Flat ₹6,000 OFF\n` +
        `📍 *Showroom:* Kukatpally, Shamshiguda Main Road\n` +
        `-----------------------------------------\n` +
        `Please share the best on-road price and test ride confirmation.`
    );

    window.open(`https://wa.me/919014107767?text=${msg}`, '_blank');
};

window.sendWhatsAppForModel = function (modelName, variantName) {
    const msg = encodeURIComponent(
        `⚡ *Enquiry for ${modelName} — EV JAZZ Mobility*\n` +
        `-----------------------------------------\n` +
        `🛵 *Model:* ${modelName}\n` +
        `🔋 *Preferred Variant:* ${variantName || 'All Variants'}\n` +
        `🎁 *Claim Offer:* Dussehra Flat ₹6,000 DISCOUNT\n` +
        `📍 *Showroom:* Kukatpally, Shamshiguda Main Road\n` +
        `-----------------------------------------\n` +
        `Hello! Please share complete on-road quotation, Bajaj Finserv EMI breakdown, and available color options.`
    );

    window.open(`https://wa.me/919014107767?text=${msg}`, '_blank');
};

window.closeBookingModal = function () {
    const modal = document.getElementById('booking-modal');
    if (modal) modal.classList.add('hidden');
};

// ------------------ 5. COUNTDOWN TIMER ------------------
function initCountdownTimer() {
    const timerDays = document.getElementById('pill-days');
    const timerHours = document.getElementById('pill-hours');
    const timerMins = document.getElementById('pill-mins');

    if (!timerDays) return;

    const target = new Date('November 15, 2026 23:59:59').getTime();

    function update() {
        const now = new Date().getTime();
        const diff = target - now;

        if (diff <= 0) {
            timerDays.textContent = '00';
            timerHours.textContent = '00';
            timerMins.textContent = '00';
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        timerDays.textContent = String(d).padStart(2, '0');
        timerHours.textContent = String(h).padStart(2, '0');
        timerMins.textContent = String(m).padStart(2, '0');
    }

    setInterval(update, 1000);
    update();
}
