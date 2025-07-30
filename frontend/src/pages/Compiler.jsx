import React, { useRef, useState, version } from 'react'
import Navbar from '../components/Navbar'
import Editor from '@monaco-editor/react';
import Split from 'react-split';
import '../App.css';
import AnotherNav from '../components/AnotherNav';
import axios from 'axios';

import { useEffect } from 'react';
import { codeSnippet } from '../../utils/codeSnippets';

function Compiler() {

  const editorRef = useRef();
  const[languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [code, setCode] = useState(codeSnippet('python'));
  const [output, setOutput] = useState("");
  const [isError, setisError] = useState(false);
  const [fullEditor, setFullEditor] = useState(false);

  useEffect(() => {
    const runTime = async () => {
      try {
        const response = await axios.get("https://emkc.org/api/v2/piston/runtimes");
        // Only allow a few selected languages
        const allowed = ['python', 'c', 'c++', 'java'];
        const langs = response.data
          .filter(lang => allowed.includes(lang.language))
          .map(lang => ({
            label: lang.language.charAt(0).toUpperCase() + lang.language.slice(1),
            value: lang.language,
            v: lang.version
          }));
        setLanguages(langs);
      } catch (error) {
        console.error("Failed to fetch runtimes:", error);
      }
    };
    runTime();
  }, []);


  useEffect(() => {
    if (languages && languages.length > 0) {
      setSelectedLanguage(languages[3]);
    }
  }, [languages]);

  // useEffect(() => {
  //   if(!code)  {
  //     console.log(languages)
  //     setCode(codeSnippet('python'));
  //   }
  // })

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  }

  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar />
      <AnotherNav
        setFullEditor={setFullEditor}
        fullEditor={fullEditor}
        languages={languages}
        code={code}
        setCode={setCode}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        setOutput={setOutput}
        setisError={setisError}
      />
      <div className="flex flex-col h-[90vh] w-full">
        <div className="flex-1 w-full h-full">
          {fullEditor ? (
            <div className="w-full h-full bg-gray-800">
              <Editor
                autoDetectHighContrast={false}
                theme='vs-abyss'
                height="100%"
                language={selectedLanguage}
                onMount={handleEditorDidMount}
                value={code}
                onChange={(value) => { setCode(value) }}
              />
            </div>
          ) : (
            <Split
              className="flex h-full"
              sizes={[75, 25]}
              minSize={[800, 600]} // Set minimum width for each pane (px)
              expandToMin={true}
              gutterSize={10}
              gutterAlign="center"
              snapOffset={30}
              dragInterval={1}
              direction="horizontal"
              cursor="col-resize"
            >
              {/* Left: Code Editor */}
              <div className="bg-gray-800 p-2 border-r border-gray-700 h-full">
                <Editor
                  autoDetectHighContrast={false}
                  theme='vs-abyss'
                  language={selectedLanguage}
                  onMount={handleEditorDidMount}
                  value={code}
                  onChange={(value) => { setCode(value) }}
                />
              </div>
              {/* Right: Output */}
              <div className="flex-wrap bg-gray-800 p-4 text-white overflow-auto h-full">
                <h2 className="text-lg font-semibold mb-2 border-b-2 border-gray-700 pb-1">Output</h2>
                <pre
                  className={`${isError ? 'text-red-400' : 'text-white'} whitespace-pre-wrap break-words`}
                  style={{ overflowX: 'hidden', wordBreak: 'break-word' }}
                >
                  {output}
                </pre>
              </div>
            </Split>
          )}
        </div>
      </div>
    </div>
  )
}

export default Compiler