import { V4Page } from './app.po';

describe('v4 App', () => {
  let page: V4Page;

  beforeEach(() => {
    page = new V4Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
