import { DonorMgtPage } from './app.po';

describe('donor-mgt App', () => {
  let page: DonorMgtPage;

  beforeEach(() => {
    page = new DonorMgtPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
