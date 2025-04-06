const MercadoPagoButton = ({amount, onSuccess}) => {
  const handleMPPayment = () => {
    // En una implementación real, aquí integrarías el SDK de MercadoPago
    // Esta es una simulación simple
    console.log("Procesando pago con MercadoPago por", amount);
    // Simular procesamiento exitoso después de 2 segundos
    setTimeout(() => {
      const mockPaymentId = "MP-" + Math.random().toString(36).substring(2, 12);
      onSuccess(mockPaymentId);
    }, 2000);
  };

  return (
    <button
      className="mercadopago-button"
      onClick={handleMPPayment}
      style={{backgroundColor: "#009ee3", color: "#ffffff"}}>
      <img
        src="/path-to-mercadopago-logo.png"
        alt="MercadoPago"
        style={{height: "24px"}}
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = "none";
        }}
      />
      MercadoPago
    </button>
  );
};

export default MercadoPagoButton;
