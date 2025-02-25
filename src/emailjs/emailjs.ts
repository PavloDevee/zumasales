import emailjs from 'emailjs-com';

const emailconfig = {
  userApi: import.meta.env.VITE_USER_API,
  emailId: import.meta.env.VITE_EMAIL_ID,
  templateId: import.meta.env.VITE_TEMPLATE_ID
}

emailjs.init(emailconfig.userApi);

export function sendEmail(email: string, name: string, message: string) {
  const templateParams = {
    to_name: name,
    email_to: email,
    message: message,
  };

  return emailjs.send(emailconfig.emailId, emailconfig.templateId, templateParams)
}
