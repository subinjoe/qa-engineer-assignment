import { QuestionAnswerArray } from "../common/types";

/**
 * Generaete n number of questions and answers to test the application
 * @param n number - number of questions and answers to generate
 * @returns an array of question and answer object
 */
export const generateNQuestionAnswers = (n = 1): QuestionAnswerArray => {
  const questions: QuestionAnswerArray = [];

  for (let i = 1; i <= n; i++) {
    questions.push({
      question: `This is the questions number ${i}`,
      answer: `This is the answer number ${i}`,
    });
  }

  return questions;
};

/**
 * 
 * @param n number of question and answers present in the application list
 * @returns a text depicting expected description text in the application
 */
export const getDescriptionText = (n = 1): string => {
  const questionText = (n == 1) ? "question" : "questions";
  const count = (n === 0)? "no" : n;
  return `Here you can find ${count} ${questionText}. Feel free to create your own questions!`;
}