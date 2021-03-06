import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('MailProvider') private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        mail: user.email,
      },
      subject: '[GoBarber] Recuperação de Senha',
      templateData: {
        template: 'Ola, {{name}}: {{token}}',
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}:${process.env.PORT}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
