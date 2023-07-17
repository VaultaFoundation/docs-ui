import React, {useEffect} from 'react';
import Layout from '@theme/Layout';
// @ts-ignore
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import remarkGfm from 'remark-gfm';
// @ts-ignore
import remarkRehype from "remark-rehype";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {materialOceanic} from 'react-syntax-highlighter/dist/esm/styles/prism'
import "github-markdown-css";

export const Markdown = (markdown: string) => (<section className="p-10 border rounded bg-white">
    <ReactMarkdown
        children={markdown}
        remarkPlugins={[remarkGfm, remarkRehype]}
        components={{
            code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                    <SyntaxHighlighter
                        {...props}
                        children={String(children).replace(/\n$/, '')}
                        style={materialOceanic}
                        language={match[1]}
                        PreTag="div"
                    />
                ) : (
                    <code {...props} className={className}>
                        {children}
                    </code>
                )
            }
        }}
    />
</section>);

enum ChatMessageFrom {
    User,
    Bot
}
interface ChatMessage {
    id: number;
    from: ChatMessageFrom;
    text: string;
}

export default function Chatbot() {

    let concatData = '';
    const [responseData, setResponseData] = React.useState('');
    const [questionInput, setQuestionInput] = React.useState('');
    const [chatLog, setChatLog] = React.useState([]);
    const [ws, setWs] = React.useState(null);


    const addChatLog = (text: string, from: ChatMessageFrom) => {
        setChatLog(old => [...old, { from, text, id: Math.round(Math.random() * 100000) }])
    }


    const handleChange = event => {
        setQuestionInput(event.target.value);
    };

    const responses = document.getElementById('responses');

    const setResponse = (response) => {
        if(response === '----:END:----'){
            addChatLog(concatData, ChatMessageFrom.Bot);
            concatData = '';
            setResponseData('');
            return;
        } else {
            concatData += response;
            setResponseData(concatData);
        }


        // responses.innerText += response;

        // scroll to bottom
        // responses.scrollTop = responses.scrollHeight;
    }


    useEffect(() => {
        const _ws = new WebSocket(
            "ws://localhost:8081/websocket"
        );

        _ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            setResponse(response.data);
        };

        setWs(_ws);
    }, [])

    const askQuestion = async () => {
        addChatLog(questionInput, ChatMessageFrom.User);
        ws.send(JSON.stringify({
            question: questionInput
        }))
    }

    const onKeyDown = (e) => {
        // if enter
        if (e.keyCode === 13) {
            askQuestion();
            setQuestionInput('')
        }
    }

    return (
        <Layout title="Chatbot" description="Ask the chatbot EOS Network questions.">
            <figure className="fixed left-0 right-0 top-[104px] h-[1px] w-full" style={{borderBottom: "1px solid rgba(0,0,0,0.1)"}}></figure>

            <article className="w-full" style={{ margin: "0 auto" }}>

                <section className="flex flex-col w-full min-h-[400px] max-w-[960px] p-10 pb-16" style={{ margin: "0 auto" }}>
                    <section id="responses" className="flex-1 pb-10">

                        {chatLog.map((chatMessage, index) => {
                            return (<section>
                                {chatMessage.from === ChatMessageFrom.User && <section key={chatMessage.id.toString()} className="mt-5 flex flex-row items-center">
                                    <section className="bg-[#3F65C2] text-white rounded py-4 px-8">
                                        {chatMessage.text}
                                    </section>
                                </section>}
                                {chatMessage.from === ChatMessageFrom.Bot && <section key={chatMessage.id.toString()} className="mt-5">
                                    <section className="rounded w-full">
                                        {Markdown(chatMessage.text)}
                                    </section>
                                </section>}
                            </section>)
                        })}


                        {responseData && responseData.length && <section className="mt-5">
                            <section className="rounded w-full">
                                {Markdown(responseData)}
                            </section>
                        </section>}

                    </section>
                    <section className="w-full relative">
                        {chatLog.length === 0 && <section className="absolute bottom-[60px] text-xl font-bold w-full h-full flex items-center justify-center text-center p-10">
                            Start by asking a question below 👇
                        </section>}
                        <input onKeyDown={onKeyDown} onChange={handleChange} value={questionInput} id="question"
                               className="w-[100%] bg-white shadow-xl rounded-[120px] py-4 px-8 outline-0" type="text"
                               placeholder="Ask the AI anything..." />
                        <figure className="absolute right-8 top-[15px]">
                            <img src="/icons/telegram-icon.svg" style={{ filter: "invert(1)", opacity: 0.1 }} alt="Chatbot" />
                        </figure>
                    </section>
                </section>
            </article>

        </Layout>
    );
}
