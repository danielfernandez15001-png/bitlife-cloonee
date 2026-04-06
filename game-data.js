/* ═══════════════════════════════════════════════════════════════
   TEXT-LIFE ENGINE — Game Data
   All countries, names, events, jobs, dilemmas, etc.
   ═══════════════════════════════════════════════════════════════ */

const GAME_DATA = {
    countries: [
        {
            name: 'México', flag: '🇲🇽', currency: 'MXN', symbol: '$',
            avgIncome: 12000, costMult: 0.6,
            events: [
                'Una fiesta de Día de Muertos ilumina tu barrio con cientos de velas y ofrendas.',
                'Un terremoto sacude tu ciudad. Afortunadamente, no hay daños graves.',
                'Encuentras un puesto de tacos que cambia tu percepción culinaria para siempre.',
                'Un cartel de narcotráfico extiende su influencia en tu zona.',
                'Las elecciones presidenciales generan gran agitación social.',
                'Un huracán categoría 3 amenaza la costa donde vives.',
                'Tu selección nacional clasifica al Mundial y todo el país celebra.',
                'La inflación golpea fuerte y los precios suben considerablemente.',
                'Un nuevo parque público transforma tu colonia.',
                'Se inaugura una nueva línea de metro que mejora el transporte.'
            ]
        },
        {
            name: 'Argentina', flag: '🇦🇷', currency: 'ARS', symbol: '$',
            avgIncome: 8000, costMult: 0.5,
            events: [
                'La selección argentina gana un campeonato importante y las calles explotan de alegría.',
                'La inflación se dispara y tu dinero pierde valor rápidamente.',
                'Un asado familiar se convierte en una reunión legendaria.',
                'Protestas masivas en la Plaza de Mayo por la situación económica.',
                'Un corte de luz deja sin servicio a tu zona durante días.',
                'Se descubre un caso de corrupción que conmociona al país.',
                'El tango es declarado patrimonio de tu barrio.',
                'Las inundaciones afectan varias provincias.',
                'Un nuevo gobierno promete cambios drásticos en la economía.',
                'Tu equipo de fútbol favorito desciende de categoría.'
            ]
        },
        {
            name: 'España', flag: '🇪🇸', currency: 'EUR', symbol: '€',
            avgIncome: 25000, costMult: 1.0,
            events: [
                'Las fiestas de San Fermín atraen turistas de todo el mundo.',
                'Una ola de calor récord azota la península ibérica.',
                'El desempleo juvenil alcanza cifras preocupantes.',
                'Tu barrio organiza unas fiestas patronales espectaculares.',
                'Un escándalo político sacude la monarquía.',
                'La Liga de fútbol trae emoción a todo el país.',
                'Se aprueba una nueva ley laboral que afecta tu sector.',
                'Un incendio forestal devastador arrasa hectáreas de bosque.',
                'Las tensiones regionales se intensifican.',
                'El turismo masivo genera debate en las grandes ciudades.'
            ]
        },
        {
            name: 'Colombia', flag: '🇨🇴', currency: 'COP', symbol: '$',
            avgIncome: 9000, costMult: 0.45,
            events: [
                'El Carnaval de Barranquilla transforma la ciudad en una fiesta de colores.',
                'Se firma un nuevo acuerdo de paz con un grupo armado.',
                'Una avalancha de lodo destruye un pueblo cercano.',
                'El café colombiano gana un premio internacional.',
                'Las FARC anuncia nuevas negociaciones.',
                'Un ciclista colombiano gana una etapa en el Tour de Francia.',
                'La violencia urbana aumenta en tu zona.',
                'Se descubre una nueva especie en la Amazonía colombiana.',
                'Un apagón masivo afecta a varias regiones.',
                'El narcotráfico pone en jaque la seguridad de tu barrio.'
            ]
        },
        {
            name: 'Japón', flag: '🇯🇵', currency: 'JPY', symbol: '¥',
            avgIncome: 35000, costMult: 1.3,
            events: [
                'Un tifón categoría 4 golpea la región de Kanto.',
                'La temporada de sakura atrae multitudes a los parques.',
                'Un terremoto de magnitud 6.5 sacude tu prefectura.',
                'Un nuevo anime basado en la vida cotidiana se vuelve viral.',
                'El tren bala establece un nuevo récord de velocidad.',
                'La presión social y laboral genera debate sobre salud mental.',
                'Tu empresa implementa la semana laboral de 4 días.',
                'Un tsunami alerta a toda la costa del Pacífico.',
                'Los Juegos Olímpicos generan orgullo nacional.',
                'La población japonesa alcanza un mínimo histórico.'
            ]
        },
        {
            name: 'Brasil', flag: '🇧🇷', currency: 'BRL', symbol: 'R$',
            avgIncome: 10000, costMult: 0.55,
            events: [
                'El Carnaval de Río llena las calles de samba y alegría.',
                'La deforestación del Amazonas genera protestas internacionales.',
                'Tu selección gana la Copa América en una final espectacular.',
                'Una favela cercana es pacificada por la policía.',
                'Las elecciones polarizadas dividen al país.',
                'Un incendio forestal en el Pantanal dura semanas.',
                'Bolsonaro genera controversia con nuevas declaraciones.',
                'La violencia callejera aumenta en tu comunidad.',
                'Un nuevo yacimiento petrolero se descubre en alta mar.',
                'Las inundaciones devastan el sur del país.'
            ]
        },
        {
            name: 'Estados Unidos', flag: '🇺🇸', currency: 'USD', symbol: '$',
            avgIncome: 55000, costMult: 1.5,
            events: [
                'Un tiroteo masivo conmociona a la nación.',
                'La temporada de huracanes golpea la costa este.',
                'Silicon Valley lanza una nueva revolución tecnológica.',
                'Las elecciones presidenciales dividen al país.',
                'Un movimiento social masivo toma las calles.',
                'Wall Street experimenta una caída histórica.',
                'Un tornado F5 devasta una ciudad del medio oeste.',
                'Se legaliza el cannabis en tu estado.',
                'La crisis de opioides afecta a tu comunidad.',
                'SpaceX realiza un lanzamiento histórico al espacio.'
            ]
        },
        {
            name: 'Chile', flag: '🇨🇱', currency: 'CLP', symbol: '$',
            avgIncome: 15000, costMult: 0.7,
            events: [
                'Un terremoto de magnitud 7 sacude la zona central del país.',
                'Las protestas sociales paralizan Santiago.',
                'La vendimia del Valle de Casablanca produce un vino excepcional.',
                'Se redacta una nueva constitución para el país.',
                'Un volcán entra en erupción en el sur de Chile.',
                'Los incendios forestales se extienden por Valparaíso.',
                'Chile clasifica al Mundial de fútbol.',
                'La minería del cobre enfrenta una crisis de precios.',
                'Un aluvión destruye un pueblo en el norte.',
                'Se inaugura el telescopio más grande del mundo en Atacama.'
            ]
        },
        {
            name: 'Alemania', flag: '🇩🇪', currency: 'EUR', symbol: '€',
            avgIncome: 45000, costMult: 1.2,
            events: [
                'La Oktoberfest atrae millones de visitantes a Múnich.',
                'Una crisis energética golpea al país por la dependencia del gas.',
                'La industria automotriz enfrenta la transición eléctrica.',
                'Un escándalo de espionaje sacude al gobierno.',
                'La selección alemana decepciona en un torneo importante.',
                'Se aprueba una reforma migratoria que genera debate.',
                'Las inundaciones devastan el oeste del país.',
                'Un nuevo partido político extremista gana terreno.',
                'Tu ciudad gana un premio como la más sostenible de Europa.',
                'La inflación energética dispara los costos de calefacción.'
            ]
        },
        {
            name: 'Perú', flag: '🇵🇪', currency: 'PEN', symbol: 'S/',
            avgIncome: 8500, costMult: 0.4,
            events: [
                'Macchu Picchu es cerrado temporalmente por exceso de turismo.',
                'Un deslizamiento de tierra bloquea una carretera principal.',
                'El ceviche peruano gana un concurso gastronómico mundial.',
                'Las protestas contra el gobierno paralizan Lima.',
                'El Niño costero causa lluvias torrenciales.',
                'Se descubre un nuevo sitio arqueológico inca.',
                'La minería ilegal contamina ríos de la selva.',
                'El presidente es destituido en medio de una crisis política.',
                'Un festival de música andina reúne a miles de personas.',
                'La economía crece gracias al boom del cobre.'
            ]
        }
    ],

    maleNames: [
        'Santiago', 'Mateo', 'Sebastián', 'Leonardo', 'Diego', 'Lucas',
        'Alejandro', 'Daniel', 'Nicolás', 'Gabriel', 'Carlos', 'Andrés',
        'Miguel', 'Fernando', 'Rafael', 'Pablo', 'Tomás', 'Hugo',
        'Adrián', 'Jorge', 'Roberto', 'Eduardo', 'Francisco', 'Manuel',
        'Hiroshi', 'Takeshi', 'Kenji', 'Yuki', 'Ryo', 'Leo',
        'Max', 'Felix', 'Lukas', 'Jonas', 'John', 'James', 'William',
        'Ethan', 'Noah', 'Oliver'
    ],

    femaleNames: [
        'Valentina', 'Sofía', 'Isabella', 'Camila', 'Luciana', 'Emma',
        'Mía', 'Victoria', 'Regina', 'Amelia', 'Luna', 'Paula',
        'Andrea', 'Gabriela', 'Martina', 'Valeria', 'Renata', 'Julia',
        'Carolina', 'María', 'Laura', 'Elena', 'Teresa', 'Rosa',
        'Sakura', 'Yuki', 'Hana', 'Aoi', 'Mika', 'Rin',
        'Anna', 'Clara', 'Sophie', 'Lena', 'Emily', 'Charlotte',
        'Olivia', 'Ava', 'Mia', 'Harper'
    ],

    lastNames: [
        'García', 'Rodríguez', 'Martínez', 'López', 'González', 'Hernández',
        'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Rivera',
        'Morales', 'Jiménez', 'Díaz', 'Castro', 'Vargas', 'Reyes',
        'Cruz', 'Mendoza', 'Tanaka', 'Suzuki', 'Takahashi', 'Müller',
        'Schmidt', 'Weber', 'Wagner', 'Smith', 'Johnson', 'Williams',
        'Brown', 'Jones', 'Davis', 'Miller', 'Wilson', 'Silva',
        'Santos', 'Oliveira', 'Souza', 'Pereira'
    ],

    familySituations: [
        {
            desc: 'Familia de clase media. Padres casados y cariñosos.',
            happiness: 70, health: 75, intelligence: 50, appearance: 50,
            familyRel: 80 , detail: 'Tu padre es oficinista y tu madre es enfermera.'
        },
        {
            desc: 'Familia de clase baja. Madre soltera con tres hijos.',
            happiness: 45, health: 55, intelligence: 45, appearance: 40,
            familyRel: 60, detail: 'Tu madre trabaja turnos dobles en una fábrica para mantenerte.'
        },
        {
            desc: 'Familia adinerada. Padres empresarios exitosos.',
            happiness: 75, health: 80, intelligence: 60, appearance: 70,
            familyRel: 55, detail: 'Vives en una mansión con servicio doméstico. Tus padres viajan mucho.'
        },
        {
            desc: 'Criado por abuelos. Padres fallecidos en accidente.',
            happiness: 40, health: 60, intelligence: 50, appearance: 45,
            familyRel: 70, detail: 'Tus abuelos hacen lo posible por darte una vida normal.'
        },
        {
            desc: 'Familia numerosa. Seis hermanos en casa pequeña.',
            happiness: 55, health: 60, intelligence: 40, appearance: 45,
            familyRel: 75, detail: 'Siempre hay ruido, pero también mucho amor.'
        },
        {
            desc: 'Padres divorciados. Vives con tu padre.',
            happiness: 50, health: 65, intelligence: 55, appearance: 50,
            familyRel: 45, detail: 'Ves a tu madre los fines de semana.'
        },
        {
            desc: 'Familia de artistas. Padres músicos bohemios.',
            happiness: 65, health: 60, intelligence: 55, appearance: 55,
            familyRel: 65, detail: 'Tu casa siempre está llena de música y creatividad.'
        },
        {
            desc: 'Hijo adoptado. Padres amorosos pero sobreprotectores.',
            happiness: 60, health: 70, intelligence: 50, appearance: 50,
            familyRel: 85, detail: 'Tus padres adoptivos te dan todo el amor que pueden.'
        },
        {
            desc: 'Familia militar. Padre estricto, madre sumisa.',
            happiness: 35, health: 75, intelligence: 55, appearance: 50,
            familyRel: 40, detail: 'La disciplina es ley en tu hogar.'
        },
        {
            desc: 'Huérfano. Creciste en un orfanato estatal.',
            happiness: 25, health: 50, intelligence: 45, appearance: 40,
            familyRel: 20, detail: 'Nunca conociste a tus padres biológicos.'
        }
    ],

    // Age-dependent life stages
    lifeStages: {
        baby: { min: 0, max: 3, label: 'Bebé' },
        child: { min: 4, max: 11, label: 'Niñez' },
        teen: { min: 12, max: 17, label: 'Adolescencia' },
        youngAdult: { min: 18, max: 25, label: 'Adulto Joven' },
        adult: { min: 26, max: 45, label: 'Adultez' },
        middleAge: { min: 46, max: 64, label: 'Edad Media' },
        elder: { min: 65, max: 120, label: 'Vejez' }
    },

    // Year events per life stage
    yearEvents: {
        baby: [
            'Diste tus primeros pasos y toda la familia celebró.',
            'Dijiste tu primera palabra: "mamá".',
            'Te enfermaste con varicela y tu familia se preocupó mucho.',
            'Aprendiste a sostener tu propio biberón.',
            'Tu primera navidad fue mágica, aunque no la recordarás.',
            'Lloraste toda la noche y tus padres no pudieron dormir.',
            'Te salió tu primer diente y mordiste todo lo que encontraste.',
            'Gateaste por primera vez y exploraste toda la casa.',
            'Tu familia te llevó al parque y disfrutaste del sol.',
            'Tuviste una fiebre alta que alarmó a toda la familia.',
            'Aprendiste a decir "no" y lo repites constantemente.',
            'Tu primer cumpleaños fue una pequeña fiesta familiar.',
            'Te tomaron tu primera foto profesional y quedó hermosa.',
            'Reíste por primera vez y todos se derritieron de ternura.'
        ],
        child: [
            'Entraste a la escuela y hiciste tu primer amigo.',
            'Te caíste del columpio y te rompiste el brazo.',
            'Ganaste un concurso de dibujo en la escuela.',
            'Un bully te molestó en el recreo durante semanas.',
            'Descubriste tu amor por la lectura en la biblioteca.',
            'Tu mascota favorita murió y fue tu primer contacto con la pérdida.',
            'Participaste en una obra de teatro escolar.',
            'Aprendiste a andar en bicicleta después de muchos intentos.',
            'Sacaste las mejores calificaciones de tu clase.',
            'Te perdiste en un centro comercial y la policía te encontró.',
            'Hiciste tu primera excursión escolar a un museo.',
            'Te enamoraste por primera vez (aunque no sabías qué era).'
        ],
        teen: [
            'Tu primer día de secundaria fue aterrador pero emocionante.',
            'Tuviste tu primera relación sentimental.',
            'Fuiste a tu primera fiesta y probaste el alcohol.',
            'Un profesor inspirador cambió tu perspectiva de vida.',
            'Te uniste al equipo deportivo de la escuela.',
            'Tuviste un fuerte conflicto con tus padres.',
            'Empezaste a trabajar medio tiempo.',
            'Tu mejor amigo se mudó a otra ciudad.',
            'Ganaste una competencia académica regional.',
            'Fuiste víctima de cyberbullying.',
            'Tu primera ruptura amorosa te devastó.',
            'Descubriste una pasión inesperada que podría definir tu futuro.'
        ],
        youngAdult: [
            'Te independizaste y alquilaste tu primer apartamento.',
            'Tuviste una relación seria que cambió tu forma de ver el amor.',
            'Una oportunidad laboral inesperada se presentó.',
            'Viajaste por primera vez al extranjero.',
            'Una crisis existencial te hizo replantearte todo.',
            'Comenzaste un emprendimiento con un amigo.',
            'Te graduaste y entraste al mercado laboral.',
            'Una tragedia familiar te obligó a madurar rápidamente.',
            'Conociste al amor de tu vida en un lugar inesperado.',
            'Fuiste de fiesta y tomaste decisiones cuestionables.'
        ],
        adult: [
            'Recibiste un ascenso en el trabajo que mejoró tu situación.',
            'Tu relación de pareja atravesó una crisis seria.',
            'Compraste tu primera casa con mucho esfuerzo.',
            'Un cambio de carrera te llevó por un camino inesperado.',
            'Nació tu primer hijo y todo cambió para siempre.',
            'Un accidente de tráfico te dejó con lesiones menores.',
            'Te asociaste en un negocio que resultó ser exitoso.',
            'Una enfermedad de un familiar te obligó a tomar decisiones difíciles.',
            'Cumpliste un sueño de la infancia: viajar al lugar que siempre quisiste.',
            'La rutina laboral empezó a afectar tu salud mental.'
        ],
        middleAge: [
            'Una revisión médica reveló un problema de salud.',
            'Tu hijo adolescente se metió en problemas serios.',
            'Recibiste una herencia inesperada de un familiar lejano.',
            'Te despidieron del trabajo y tuviste que reinventarte.',
            'Celebraste aniversario de bodas con una renovación de votos.',
            'Un viejo amigo reapareció en tu vida trayendo nostalgia.',
            'Tu empresa entró en crisis y tuviste que tomar decisiones duras.',
            'Empezaste a experimentar los primeros signos de envejecimiento.',
            'Un viaje espiritual a otro país cambió tu filosofía de vida.',
            'La crisis de la mediana edad te golpeó fuerte.'
        ],
        elder: [
            'Celebraste tu jubilación con una fiesta memorable.',
            'Un nieto nació y rejuveneció tu espíritu.',
            'Fuiste diagnosticado con una enfermedad crónica.',
            'Te mudaste a una casa más pequeña y funcional.',
            'Escribiste tus memorias en un cuaderno que nadie leerá.',
            'Un viejo rival se convirtió en tu mejor amigo.',
            'La soledad empezó a ser tu compañera más frecuente.',
            'Te caíste y la recuperación fue más lenta de lo esperado.',
            'Celebraste un cumpleaños rodeado de toda tu familia.',
            'Empezaste a olvidar cosas con más frecuencia.'
        ]
    },

    // Jobs available at different intelligence/age levels
    jobs: {
        noEducation: [
            { title: 'Obrero de construcción', salary: 8000 },
            { title: 'Jardinero', salary: 7000 },
            { title: 'Limpiador', salary: 6000 },
            { title: 'Recolector de basura', salary: 7500 },
            { title: 'Ayudante de cocina', salary: 6500 },
            { title: 'Vendedor ambulante', salary: 5000 },
            { title: 'Guardia de seguridad', salary: 8500 }
        ],
        lowEducation: [
            { title: 'Cajero de supermercado', salary: 10000 },
            { title: 'Mesero', salary: 9000 },
            { title: 'Conductor de taxi', salary: 11000 },
            { title: 'Mecánico', salary: 13000 },
            { title: 'Electricista', salary: 14000 },
            { title: 'Peluquero', salary: 10000 },
            { title: 'Recepcionista', salary: 9500 }
        ],
        mediumEducation: [
            { title: 'Contador', salary: 22000 },
            { title: 'Enfermero', salary: 20000 },
            { title: 'Técnico informático', salary: 25000 },
            { title: 'Profesor de escuela', salary: 18000 },
            { title: 'Diseñador gráfico', salary: 21000 },
            { title: 'Vendedor inmobiliario', salary: 24000 },
            { title: 'Gerente de tienda', salary: 23000 }
        ],
        highEducation: [
            { title: 'Ingeniero de software', salary: 55000 },
            { title: 'Médico', salary: 65000 },
            { title: 'Abogado', salary: 50000 },
            { title: 'Arquitecto', salary: 45000 },
            { title: 'Científico investigador', salary: 48000 },
            { title: 'Director financiero', salary: 70000 },
            { title: 'Cirujano', salary: 90000 },
            { title: 'CEO de startup', salary: 80000 }
        ]
    },

    // Dilemmas per life stage
    dilemmas: {
        child: [
            {
                text: 'Un compañero de clase te ofrece las respuestas del examen final. ¿Qué haces?',
                options: [
                    { text: 'Aceptar las respuestas y copiar', effects: { intelligence: -5, happiness: 5 } },
                    { text: 'Rechazar y estudiar por tu cuenta', effects: { intelligence: 8, happiness: -3 } },
                    { text: 'Decirle al profesor lo que está pasando', effects: { intelligence: 3, happiness: -5 } },
                    { text: 'Ignorar y no presentarte al examen', effects: { intelligence: -3, happiness: -2 } }
                ]
            },
            {
                text: 'Encuentras una billetera con dinero en el patio de la escuela.',
                options: [
                    { text: 'Quedarte con el dinero', effects: { happiness: 5, money: 50 } },
                    { text: 'Entregarla a la dirección', effects: { happiness: 8, intelligence: 2 } },
                    { text: 'Buscar al dueño tú mismo', effects: { intelligence: 3, happiness: 5 } },
                    { text: 'Repartir el dinero con amigos', effects: { happiness: 3, appearance: 2 } }
                ]
            },
            {
                text: 'Tu grupo de amigos quiere que te unas para molestar al niño nuevo.',
                options: [
                    { text: 'Unirte al grupo para encajar', effects: { happiness: -5, appearance: 3 } },
                    { text: 'Defender al niño nuevo', effects: { happiness: 8, health: -3, intelligence: 3 } },
                    { text: 'Ignorar la situación y alejarte', effects: { happiness: -2 } },
                    { text: 'Hablar con un adulto sobre la situación', effects: { intelligence: 5, happiness: 2 } }
                ]
            }
        ],
        teen: [
            {
                text: 'En una fiesta, alguien te ofrece drogas por primera vez.',
                options: [
                    { text: 'Probar por curiosidad', effects: { health: -10, happiness: 8, intelligence: -3 } },
                    { text: 'Rechazar educadamente', effects: { happiness: 2, intelligence: 3 } },
                    { text: 'Irte de la fiesta inmediatamente', effects: { happiness: -5, health: 3 } },
                    { text: 'Aceptar pero no consumir realmente', effects: { appearance: 2 } }
                ]
            },
            {
                text: 'Tienes la oportunidad de hacer trampa en el examen de admisión universitaria.',
                options: [
                    { text: 'Hacer trampa (alta probabilidad de entrar)', effects: { intelligence: -5, happiness: 5 } },
                    { text: 'Estudiar intensamente las próximas semanas', effects: { intelligence: 10, health: -5, happiness: -3 } },
                    { text: 'No presentarte y buscar trabajo', effects: { intelligence: -3, money: 2000 } },
                    { text: 'Aplicar a una universidad menos exigente', effects: { intelligence: 3, happiness: 2 } }
                ]
            },
            {
                text: 'Tu pareja te pide que dejes de ver a tu mejor amigo/a porque le tiene celos.',
                options: [
                    { text: 'Dejar de ver a tu amigo/a por amor', effects: { happiness: -8, appearance: 2 } },
                    { text: 'Terminar con tu pareja', effects: { happiness: -5, intelligence: 5 } },
                    { text: 'Intentar que se lleven bien', effects: { happiness: 3, intelligence: 3 } },
                    { text: 'Ignorar el ultimátum y seguir igual', effects: { happiness: -3 } }
                ]
            },
            {
                text: 'Descubres que tu padre tiene una aventura amorosa.',
                options: [
                    { text: 'Confrontar a tu padre directamente', effects: { happiness: -10, intelligence: 5, familyRel: -15 } },
                    { text: 'Contarle a tu madre lo que viste', effects: { happiness: -15, intelligence: 3, familyRel: -20 } },
                    { text: 'Guardar el secreto', effects: { happiness: -8, health: -3, familyRel: -5 } },
                    { text: 'Hablar con un consejero escolar', effects: { happiness: -3, intelligence: 5, familyRel: -3 } }
                ]
            }
        ],
        youngAdult: [
            {
                text: 'Te ofrecen un trabajo bien pagado en otro país, pero dejarías a tu familia.',
                options: [
                    { text: 'Aceptar el trabajo y emigrar', effects: { money: 30000, happiness: -8, intelligence: 5, familyRel: -20 } },
                    { text: 'Rechazar y quedarte con tu familia', effects: { happiness: 5, money: -2000, familyRel: 10 } },
                    { text: 'Negociar trabajo remoto', effects: { money: 15000, intelligence: 5, familyRel: 3 } },
                    { text: 'Pedir tiempo para pensarlo', effects: { intelligence: 2, familyRel: -3 } }
                ]
            },
            {
                text: 'Un amigo te propone invertir todos tus ahorros en una criptomoneda nueva.',
                options: [
                    { text: 'Invertir todo', effects: { money: 'crypto' } },
                    { text: 'Invertir solo la mitad', effects: { money: 'halfcrypto' } },
                    { text: 'Rechazar la inversión', effects: { intelligence: 3 } },
                    { text: 'Investigar antes de decidir', effects: { intelligence: 5, money: 'smartcrypto' } }
                ]
            },
            {
                text: 'Tu jefe te pide que falsifiques documentos para un cliente importante.',
                options: [
                    { text: 'Hacerlo para mantener tu empleo', effects: { money: 5000, happiness: -10, intelligence: -3 } },
                    { text: 'Negarte y arriesgarte al despido', effects: { happiness: 5, intelligence: 5, money: -5000 } },
                    { text: 'Denunciar anónimamente a las autoridades', effects: { intelligence: 8, happiness: -3 } },
                    { text: 'Pedir un traslado a otro departamento', effects: { happiness: 2, money: -1000 } }
                ]
            }
        ],
        adult: [
            {
                text: 'Tu matrimonio está en crisis. Tu pareja sugiere terapia de pareja.',
                options: [
                    { text: 'Aceptar la terapia', effects: { happiness: 5, money: -3000, intelligence: 3 } },
                    { text: 'Pedir el divorcio', effects: { happiness: -15, money: -20000 } },
                    { text: 'Intentar arreglarlo solos', effects: { happiness: -3, health: -3 } },
                    { text: 'Ignorar los problemas y seguir adelante', effects: { happiness: -8, health: -5 } }
                ]
            },
            {
                text: 'Recibes una oferta para comprar una casa, pero necesitarías endeudarte 30 años.',
                options: [
                    { text: 'Comprar la casa con hipoteca completa', effects: { money: -15000, happiness: 8, health: -3 } },
                    { text: 'Seguir alquilando y ahorrar más', effects: { money: 5000, happiness: -3 } },
                    { text: 'Buscar una casa más barata', effects: { money: -5000, happiness: 3 } },
                    { text: 'Mudarte con familiares para ahorrar', effects: { money: 10000, happiness: -8 } }
                ]
            },
            {
                text: 'Un hijo tuyo quiere dejar la universidad para ser influencer.',
                options: [
                    { text: 'Apoyar su decisión incondicionalmente', effects: { happiness: 3, money: -5000 } },
                    { text: 'Prohibírselo terminantemente', effects: { happiness: -8, intelligence: -2 } },
                    { text: 'Negociar: un año de prueba', effects: { happiness: 2, intelligence: 5 } },
                    { text: 'Cortarle la ayuda financiera', effects: { happiness: -12, money: 5000 } }
                ]
            }
        ],
        middleAge: [
            {
                text: 'Te diagnostican una enfermedad que requiere un tratamiento costoso.',
                options: [
                    { text: 'Tratamiento completo en clínica privada', effects: { health: 15, money: -40000, happiness: 5 } },
                    { text: 'Tratamiento básico en hospital público', effects: { health: 5, money: -5000 } },
                    { text: 'Buscar medicina alternativa', effects: { health: -5, money: -8000, happiness: 3 } },
                    { text: 'No tratarte y vivir con la enfermedad', effects: { health: -20, happiness: -10 } }
                ]
            },
            {
                text: 'Un antiguo socio reaparece con un negocio que suena demasiado bueno.',
                options: [
                    { text: 'Invertir fuerte en el negocio', effects: { money: 'scam' } },
                    { text: 'Investigar antes de decidir', effects: { intelligence: 5, money: 'investigate' } },
                    { text: 'Rechazar la oferta', effects: { happiness: -2 } },
                    { text: 'Consultar un abogado antes', effects: { money: -2000, intelligence: 5 } }
                ]
            }
        ],
        elder: [
            {
                text: 'Tus hijos quieren internarte en un asilo para "tu seguridad".',
                options: [
                    { text: 'Aceptar para no preocuparlos', effects: { happiness: -15, health: 5 } },
                    { text: 'Negarte rotundamente', effects: { happiness: 5, health: -5 } },
                    { text: 'Negociar: un cuidador en casa', effects: { money: -10000, happiness: 3, health: 3 } },
                    { text: 'Mudarte cerca de ellos como alternativa', effects: { happiness: 5, money: -5000 } }
                ]
            },
            {
                text: 'Encuentras el diario de tu difunta pareja con secretos que desconocías.',
                options: [
                    { text: 'Leerlo todo, necesitas saber', effects: { happiness: -10, intelligence: 3 } },
                    { text: 'Quemarlo sin leerlo', effects: { happiness: -3 } },
                    { text: 'Guardarlo para leerlo más adelante', effects: { intelligence: 2 } },
                    { text: 'Compartirlo con tus hijos', effects: { happiness: -5, intelligence: 2 } }
                ]
            }
        ]
    },

    // Death causes
    deathCauses: {
        disease: [
            'un ataque cardíaco fulminante',
            'un cáncer que fue detectado demasiado tarde',
            'una enfermedad respiratoria crónica',
            'complicaciones de diabetes',
            'un derrame cerebral',
            'una infección que no respondió al tratamiento'
        ],
        accident: [
            'un accidente de tráfico',
            'un accidente laboral',
            'una caída fatal',
            'un incendio en tu hogar',
            'un ahogamiento',
            'un accidente doméstico'
        ],
        oldAge: [
            'causas naturales, rodeado de tu familia',
            'mientras dormías pacíficamente',
            'causas naturales, en la tranquilidad de tu hogar',
            'insuficiencia cardíaca por la edad avanzada'
        ],
        crime: [
            'un enfrentamiento con la policía',
            'una pelea callejera',
            'un ajuste de cuentas',
            'violencia doméstica',
            'un robo que salió mal'
        ]
    },

    // Crime outcomes
    crimeOutcomes: [
        { text: 'Robaste un auto y lo vendiste con éxito en el mercado negro.', money: 5000, health: 0, happiness: -5, risk: 0.3 },
        { text: 'Vendiste productos falsificados y obtuviste ganancias rápidas.', money: 3000, health: 0, happiness: -3, risk: 0.2 },
        { text: 'Participaste en un asalto a mano armada.', money: 8000, health: -5, happiness: -10, risk: 0.4 },
        { text: 'Vendiste drogas en tu barrio.', money: 6000, health: -8, happiness: -8, risk: 0.35 },
        { text: 'Hackeaste una base de datos y vendiste la información.', money: 10000, health: 0, happiness: -3, risk: 0.25 },
        { text: 'Estafaste a personas mayores por teléfono.', money: 4000, health: 0, happiness: -15, risk: 0.2 }
    ],

    prisonSentences: [
        'Fuiste atrapado y sentenciado a 1 año de prisión.',
        'La policía te capturó y pasaste 2 años en la cárcel.',
        'Fuiste arrestado y condenado a 3 años de prisión.',
        'Te atraparon y el juez te dio 5 años de cárcel.'
    ]
};
