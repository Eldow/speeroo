import { SpeerooPage } from './app.po';

describe('speeroo App', () => {
  let page: SpeerooPage;

  beforeEach(() => {
    page = new SpeerooPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
