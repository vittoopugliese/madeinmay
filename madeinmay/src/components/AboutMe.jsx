import './AboutMe.css';

export default function AboutMe() {
  return (
    <section className="about-section" id="sobre-mi">
      {/* Sobre mí */}
      <div className="about-container">
        <h2 className="section-title">Sobre MadeInMay</h2>
        <div className="about-content">
          <div className="about-image">
            <div className="profile-image"></div>
          </div>
          <div className="about-text">
            <p>Soy Micaela, la persona detrás de MadeInMay. Mi camino en el mundo del tarot y la astrología comenzó hace más de 10 años, cuando descubrí el poder de estas herramientas para explorar el autoconocimiento y guiar nuestras decisiones.</p>
            <p>Con una formación en psicología transpersonal y estudios en astrología védica y occidental, ofrezco lecturas profundas y personalizadas que te conectan con tu esencia y te ayudan a navegar por los diferentes ciclos de la vida.</p>
            <p>Mi enfoque es práctico y empático, alejado de los clichés y enfocado en brindarte claridad y opciones para tu crecimiento personal. Cada sesión es un espacio seguro donde exploramos juntos las energías que influyen en tu vida.</p>
          </div>
        </div>
      </div>

      {/* Servicios */}
      <div className="services-container" id="servicios">
        <h2 className="section-title">Servicios</h2>
        <div className="services-grid">
          {/* Servicio de Tarot */}
          <div className="service-card">
            <div className="service-image tarot-image"></div>
            <h3 className="service-title">Tiradas de Tarot</h3>
            <p className="service-description">
              Lectura personalizada que explora tu situación actual, obstáculos y oportunidades. Utilizando diferentes métodos de tirada según tu consulta específica, te ayudaré a obtener claridad y dirección.
            </p>
            <div className="service-details">
              <p><span>Duración:</span> 2 horas</p>
              <p><span>Modalidad:</span> Presencial o virtual</p>
              <p><span>Incluye:</span> Grabación de la sesión y seguimiento</p>
            </div>
            <button className="service-button">Reservar ahora</button>
          </div>

          {/* Servicio de Carta Astral */}
          <div className="service-card">
            <div className="service-image astrology-image"></div>
            <h3 className="service-title">Carta Astral</h3>
            <p className="service-description">
              Análisis detallado de tu mapa natal que revela tus potenciales innatos, desafíos y ciclos vitales. Estudio personalizado que integra planetas, casas y aspectos para brindarte una guía completa.
            </p>
            <div className="service-details">
              <p><span>Duración:</span> 2 horas</p>
              <p><span>Modalidad:</span> Presencial o virtual</p>
              <p><span>Incluye:</span> Carta astral en PDF y grabación</p>
            </div>
            <button className="service-button">Reservar ahora</button>
          </div>
        </div>
      </div>
    </section>
  );
}