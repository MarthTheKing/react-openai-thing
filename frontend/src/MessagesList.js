import React from 'react'
import styled from 'styled-components'
import { AiContext } from './AiContext'

const Message = styled.div`
color: ${({role}) => role === 'user' ? 'blue' : 'red'};
`

export default function MessagesList(){
    const {messages} = React.useContext(AiContext)
    return(
        messages.filter(message => message.role !== 'system').map(message => <Message role={message.role}>{message.content}</Message>)
    )
}