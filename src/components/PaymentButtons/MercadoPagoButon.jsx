import { useState } from "react";
import { isReservationValid } from "../../utils";

const MercadoPagoButton = ({ selectedSlot, contactInfo, serviceType }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleMPPayment = async () => {
    if (!isReservationValid(selectedSlot, contactInfo)) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/create-payment", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          serviceType, 
          contactInfo, 
          slot: selectedSlot
        }),
      });
      
      if (!response.ok) throw new Error("Error al crear el pago");

      const data = await response.json();
      window.location.href = data.init_point;
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Hubo un error al procesar el pago. Por favor, intenta nuevamente.");
      setIsLoading(false);
    };
  };

  return (
    <button className="mercadopago-button" onClick={handleMPPayment} disabled={isLoading} style={{
        backgroundColor: "#009ee3",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "10px 15px",
        borderRadius: "4px",
        border: "none",
        cursor: isLoading ? "default" : "pointer",
        opacity: isLoading ? 0.7 : 1,
      }}
    >
      {isLoading ? (
        <span className="loader-small"></span>
      ) : (
        <>
          <img src="./mercadopago.webp" alt="MercadoPago"
            style={{ height: "24px", width: "24px", borderRadius: "100%" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = "none";
            }}
          />
          Pagar con MercadoPago
        </>
      )}
    </button>
  );
};

export default MercadoPagoButton;