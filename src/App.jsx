import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import Placeholder from './components/Placeholder'
import DottedSurface from './components/DottedSurface'
import SeloGarantia from './components/SeloGarantia'
import logoSBC from './assets/logo-sbc.png'
import robsonImg from './assets/robson.png'
import etapa1Img from './assets/etapas/etapa1.webp'
import etapa2Img from './assets/etapas/etapa2.webp'
import etapa3Img from './assets/etapas/etapa3.webp'
import etapa4Img from './assets/etapas/etapa4.webp'
import etapa5Img from './assets/etapas/etapa5.webp'
import depoRicardo from './assets/depoimentos/ricardo.webp'
import depoLilian from './assets/depoimentos/lilian.webp'
import depoKemilly from './assets/depoimentos/kemilly.webp'

const ETAPAS_EXAME = [
  { n: '01', img: etapa1Img, alt: 'Profissional de saúde recebendo e orientando o paciente antes do exame', titulo: 'Recepção e preparo', desc: 'O paciente chega, entende o exame e a pele é preparada para receber os sensores.' },
  { n: '02', img: etapa2Img, alt: 'Técnico fixando eletrodos na cabeça de um paciente já com cânula nasal, eletrodos de queixo e cinta torácica', titulo: 'Montagem dos sensores', desc: 'Eletrodos de EEG, EOG e EMG, cânula nasal, termistor, cintas de esforço e oxímetro.' },
  { n: '03', img: etapa3Img, alt: 'Close dos eletrodos de EEG presos ao couro cabeludo com fita, durante a montagem do exame', titulo: 'Calibração biológica', desc: 'Antes de apagar a luz, cada canal é testado para confirmar que responde como deveria.' },
  { n: '04', img: etapa4Img, alt: 'Paciente dormindo monitorado, com máscara de CPAP e eletrodos no rosto', titulo: 'Monitoramento da noite', desc: 'O técnico acompanha os traçados na tela, corrige perdas de sinal e documenta o que acontece.' },
  { n: '05', img: etapa5Img, alt: 'Profissionais de saúde revisando o registro do exame no computador', titulo: 'Fechamento e registro', desc: 'O exame é salvo, os materiais higienizados e a noite documentada para a análise médica.' },
]

const DEPOIMENTOS = [
  { img: depoRicardo, alt: 'Mensagem do aluno Ricardo Bandeira sobre o módulo 1, que considerou instrutivo e claro' },
  { img: depoLilian, alt: 'Mensagem da aluna Lilian Santana agradecendo pelas aulas ao longo do curso' },
  { img: depoKemilly, alt: 'Mensagem da aluna Kemilly contando que conseguiu uma oportunidade de trabalho em polissonografia' },
]

const NAV_LINKS = [
  { label: 'Para quem é', href: '#para-quem' },
  { label: 'O que você aprende', href: '#o-que-aprende' },
  { label: 'Módulos', href: '#modulos' },
  { label: 'Quem ensina', href: '#quem-ensina' },
]

// Vídeo do hero: coloque o arquivo em public/video/hero.mp4
// (opcional) uma imagem de capa em public/video/hero-poster.jpg e preencha HERO_VIDEO_POSTER
const HERO_VIDEO_SRC = '/video/hero.mp4'
const HERO_VIDEO_POSTER = null

const WHATSAPP_URL = '#'
const CLIENT_URL = '#'

const serviceButtons = [
  { key: 'diagnostico', label: 'DIAGNÓSTICO' },
  { key: 'polissonografia', label: 'POLISSONOGRAFIA' },
  { key: 'apneia', label: 'APNEIA DO SONO' },
  { key: 'insonia', label: 'INSÔNIA' },
]

const serviceButtons2 = [
  { key: 'ronco', label: 'RONCO' },
  { key: 'bruxismo', label: 'BRUXISMO' },
  { key: 'narcolepsia', label: 'NARCOLEPSIA' },
  { key: 'pediatrico', label: 'SONO PEDIÁTRICO' },
]

const faqData = [
  { q: 'Qual é o Investimento do curso?', a: 'R$ 97,00 em pagamento único, com acesso a todos os 5 módulos da formação. Não há mensalidade nem cobrança recorrente.' },
  { q: 'O Que Faz um Técnico em Polissonografia?', a: 'O Técnico em Polissonografia é o profissional que deve ser habilitado para trabalhar com o uso de ferramentas diagnósticas e terapêuticas auxiliando em estudos do sono de seres humanos. Geralmente trabalha em plantões noturnos de 12 horas. A média salarial inicial varia entre R$1.700,00 a R$2.200,00 em São Paulo. Com a crescente demanda por mão de obra qualificada, àqueles que se destacam não faltam oportunidades e para quem busca crescimento profissional saiba que nesta área o estudo constante é fundamental. Manter-se atualizado é uma exigência nos dias atuais para que você garanta uma boa prática da medicina do sono.' },
  { q: 'Como Funciona o Acesso às Aulas?', a: 'O curso é 100% online e as aulas são gravadas. Assim que o pagamento é aprovado, você recebe acesso aos 5 módulos e estuda no seu próprio ritmo, de onde quiser e quantas vezes precisar.' },
  { q: 'O Certificado é Válido em Qualquer Instituição?', a: 'Sim. A maioria dos laboratórios procuram contratar profissionais que possuam certificado de técnico em Polissonografia. Recomendamos aos alunos, após adquirirem experiência prática no mercado de trabalho, que realizem a prova de habilitação para técnicos em polissonografia junto a ABSono.' },
  { q: 'Quais São os Métodos de Pagamento Aceitos?', a: 'Cartão de crédito, PIX, boleto bancário ou transferência. O acesso é liberado assim que o pagamento é confirmado.' },
]

const servicosBase = [
  '5 módulos completos com videoaulas',
  'Acesso 100% online e no seu ritmo',
  'Conteúdo baseado nas diretrizes da AASM',
  'Neuroanatomia e ritmos cerebrais',
  'Distúrbios respiratórios do sono',
  'Métodos diagnósticos avançados',
  'Certificado de conclusão',
  'Acesso por 12 meses',
  'Material de apoio exclusivo',
  'Suporte com especialistas',
]


const moduleSlideTexts = [
  'Avaliação Inicial', 'Diagnóstico Avançado', 'Plano de Tratamento',
  'Higiene do Sono', 'Terapia Comportamental', 'Acompanhamento',
  'Monitoramento', 'Programa Bem-Estar', 'Sono Restaurador',
  'Vida com Qualidade'
]

const specialModuleTexts = [
  'Apneia', 'Insônia', 'Ronco', 'Bruxismo', 'Narcolepsia',
  'Sono REM', 'Ritmo Circadiano', 'Parassonias', 'Hipersonia',
  'S. Pernas Inquietas', 'Sono Pediátrico', 'Sono Gestacional',
  'Sono Idoso', 'Cronoterapia', 'Fototerapia', 'CPAP',
  'Dispositivo Oral', 'Cirurgia do Sono', 'Nutrição & Sono',
  'Exercício & Sono', 'Meditação'
]

function CheckItem({ text }) {
  return (
    <div className="check-item">
      <i className="fas fa-check-circle"></i>
      <p>{text}</p>
    </div>
  )
}

function App() {
  const [activeService, setActiveService] = useState('diagnostico')
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [navShrunk, setNavShrunk] = useState(false)
  const [heroVideoIndisponivel, setHeroVideoIndisponivel] = useState(false)
  const [prefereMenosMovimento, setPrefereMenosMovimento] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const aplicar = () => setPrefereMenosMovimento(mq.matches)
    aplicar()
    mq.addEventListener('change', aplicar)
    return () => mq.removeEventListener('change', aplicar)
  }, [])

  useEffect(() => {
    const onScroll = () => setNavShrunk(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="page-wrapper">
      {/* ===== NAVBAR ===== */}
      <nav className={navShrunk ? 'navbar is-shrunk' : 'navbar'}>
        <div className="navbar-inner">
          <div className="navbar-logo">
            <img src={logoSBC} alt="Sono Brasil Consultoria" className="logo-img" />
          </div>
          <div className="navbar-links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="navbar-link">{l.label}</a>
            ))}
          </div>
          <div className="navbar-actions">
            <a href="#planos" className="btn btn-primary">Quero Me Especializar</a>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero-section">
        <DottedSurface />
        <div className="section-control">
          <div className="hero-content">
            <h2 className="hero-title">Aprenda polissonografia antes que a concorrência apareça</h2>
            <p className="hero-subtitle">
              Polissonografia é uma das áreas da saúde com menos concorrência qualificada no Brasil. Aprenda com quem já capacitou serviços em sete estados.
            </p>
            <div className="hero-video">
              {heroVideoIndisponivel ? (
                <div className="video-placeholder">
                  <Placeholder width={720} height={360} text="" style={{ borderRadius: 16, maxWidth: '100%', aspectRatio: '16/9' }} />
                  <div className="video-play-overlay">
                    <div className="video-play-btn">
                      <i className="fas fa-play"></i>
                    </div>
                    <p className="video-play-label">Vídeo Institucional</p>
                  </div>
                </div>
              ) : (
                <video
                  className="hero-video-el"
                  src={HERO_VIDEO_SRC}
                  poster={HERO_VIDEO_POSTER || undefined}
                  playsInline
                  controls
                  preload="metadata"
                  onError={() => setHeroVideoIndisponivel(true)}
                >
                  Seu navegador não suporta vídeo HTML5.
                </video>
              )}
            </div>
            <a href="#planos" className="btn btn-primary btn-large">Quero Me Especializar</a>
          </div>
        </div>
      </section>


      {/* ===== ABOUT / STATS ===== */}
      <section className="lema-section">
        <div className="section-control">
          <div className="lema-content">
            <div className="lema-quote-box">
              <p className="lema-label">Na Sono Brasil, acreditamos que:</p>
              <p className="lema-text">Exame bem feito<br />começa por<br />técnico bem formado.</p>
            </div>

            <p className="lema-desc">Somos uma consultoria especializada em medicina do sono. Há 15 anos montamos serviços de polissonografia, treinamos equipes e acompanhamos exames pelo Brasil. Foi dessa rotina, e não de uma sala de aula, que nasceu esta formação.</p>

            <div className="stats-grid">
              <div className="stats-row">
                <div className="stat-box">
                  <p className="stat-number">+ 10 mil</p>
                  <p className="stat-label">pacientes atendidos</p>
                </div>
                <div className="stat-box">
                  <p className="stat-number">15 anos</p>
                  <p className="stat-label">de consultoria em polissonografia</p>
                </div>
                <div className="stat-box">
                  <p className="stat-number">98%</p>
                  <p className="stat-label">de satisfação</p>
                </div>
              </div>
            </div>

            <a href="#planos" className="btn btn-primary btn-large">Quero Me Especializar</a>
          </div>
        </div>
      </section>

      {/* ===== TARGET AUDIENCE ===== */}
      <section className="audience-section" id="para-quem">
        <div className="section-control">
          <h2 className="audience-title">Este curso é para quem quer <span className="text-accent">trabalhar com isso</span></h2>
          <div className="audience-grid">
            <div className="audience-card">
              <div className="audience-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3 className="audience-card-title">Quer entrar na saúde</h3>
              <p className="audience-card-text">Você procura uma profissão com demanda real e não quer esperar cinco anos de faculdade para começar a trabalhar.</p>
            </div>
            <div className="audience-card audience-card-highlight">
              <div className="audience-icon">
                <i className="fas fa-user-nurse"></i>
              </div>
              <h3 className="audience-card-title">Já faz polissonografia</h3>
              <p className="audience-card-text">Você foi treinado às pressas, conduz o exame por repetição e tem dúvida se está fazendo certo. Essa insegurança tem conserto.</p>
            </div>
            <div className="audience-card">
              <div className="audience-icon">
                <i className="fas fa-stethoscope"></i>
              </div>
              <h3 className="audience-card-title">Já atua na saúde</h3>
              <p className="audience-card-text">Técnico de enfermagem, fisioterapeuta ou biomédico que quer uma especialização com pouca concorrência na sua cidade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COURSE MODULES ===== */}
      <section className="course-section" id="o-que-aprende">
        <div className="section-control">
          <h2 className="course-title">O que você vai <span className="text-accent">aprender</span></h2>
          <p className="course-sub">Uma formação completa em polissonografia, do fundamento técnico à leitura do exame.</p>
          <div className="course-timeline">
            {[
              {
                num: '01',
                title: 'MÓDULO 1 — FUNDAMENTOS TÉCNICOS DA POLISSONOGRAFIA',
                lessons: '1 Aula',
                text: 'Entenda a polissonografia como registro multicanal: a estrutura do laboratório do sono, o preparo do paciente e a rotina do plantão. Domine toda a cadeia do sinal, de sensores e eletrodos à impedância, amplificação e filtros, além da calibração biológica e da documentação técnica do exame.',
                icon: 'fas fa-microchip',
              },
              {
                num: '02',
                title: 'MÓDULO 2 — POLISSONOGRAFIA NA PRÁTICA: TECNOLOGIA, AMBIENTE E SINAIS',
                lessons: '1 Aula',
                text: 'Percorra a evolução da tecnologia do sono, do EEG em papel ao registro digital, e conheça o laboratório por dentro. Saiba o que cada sensor mede, como se diferenciam os exames de tipo I a IV, o que fazer no controle de qualidade durante a noite e onde o técnico decide a validade do exame.',
                icon: 'fas fa-wave-square',
              },
              {
                num: '03',
                title: 'MÓDULO 3 — SONO E RESPIRAÇÃO',
                lessons: '1 Aula',
                text: 'Domine o ciclo da apneia obstrutiva, do colapso da via aérea ao microdespertar, e entenda o CPAP como tala pneumática. Aprenda a aclimatar o paciente, controlar máscara e vazamento, conduzir a titulação manual pelos critérios da AASM, saber quando o binível entra e avaliar a qualidade final da titulação.',
                icon: 'fas fa-lungs',
              },
              {
                num: '04',
                title: 'MÓDULO 4 — LEITURA TÉCNICA DOS SINAIS DA POLISSONOGRAFIA',
                lessons: '1 Aula',
                text: 'Aprenda a ler a tela do exame com critério: quais canais definem o estágio do sono e quais apenas explicam o que acontece nele. Domine a medição da cabeça, a montagem de EEG, EOG e EMG, os sensores respiratórios e, principalmente, como separar um evento fisiológico real de um artefato.',
                icon: 'fas fa-chart-line',
              },
              {
                num: '05',
                title: 'MÓDULO 5 — RITMOS CEREBRAIS, ESTÁGIOS DO SONO E RECONHECIMENTO VISUAL NA POLISSONOGRAFIA',
                lessons: '1 Aula',
                text: 'Treine o olho para a tela: frequência, amplitude e os ritmos delta, teta, alfa e beta. Aprenda a reconhecer vigília, N1, N2, N3 e REM lendo EEG, EOG e EMG em conjunto, a identificar fusos e complexos K, e a usar isso para decidir quando entrar no quarto e quando é melhor esperar.',
                icon: 'fas fa-brain',
              },
            ].map((mod, i) => (
              <div className="course-module" key={i}>
                <div className="course-module-indicator">
                  <div className="course-module-dot">
                    <i className={mod.icon}></i>
                  </div>
                  {i < 4 && <div className="course-module-line"></div>}
                </div>
                <div className="course-module-content">
                  <span className="course-module-badge">{mod.lessons}</span>
                  <h3 className="course-module-title">{mod.title}</h3>
                  <p className="course-module-text">{mod.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MODULES SHOWCASE ===== */}
      <section className="modules-showcase" id="modulos">
        <div className="modules-showcase-inner">
          <div className="modules-showcase-text">
            <h2 className="modules-showcase-title">Dominar a polissonografia <span className="text-accent-light">transforma sua carreira.</span></h2>
            <p className="modules-showcase-desc">A medicina do sono é uma das áreas que mais crescem no Brasil, e falta profissional qualificado em praticamente todo serviço diagnóstico do país. Quem domina a técnica é disputado.</p>
            <p className="modules-showcase-highlight">Cada módulo foi pensado para te levar do zero à leitura do exame com confiança.</p>
            <p className="modules-showcase-desc">São <strong>5 módulos completos</strong>, construídos a partir do que acontece de verdade num plantão: o que funciona, onde os erros aparecem e o que separa um exame confiável de uma noite perdida.</p>
            <a href="#planos" className="btn btn-red btn-large">Quero Me Especializar</a>
          </div>

          <div className="modules-showcase-cards">
            <div className="carousel-wrapper">
              <Swiper
                modules={[Pagination, Autoplay, FreeMode]}
                spaceBetween={20}
                grabCursor
                loop
                speed={prefereMenosMovimento ? 400 : 5000}
                autoplay={prefereMenosMovimento ? false : { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
                freeMode={prefereMenosMovimento ? false : { enabled: true, momentum: false }}
                pagination={{ el: '.mod-show-pagination', clickable: true }}
                breakpoints={{ 0: { slidesPerView: 1 }, 500: { slidesPerView: 2 }, 900: { slidesPerView: 3 }, 1200: { slidesPerView: 4 } }}
              >
                {ETAPAS_EXAME.map((etapa, i) => (
                  <SwiperSlide key={i}>
                    <div className="mod-show-card etapa-card">
                      <div className="mod-show-thumb">
                        <img src={etapa.img} alt={etapa.alt} loading="lazy" />
                      </div>
                      <div className="etapa-legenda">
                        <span className="etapa-num">{etapa.n}</span>
                        <p className="etapa-titulo">{etapa.titulo}</p>
                        <p className="etapa-desc">{etapa.desc}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-pagination mod-show-pagination"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="pricing-section" id="planos">
        <div className="section-control">
          <h2 className="pricing-headline">Invista na sua carreira em <br /><span className="text-accent">medicina do sono</span></h2>
          <p className="pricing-intro-top">Ao final dos 5 módulos você monta o exame, reconhece os estágios do sono na tela e conduz uma noite inteira de polissonografia com segurança. É a base que um laboratório espera de quem contrata, e é o mesmo conteúdo que usamos para capacitar as equipes dos serviços que atendemos pelo Brasil. O primeiro salário da profissão cobre esse valor mais de quinze vezes.</p>

          <div className="pricing-card-full">
            <p className="pricing-label">Acesso completo por</p>
            <p className="pricing-installment">pagamento único de</p>
            <p className="pricing-price">R$ 97,00</p>
            <a className="btn btn-red btn-checkout" onClick={(e) => { e.preventDefault(); setShowCheckoutModal(true) }} href="#">
              Quero Me Especializar
            </a>
            <p className="pricing-annual">Acesso imediato aos 5 módulos, sem mensalidade</p>
          </div>
        </div>
      </section>

      {/* ===== GUARANTEE ===== */}
      <section className="guarantee-section">
        <div className="section-control">
          <div className="guarantee-content">
            <SeloGarantia size={169} className="guarantee-seal" />
            <p className="guarantee-title">7 DIAS DE GARANTIA</p>
            <p className="guarantee-text">Entre, assista às aulas e avalie com calma. Se entender que esta formação não é para você, peça o reembolso em até 7 dias e devolvemos o valor integral, sem burocracia e sem pergunta nenhuma.</p>
          </div>
        </div>
      </section>

      {/* ===== BIO ===== */}
      <section className="bio-section" id="quem-ensina">
        <div className="section-control bio-inner">
          <div className="bio-text">
            <h2>Conheça o diretor clínico da <span className="text-accent">Sono Brasil Consultoria</span></h2>
            <p>O Dr. Robson dirige clinicamente a Sono Brasil Consultoria e passou os últimos 15 anos dentro de laboratórios do sono, montando serviços, treinando equipes e acompanhando exames noite após noite.</p>
            <p>É essa rotina que sustenta cada módulo do curso. Você aprende o que funciona no plantão, onde os erros costumam aparecer e como reconhecer um exame que vai se perder antes que ele se perca.</p>
            <h3 className="bio-subtitle">Há 15 anos inspirando com conhecimento</h3>
            <p>Nestes 15 anos de atuação com consultoria especializada em polissonografia, percebemos o quão desafiador pode ser para serviços diagnósticos fora do eixo sudeste do Brasil conseguirem manter seus profissionais qualificados e atualizados. Sabendo disso nasceu em nós o desejo de contribuir com a qualificação profissional dos que atuam como técnicos em polissonografia.</p>
            <p>Com isso já conseguimos atingir os estados do Acre, Amapá, Goiás, Bahia, Mato Grosso, Mato Grosso do Sul, Minas Gerais, além do eixo Sudeste. Estes estados hoje contam com serviços diagnósticos que tiveram a capacitação profissional realizada pela Sono Brasil Consultoria.</p>
            <p>Temos orgulho do nosso trabalho e também de saber que com nossa expertise contribuímos todos os dias para o exercício fidedigno da medicina do sono. Acreditamos que para isso, mão de obra qualificada é essencial. <strong>Humanismo Sempre!</strong></p>
          </div>
          <div className="bio-img">
            <img src={robsonImg} alt="Diretor Clínico - Dr. Robson" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section">
        <div className="section-control">
          <div className="testimonials-content">
            <h2 className="testimonials-title">Veja o que nossos <span className="text-accent">alunos dizem</span> sobre o curso:</h2>
            <div className="testimonials-grid">
              {DEPOIMENTOS.map((d, i) => (
                <a
                  key={i}
                  className="depoimento-card"
                  href={d.img}
                  target="_blank"
                  rel="noreferrer"
                  title="Clique para ver a mensagem inteira"
                >
                  <img src={d.img} alt={d.alt} loading="lazy" />
                </a>
              ))}
            </div>
            <a href="#planos" className="btn btn-primary btn-large">Quero Me Especializar</a>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="faq-section">
        <div className="section-control">
          <div className="faq-content">
            <p className="faq-title">Perguntas Frequentes</p>
            <div className="faq-list">
              {faqData.map((f, i) => (
                <details key={i} className="faq-item">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
            <div className="support-box">
              <span className="support-label">Precisa de ajuda? Fale conosco.</span>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                <i className="bi bi-whatsapp"></i> FALAR COM ATENDIMENTO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="section-control">
          <div className="footer-inner">
            <div className="footer-row">
              <div className="footer-logo">
                <img src={logoSBC} alt="Sono Brasil Consultoria" className="logo-img logo-footer" />
              </div>
              <div className="footer-links">
                <a href="/termos-de-uso.html">Termos de uso</a>
                <a href="/politica-privacidade.html">Política de privacidade</a>
              </div>
            </div>
            <p className="footer-copy">© 2026 Sono Brasil Consultoria – Todos os direitos reservados</p>
          </div>
        </div>
      </footer>

      {/* ===== WHATSAPP FLOAT ===== */}
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="wpp-float" title="WhatsApp">
        <i className="bi bi-whatsapp"></i>
      </a>

      {/* ===== CONTACT MODAL ===== */}
      {showCheckoutModal && (
        <div className="modal-overlay" onClick={() => setShowCheckoutModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowCheckoutModal(false)}>X</button>
            <h1>Preencha seus dados para agendar:</h1>
            <form onSubmit={(e) => { e.preventDefault(); alert('Agendamento enviado! Entraremos em contato.'); setShowCheckoutModal(false) }}>
              <input type="text" placeholder="Digite seu nome" required />
              <input type="email" placeholder="Digite seu e-mail" required />
              <input type="tel" placeholder="Digite seu telefone" required />
              <button type="submit" className="btn btn-primary btn-submit">AGENDAR CONSULTA</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
