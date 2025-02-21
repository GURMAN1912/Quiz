import React, { useState, useEffect } from 'react';
import { getAllResults, clearResults } from '../db';
import toast from 'react-hot-toast';

const Results = () => {
    const [results, setResults] = useState([]);
    // calling the getAllResults function to get all the results from the database
    useEffect(() => {
        const fetchResults = async () => {
            const allResults = await getAllResults();
            setResults(allResults);
        };
        fetchResults();
    }, []);
    // calling the clearResults function to clear all the results from the database

    const handleClearHistory = async () => {
        await clearResults();
        setResults([]);
        toast.success('Quiz history cleared!');
    };
    results.map((result,index) => {
        let s=0;
        result.history.map((item,i) => {
            console.log(item);
            if(item.selectedOption == item.correctAnswer){
                s=s+1;
                console.log("correct");
            }
            else{
                console.log("incorrect");
            }
        }   
        )
        result.score=s;
    });

    //displaying the results in a list
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F1F1F2] p-4">
            <h1 className="text-4xl font-bold mb-6">Quiz History</h1>
            {results.length === 0 ? (
                <p className="text-xl">No quiz history available.</p>//if there are no results to display
            ) : (
                <div className="w-full max-w-4xl">
                    {results
                        .slice() // Create a copy to avoid mutating state directly
                        .reverse()
                        .map((result, index) => (
                            <div
                                key={index}
                                className="bg-[#A1D6E2] p-4 mb-4 rounded-xl shadow-md"
                            >
                                <h2 className="text-2xl font-semibold">
                                    Score: {result.score}/{result.total}
                                </h2>
                                <p className="text-gray-600">Date: {result.date}</p>
                                <details className="mt-2">
                                    <summary className="cursor-pointer text-[#1995AD] font-medium">
                                        View Details
                                    </summary>
                                    <ul className="mt-2 list-disc pl-5">
                                        {result.history.map((item, i) => (
                                            <li key={i}>
                                                <strong>Q:</strong> {item.question} <br />
                                                <strong>Your Answer:</strong> {item.selectedOption} <br />
                                                <strong>Correct Answer:</strong> {item.correctAnswer}
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            </div>
                        ))}
                    <button
                        onClick={handleClearHistory}//calling the handleClearHistory function
                        className="bg-red-500 text-white py-2 px-6 rounded-xl shadow-md mt-4 hover:bg-red-600 transition-all"
                    >
                        Clear History
                    </button>
                </div>
            )}
        </div>
    );
};

export default Results;
