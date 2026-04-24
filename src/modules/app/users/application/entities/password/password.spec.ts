import { CONTEXT_USER } from '../../constants/contexts';
import { Password } from './password';

describe('Password hash', () => {
  it('should be able to validate a password hash', () => {
    Password.validate(CONTEXT_USER.CREATE, '1a2B3c4@', '1a2B3c4@');
    const passwordHash = Password.use('1a2B3c4@').value;
    expect(passwordHash).toBeTruthy();
  });
  
  it('should not be able validate password was is diferente of the confirmPassword', () => {
    expect(() => Password.validate(CONTEXT_USER.CREATE, '1a2B3c4@', '1a2B3c4#')).toThrow();
  });

  it('should not be able validate password with less than 8 caracters', () => {
    expect(() => Password.validate(CONTEXT_USER.CREATE, '1a2B3', '1a2B3')).toThrow();
  });

  it('should not be able validate password was not strong', () => {
    expect(() => Password.validate(CONTEXT_USER.CREATE, 'user', 'user')).toThrow();
  });
});