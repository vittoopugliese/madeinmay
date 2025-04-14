const PayPalButton = ({amount, onSuccess}) => {
  const handlePayPalPayment = () => {
    // En una implementación real, aquí integrarías el SDK de PayPal
    // Esta es una simulación simple
    console.log("Procesando pago con PayPal por", amount);
    // Simular procesamiento exitoso después de 2 segundos
    setTimeout(() => {
      const mockPaymentId = "PP-" + Math.random().toString(36).substring(2, 12);
      onSuccess(mockPaymentId);
    }, 500);
  };

  return (
    <button
      className="paypal-button"
      onClick={handlePayPalPayment}
      style={{backgroundColor: "#ffffff", color: "#003087"}}>
      <img
        src="./paypal.svg"
        alt="PayPal"
        style={{height: "24px"}}
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = "none";
        }}
      />
      PayPal
    </button>
  );
};

export default PayPalButton;
