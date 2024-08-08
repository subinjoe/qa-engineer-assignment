import { QuestionAnswer, QuestionAnswerArray } from "../common/types";
import { test, expect } from "../fixtures/questionAnswer.fixture";
import {
  generateNQuestionAnswers,
  getDescriptionText,
} from "../utils/questionAnswerData";
import QuestionAnswerPage from "../pages/questionAnswerPage";
import {
  createDefaultQuestions,
  createQuestion,
} from "../utils/questionAnswerHelper";

test.describe(
  "Question answer page",
  {
    tag: "@regression",
  },
  () => {
    test("should display all the titles", async ({ questionAnswerPage }) => {
      await expect.soft(questionAnswerPage.locators.title).toBeVisible();
      await expect
        .soft(questionAnswerPage.locators.questionsListTitle)
        .toBeVisible();
      await expect
        .soft(questionAnswerPage.locators.createQuestionTitle)
        .toBeVisible();
    });

    test("should display created questions title with tooltip", {
      tag: "@knownIssue",
    }, async ({
      questionAnswerPage,
    }) => {
      await expect
        .soft(questionAnswerPage.locators.questionsListTooltip)
        .not.toBeVisible();
      await questionAnswerPage.hoverQuestionsListTitle();

      await expect
        .soft(questionAnswerPage.locators.questionsListTooltip)
        .toBeVisible();
      await expect
        .soft(questionAnswerPage.locators.questionsListTooltip)
        .toHaveText(
          "Here you can find the created questions and their answers."
        );
    });

    test(
      "should display create a new question title with tooltip",
      {
        tag: "@userAcceptanceTest",
      },
      async ({ questionAnswerPage }) => {
        await expect
          .soft(questionAnswerPage.locators.createQuestionTooltip)
          .not.toBeVisible();
        await questionAnswerPage.hoverCreateQuestionsTitle();

        await expect
          .soft(questionAnswerPage.locators.createQuestionTooltip)
          .toBeVisible();
        await expect
          .soft(questionAnswerPage.locators.createQuestionTooltip)
          .toHaveText("Here you can create new questions and their answers.");
      }
    );

    //https://playwright.dev/docs/accessibility-testing
    test(
      "should not have any automatically detectable accessibility issues",
      {
        tag: ["@userAcceptanceTest", "@knownIssue"],
      },
      async ({ makeAxeBuilder }, testInfo) => {
        const accessibilityScanResults = await makeAxeBuilder().analyze();

        //exporting scan result as an attachment
        await testInfo.attach("accessibility-scan-results", {
          body: JSON.stringify(accessibilityScanResults, null, 2),
          contentType: "application/json",
        });

        expect(accessibilityScanResults.violations).toEqual([]);
      }
    );

    //npx playwright test --update-snapshots
    test(
      "should match reference screenshot",
      {
        tag: "@userAcceptanceTest",
      },
      async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveScreenshot({
          maxDiffPixels: 14500, //for testing purpose, this is added
          fullPage: true,
        });
      }
    );

    test("should match reference snapshot", async ({ page }) => {
      await page.goto("/");
      expect(await page.content()).toMatchSnapshot();
    });
  }
);

test.describe(
  "New question answer",
  {
    tag: "@userAcceptanceTest",
  },
  () => {
    test.beforeEach(async ({ questionAnswerPage }) => {
      await questionAnswerPage.clickRemoveQuestionsButton();
    });

    test("should allow me to add question answers", async ({
      questionAnswerPage,
    }) => {
      // get question from data helper
      const questionAnswer = generateNQuestionAnswers(2);

      // Create 1st question.
      await createQuestion(questionAnswerPage, questionAnswer[0]);

      // Make sure the list only has one question.
      await expect(questionAnswerPage.locators.questions).toHaveCount(1);
      await expect(questionAnswerPage.locators.questions).toHaveText(
        questionAnswer[0].question
      );
      await expect(questionAnswerPage.locators.description).toHaveText(
        getDescriptionText(1)
      );

      // Create 2nd question.
      await createQuestion(questionAnswerPage, questionAnswer[1]);

      // Make sure the list now has two question items.
      await expect(questionAnswerPage.locators.questions).toHaveCount(2);
      await expect(questionAnswerPage.locators.questions.nth(0)).toHaveText(
        questionAnswer[0].question
      );
      await expect(questionAnswerPage.locators.questions.nth(1)).toHaveText(
        questionAnswer[1].question
      );
      await expect(questionAnswerPage.locators.description).toHaveText(
        getDescriptionText(2)
      );
    });

    test("should clear input fields when a question answer is added", async ({
      questionAnswerPage,
    }) => {
      // get question from data helper
      const questionAnswer = generateNQuestionAnswers(2);

      // Create 1st question.
      await createQuestion(questionAnswerPage, questionAnswer[0]);

      // Check that input is empty.
      await expect(questionAnswerPage.locators.questionInput).toBeEmpty();
      await expect(questionAnswerPage.locators.answerInput).toBeEmpty();
    });

    test("should append new question answers to the bottom of the list", async ({
      questionAnswerPage,
    }) => {
      // Create 3 questions.
      const defaultQuestions = await createDefaultQuestions(questionAnswerPage);

      // Check test using different methods.
      await expect(questionAnswerPage.locators.questions).toHaveCount(3);
      await expect(questionAnswerPage.locators.description).toHaveText(
        getDescriptionText(3)
      );

      // Check all items in one call.
      await expect(questionAnswerPage.locators.questions).toHaveText(
        defaultQuestions.map((question) => question.question)
      );
    });
  }
);

test.describe(
  "Question answer list",
  {
    tag: "@userAcceptanceTest",
  },
  () => {
    test("should display the correct answer on clicking the question", async ({
      questionAnswerPage,
    }) => {
      // Create 3 questions.
      const defaultQuestions = await createDefaultQuestions(questionAnswerPage);

      // Check if nth answer is displayed on clicking nth question
      await questionAnswerPage.clickNthQuestion(1);
      await expect(questionAnswerPage.locators.answers).toHaveCount(1);
      await expect(questionAnswerPage.locators.answers).toHaveText(
        defaultQuestions[0].answer
      );

      // Check if nth answer is displayed on clicking nth question
      await questionAnswerPage.clickNthQuestion(3);
      await expect(questionAnswerPage.locators.answers).toHaveCount(2);
      await expect(questionAnswerPage.locators.answers.nth(0)).toHaveText(
        defaultQuestions[0].answer
      );
      await expect(questionAnswerPage.locators.answers.nth(1)).toHaveText(
        defaultQuestions[2].answer
      );
    });

    test("should close the answer if same question is clicked again", async ({
      questionAnswerPage,
    }) => {
      // Create 3 questions.
      const defaultQuestions = await createDefaultQuestions(questionAnswerPage);

      // Check if nth answer is displayed on clicking nth question
      await questionAnswerPage.clickNthQuestion(1);
      await expect(questionAnswerPage.locators.answers).toHaveCount(1);
      await expect(questionAnswerPage.locators.answers).toHaveText(
        defaultQuestions[0].answer
      );

      // Check if nth answer is displayed on clicking nth question
      await questionAnswerPage.clickNthQuestion(3);
      await expect(questionAnswerPage.locators.answers).toHaveCount(2);
      await expect(questionAnswerPage.locators.answers.nth(0)).toHaveText(
        defaultQuestions[0].answer
      );
      await expect(questionAnswerPage.locators.answers.nth(1)).toHaveText(
        defaultQuestions[2].answer
      );
    });

    test("should remove all questions on clicking remove questions button", async ({
      questionAnswerPage,
    }) => {
      // Create 3 questions.
      await createDefaultQuestions(questionAnswerPage);

      // Check 3 questions displayed in list.
      await expect(questionAnswerPage.locators.questions).toHaveCount(4);
      await expect(
        questionAnswerPage.locators.noQuestionsAlert
      ).not.toBeVisible();

      await questionAnswerPage.clickRemoveQuestionsButton();

      // Check no questions displayed in list.
      await expect(
        questionAnswerPage.locators.removeQuestionsButton
      ).not.toBeVisible();
      await expect(
        questionAnswerPage.locators.sortQuestionsButton
      ).not.toBeVisible();
      await expect(questionAnswerPage.locators.noQuestionsAlert).toBeVisible();
      await expect(questionAnswerPage.locators.questions).toHaveCount(0);
      await expect(questionAnswerPage.locators.description).toHaveText(
        getDescriptionText(0)
      );
    });

    test("should not display empty questions alert if atleast one question is added", async ({
      questionAnswerPage,
    }) => {
      await questionAnswerPage.clickRemoveQuestionsButton();

      // Test empty questions.
      await expect(questionAnswerPage.locators.noQuestionsAlert).toBeVisible();
      await expect(questionAnswerPage.locators.questions).toHaveCount(0);

      const questionAnswer = generateNQuestionAnswers()[0];
      await createQuestion(questionAnswerPage, questionAnswer);

      //  Test empty questions elements are not displayed
      await expect(
        questionAnswerPage.locators.noQuestionsAlert
      ).not.toBeVisible();
      await expect(questionAnswerPage.locators.questions).toHaveCount(1);
    });

    test("should sort the questions on clicking sort questions button", async ({
      questionAnswerPage,
    }) => {
      await questionAnswerPage.clickRemoveQuestionsButton();

      const sortQuestions = [
        { question: "z is the first letter in alphabet?", answer: "no" },
        { question: "a is the first letter in alphabet?", answer: "yes" },
      ];

      //create questions
      await createQuestion(questionAnswerPage, sortQuestions[0]);
      await createQuestion(questionAnswerPage, sortQuestions[1]);

      //test the order
      await expect(questionAnswerPage.locators.questions).toHaveCount(2);
      await expect(questionAnswerPage.locators.questions.nth(0)).toHaveText(
        sortQuestions[0].question
      );
      await expect(questionAnswerPage.locators.questions.nth(1)).toHaveText(
        sortQuestions[1].question
      );

      //sort the questions
      await questionAnswerPage.clickSortQuestionsButton();

      //test if the order is rearranged in alphabetical order
      //we can add scenarios with other characters as well
      await expect(questionAnswerPage.locators.questions).toHaveCount(2);
      await expect(questionAnswerPage.locators.questions.nth(1)).toHaveText(
        sortQuestions[0].question
      );
      await expect(questionAnswerPage.locators.questions.nth(0)).toHaveText(
        sortQuestions[1].question
      );
    });
  }
);
