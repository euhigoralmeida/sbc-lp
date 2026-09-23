import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import Placeholder from './components/Placeholder'
import DottedSurface from './components/DottedSurface'
import logoSBC from './assets/logo-sbc.png'
import robsonImg from './assets/robson.png'

const NAV_LINKS = [
  { label: 'Para quem é', href: '#para-quem' },
  { label: 'O que você aprende', href: '#o-que-aprende' },
  { label: 'Módulos', href: '#modulos' },
  { label: 'Quem ensina', href: '#quem-ensina' },
  { label: 'Planos', href: '#planos' },
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
  { q: 'Qual é o Investimento do curso?', a: 'Para pagamento à vista o preço é de R$2.180,00. Para pagamento via cartão de crédito o valor é de R$2.380,00 em até 12 parcelas. O aluno também pode parcelar em 4x de R$595,00 no boleto bancário direto com a Sono Brasil. Outra opção é a contratação do Crédito Educacional da Sono Brasil com a Provi. Nesta última opção, você pode pagar o curso em até 12 vezes no boleto bancário (Entrada de R$238,00 + 12 boletos de R$202,37).' },
  { q: 'O Que Faz um Técnico em Polissonografia?', a: 'O Técnico em Polissonografia é o profissional que deve ser habilitado para trabalhar com o uso de ferramentas diagnósticas e terapêuticas auxiliando em estudos do sono de seres humanos. Geralmente trabalha em plantões noturnos de 12 horas. A média salarial inicial varia entre R$1.700,00 a R$2.200,00 em São Paulo. Com a crescente demanda por mão de obra qualificada, àqueles que se destacam não faltam oportunidades e para quem busca crescimento profissional saiba que nesta área o estudo constante é fundamental. Manter-se atualizado é uma exigência nos dias atuais para que você garanta uma boa prática da medicina do sono.' },
  { q: 'Qual a Duração do Curso?', a: 'Cerca de 3 meses. Dentro deste período estão incluídos teoria EAD e aulas práticas.' },
  { q: 'Quando Serão as Aulas Práticas?', a: 'A imersão prática em polissonografia ocorre em São Paulo em data a definir individualmente com cada aluno.' },
  { q: 'Qual o Local das Aulas Práticas?', a: 'A imersão prática de 3 dias vai ocorrer em São Paulo logo após a conclusão das aulas EAD em um de nossos auditórios conveniados com espaço adequado para toda a prática.' },
  { q: 'O Certificado é Válido em Qualquer Instituição?', a: 'Sim. A maioria dos laboratórios procuram contratar profissionais que possuam certificado de técnico em Polissonografia. Recomendamos aos alunos, após adquirirem experiência prática no mercado de trabalho, que realizem a prova de habilitação para técnicos em polissonografia junto a ABSono.' },
  { q: 'Quais São os Métodos de Pagamento Aceitos?', a: 'O aluno pode realizar o pagamento via boleto bancário, via cartão de crédito, transferência bancária ou PIX. Aproveite e estude realizando a contratação do financiamento estudantil Crédito Educacional. Consulte condições.' },
]

const servicosBase = [
  '5 módulos completos com videoaulas',
  '5 plantões práticos supervisionados',
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
            <div className="hero-reviews">
              <div className="review-avatars">
                {[
                  { initial: 'M', color: '#8B2E2E' },
                  { initial: 'R', color: '#6B3A2A' },
                  { initial: 'C', color: '#4A7A3A' },
                  { initial: 'A', color: '#8B2E2E' },
                  { initial: 'L', color: '#6B3A2A' },
                ].map((a, i) => (
                  <div key={i} className="review-avatar" style={{ background: a.color }}>{a.initial}</div>
                ))}
              </div>
              <div className="review-stars">
                {'★★★★★'.split('').map((s, i) => <span key={i} className="star">{s}</span>)}
                <span className="review-score">4.9</span>
              </div>
              <p className="review-count">(487 avaliações)</p>
            </div>
            <h2 className="hero-title">Especialista em qualidade do sono</h2>
            <p className="hero-subtitle">
              Descubra como a Sono Brasil Consultoria pode transformar suas noites e melhorar sua qualidade de vida com tratamentos baseados em evidências científicas.
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
              <p className="lema-text">Dormir bem não é luxo,<br />é a base de uma<br />vida saudável e produtiva.</p>
            </div>

            <p className="lema-desc">Somos uma equipe multidisciplinar dedicada à medicina do sono. Com profissionais altamente qualificados, atendemos pacientes em todo o Brasil, promovendo saúde e qualidade de vida através do sono restaurador.</p>

            <div className="stats-grid">
              <div className="stats-row">
                <div className="stat-box">
                  <p className="stat-number">+ 10 mil</p>
                  <p className="stat-label">pacientes atendidos</p>
                </div>
                <div className="stat-box">
                  <p className="stat-number">15 anos</p>
                  <p className="stat-label">de experiência</p>
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
          <h2 className="audience-title">O curso técnico em polissonografia é <span className="text-accent">indicado para</span></h2>
          <div className="audience-grid">
            <div className="audience-card">
              <div className="audience-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3 className="audience-card-title">Iniciantes</h3>
              <p className="audience-card-text">Busca uma colocação no mercado de trabalho? Dê vida a suas habilidades e destaque-se no mercado de trabalho.</p>
            </div>
            <div className="audience-card audience-card-highlight">
              <div className="audience-icon">
                <i className="fas fa-user-nurse"></i>
              </div>
              <h3 className="audience-card-title">Profissionais da área</h3>
              <p className="audience-card-text">Você que atua com polissonografia mas não recebeu os fundamentos básicos do procedimento, este curso é pra você!</p>
            </div>
            <div className="audience-card">
              <div className="audience-icon">
                <i className="fas fa-stethoscope"></i>
              </div>
              <h3 className="audience-card-title">Profissionais de outras áreas</h3>
              <p className="audience-card-text">Você trabalha na área da saúde e tem desejo de expandir seus conhecimentos sobre o sono? Estude conosco e se torne um profissional diferenciado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COURSE MODULES ===== */}
      <section className="course-section" id="o-que-aprende">
        <div className="section-control">
          <h2 className="course-title">O que você vai <span className="text-accent">aprender</span></h2>
          <p className="course-sub">Uma formação completa em polissonografia, da teoria à prática clínica.</p>
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
            <p className="modules-showcase-desc">A medicina do sono é uma das áreas que mais cresce no Brasil. Profissionais qualificados em polissonografia são escassos e altamente valorizados no mercado.</p>
            <p className="modules-showcase-highlight">Cada módulo foi pensado para te levar do zero à prática clínica com confiança.</p>
            <p className="modules-showcase-desc">É por isso que o curso reúne <strong>5 módulos completos</strong> para formar profissionais preparados, atualizados e prontos para atuar com excelência em qualquer serviço diagnóstico do país.</p>
            <a href="#planos" className="btn btn-red btn-large">Quero Me Especializar</a>
          </div>

          <div className="modules-showcase-cards">
            <div className="carousel-wrapper">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                grabCursor
                navigation={{ nextEl: '.mod-show-next', prevEl: '.mod-show-prev' }}
                pagination={{ el: '.mod-show-pagination', clickable: true }}
                breakpoints={{ 0: { slidesPerView: 1 }, 500: { slidesPerView: 2 }, 900: { slidesPerView: 3 }, 1200: { slidesPerView: 4 } }}
              >
                {[
                  { title: 'Fundamentos Técnicos da Polissonografia', tag: 'MÓDULO 1', lessons: '1 aula' },
                  { title: 'Polissonografia na Prática: Tecnologia, Ambiente e Sinais', tag: 'MÓDULO 2', lessons: '1 aula' },
                  { title: 'Sono e Respiração', tag: 'MÓDULO 3', lessons: '1 aula' },
                  { title: 'Leitura Técnica dos Sinais da Polissonografia', tag: 'MÓDULO 4', lessons: '1 aula' },
                  { title: 'Ritmos Cerebrais, Estágios do Sono e Reconhecimento Visual na Polissonografia', tag: 'MÓDULO 5', lessons: '1 aula' },
                ].map((mod, i) => (
                  <SwiperSlide key={i}>
                    <div className="mod-show-card">
                      <div className="mod-show-thumb">
                        <Placeholder width={280} height={380} text="" style={{ borderRadius: 16, width: '100%', height: '100%' }} />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="slider-btn mod-show-next">
                <div className="slider-arrow">&#8250;</div>
              </div>
              <div className="slider-btn mod-show-prev">
                <div className="slider-arrow">&#8249;</div>
              </div>
              <div className="swiper-pagination mod-show-pagination"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="pricing-section" id="planos">
        <div className="section-control">
          <h2 className="pricing-headline">Invista na sua carreira em <br /><span className="text-accent">medicina do sono</span></h2>
          <p className="pricing-intro-top">Por menos do que você gasta em um hambúrguer de qualidade duvidosa no fim de semana, você tem na palma da mão acesso a um acervo completo de aulas, uma comunidade ativa e conteúdos sempre atualizados com novas gravações, lives e módulos.</p>

          <div className="pricing-card-full">
            <p className="pricing-label">Assine por apenas</p>
            <p className="pricing-installment">12x de</p>
            <p className="pricing-price">R$ 49,90</p>
            <a className="btn btn-red btn-checkout" onClick={(e) => { e.preventDefault(); setShowCheckoutModal(true) }} href="#">
              Quero Me Especializar
            </a>
            <p className="pricing-annual">ou R$ 497,00 / ano à vista</p>
          </div>
        </div>
      </section>

      {/* ===== GUARANTEE ===== */}
      <section className="guarantee-section">
        <div className="section-control">
          <div className="guarantee-content">
            <Placeholder width={169} height={169} text="Garantia" style={{ borderRadius: '50%', maxWidth: 169 }} />
            <p className="guarantee-title">SATISFAÇÃO GARANTIDA</p>
            <p className="guarantee-text">Nossa prioridade é o seu bem-estar. Se após a primeira consulta você não se sentir satisfeito com o atendimento, conversaremos sobre a melhor solução para você.</p>
          </div>
        </div>
      </section>

      {/* ===== BIO ===== */}
      <section className="bio-section" id="quem-ensina">
        <div className="section-control bio-inner">
          <div className="bio-text">
            <h2>Conheça o diretor clínico da <span className="text-accent">Sono Brasil Consultoria</span></h2>
            <p>Nosso diretor clínico é um profissional com vasta experiência em medicina do sono, com formação nas melhores instituições do país. Sua dedicação à ciência e ao cuidado com o paciente é o que move a Sono Brasil Consultoria.</p>
            <p>Com anos de prática clínica e pesquisa, nossa equipe de liderança garante que cada paciente receba o tratamento mais atualizado e eficaz disponível.</p>
            <h3 className="bio-subtitle">Há 19 anos inspirando com conhecimento</h3>
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
            <h2 className="testimonials-title">Veja o que nossos <span className="text-accent">pacientes dizem</span> sobre nós:</h2>
            <div className="testimonials-grid">
              {['', '', ''].map((text, i) => (
                <Placeholder key={i} width={350} height={420} text="" style={{ borderRadius: 15 }} />
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
                <a href="/termos-de-uso">Termos de uso</a>
                <a href="/politica-privacidade">Política de privacidade</a>
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
