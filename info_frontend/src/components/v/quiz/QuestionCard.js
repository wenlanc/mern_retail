import React from "react";

function QuestionCard(props) {
  return (
    <div className="questionCard">
      <p className="number">
        Question: {props.questionNr} / {props.totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: props.question }} />
      <div>
        {props.answers.map((answer) => (
          <div key={answer}>
            <button
              className={
                !props.userAnswer
                  ? "default"
                  : "default" &&
                    (props.userAnswer.correctAnswer === answer
                      ? "correct"
                      : "default" && props.userAnswer.answer === answer
                      ? "incorrect"
                      : "default")
              }
              disabled={props.userAnswer ? true : false}
              value={answer}
              onClick={props.callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
