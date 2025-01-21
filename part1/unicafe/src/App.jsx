import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
    setGood(good + 1)
    console.log("good feedback is now", good + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
    console.log("neutral feedback is now", neutral + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
    console.log("bad feedback is now", bad + 1)
  }

  const totalFeedback = good + bad + neutral

  const averageFeedback = (good - bad) / totalFeedback

  const positiveFeedbackPercentage = 100 * good / totalFeedback

  const stats = [
    good,
    neutral,
    bad,
    totalFeedback,
    averageFeedback,
    positiveFeedbackPercentage
  ]

  return (
    <div>
      <Heading text="Give Feedback" />

      <div>
        <Button onClick={handleGoodFeedback} text={"Good"} />
        <Button onClick={handleNeutralFeedback} text={"Neutral"} />
        <Button onClick={handleBadFeedback} text={"Bad"} />
      </div>
      <Heading text="Statistics" />

      <div>
        <Statistics stats={stats} />
      </div>
    </div>
  )
}

const Heading = (props) => <h1>{props.text}</h1>

const StatisticLine = ({ amount, text }) => (
  <p>{text}: {amount}</p>
)

const Statistics = ({ stats }) => {
  if (stats[3] === 0) {
    return (<p>No feedback given.</p>)
  } else {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <StatisticLine amount={stats[0]} text="Good" />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine amount={stats[1]} text="Neutral" />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine amount={stats[2]} text="Bad" />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine amount={stats[3]} text="All" />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine amount={stats[4]} text="Average" />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine amount={`${stats[5]}%`} text="Positive" />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
};

const Button = ({ onClick, text }) => (
  <button
    onClick={onClick}>
    {text}
  </button>
)

export default App