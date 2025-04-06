import {useState, useEffect} from "react";
import "./HeroAndHeader.css";

const HeroAndHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      };
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleMenuToggle = () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");
    menuToggle.classList.toggle("active");
    navigation.classList.toggle("active");
  };

  return (
    <div className="hero-container" id="home">
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <a href="#home" className="logo">MadeinMay</a>
        
        <nav className="navigation">
          <ul>
            <li><a href="#sobre-mi">Sobre Mí</a></li>
            <li><a href="#reservas">Reservas</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
        
        <div className="menu-toggle" onClick={handleMenuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      <div className="hero-content">
        <h1 className="hero-title">MadeinMay</h1>
        <h2 className="hero-subtitle">Micaela</h2>
        <div className="hero-image"></div>
        <p className="hero-tagline">
          Descubre tu camino en las estrellas y el tarot, para una vida más plena y consciente.
        </p>
        <button className="cta-button">Reserva tu sesión</button>
      </div>
    </div>
  );
};

export default HeroAndHeader;
