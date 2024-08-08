import { test as base } from '@playwright/test';
import QuestionAnswerPage  from '../pages/questionAnswerPage';
import AxeBuilder from '@axe-core/playwright';
import { questionAnswerFixture } from '../common/types';


// Extend base test by providing "questionAnswerPage"
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<questionAnswerFixture>({
  questionAnswerPage: async ({ page }, use) => {
    // Set up the fixture.
    const questionAnswerPage = new QuestionAnswerPage(page);
    await questionAnswerPage.page.goto('/');

    // Use the fixture value in the test.
    await use(questionAnswerPage);

    // Clean up the fixture.
    if((await questionAnswerPage.locators.questions.count()) > 0) {
      await questionAnswerPage.clickRemoveQuestionsButton();
    }
  },

  makeAxeBuilder: async ({ page }, use) => {
    // This new "test" can be used in multiple test files, and each of them will get
    // a consistently configured AxeBuilder instance.
    const makeAxeBuilder = () => new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude('#document-title');
    await page.goto('/');

    await use(makeAxeBuilder);
  }

  //we can add more pages if required
});

export { expect } from '@playwright/test';