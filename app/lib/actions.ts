'use server'

import nodemailer from 'nodemailer'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function subscribeContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: real visitors never fill this hidden field, bots often do.
  const honeypot = formData.get('company')
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return { status: 'success', message: '¡Gracias! Te contactaremos pronto.' }
  }

  const email = formData.get('email')
  if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return { status: 'error', message: 'Ingresa un correo válido.' }
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_NOTIFICATION_EMAIL } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_NOTIFICATION_EMAIL) {
    console.error(
      'Missing SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD or CONTACT_NOTIFICATION_EMAIL environment variables'
    )
    return { status: 'error', message: 'Hubo un problema. Intenta más tarde.' }
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  })

  try {
    await transporter.sendMail({
      from: `"Excellentia Website" <${SMTP_USER}>`,
      to: CONTACT_NOTIFICATION_EMAIL,
      replyTo: email,
      subject: 'Alguien está queriendo contactarte de Excellentia',
      text: `Alguien está queriendo contactarte de Excellentia.\n\nCorreo registrado: ${email}`,
    })
  } catch (error) {
    console.error('Failed to send contact notification email', error)
    return { status: 'error', message: 'Hubo un problema al enviar. Intenta más tarde.' }
  }

  return { status: 'success', message: '¡Gracias! Te contactaremos pronto.' }
}
