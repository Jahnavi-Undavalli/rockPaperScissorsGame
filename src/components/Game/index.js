import {Component} from 'react'
import Popup from 'reactjs-popup'

import ButtonIcon from '../ButtonIcon'

import './index.css'

class Game extends Component {
  state = {
    score: 0,
    showResult: false,
    myChoice: [],
    opponentChoice: [],
    resultMsg: '',
  }

  onSelectedButton = id => {
    const selectedButton = id
    const {choicesList} = this.props

    const number = Math.floor(Math.random() * choicesList.length)

    const myImage = choicesList.filter(
      eachChoice => eachChoice.id === selectedButton,
    )

    const {imageUrl} = myImage[0]

    const randomDetails = choicesList[number]
    const opponentId = randomDetails.id

    if (selectedButton === 'ROCK' && opponentId === 'SCISSORS') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        myChoice: [selectedButton, imageUrl],
        opponentChoice: [randomDetails],
        resultMsg: 'YOU WON',
        showResult: !prevState.showResult,
      }))
    } else if (selectedButton === 'ROCK' && opponentId === 'PAPER') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        myChoice: [selectedButton, imageUrl],
        opponentChoice: [randomDetails],
        resultMsg: 'YOU LOSE',
        showResult: !prevState.showResult,
      }))
    } else if (selectedButton === 'PAPER' && opponentId === 'ROCK') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        myChoice: [selectedButton, imageUrl],
        opponentChoice: [randomDetails],
        resultMsg: 'YOU WON',
        showResult: !prevState.showResult,
      }))
    } else if (selectedButton === 'PAPER' && opponentId === 'SCISSORS') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        myChoice: [selectedButton, imageUrl],
        opponentChoice: [randomDetails],
        resultMsg: 'YOU LOSE',
        showResult: !prevState.showResult,
      }))
    } else if (selectedButton === 'SCISSORS' && opponentId === 'ROCK') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        myChoice: [selectedButton, imageUrl],
        opponentChoice: [randomDetails],
        resultMsg: 'YOU LOSE',
        showResult: !prevState.showResult,
      }))
    } else if (selectedButton === 'SCISSORS' && opponentId === 'PAPER') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        myChoice: [selectedButton, imageUrl],
        opponentChoice: [randomDetails],
        resultMsg: 'YOU WON',
        showResult: !prevState.showResult,
      }))
    } else {
      this.setState({
        myChoice: [selectedButton, imageUrl],
        opponentChoice: [randomDetails],
        resultMsg: 'IT IS DRAW',
        showResult: true,
      })
    }
  }

  onClickPlayAgain = () => {
    this.setState({showResult: false})
  }

  onGetPlayButtons = () => {
    const {choicesList} = this.state
    return (
      <div className="icons">
        {choicesList.map(eachChoice => (
          <ButtonIcon
            key={eachChoice.id}
            onSelectedButton={this.onSelectedButton}
            details={eachChoice}
          />
        ))}
      </div>
    )
  }

  getResult = () => {
    const {myChoice, opponentChoice, resultMsg} = this.state
    return (
      <div className="result">
        <div className="your-result">
          <p className="paragraph">YOU</p>
          <img src={myChoice[1]} alt="your choice" />
        </div>

        <div className="opponent-result">
          <p className="paragraph">OPPONENT</p>
          <img src={opponentChoice[0].imageUrl} alt="opponent choice" />
        </div>

        <p className="paragraph">{resultMsg}</p>
        <button
          onClick={this.onClickPlayAgain}
          type="button"
          className="play-again"
        >
          Play Again
        </button>
      </div>
    )
  }

  render() {
    const {score, showResult} = this.state
    return (
      <div className="bg-container">
        <div className="score-container">
          <h1 className="heading">
            ROCK
            <br />
            PAPER
            <br />
            SCISSORS
          </h1>
          <div className="score-result">
            <p className="heading">Score</p>
            <p className="score">{score}</p>
          </div>
        </div>

        <div className="icons-container">
          {showResult ? this.getResult() : this.onGetPlayButtons()}
        </div>

        <Popup
          modal
          trigger={
            <button
              className="hamburger-icon-button"
              type="button"
              data-testid="hamburgerIconButton"
            >
              Rules
            </button>
          }
          className="popup-content"
        >
          {close => (
            <div className="modal-container">
              <button
                className="close-button"
                type="button"
                data-testid="closeButton"
                onClick={() => close()}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </button>
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default Game
