import { Locator, Page } from "@playwright/test";
import { QuestionAnswerPageLocatorKeys } from "../common/types";


/**
 * @class QuestionAnswerPage
 * @classdesc This class represents the Question and Answer page of the application.
 * It encapsulates the actions that can be performed on this page, such as creating questions,
 * submitting answers, sorting, and removing the Q&A elements.
 */
export default class QuestionAnswerPage {
  heading: number;
  readonly page: Page;
  readonly locators: { [key in QuestionAnswerPageLocatorKeys]: Locator };

  constructor(page: Page) {

    //The Playwright page object for interacting with the browser.
    this.page = page;

    /**
     * Encapsulated all the page elements in **locators** object
     * This is done for ease of use and to avoid duplication and confusion
     */
    this.locators = {
      title: this.page.getByRole("heading", { name: "The awesome Q/A tool" }),
      description: this.page.locator(".sidebar"),

      /** Questions list elements */
      questionsListTitle: this.page.getByRole("heading", {
        name: "Created questions",
      }),
      questionsListTooltip: this.page.locator(".questions .tooltipped-title__tooltip"),
      questions: this.page.getByRole('listitem').locator('.question__question'),
      answers: this.page.getByRole('listitem').locator('.question__answer').locator('visible=true'),
      sortQuestionsButton: this.page.getByRole("button", {
        name: "Sort questions",
      }),
      removeQuestionsButton: this.page.getByRole("button", {
        name: "Remove questions",
      }),
      noQuestionsAlert: this.page.getByText("No questions yet :-("),

      /**Create question Form elements*/
      createQuestionTitle: this.page.getByRole("heading", {
        name: "Create a new question",
      }),
      createQuestionTooltip: this.page.locator(".question-maker .tooltipped-title__tooltip"),
      questionInput: this.page.getByRole("textbox", { name: "question" }),
      answerInput: this.page.getByRole("textbox", { name: "answer" }),
      createQuestionButton: this.page.getByRole("button", {
        name: "Create question",
      }),
    };
  }

  async fillQuestionInput(question: string) {
    await this.locators.questionInput.fill(question);
  }

  async fillAnswerInput(answer: string) {
    await this.locators.answerInput.fill(answer);
  }

  async clickCreateQuestionButton() {
    await this.locators.createQuestionButton.click();
  }

  async clickNthQuestion(n: number) {
    await this.locators.questions.nth(n).click();
  }

  async clickSortQuestionsButton() {
    await this.locators.sortQuestionsButton.click();
  }
  
  async clickRemoveQuestionsButton() {
    await this.locators.removeQuestionsButton.click();
  }

  async hoverCreateQuestionsTitle() {
    await this.locators.createQuestionTitle.hover()
  }

  async hoverQuestionsListTitle() {
    await this.locators.questionsListTitle.hover()
  }
}
