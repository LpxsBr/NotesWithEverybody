import { useEffect, useState } from "react"
import styled from "styled-components"
import useApi from "../../hooks/useApi"

const StyledMain = styled.div`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 5%;

.textArea{
    height: 100%;
    width: 100%;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    gap: 10px;
}
input{
    width: 100%;
    height: 100px;
    background-color: lightcyan;
    border-radius: 10px;
    border: 2px solid blueviolet;
    padding: 2%;
}

button{
    width: 100%;
    height: 30px;
    border-radius: 10px;
    border: 2px solid blueviolet;
    background-color: transparent;
    color: blueviolet;
    font-weight: 800;
    &:hover{
        background-color: blueviolet;
        color: #fff;
        transform: scale(1.01);
    }
}
.msgArea{
    display: flex;
    width: 100%;
    gap: 10px;
    flex-wrap: wrap;
    padding: 3%;
    .msgbox{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        height: 150px;
        width: 250px;
        border-radius: 10px;
        background-color: blueviolet;
        color: #fff;
        font-weight: 800;
        padding: 1%;
        box-shadow: 1px 1px 10px -2px black;
        .date{
            position: absolute;
            bottom: 2px;
            right: 5px;
            color: #aaa;
        }
    }
}

@media (max-width: 800px){
    .msgArea{
        .msgbox{
            width: 100%;
        }
    }
}


`;


export default function HomePage() {
    const [text, setText] = useState('')
    const [msgList, setMsgList] = useState([])
    const [empty, setEmpty] = useState(null)
    useEffect(() => {
        useApi.get('api/post')
            .then((res) => setMsgList(res.data))
            .catch((err ) => console.log(err))
    }, [])

    const dt = new Date;
    const sendPost = () => {
        useApi.post(
            'api/post',
            { msg: text, date: String(dt.getDate()) },
            { headers: { 'Content-Type': 'application/json' } })
            .then((res) => {
                console.log(res.data)
                window.location.reload()
            })
            .catch((error) => console.log(error))
    }

    let list = Object.keys(msgList)
    window.addEventListener('enter', () => {
        if (!text) {
            setEmpty('Campo vazio')
        } else {
            setEmpty('')
            sendPost()
        }
    })
    return (
        <StyledMain>
            <div className="textArea">
                <input
                    type={text}
                    onChange={(event) => setText(event.target.value)}
                    value={text}
                    placeholder={'digite aqui ...'}></input>

                <span>{empty}</span>
                <button onClick={() => sendPost()} >Enviar mini nota</button>
            </div>
            <div className="msgArea">

                {
                    (!(msgList)
                        ? 'vazio'
                        : list.map((number) => (
                            <div className="msgbox">
                                {msgList[number].msg}
                                <span className="date">{msgList[number].date}</span>
                            </div>
                        ))
                    )
                }
            </div>
        </StyledMain>
    )
}