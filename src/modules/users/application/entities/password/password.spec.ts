import { Password } from './password';

describe('Password hash', () => {
  it('should be able to create a password hash', () => {
    const passwordHash = Password.create('1a2B3c4@', '1a2B3c4@');
    expect(passwordHash).toBeTruthy();
  });
  
  it('should not be able create password was is diferente of the confirmPassword', () => {
    expect(() => Password.create('1a2B3c4@', '1a2B3c4#')).toThrow();
  });

  it('should not be able create password with less than 8 caracters', () => {
    expect(() => Password.create('1a2B3', '1a2B3')).toThrow();
  });

  it('should not be able create password was not strong', () => {
    expect(() => Password.create('user', 'user')).toThrow();
  });
});