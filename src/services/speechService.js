export function announceOrder(ombrellone) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const message = new SpeechSynthesisUtterance(
    `Ordine pronto per l'ombrellone ${ombrellone}`
  );

  message.lang = "it-IT";
  message.rate = 1;
  message.pitch = 1;
  message.volume = 1;

  window.speechSynthesis.speak(message);
}