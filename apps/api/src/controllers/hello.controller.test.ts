import { HelloController } from '../controllers/hello.controller';

describe('HelloController', () => {
  let controller: HelloController;

  beforeEach(() => {
    controller = new HelloController();
  });

  describe('getHello', () => {
    it('should return hello message with timestamp', () => {
      const result = controller.getHello();

      expect(result).toHaveProperty('message', 'Hello World');
      expect(result).toHaveProperty('timestamp');
      expect(new Date(result.timestamp)).toBeInstanceOf(Date);
    });
  });

  describe('getPersonalizedHello', () => {
    it('should return personalized hello message', () => {
      const name = 'John';
      const result = controller.getPersonalizedHello(name);

      expect(result).toHaveProperty('message', `Hello ${name}`);
      expect(result).toHaveProperty('timestamp');
      expect(new Date(result.timestamp)).toBeInstanceOf(Date);
    });
  });
});
