const ScoreCircle = ({ score = 0 }: { score: number }) => (
  <span className="score-pill" aria-label={`Resume score ${score} out of 100`}>
    <strong>{score}</strong>
    <span>match score</span>
  </span>
);

export default ScoreCircle;
