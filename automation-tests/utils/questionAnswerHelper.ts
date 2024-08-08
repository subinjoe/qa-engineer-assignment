import { QuestionAnswer } from "../common/types";
import QuestionAnswerPage from "../pages/questionAnswerPage";
import { generateNQuestionAnswers } from "./questionAnswerData";

/**
 * Creates the question and answer passed as parameter in the application
 * @param questionAnswerPage 
 * @param questionAnswer 
 */
export const createQuestion = async (
  questionAnswerPage: QuestionAnswerPage,
  questionAnswer: QuestionAnswer
) => {
  await questionAnswerPage.fillQuestionInput(questionAnswer.question);
  await questionAnswerPage.fillAnswerInput(questionAnswer.answer);
  await questionAnswerPage.clickCreateQuestionButton();
};

/**
 * Creates 3 default question and answers in the application
 * @param questionAnswerPage 
 * @returns 
 */
export const createDefaultQuestions = async (
  questionAnswerPage: QuestionAnswerPage
) => {
  // get question from data helper
  const questionAnswers = generateNQuestionAnswers(3);

  for (const questionAnswer of questionAnswers) {
    // Create  questions.
    await createQuestion(questionAnswerPage, questionAnswer);
  }

  return questionAnswers;
};
