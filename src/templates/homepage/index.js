import { useEffect, useState } from "react"
import useApi from "../../hooks/useApi"

const general = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

const listArea = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
}

const textArea = {
    width: '300px',
    height:'100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
}
const msgbox = {
    backgroundColor: 'blue',
    display: 'flex',
    color: 'white',
    width: '25%',
    height: '30px',
    margin: '10px'
}
export default function HomePage() {
    const [text, setText] = useState('')
    const [msgList, setMsgList] = useState([])
    useEffect(() => {
        useApi.get('api/post')
            .then((res) => setMsgList(res.data))
            .catch((err) => console.log(err))
    }, [])

    const sendPost = () => {
        useApi.post(
            'api/post',
            { msg: text },
            { headers: { 'Content-Type': 'application/json' } })
            .then((res) => {
                console.log(res.data)
                window.location.reload()
            })
            .catch((error) => console.log(error))
    }

    let list = Object.keys(msgList)
    return (
        <div style={general}>
            <div className="textArea">
                <textarea
                    style={textArea}
                    onChange={(event) => setText(event.target.value)}
                    value={text}
                    placeholder={'digite aqui ...'}></textarea>
            </div>

            <button onClick={() => sendPost()} >submit</button>
            <div style={listArea}>

                {
                    (!(msgList)
                        ? 'vazio'
                        : list.map((number) =>(
                        <div className="msgbox" style={msgbox}>
                            {msgList[number].msg}
                        </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}