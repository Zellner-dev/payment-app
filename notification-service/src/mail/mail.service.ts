import { Injectable } from '@nestjs/common';
import { Mail, MailType, Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';
import DataMessage from './types/message';

import * as nodemailer from 'nodemailer';
import { env } from 'process';

@Injectable()
export class MailService {
  constructor(private prisma: PrismaService) {}

  async getMailByIdUser(idUser: string): Promise<Mail[] | null> {
    return await this.prisma.mail.findMany({ 
      where: {
        idUser: idUser
      }
    });
  }

  async sendMail(content: DataMessage, type: string) {

    const mailTypes = {
      orderConfirmation: 'Solicitação confirmda.',
      paymentConfirmation: 'Pagamento efetuado com sucesso.',
    };

     const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: env.EMAIL,
        pass: env.EMAIL_PASSWORD,
      },
    });

    transport
      .sendMail({
        from: '"Your Payment App" <' + env.EMAIL + '>',
        to: this.getDestination(content.idUser),
        subject: mailTypes[type],
        text: this.makeContent(content.orderNumber, content.orderValue),
        html: `${this.makeContent(content.orderNumber, content.orderValue)}`,
      })
      .then((info) => {
        console.log({ info });
      })
      .catch(console.error);
  }

  async persistNotification(content: DataMessage, type: MailType) {
    const data = {
      idUser: content.idUser,
      mailDestination: this.getDestination(content.idUser),
      mailContent: this.makeContent(content.orderNumber, content.orderValue),
      mailType: type,
    };

    await this.prisma.mail.create({
      data: { ...data },
    });
  }

  getDestination(idUser: string) {
    switch (idUser) {
      case '10':
        return env.USER_EMAIL;

      default:
        return env.EMAIL;
    }
  }

  makeContent(orderNumber: number, orderValue: number) {
    return `Número do pedido: ${orderNumber.toString()} /n
      Valor do pedido: ${orderValue.toString()}
      `;
  }
}
