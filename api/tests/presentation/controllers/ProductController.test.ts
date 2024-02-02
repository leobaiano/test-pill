import { Request, Response } from 'express';
import ProductController from '../../../src/presentation/controllers/ProductController';
import ProductService from '../../../src/business_logic/services/ProductService';

jest.mock('../../../src/business_logic/services/ProductService');

describe('ProductController', () => {
    let productService: jest.Mocked<ProductService>;
    let productController: ProductController;
    let req: Request;
    let res: Response;
  
    beforeEach(() => {
      productService = new ProductService() as jest.Mocked<ProductService>;
      productController = new ProductController();
      req = {} as Request;
      res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      } as unknown as Response;
    });
  
    describe('productHandler', () => {
    //   it('deve retornar 422 se a url não for passada', async () => {
    //     req.query = { url: 'http://drogasil.com.br' };
    //     await productController.productHandler(req, res);
  
    //     expect(res.status).toHaveBeenCalledWith(422);
    //     expect(res.json).toHaveBeenCalledWith({ error: { message: 'É preciso informar a URL.' } });
    //   });
  
    //   it('deve retornar 422 se o dominio não for permitido', async () => {
    //     req.query = { url: 'http://example.com' };
    //     productService.isDomainAllowed.mockReturnValue(false);
  
    //     await productController.productHandler(req, res);
  
    //     expect(res.status).toHaveBeenCalledWith(422);
    //     expect(res.json).toHaveBeenCalledWith({ error: { message: 'Não é permitido consultar informações no domínio informado.' } });
    //   });
  
    //   it('deve chamar o método getProduct do ProductService e retornar com sucesso se o dominio for valido', async () => {
    //     req.query = { url: 'http://allowed-domain.com' };
    //     productService.isDomainAllowed.mockReturnValue(true);
    //     const fakeProduct: any = { name: 'Fake Product' };
    //     productService.getProduct.mockResolvedValue(fakeProduct);
  
    //     await productController.productHandler(req, res);
  
    //     expect(productService.getProduct).toHaveBeenCalledWith('http://allowed-domain.com');
    //     expect(res.status).not.toHaveBeenCalled();
    //     expect(res.json).toHaveBeenCalledWith(fakeProduct);
    //   });
  
    //   it('deve tratar erros e retornar com status 500', async () => {
    //     req.query = { url: 'http://allowed-domain.com' };
    //     productService.isDomainAllowed.mockReturnValue(true);
    //     productService.getProduct.mockRejectedValue(new Error('Fake error'));
  
    //     await productController.productHandler(req, res);
  
    //     expect(productService.getProduct).toHaveBeenCalledWith('http://allowed-domain.com');
    //     expect(res.status).toHaveBeenCalledWith(500);
    //     expect(res.json).toHaveBeenCalledWith({ message: 'Error processing the request', error: expect.anything() });
    //   });
    });
  });