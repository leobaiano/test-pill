import ProductService from '../../../src/business_logic/services/ProductService';

describe('ProductService', () => {
    describe('getPrice', () => {
        it('deve retornar o preço corretamente', () => {
            const productService = new ProductService();
            const priceString = 'R$123,45';

            const price = productService.getPrice(priceString);

            expect(price).toBe(123.45);
        });

        it('deve retornar 0 se a string de preço for inválida', () => {
            const productService = new ProductService();
            const priceString = 'preço inválido';
            const price = productService.getPrice(priceString);

            expect(price).toBe(0);
        });
    });
});

describe('ProductService', () => {
    describe('getBarCode', () => {
      it('deve retornar o código de barras do conteúdo HTML', () => {
        const html = '<table><th>EAN</th><td><div>123456789</div></td></table>';
        const productService = new ProductService();
        
        const result = productService.getBarCode(html);
  
        expect(result).toEqual('123456789');
      });
  
      it('deve retornar nulo se o código de barras não for encontrado no conteúdo HTML', () => {
        const html = '<table><th>UPC</th><td><div>987654321</div></td></table>';
        const productService = new ProductService();
        
        const result = productService.getBarCode(html);
  
        expect(result).toBeNull();
      });
  
      it('deve retornar nulo se o HTMNL for vazio', () => {
        const html = '';
        const productService = new ProductService();
        
        const result = productService.getBarCode(html);
  
        expect(result).toBeNull();
      });
    });
  });

  describe('ProductService', () => {
    describe('getImage', () => {
      it('deve retornar a URL da imagem', () => {
        const html = '<div class="swiper-lazy" src="/_next/image?url=https%3A%2F%2Fexample.com%2Fimage.jpg"></div>';
        const productService = new ProductService();
        
        const result = productService.getImage(html);
  
        expect(result).toEqual('https://example.com/image.jpg');
      });
  
      it('deve retornar nulo se a url da imagem não for encontrada', () => {
        const html = '<div class="some-other-class" src="/_next/image?url=https%3A%2F%2Fexample.com%2Fimage.jpg"></div>';
        const productService = new ProductService();
        
        const result = productService.getImage(html);
  
        expect(result).toBeNull();
      });
  
      it('deve retornar nulo se o html estiver vazio', () => {
        const html = '';
        const productService = new ProductService();
        
        const result = productService.getImage(html);
  
        expect(result).toBeNull();
      });
    });
  });

  describe('ProductService', () => {
    describe('getValueFromHTMLTag', () => {
      it('deve retornar o conteúdo da tag especificada', () => {
        const html = '<div class="example">Hello, World!</div>';
        const tag = '.example';
        const productService = new ProductService();
        
        const result = productService.getValueFromHTMLTag(html, tag);
  
        expect(result).toEqual('Hello, World!');
      });
  
      it('deve retornar nulo se a tag especificada não for encontrada', () => {
        const html = '<div class="some-other-class">Hello, World!</div>';
        const tag = '.example';
        const productService = new ProductService();
        
        const result = productService.getValueFromHTMLTag(html, tag);
  
        expect(result).toBeNull();
      });
  
      it('deve retornar nulo se o html estiver vazio', () => {
        const html = '';
        const tag = '.example';
        const productService = new ProductService();
        
        const result = productService.getValueFromHTMLTag(html, tag);
  
        expect(result).toBeNull();
      });
    });
  });