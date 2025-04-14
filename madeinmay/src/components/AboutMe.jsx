import './AboutMe.css';

const ServiceCard = ({ title, description, duration, modality, includes }) => {
  return (  
    <div className="service-card">
      <div className={`service-image ${title === "Carta Astral" ? "astrology-image" : "tarot-image"}`}></div>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
      <div className="service-details">
        <p><span>Duración:</span> {duration}</p>
        <p><span>Modalidad:</span> {modality}</p>
        <p><span>Incluye:</span> {includes}</p>
      </div>
      {/* <button className="service-button">Reservar ahora</button> */}
    </div>
  );
};

export default function AboutMe() {
  return (
    <section className="about-section" id="sobre-mi">
      <div className="about-container">
        <h2 className="section-title">Sobre mi</h2>
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

      <div className="services-container" id="servicios">
        <h2 className="section-title">Servicios</h2>
        <div className="services-grid">
          <ServiceCard 
            title="Tiradas de Tarot" duration="2 horas"
            description="Lectura personalizada que explora tu situación actual, obstáculos y oportunidades. Utilizando diferentes formas de tirada según tu consulta específica, te ayudaré a obtener claridad y dirección."
            modality="Presencial o virtual" includes="Grabación de la sesión y seguimiento" />
          <ServiceCard 
            title="Carta Astral" duration="1 hora"
            description="Análisis detallado de tu mapa natal que revela tus potenciales innatos, desafíos y ciclos vitales. Estudio personalizado que integra planetas, casas y aspectos para brindarte una guía completa."
            modality="Presencial o virtual" includes="Carta astral en PDF y grabación" />
        </div>
      </div>
    </section>
  );
};