import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import setInitialPlayer from '../helpers/setInitialPlayer';
import setPlayerInfoFunc from '../helpers/setPlayerInfo';
import fetchTriviaApiFunc from '../helpers/fetchTriviaApi';
import checkQuestionsFunc from '../helpers/checkQuestions';
import generateAnswersFunc from '../helpers/generateAnswers';
import changeDisabledBtnFunc from '../helpers/changeDisabledBtn';
import handleAnswerClickFunc from '../helpers/handleAnswerClick';
import handleBtnNxtFunc from '../helpers/handleBtnNxt';
import incorrectOrCorrectFunc from '../helpers/incorrectOrCorrect';
import disableAnswersFunc from '../helpers/disableAnswers';
import '../assets/css/triviaScreen.css';

class TriviaScreen extends Component {
  constructor() {
    super();
    this.state = {
      triviaQuestions: [],
      answers: [],
      questionSelector: 0,
      isFilled: false,
      answersDisabled: false,
      assertions: 0,
    };

    this.fetchTriviaApi = fetchTriviaApiFunc.bind(this);
    this.checkQuestions = checkQuestionsFunc.bind(this);
    this.generateAnswers = generateAnswersFunc.bind(this);
    this.changeDisabledBtn = changeDisabledBtnFunc.bind(this);
    this.setPlayerInfo = setPlayerInfoFunc.bind(this);
    this.handleAnswerClick = handleAnswerClickFunc.bind(this);
    this.handleBtnNxt = handleBtnNxtFunc.bind(this);
    this.incorrectOrCorrect = incorrectOrCorrectFunc.bind(this);
    this.disableAnswers = disableAnswersFunc.bind(this);
  }

  componentDidMount() {
    this.fetchTriviaApi();
    setInitialPlayer();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { triviaQuestions, answersDisabled, assertions } = this.state;

    if (prevState.triviaQuestions.length !== triviaQuestions.length) {
      this.checkQuestions(this.generateAnswers);
    }

    if (prevState.answersDisabled !== answersDisabled) {
      this.changeDisabledBtn();
    }

    if (prevState.assertions !== assertions) {
      this.setPlayerInfo();
    }
  }

  render() {
    const { isFilled, questionSelector, triviaQuestions, answers } = this.state;
    const answerSelected = answers[questionSelector];
    const triviaSelected = triviaQuestions[questionSelector];

    return (
      <div>
        <Header />
        <div className="game-section">
          <div className="question-section">
            <header>
              {isFilled
                  && <h3 data-testid="question-category">{triviaSelected.category}</h3>}
            </header>
            {isFilled
                && <p data-testid="question-text">{triviaSelected.question}</p>}
          </div>
          <div className="answers-section" />
          {isFilled
            && answerSelected.map((answer) => answer)}

          <ProgressBar
            disableAnswers={ this.disableAnswers }
          />
          <button
            className="btn-next"
            data-testid="btn-next"
            hidden
            type="button"
            onClick={ this.handleBtnNxt }
          >
            Próxima
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
});

export default connect(mapStateToProps)(TriviaScreen);
