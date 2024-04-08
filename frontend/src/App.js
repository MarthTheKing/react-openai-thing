import './App.css'
import React from 'react'
import OpenAI from 'openai'
import { AiContext } from './AiContext'
import MessagesList from './MessagesList'

const ai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const tryMessage = async messageList => {
    let result = ''
    try{
        let amoguer = await ai.chat.completions.create({model:'gpt-3.5-turbo',messages:messageList})
        result = amoguer.choices[0].message.content
    }catch(error){
        result = error.toString()
    }
    return result
}

export default function App() {
    const [messages, setMessages] = React.useState([{role:'system',content:`you must respond to everything in all lowercase and without using periods unless necessary`}])
    React.useEffect(() => {
        async function genMessages(){
            let aiMessage = await tryMessage(messages)
            setMessages(prev => prev.concat([{role:'assistant',content:aiMessage}]))
        }

        if(messages[messages.length - 1].role === 'user'){
            genMessages()
        }
    },[messages,setMessages])
    return (
        <AiContext.Provider value={{messages, setMessages}}>
            <div className="App">
                <MessagesList />
                <input type='text' id='memsg' onKeyUp={event => {
                    if(event.key === 'Enter'){
                        document.querySelector('#buntn').click()
                    }
                }}/>
                <button type='button' id='buntn' onClick={() => {
                    let content = document.querySelector('#memsg').value
                    document.querySelector('#memsg').value = ''
                    setMessages(prev => prev.concat([{role:'user',content:content}]))
                }}>subm</button>
            </div>
        </AiContext.Provider>
    )
}