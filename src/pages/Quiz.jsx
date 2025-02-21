import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addResult } from '../db';
import toast from 'react-hot-toast';
import quizQuestions  from '../quizData';

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputAnswer, setInputAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();
    // setInerval to decrement the timer by 1 every second

    useEffect(() => {
        if (timer === 0) {
            handleSkip();
        }
        const countdown = setInterval(() => setTimer((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
        return () => clearInterval(countdown);
    }, [timer]);

    // function to handle the skip button

    const handleSkip = async() => {
        const newHistory = [
            ...history,
            {
                question: quizQuestions[currentQuestion].question,
                selectedOption: 'Skipped',
                correctAnswer: quizQuestions[currentQuestion].answer,
            },
        ];
        setHistory(newHistory);
        if (currentQuestion + 1 >= quizQuestions.length) {
            await addResult({
                score,
                total: quizQuestions.length,
                date: new Date().toLocaleString(),
                history: newHistory,
            });
            navigate('/results');
        } else {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setInputAnswer(0);
            setTimer(30);
        }
    };

    // function to handle the input change

    const handleInputChange = (e) => {
        
        setInputAnswer(e.target.value);
        console.log('inputAnswer', inputAnswer);
    };
    
    const handleNext = async () => {
        if (quizQuestions[currentQuestion].type === 'multiple-choice' && selectedOption === null) {
            toast.error('Please select an option before proceeding');
            return;
        }
        if (quizQuestions[currentQuestion].type === 'integer' && inputAnswer.trim() === '') {
            toast.error('Please provide an answer before proceeding');
            return;
        }

        const userAnswer = quizQuestions[currentQuestion].type === 'multiple-choice' ? selectedOption : inputAnswer;
        
        const isCorrect = userAnswer == quizQuestions[currentQuestion].answer;// check if the user's answer is correct
        console.log('isCorrect', isCorrect);
        const newHistory = [
            ...history,
            {
                question: quizQuestions[currentQuestion].question,
                selectedOption:userAnswer,
                correctAnswer: quizQuestions[currentQuestion].answer,
            },
        ];
        setHistory(newHistory);
        if (isCorrect) {
            setScore((prevScore) => prevScore + 1);
            console.log('score', score);
        }

        if (currentQuestion + 1 >= quizQuestions.length) {
            await addResult({
                score,
                total: quizQuestions.length,
                date: new Date().toLocaleString(),
                history: newHistory,
            });
            navigate('/results');
        } else {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setInputAnswer(0);
            setTimer(30);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F1F1F2]">
            <div className="bg-[#A1D6E2] p-8 rounded-3xl shadow-lg w-[90%] md:w-2/3 max-w-3xl">
                <h2 className="text-3xl font-bold mb-6">{quizQuestions[currentQuestion].question}</h2>

                {quizQuestions[currentQuestion].type === 'multiple-choice' ? (
                    <div className="grid gap-4 mb-6">
                        {quizQuestions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() =>setSelectedOption(option)}
                                className={`py-3 px-6 rounded-xl transition-all font-semibold hover:cursor-pointer
                                    ${selectedOption === option
                                        ? 'bg-[#277d26] text-white '
                                        : 'bg-[#1995AD] hover:bg-[#277d26] text-white'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                ) : (
                    <input
                        type="text"
                        value={inputAnswer}
                        onChange={handleInputChange}
                        placeholder="Enter your answer"
                        className="w-full p-3 mb-6 border-2 border-gray-300 rounded-xl"
                    />
                )}

                <p className="text-lg mb-4">Time remaining: {timer}s</p>

                <button
                    onClick={handleNext}
                    className="bg-[#277d26] hover:cursor-pointer hover:bg-[#277d269b] w-full mb-2 transition-all text-white font-semibold py-3 px-6 rounded-2xl shadow-md"
                >
                    Next
                </button>
                <button
                    onClick={handleSkip}
                    className="bg-gray-500 w-full hover:cursor-pointer hover:bg-gray-400 transition-all text-white font-semibold py-3 px-6 rounded-2xl shadow-md"
                >
                    Skip
                </button>
            </div>
        </div>
    );
}
