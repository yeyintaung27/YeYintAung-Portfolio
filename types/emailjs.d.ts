declare module '@emailjs/browser' {
  export interface EmailJSResponseStatus {
    status: number;
    text: string;
  }

  export interface TemplateParams {
    [key: string]: string | number | boolean;
  }

  export function send(
    serviceId: string,
    templateId: string,
    templateParams: TemplateParams,
    publicKey: string
  ): Promise<EmailJSResponseStatus>;

  export function sendForm(
    serviceId: string,
    templateId: string,
    form: HTMLFormElement,
    publicKey: string
  ): Promise<EmailJSResponseStatus>;

  export function init(publicKey: string): void;
} 