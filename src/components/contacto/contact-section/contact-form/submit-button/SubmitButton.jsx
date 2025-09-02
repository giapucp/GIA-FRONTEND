import "./SubmitButton.css";

const SubmitButton = ({ text }) => {
  return (
    <button type="submit" className="submit-button">
      {text}
    </button>
  );
};

export default SubmitButton;
