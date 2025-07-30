import React, { useEffect, useState } from 'react';
import { FaCompress, FaExpand, FaPlay } from 'react-icons/fa';
import { codeSnippet } from '../../utils/codeSnippets';
import axios from 'axios';

// Utility function to check if code asks for input
function codeAsksForInput(code, language) {
    if (!code) return false;
    // Simple heuristics for common languages
    switch (language?.value) {
        case 'python':
            // Looks for input() or raw_input()
            return /\binput\s*\(/.test(code) || /\braw_input\s*\(/.test(code);
        case 'c':
            // Looks for scanf or getchar
            return /\bscanf\s*\(/.test(code) || /\bgetchar\s*\(/.test(code);
        case 'c++':
            // Looks for cin or getchar
            return /\bcin\s*>>/.test(code) || /\bgetchar\s*\(/.test(code);
        case 'java':
            // Looks for Scanner.next or System.in.read
            return /\bScanner\s*\w*\s*=\s*new\s+Scanner\s*\(/.test(code) ||
                   /\.next(Line|Int|Double|Float|Byte|Short|Long|Boolean|)/.test(code) ||
                   /System\.in\.read\s*\(/.test(code);
        default:
            // Fallback: look for "input" or "read"
            return /\binput\s*\(/.test(code) || /\bread\s*\(/.test(code);
    }
}

function LanguageDropdown({ show, setShow, languages, selectedLanguage, handleLanguageChange }) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/65">
            <div className="w-60 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl drop-shadow-blue-900">
                {languages.map((lang) => (
                    <button
                        key={lang.value}
                        className={`block w-full rounded-xl text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${lang.value === selectedLanguage?.value ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-white'}`}
                        onClick={() => {
                            handleLanguageChange(lang);
                            setShow(false);
                        }}
                    >
                        <div className='w-full flex justify-between items-center'>
                            <span>{lang.label}</span>
                            <span>({lang.v})</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

function AnotherNav({onLanguageChange, setFullEditor, fullEditor, languages, code, setCode, selectedLanguage, setSelectedLanguage, setOutput, setisError }) {
    const [isRunning, setIsRunning] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [input, setInput] = useState('');

    const handleLanguageChange = (lang) => {
        setSelectedLanguage(lang);
        setCode(codeSnippet(lang.label))
        if (onLanguageChange) onLanguageChange(lang.value);
    };

    // useEffect(() => {
    //     if(!code) {
    //         setCode(codeSnippet(selectedLanguage.label))
    //     }
    // })

    const handleRun = async () => {
        setIsRunning(true);

        // Check if code asks for inputm
        const needsInput = codeAsksForInput(code, selectedLanguage);

        let userInput = '';
        if (needsInput) {
            userInput = prompt('Enter input for your code (stdin):');
            if (userInput === null) {
                setIsRunning(false);
                return; // User cancelled prompt
            }
            setInput(userInput);
        }

        try {
            console.log(selectedLanguage.value, selectedLanguage.v, code);
            const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
                language: selectedLanguage.value,
                version: selectedLanguage.v,
                files: [
                    {
                        content: code
                    }
                ],
                stdin: userInput
            });
            // handle response...
            console.log(response.data);
            setOutput(response.data.run.output);
            response.data.run.stderr ? setisError(true) : setisError(false);
        } catch (error) {
            console.error(error);
        }
        setIsRunning(false);
    };

    return (
        <nav className="flex justify-end items-center gap-4 bg-gray-900 px-10 py-2 border-b border-gray-700">
            <div className="relative flex items-center space-x-4">
                <button
                    id="language-button"
                    type="button"
                    className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200  focus:outline-none  dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    onClick={() => setShowDropdown((prev) => !prev)}
                >
                    {selectedLanguage ? selectedLanguage.label : 'Select Language'}
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                <LanguageDropdown
                    show={showDropdown}
                    setShow={setShowDropdown}
                    languages={languages}
                    selectedLanguage={selectedLanguage}
                    handleLanguageChange={handleLanguageChange}
                />
            </div>
            <button
                onClick={handleRun}
                disabled={isRunning}
                className={`px-4 py-2 rounded text-white font-semibold transition ${isRunning
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                    }`}
            >
                {isRunning ? 'Running...' : (
                    <span className="flex items-center gap-2">
                        <FaPlay className="inline-block" />
                        Run
                    </span>
                )}
            </button>
            <div className="flex items-center gap-2 p-2 bg-gray-900  border-gray-700">
                {!fullEditor ? (
                    <button
                        className=" hover:text-blue-700 text-white rounded text-sm transition"
                        onClick={() => setFullEditor(true)}
                    >
                        <FaExpand className='text-3xl'/>
                    </button>
                ) : (
                    <button
                        className=" hover:text-blue-700 text-white rounded text-sm transition"
                        onClick={() => setFullEditor(false)}
                    >
                        <FaCompress className='text-3xl'/>
                    </button>
                )}
            </div>
        </nav>
    );
}

export default AnotherNav;