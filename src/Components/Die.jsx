


export default function Die(props){

    const style = {
        backgroundColor: props.isHeld ? 'green' : 'white' 
    }


    return (
        <div onClick={props.hold} className="die" style={style}>
           <p>
                {props.value}
            </p> 
        </div>
    )
}