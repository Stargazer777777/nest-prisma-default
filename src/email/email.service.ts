import * as nodemailer from 'nodemailer';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface ISendEmailOptions {
  to: string;
  subject: string;
  text: string;
}

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}
  private emailConfig = this.configService.get('EmailServer');

  // 配置邮件传输器
  private transporter = nodemailer.createTransport(this.emailConfig);

  async sendEmail(options: ISendEmailOptions) {
    // 配置邮件选项
    const mailOptions = {
      from: this.emailConfig['auth']['user'],
      to: options.to,
      subject: options.subject,
      text: options.text,
    };

    // 发送邮件
    return this.transporter.sendMail(mailOptions);
  }

  private emailCodeConfig = this.configService.get('EmailCode');

  private verifyCodeRecord: Record<string, [number, string]> = {};

  private verifyCodeCleanerTimer = setInterval(() => {
    const currentTimestamp = new Date().getTime();
    for (const k in this.verifyCodeRecord) {
      const codeTimestamp = this.verifyCodeRecord[k][0];
      if (
        currentTimestamp - codeTimestamp >
        this.emailCodeConfig['expiresSeconds'] * 1000
      ) {
        delete this.verifyCodeRecord[k];
      }
    }
  }, this.emailCodeConfig['detectionSeconds'] * 1000);

  checkIfTooOften(email: string) {
    const codeData = this.verifyCodeRecord[email];
    if (codeData) {
      const preTimestamp = codeData[0];
      const currentTimestamp = new Date().getTime();
      if (
        currentTimestamp - preTimestamp <
        this.emailCodeConfig['limitSeconds'] * 1000
      ) {
        return true;
      }
    }
    return false;
  }

  async sendEmailCode(email: string) {
    if (this.checkIfTooOften(email)) {
      throw new HttpException('发送过于频繁', 400);
    }
    const code = (100000 + Math.random() * 900000).toFixed(0);
    const currentTimestamp = new Date().getTime();
    this.verifyCodeRecord[email] = [currentTimestamp, code];
    console.log('当前内存中的邮箱验证码');
    console.log(this.verifyCodeRecord);
    return await this.sendEmail({
      to: email,
      subject: '请注意查收xx平台的验证码',
      text: `您的验证码为[${code}]，有效期为${Math.floor(
        this.emailCodeConfig['expiresSeconds'] / 60,
      )}分钟，请注意不要泄露！`,
    });
  }

  verifyEmailCode(email: string, code: string) {
    const correctCode = this.verifyCodeRecord[email];
    if (correctCode && correctCode[1] === code) {
      return true;
    }
    return false;
  }
}
