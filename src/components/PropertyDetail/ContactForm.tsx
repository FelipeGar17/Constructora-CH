"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/site";
import styles from "./ContactForm.module.css";

interface ContactFormProps {
  propertyTitle: string;
  propertyUrl?: string;
}

export function ContactForm({ propertyTitle, propertyUrl }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const defaultMessage =
      "Estoy interesado(a) en esta propiedad. Me gustaría recibir más información sobre disponibilidad, precios y horarios para visitarla.";

    const messageToSend = message.trim() || defaultMessage;

    const whatsappText = buildWhatsAppMessage({
      propertyTitle,
      propertyUrl,
      name: name.trim() || undefined,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      message: messageToSend,
    });

    window.open(buildWhatsAppUrl(whatsappText), "_blank", "noopener,noreferrer");
  };

  return (
    <section className={styles.contactSection}>
      <h2 className={styles.contactTitle}>Contactar sobre esta propiedad</h2>
      <p className={styles.contactSubtitle}>
        Completa tus datos y te redirigiremos a WhatsApp para agilizar la
        conversación.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Nombre completo *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Tu nombre y apellido"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Teléfono / WhatsApp *
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+57 311 367 8896"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Cuéntanos qué información necesitas sobre esta propiedad..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.textarea}
            rows={5}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          <MessageCircle size={20} />
          Enviar por WhatsApp
        </button>
      </form>
    </section>
  );
}
