export class Password {
  private readonly passwordHash: string;

  private constructor(hash: string) {
    this.passwordHash = hash;
  }

  get value(): string {
    return this.passwordHash;
  }

  public static create(password?: string, confirmedPassword?: string) {
    if(!password || !confirmedPassword) {
      throw new Error('Forneça os dados de alteração de senha');
    }

    const isPasswordEqualConfirmedPassword = password === confirmedPassword;
    if(!isPasswordEqualConfirmedPassword) {
      throw new Error('Senhas diferentes');
    }

    const isPasswordLengthValid = password.length >= 8;
    if(!isPasswordLengthValid) {
      throw new Error('Tamanho da senha menor que 8 caracteres');
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isPasswordStrong = passwordRegex.test(password);
    if(!isPasswordStrong) {
      throw new Error('Sua senha deve conter no mínimo 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caracter especial');
    }

    return new Password(password);
  }

  public static restore(hash: string): Password {
    return new Password(hash);
  }
}