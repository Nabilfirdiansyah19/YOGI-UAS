const Buttons = ({value, className, onClick}) => {
    return(
        <div>
            <input type="button" value={value} className={className} onClick={onClick}></input>
        </div>
    )
}

export default Buttons