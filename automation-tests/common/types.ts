import AxeBuilder from "@axe-core/playwright";
import QuestionAnswerPage from "../pages/questionAnswerPage";

export type QuestionAnswerPageLocatorKeys =
  | "title"
  | "description"
  | "questionsListTitle"
  | "questions"
  | "answers"
  | "sortQuestionsButton"
  | "removeQuestionsButton"
  | "noQuestionsAlert"
  | "createQuestionTooltip"
  | "questionsListTooltip"
  | "createQuestionTitle"
  | "questionInput"
  | "answerInput"
  | "createQuestionButton";

export type QuestionAnswer = { question: string; answer: string };

export type QuestionAnswerArray = QuestionAnswer[];

// Declare the types of your fixtures.
export type questionAnswerFixture = {
  questionAnswerPage: QuestionAnswerPage;
  makeAxeBuilder: () => AxeBuilder;
};
