
(function () {
  const sf = document.getElementById('starfield');
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random() * 100}%;top:${Math.random() * 100}%;
      --dur:${(Math.random() * 4 + 2).toFixed(1)}s;
      --del:${(Math.random() * 5).toFixed(1)}s;
    `;
    sf.appendChild(s);
  }
})();


function setTheme(cls) {
  document.body.className = cls;
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
  if (cls === '')               document.querySelector('.theme-btn.std').classList.add('active');
  else if (cls === 'theme-alert') document.querySelector('.theme-btn.alrt').classList.add('active');
  else                           document.querySelector('.theme-btn.diag').classList.add('active');
}


let curSlide = 0;
const totalSlides = 3;

function updateSlide() {
  document.getElementById('slides').style.transform = `translateX(-${curSlide * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === curSlide));
}
function slideNext() { curSlide = (curSlide + 1) % totalSlides; updateSlide(); }
function slidePrev() { curSlide = (curSlide - 1 + totalSlides) % totalSlides; updateSlide(); }
function goSlide(n)  { curSlide = n; updateSlide(); }

setInterval(slideNext, 5000);


const QUESTIONS = [
  {
    q: 'O que é a Síndrome de Kessler?',
    opts: [
      'Falha no sistema de comunicação de satélites',
      'Efeito cascata onde colisões geram mais detritos, tornando órbitas inutilizáveis',
      'Degradação de painéis solares em LEO',
      'Interferência eletromagnética em redes mesh'
    ],
    ans: 1
  },
  {
    q: 'Qual é a principal vantagem do Edge Computing no contexto orbital?',
    opts: [
      'Maior capacidade de armazenamento em solo',
      'Melhor qualidade das imagens capturadas',
      'Decisões de evasão em milissegundos, sem latência de uplink',
      'Redução do custo de lançamento de satélites'
    ],
    ans: 2
  },
  {
    q: 'A que velocidade aproximada os satélites operam em LEO (Low Earth Orbit)?',
    opts: ['3.000 km/h', '7.000 km/h', '28.000 km/h', '150.000 km/h'],
    ans: 2
  },
  {
    q: 'Qual função matemática modela o crescimento exponencial de detritos na Síndrome de Kessler?',
    opts: ['N(t) = N₀ + k·t', 'N(t) = N₀ · eᵏᵗ', 'N(t) = N₀ / t²', 'N(t) = log(N₀ · k · t)'],
    ans: 1
  },
  {
    q: 'O que é uma Mesh Network (Rede em Malha) no contexto da OrbitClean Edge?',
    opts: [
      'Uma antena parabólica terrestre de alta potência',
      'Uma rede onde cada satélite comunica com vizinhos sem roteador central',
      'Um protocolo de criptografia de dados orbitais',
      'Um tipo de sensor de temperatura espacial'
    ],
    ans: 1
  },
  {
    q: 'Qual componente do circuito Arduino simula o RADAR/LIDAR de detecção de detritos?',
    opts: ['Sensor TMP36', 'LCD 16x2', 'Servo Motor', 'Sensor Ultrassônico HC-SR04'],
    ans: 3
  },
  {
    q: 'O que significa RCS no contexto de controle orbital?',
    opts: [
      'Remote Communication System',
      'Reaction Control System',
      'Radar Collision Sensor',
      'Redundant Computing Stack'
    ],
    ans: 1
  },
  {
    q: 'Qual ODS da ONU está diretamente relacionado à preservação das órbitas como infraestrutura global?',
    opts: [
      'ODS 3 — Saúde e Bem-Estar',
      'ODS 7 — Energia Limpa',
      'ODS 9 — Indústria, Inovação e Infraestrutura',
      'ODS 15 — Vida Terrestre'
    ],
    ans: 2
  },
  {
    q: 'Quantos detritos maiores que 10cm estão catalogados atualmente em órbita terrestre?',
    opts: [
      'Aproximadamente 500',
      'Aproximadamente 3.000',
      'Mais de 27.000',
      'Mais de 1 milhão'
    ],
    ans: 2
  },
  {
    q: 'No projeto OrbitClean Edge, o que o operador terrestre faz após a evasão autônoma?',
    opts: [
      'Aciona manualmente os propulsores de backup',
      'Audita os logs automáticos de telemetria gerados pela IA de borda',
      'Recalcula a trajetória do satélite do zero',
      'Reinicializa o sistema embarcado do satélite'
    ],
    ans: 1
  }
];

let qIdx = 0;
let score = 0;

function startQuiz() {
  qIdx = 0;
  score = 0;
  document.getElementById('quiz-body').style.display = 'block';
  document.getElementById('quiz-result').style.display = 'none';
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[qIdx];
  document.getElementById('qNum').textContent = qIdx + 1;
  document.getElementById('qBar').style.width = ((qIdx + 1) / 10 * 100) + '%';
  document.getElementById('qText').textContent = q.q;
  document.getElementById('qFeed').textContent = '';
  document.getElementById('qFeed').style.color = '';

  const opts = document.getElementById('qOpts');
  opts.innerHTML = '';
  q.opts.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = o;
    btn.onclick = () => answerQuiz(i, btn);
    opts.appendChild(btn);
  });
}

function answerQuiz(chosen, btn) {
  const q = QUESTIONS[qIdx];
  document.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
  const feed = document.getElementById('qFeed');

  if (chosen === q.ans) {
    btn.classList.add('correct');
    feed.textContent = '✓ Correto!';
    feed.style.color = '#00ff88';
    score++;
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.quiz-opt')[q.ans].classList.add('correct');
    feed.textContent = '✗ Incorreto. A resposta correta está destacada.';
    feed.style.color = 'var(--danger)';
  }

  setTimeout(() => {
    qIdx++;
    if (qIdx < QUESTIONS.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }, 1600);
}

function showResult() {
  document.getElementById('quiz-body').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'block';
  document.getElementById('rScore').textContent = score + '/10';

  const grade =
    score >= 9 ? '🏆 ASTRONAUTA — Conhecimento orbital excepcional!'
    : score >= 7 ? '🚀 ENGENHEIRO DE MISSÃO — Muito bem!'
    : score >= 5 ? '🛰️ OPERADOR — Conhecimento sólido. Pratique mais!'
    : score >= 3 ? '📡 ESTAGIÁRIO — Continue estudando a documentação!'
    :              '🌍 TERRESTRE — Revise os conceitos da solução!';

  const rg = document.getElementById('rGrade');
  rg.textContent = grade;
  rg.style.color = score >= 7 ? '#00ff88' : score >= 5 ? 'var(--accent)' : 'var(--danger)';
}

startQuiz();

function submitForm() {
  let valid = true;

  function check(id, errId, condition) {
    const el  = document.getElementById(id);
    const err = document.getElementById(errId);
    if (condition) {
      el.classList.add('err');
      err.classList.add('show');
      valid = false;
    } else {
      el.classList.remove('err');
      err.classList.remove('show');
    }
  }

  const name    = document.getElementById('f-name').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const subject = document.getElementById('f-subject').value;
  const msg     = document.getElementById('f-msg').value.trim();
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  check('f-name',    'err-name',    name === '');
  check('f-email',   'err-email',   email === '' || !emailRx.test(email));
  check('f-subject', 'err-subject', subject === '');
  check('f-msg',     'err-msg',     msg === '');

  if (valid) {
    document.getElementById('form-success').classList.add('show');
    ['f-name', 'f-email', 'f-org', 'f-msg'].forEach(id => {
      document.getElementById(id).value = '';
    });
    document.getElementById('f-subject').value = '';
    setTimeout(() => {
      document.getElementById('form-success').classList.remove('show');
    }, 5000);
  }
}
